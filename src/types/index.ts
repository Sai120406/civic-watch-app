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

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  points: number;
};

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
};

export type IssueCategory =
  | 'pothole'
  | 'street-light'
  | 'waste-management'
  | 'other';

export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';

export type Issue = {
  id: string;
  title: string;
  description: string;
  author: User;
  createdAt: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  upvotes: number;
  comments: Comment[];
  category: IssueCategory;
  status: IssueStatus;
  photoUrl?: string;
  voiceMemoUrl?: string;
};
