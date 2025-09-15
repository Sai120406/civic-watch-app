'use client';

import { notFound } from 'next/navigation';
import { useIssues } from '@/context/issues-context';
import Header from '@/components/header';
import { ArrowBigUp, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SentimentAnalyzer from '@/components/sentiment-analyzer';
import Image from 'next/image';
import VoiceMemoPlayer from '@/components/voice-memo-player';
import { useEffect, useState } from 'react';
import type { Issue } from '@/types';

const categoryHints: Record<string, string> = {
  pothole: 'pothole road',
  'street-light': 'dark street',
  'waste-management': 'trash overflow',
  other: 'public space',
};

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { issues } = useIssues();
  const [issue, setIssue] = useState<Issue | null | undefined>(undefined);

  useEffect(() => {
    const foundIssue = issues.find((issue) => issue.id === id);
    setIssue(foundIssue);
  }, [issues, id]);

  if (issue === undefined) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p>Loading issue...</p>
      </div>
    );
  }

  if (!issue) {
    notFound();
  }

  const getAiHint = () => {
    let hint = categoryHints[issue.category];
    if (issue.title.toLowerCase().includes('graffiti')) {
      hint = 'graffiti wall';
    } else if (issue.title.toLowerCase().includes('swing')) {
      hint = 'playground swing';
    }
    return hint;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header pageTitle="Issue Details" />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto grid max-w-4xl gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={issue.author.avatarUrl}
                  alt={issue.author.name}
                  data-ai-hint="person"
                />
                <AvatarFallback>{issue.author.name[0]}</AvatarFallback>
              </Avatar>
              <span>
                Reported by <strong>{issue.author.name}</strong>
              </span>
              <span>&bull;</span>
              <span>{issue.createdAt}</span>
            </div>
            <h1 className="font-headline mt-2 text-3xl font-bold md:text-4xl">
              {issue.title}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{issue.location.name}</span>
            </div>
          </div>

          {issue.photoUrl && (
            <div className="overflow-hidden rounded-lg border">
              <Image
                src={issue.photoUrl}
                alt={issue.title}
                width={800}
                height={600}
                className="aspect-video w-full object-cover"
                data-ai-hint={getAiHint()}
              />
            </div>
          )}

          {issue.voiceMemoUrl && <VoiceMemoPlayer issue={issue} />}

          <div className="prose prose-lg max-w-none text-foreground dark:prose-invert">
            <p>{issue.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border bg-card p-1 pr-3">
              <ArrowBigUp className="h-8 w-8 cursor-pointer rounded-full p-1 text-primary hover:bg-accent" />
              <span className="font-bold">{issue.upvotes}</span>
            </div>
          </div>

          <Separator />

          <SentimentAnalyzer issue={issue} />
        </div>
      </main>
    </div>
  );
}
