/**
 * @license
 * Copyright 2024 Neural Nomads
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/header';
import { Camera, Locate, Mic } from 'lucide-react';
import { useIssues } from '@/context/issues-context';
import { users } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';

const formSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  category: z.enum(['pothole', 'street-light', 'waste-management', 'other']),
  location: z.string().min(5, 'Please provide a location or address.'),
  photo: z.any().optional(),
  voiceMemo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitPage() {
  const { toast } = useToast();
  const { addIssue } = useIssues();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      category: 'pothole',
    },
  });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // For demonstration, we'll use a reverse geocoding service placeholder.
          // In a real app, you would use a service like Google Maps Geocoding API.
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const locationName = data.display_name || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
              form.setValue('location', locationName, { shouldValidate: true });
            })
            .catch(() => {
              toast({
                variant: 'destructive',
                title: 'Could not fetch address',
                description: 'Unable to retrieve address for your location.',
              });
            });
        },
        (error) => {
          toast({
            variant: 'destructive',
            title: 'Geolocation failed',
            description: error.message,
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Geolocation not supported',
        description: 'Your browser does not support geolocation.',
      });
    }
  };

  async function onSubmit(values: FormValues) {
    const { photo, voiceMemo, ...rest } = values;

    let photoUrl: string | undefined = undefined;
    if (photo && photo[0]) {
      photoUrl = URL.createObjectURL(photo[0]);
    }

    let voiceMemoUrl: string | undefined = undefined;
    if (voiceMemo && voiceMemo[0]) {
      voiceMemoUrl = URL.createObjectURL(voiceMemo[0]);
    }

    let lat = 18.5204 + (Math.random() - 0.5) * 0.1;
    let lng = 73.8567 + (Math.random() - 0.5) * 0.1;
    
    // In a real app, you'd get coordinates from the location string
    // using a geocoding service.
    if (navigator.geolocation) {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        } catch (error) {
            console.warn("Could not get precise location for new issue, using random offset.");
        }
    }


    const newIssue = {
      id: uuidv4(),
      ...rest,
      author: users[0],
      createdAt: 'Just now',
      location: {
        name: values.location,
        lat,
        lng,
      },
      upvotes: 0,
      comments: [],
      status: 'Open' as const,
      photoUrl,
      voiceMemoUrl,
    };
    
    addIssue(newIssue);

    toast({
      title: 'Issue Submitted!',
      description: "Thanks for helping improve your community.",
    });
    form.reset();
    router.push('/');
  }

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Report a New Issue" />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Massive pothole on Main St" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short, descriptive title for the issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide details about the issue, its impact, and exact location."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pothole">Pothole</SelectItem>
                          <SelectItem value="street-light">
                            Street Light
                          </SelectItem>
                          <SelectItem value="waste-management">
                            Waste Management
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="e.g., Intersection of Main St & 2nd Ave"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleGetLocation}
                        >
                          <Locate className="h-5 w-5" />
                          <span className="sr-only">Get current location</span>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add Photo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="file"
                            accept="image/*"
                            className="pl-10"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                          <Camera className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        A picture is worth a thousand words.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voiceMemo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add Voice Memo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="file"
                            accept="audio/*"
                            className="pl-10"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                          <Mic className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Explain the issue in your own words.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Submit Issue</Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
