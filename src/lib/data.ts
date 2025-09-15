import type { User, Issue, Comment } from '@/types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Amelia Grant',
    avatarUrl: 'https://picsum.photos/seed/user1/40/40',
    points: 1250,
  },
  {
    id: 'user-2',
    name: 'Ben Carter',
    avatarUrl: 'https://picsum.photos/seed/user2/40/40',
    points: 1100,
  },
  {
    id: 'user-3',
    name: 'Chloe Davis',
    avatarUrl: 'https://picsum.photos/seed/user3/40/40',
    points: 950,
  },
  {
    id: 'user-4',
    name: 'David Evans',
    avatarUrl: 'https://picsum.photos/seed/user4/40/40',
    points: 800,
  },
  {
    id: 'user-5',
    name: 'Emily Foster',
    avatarUrl: 'https://picsum.photos/seed/user5/40/40',
    points: 650,
  },
];

const comments: Comment[] = [
  {
    id: 'comment-1',
    text: 'This has been a problem for weeks! Glad someone reported it.',
    author: users[1],
    createdAt: '2 days ago',
  },
  {
    id: 'comment-2',
    text: 'I almost tripped here yesterday. Thanks for posting.',
    author: users[2],
    createdAt: '1 day ago',
  },
  {
    id: 'comment-3',
    text: 'The city needs to be more proactive about these things.',
    author: users[3],
    createdAt: '1 day ago',
  },
  {
    id: 'comment-4',
    text: "I've reported this through the city's official app too, hope this gets more attention.",
    author: users[4],
    createdAt: '12 hours ago',
  },
];

export const issues: Issue[] = [
  {
    id: 'issue-1',
    title: 'Massive pothole on Main St & 2nd Ave',
    description:
      'A very large and deep pothole has formed at the intersection of Main Street and 2nd Avenue. It is a hazard to vehicles, especially at night. It has already caused a flat tire for one resident. Urgent repair is needed.',
    author: users[0],
    createdAt: '3 days ago',
    location: {
      name: 'Main St & 2nd Ave',
      lat: 37.7749,
      lng: -122.4194,
    },
    upvotes: 42,
    comments: comments,
    category: 'pothole',
  },
  {
    id: 'issue-2',
    title: 'Street light out on Oakwood Dr',
    description:
      "The street light at the corner of Oakwood Drive and Maple Lane has been out for over a week. It's very dark and feels unsafe to walk there at night. Please replace the bulb.",
    author: users[1],
    createdAt: '5 days ago',
    location: {
      name: 'Oakwood Dr & Maple Ln',
      lat: 37.779,
      lng: -122.431,
    },
    upvotes: 28,
    comments: [
      {
        id: 'comment-5',
        text: 'Confirmed, it is very dark there. I avoid that street now.',
        author: users[0],
        createdAt: '4 days ago',
      },
    ],
    category: 'street-light',
  },
  {
    id: 'issue-3',
    title: 'Overflowing bins at City Park',
    description:
      'The trash and recycling bins at City Park near the playground are constantly overflowing. It is attracting pests and creating an unpleasant environment. The pickup schedule needs to be more frequent.',
    author: users[2],
    createdAt: '1 day ago',
    location: {
      name: 'City Park Playground',
      lat: 37.772,
      lng: -122.425,
    },
    upvotes: 55,
    comments: [
      {
        id: 'comment-6',
        text: "It's been like this all summer. Especially bad on weekends.",
        author: users[3],
        createdAt: '6 hours ago',
      },
      {
        id: 'comment-7',
        text: 'Agreed! It smells awful.',
        author: users[4],
        createdAt: '2 hours ago',
      },
    ],
    category: 'waste-management',
  },
  {
    id: 'issue-4',
    title: 'Faded crosswalk at Elm St School',
    description:
      'The crosswalk paint in front of Elm Street Elementary School is extremely faded and barely visible. This is a major safety concern for the children. It needs to be repainted immediately.',
    author: users[4],
    createdAt: '1 week ago',
    location: {
      name: 'Elm Street Elementary',
      lat: 37.765,
      lng: -122.41,
    },
    upvotes: 78,
    comments: [],
    category: 'other',
  },
];
