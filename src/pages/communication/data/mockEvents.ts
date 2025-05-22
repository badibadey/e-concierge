export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  attendees?: number;
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Pool Party',
    description: 'Join us for our annual summer pool party with food, drinks, and fun activities for all residents.',
    date: '2025-05-20T14:00:00',
    endDate: '2025-05-20T18:00:00',
    location: 'Pool Area',
    attendees: 45
  },
  {
    id: '2',
    title: 'Wine & Cheese Social',
    description: 'Meet your neighbors and enjoy a relaxing evening with a selection of wines and cheeses.',
    date: '2025-05-22T19:00:00',
    endDate: '2025-05-22T21:00:00',
    location: 'Community Lounge',
    attendees: 32
  },
  {
    id: '3',
    title: 'Yoga in the Garden',
    description: 'Start your day with a rejuvenating yoga session in our community garden. All levels welcome.',
    date: '2025-05-24T08:00:00',
    endDate: '2025-05-24T09:00:00',
    location: 'Garden Terrace',
    attendees: 18
  },
  {
    id: '4',
    title: 'Movie Night: Summer Classics',
    description: 'Join us for an outdoor screening of classic summer movies. Popcorn and refreshments provided.',
    date: '2025-05-26T20:00:00',
    endDate: '2025-05-26T22:30:00',
    location: 'Rooftop Terrace',
    attendees: 38
  },
  {
    id: '5',
    title: 'Community Book Club',
    description: 'This month we\'re discussing "The Midnight Library" by Matt Haig. New members welcome!',
    date: '2025-05-28T19:00:00',
    endDate: '2025-05-28T20:30:00',
    location: 'Meeting Room A',
    attendees: 12
  },
  {
    id: '6',
    title: 'Fitness Workshop: HIIT Basics',
    description: 'Learn the fundamentals of High-Intensity Interval Training in this beginner-friendly workshop.',
    date: '2025-05-29T18:00:00',
    endDate: '2025-05-29T19:00:00',
    location: 'Fitness Center',
    attendees: 15
  },
  {
    id: '7',
    title: 'Community Volunteer Day',
    description: 'Join us as we beautify our community spaces and give back to our neighborhood.',
    date: '2025-05-30T10:00:00',
    endDate: '2025-05-30T13:00:00',
    location: 'Main Entrance',
    attendees: 25
  },
  {
    id: '8',
    title: 'Cooking Class: Summer Salads',
    description: 'Learn to prepare refreshing and nutritious summer salads with our resident chef.',
    date: '2025-06-02T18:30:00',
    endDate: '2025-06-02T20:00:00',
    location: 'Community Kitchen',
    attendees: 20
  }
];