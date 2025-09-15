'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  analyzeIssueSentiment,
  type AnalyzeIssueSentimentOutput,
} from '@/ai/flows/analyze-issue-sentiment';
import { Wand, Frown, Meh, Smile, Loader2 } from 'lucide-react';
import type { Issue } from '@/types';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type SentimentAnalyzerProps = {
  issue: Issue;
};

const sentimentIcons = {
  positive: <Smile className="h-5 w-5 text-green-500" />,
  neutral: <Meh className="h-5 w-5 text-yellow-500" />,
  negative: <Frown className="h-5 w-5 text-red-500" />,
};

export default function SentimentAnalyzer({ issue }: SentimentAnalyzerProps) {
  const [analysis, setAnalysis] = useState<AnalyzeIssueSentimentOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeSentiment = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const commentsText = issue.comments.map((c) => c.text).join('\n');
      const result = await analyzeIssueSentiment({ comments: commentsText });
      setAnalysis(result);
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      // Optionally, set an error state to show in the UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-2xl font-semibold">
          Discussion ({issue.comments.length})
        </h2>
        <Button
          onClick={handleAnalyzeSentiment}
          disabled={isLoading || issue.comments.length === 0}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand className="mr-2 h-4 w-4" />
          )}
          Analyze Sentiment
        </Button>
      </div>

      {analysis && (
        <Alert>
          <div className="flex items-center gap-2">
            {sentimentIcons[analysis.sentiment]}
            <AlertTitle className="capitalize">
              {analysis.sentiment} Sentiment
            </AlertTitle>
          </div>
          <AlertDescription>{analysis.explanation}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {issue.comments.map((comment, index) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage
                src={comment.author.avatarUrl}
                alt={comment.author.name}
                data-ai-hint="person"
              />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-muted-foreground">
                  &bull; {comment.createdAt}
                </span>
              </div>
              <p className="mt-1 text-foreground/90">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={issue.author.avatarUrl} alt={issue.author.name} data-ai-hint="person" />
          <AvatarFallback>{issue.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea placeholder="Add to the discussion..." />
          <Button>Post Comment</Button>
        </div>
      </div>
    </div>
  );
}
