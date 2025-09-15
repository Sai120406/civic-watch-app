'use client';

import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { issues } from '@/lib/data';
import type { Issue } from '@/types';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';

export function IssueMap() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const position = { lat: 18.5204, lng: 73.8567 }; // Centered on Pune
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <div className="relative h-full w-full">
          <Image
            src="https://picsum.photos/seed/map/1600/1200"
            alt="Map placeholder"
            fill
            className="object-cover opacity-30"
            data-ai-hint="map city"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg bg-background/80 p-6 text-center shadow-lg backdrop-blur-sm">
              <h3 className="font-headline text-lg font-semibold">Map Unavailable</h3>
              <p className="text-muted-foreground">
                Google Maps API key is not configured.
                <br />
                A placeholder image is being shown.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '100%', width: '100%' }}>
        <Map
          defaultCenter={position}
          defaultZoom={13}
          mapId="civicwatch_map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {issues.map((issue) => (
            <AdvancedMarker
              key={issue.id}
              position={issue.location}
              onClick={() => setSelectedIssue(issue)}
            >
              <Pin
                background={'#4A8FE7'}
                borderColor={'#3B72B9'}
                glyphColor={'#FFFFFF'}
              />
            </AdvancedMarker>
          ))}

          {selectedIssue && (
            <InfoWindow
              position={selectedIssue.location}
              onCloseClick={() => setSelectedIssue(null)}
            >
              <div className="p-2">
                <h3 className="font-headline text-lg font-semibold">
                  {selectedIssue.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedIssue.location.name}
                </p>
                <p className="my-2 text-sm">
                  {selectedIssue.description.substring(0, 100)}...
                </p>
                <Button asChild size="sm">
                  <Link href={`/issues/${selectedIssue.id}`}>View Details</Link>
                </Button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
