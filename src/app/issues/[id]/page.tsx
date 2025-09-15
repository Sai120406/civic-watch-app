import { notFound } from 'next/navigation';
import { issues } from '@/lib/data';
import Header from '@/components/header';
import { ArrowBigUp, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SentimentAnalyzer from '@/components/sentiment-analyzer';

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const issue = issues.find((issue) => issue.id === params.id);

  if (!issue) {
    notFound();
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
