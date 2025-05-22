export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'announcement' | 'event';
  image?: string;
  likes: number;
  comments: number;
  liked: boolean;
};

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Building Maintenance Notice',
    content: 'The building management would like to inform all residents that routine maintenance work will be conducted on the main water supply system on Friday, May 20th, from 10:00 AM to 2:00 PM. During this time, water service may be temporarily disrupted. We apologize for any inconvenience this may cause.',
    date: '2025-05-15T09:00:00',
    type: 'announcement',
    likes: 12,
    comments: 8,
    liked: false
  },
  {
    id: '2',
    title: 'Summer Pool Party!',
    content: 'Join us for our annual summer pool party this Saturday from 2:00 PM to 6:00 PM. There will be food, drinks, music, and fun activities for residents of all ages. Don\'t forget to bring your sunscreen and towels!',
    date: '2025-05-14T14:30:00',
    type: 'event',
    image: 'https://images.pexels.com/photos/3046639/pexels-photo-3046639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 45,
    comments: 23,
    liked: true
  },
  {
    id: '3',
    title: 'New Recycling Guidelines',
    content: 'We have updated our recycling guidelines to align with the city\'s new waste management policy. Please take a moment to review the updated information in the document attached to this announcement. Your cooperation helps us maintain a sustainable and environmentally friendly community.',
    date: '2025-05-10T11:15:00',
    type: 'announcement',
    likes: 8,
    comments: 5,
    liked: false
  },
  {
    id: '4',
    title: 'Wine & Cheese Social',
    content: 'We\'re hosting a Wine & Cheese Social in the community lounge on Friday, May 22nd, from 7:00 PM to 9:00 PM. This is a great opportunity to meet your neighbors and enjoy a relaxing evening. Please RSVP through the Events section by Wednesday.',
    date: '2025-05-08T16:45:00',
    type: 'event',
    image: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 32,
    comments: 14,
    liked: false
  },
  {
    id: '5',
    title: 'Gym Equipment Upgrade',
    content: 'We\'re excited to announce that new fitness equipment has been installed in the community gym. The upgrades include two new treadmills, a multi-functional weight machine, and a set of adjustable dumbbells. The gym will remain open during regular hours.',
    date: '2025-05-05T08:20:00',
    type: 'announcement',
    likes: 27,
    comments: 11,
    liked: true
  }
];