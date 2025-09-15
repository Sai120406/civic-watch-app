import type { User, Issue, Comment } from '@/types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Priya Sharma',
    avatarUrl: 'https://picsum.photos/seed/user1/40/40',
    points: 1250,
  },
  {
    id: 'user-2',
    name: 'Rohan Joshi',
    avatarUrl: 'https://picsum.photos/seed/user2/40/40',
    points: 1100,
  },
  {
    id: 'user-3',
    name: 'Anjali Patil',
    avatarUrl: 'https://picsum.photos/seed/user3/40/40',
    points: 950,
  },
  {
    id: 'user-4',
    name: 'Vikram Singh',
    avatarUrl: 'https://picsum.photos/seed/user4/40/40',
    points: 800,
  },
  {
    id: 'user-5',
    name: 'Aisha Khan',
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
    text: 'I almost had an accident here yesterday. Thanks for posting.',
    author: users[2],
    createdAt: '1 day ago',
  },
  {
    id: 'comment-3',
    text: 'The PMC needs to be more proactive about these things.',
    author: users[3],
    createdAt: '1 day ago',
  },
  {
    id: 'comment-4',
    text: "I've reported this through the official app too, hope this gets more attention.",
    author: users[4],
    createdAt: '12 hours ago',
  },
];

export const issues: Issue[] = [
  {
    id: 'issue-1',
    title: 'Massive pothole on FC Road',
    description:
      'A very large and deep pothole has formed on Fergusson College Road near the main gate. It is a hazard to vehicles, especially two-wheelers at night. It has already caused issues for many commuters. Urgent repair is needed.',
    author: users[0],
    createdAt: '3 days ago',
    location: {
      name: 'Fergusson College Road',
      lat: 18.521,
      lng: 73.839,
    },
    upvotes: 42,
    comments: comments,
    category: 'pothole',
    photoUrl: 'https://picsum.photos/seed/pothole1/800/600',
    voiceMemoUrl: '/example-audio.mp3',
  },
  {
    id: 'issue-2',
    title: 'Street light out in Koregaon Park',
    description:
      "The street light on Lane No. 7 in Koregaon Park has been out for over a week. It's very dark and feels unsafe to walk there at night. Please replace the bulb.",
    author: users[1],
    createdAt: '5 days ago',
    location: {
      name: 'Koregaon Park, Lane 7',
      lat: 18.536,
      lng: 73.893,
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
    title: 'Overflowing bins at Sarasbaug',
    description:
      'The trash and recycling bins at Sarasbaug near the Ganesh temple are constantly overflowing. It is attracting pests and creating an unpleasant environment. The pickup schedule needs to be more frequent, especially on weekends.',
    author: users[2],
    createdAt: '1 day ago',
    location: {
      name: 'Sarasbaug',
      lat: 18.504,
      lng: 73.852,
    },
    upvotes: 55,
    comments: [
      {
        id: 'comment-6',
        text: "It's been like this for a while. Especially bad during evenings.",
        author: users[3],
        createdAt: '6 hours ago',
      },
      {
        id: 'comment-7',
        text: 'Agreed! The smell is awful.',
        author: users[4],
        createdAt: '2 hours ago',
      },
    ],
    category: 'waste-management',
    photoUrl: 'https://picsum.photos/seed/bins1/800/600',
  },
  {
    id: 'issue-4',
    title: 'Faded crosswalk at Deccan Gymkhana',
    description:
      'The crosswalk paint at the main Deccan Gymkhana bus stop is extremely faded and barely visible. This is a major safety concern for pedestrians. It needs to be repainted immediately.',
    author: users[4],
    createdAt: '1 week ago',
    location: {
      name: 'Deccan Gymkhana',
      lat: 18.518,
      lng: 73.84,
    },
    upvotes: 78,
    comments: [],
    category: 'other',
  },
];
