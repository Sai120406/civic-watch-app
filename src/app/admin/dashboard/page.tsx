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

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useIssues } from '@/context/issues-context';
import type { Issue, IssueStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { IssueMap } from '@/components/issue-map';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';

const statusStyles: Record<IssueStatus, string> = {
  Open: 'bg-red-500 hover:bg-red-500/80',
  'In Progress': 'bg-yellow-500 hover:bg-yellow-500/80',
  Resolved: 'bg-green-500 hover:bg-green-500/80',
};

export default function AdminDashboardPage() {
  const { issues, updateIssueStatus } = useIssues();
  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleStatusChange = (issueId: string, status: IssueStatus) => {
    updateIssueStatus(issueId, status);
    toast({
      title: 'Status Updated',
      description: `Issue status has been changed to "${status}".`,
    });
    if (selectedIssue?.id === issueId) {
      setSelectedIssue({ ...selectedIssue, status });
    }
  };

  const handleRowClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseDialog = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="font-headline text-2xl font-bold text-primary">
            CivicWatch Admin
          </h1>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Issue Map</CardTitle>
              <CardDescription>
                Geographic overview of all reported issues.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <IssueMap />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>All Issues</CardTitle>
              <CardDescription>
                Manage and track all reported civic issues. Click a row to view
                details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Upvotes</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map((issue) => (
                    <TableRow
                      key={issue.id}
                      onClick={() => handleRowClick(issue)}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        {issue.title}
                      </TableCell>
                      <TableCell>{issue.category}</TableCell>
                      <TableCell>{issue.location.name}</TableCell>
                      <TableCell>{issue.upvotes}</TableCell>
                      <TableCell>
                        <Badge className={cn(statusStyles[issue.status])}>
                          {issue.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {selectedIssue && (
        <Dialog open={!!selectedIssue} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">
                {selectedIssue.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 pt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{selectedIssue.location.name}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedIssue.photoUrl && (
                <div className="overflow-hidden rounded-lg border">
                  <Image
                    src={selectedIssue.photoUrl}
                    alt={selectedIssue.title}
                    width={800}
                    height={600}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{selectedIssue.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 font-semibold">
                  Discussion ({selectedIssue.comments.length})
                </h3>
                <div className="space-y-4">
                  {selectedIssue.comments.length > 0 ? (
                    selectedIssue.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={comment.author.avatarUrl}
                            alt={comment.author.name}
                          />
                          <AvatarFallback>
                            {comment.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold">
                              {comment.author.name}
                            </span>
                            <span className="text-muted-foreground">
                              &bull; {comment.createdAt}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-foreground/90">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No comments yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button
                variant="outline"
                onClick={() => handleStatusChange(selectedIssue.id, 'In Progress')}
                disabled={selectedIssue.status === 'In Progress'}
              >
                Mark as In Progress
              </Button>
              <Button
                onClick={() => handleStatusChange(selectedIssue.id, 'Resolved')}
                disabled={selectedIssue.status === 'Resolved'}
              >
                Mark as Resolved
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
