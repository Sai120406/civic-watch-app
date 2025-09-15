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
  photoUrl?: string;
  voiceMemoUrl?: string;
};
