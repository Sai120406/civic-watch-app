/**
 * @license
 * Copyright 2024 Neural Networks
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

import Link from 'next/link';
import { ArrowBigUp, MessageSquare, MapPin } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Issue, IssueCategory } from '@/types';
import { PotholeIcon, StreetLightIcon, WasteManagementIcon, OtherIcon } from './icons';

const categoryIcons: Record<IssueCategory, React.ComponentType<{ className?: string }>> = {
    'pothole': PotholeIcon,
    'street-light': StreetLightIcon,
    'waste-management': WasteManagementIcon,
    'other': OtherIcon,
};

const categoryLabels: Record<IssueCategory, string> = {
    'pothole': 'Pothole',
    'street-light': 'Street Light',
    'waste-management': 'Waste',
    'other': 'Other',
};

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard({ issue }: IssueCardProps) {
  const CategoryIcon = categoryIcons[issue.category];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <Badge variant="secondary" className="flex items-center gap-1.5">
                <CategoryIcon className="h-3.5 w-3.5 text-muted-foreground" />
                {categoryLabels[issue.category]}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{issue.location.name}</span>
            </div>
        </div>
        <CardTitle className="font-headline pt-2">
            <Link href={`/issues/${issue.id}`} className="hover:underline">
                {issue.title}
            </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {issue.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={issue.author.avatarUrl} alt={issue.author.name} data-ai-hint="person" />
            <AvatarFallback>{issue.author.name[0]}</AvatarFallback>
          </Avatar>
          <span>{issue.author.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ArrowBigUp className="h-4 w-4" />
            <span>{issue.upvotes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{issue.comments.length}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
