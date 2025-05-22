import { Facility } from '../types';

export const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Fitness Center',
    description: 'State-of-the-art fitness center with cardio machines, strength equipment, and free weights.',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    capacity: 20,
    location: 'Building A, Ground Floor',
    hours: '5:00 AM - 11:00 PM',
    rating: 4.8,
    reviews: 45
  },
  {
    id: '2',
    name: 'Swimming Pool',
    description: 'Heated outdoor pool with lounge area, perfect for relaxation and recreation.',
    image: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    capacity: 30,
    location: 'Building B, Rooftop',
    hours: '7:00 AM - 10:00 PM',
    rating: 4.9,
    reviews: 67
  },
  {
    id: '3',
    name: 'Conference Room',
    description: 'Professional meeting space equipped with video conferencing capabilities and whiteboard.',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    capacity: 12,
    location: 'Building A, 3rd Floor',
    hours: '8:00 AM - 10:00 PM',
    rating: 4.6,
    reviews: 28
  },
  {
    id: '4',
    name: 'Co-working Space',
    description: 'Open workspace with high-speed internet, printers, and complimentary coffee.',
    image: 'https://images.pexels.com/photos/7070/space-desk-workspace-coworking.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    capacity: 15,
    location: 'Building C, 2nd Floor',
    hours: '6:00 AM - 12:00 AM',
    rating: 4.7,
    reviews: 39
  },
  {
    id: '5',
    name: 'BBQ Area',
    description: 'Outdoor grilling stations with dining tables and shaded seating.',
    image: 'https://images.pexels.com/photos/2033989/pexels-photo-2033989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    capacity: 25,
    location: 'Garden Terrace',
    hours: '10:00 AM - 10:00 PM',
    rating: 4.5,
    reviews: 31
  },
  {
    id: '6',
    name: 'Party Lounge',
    description: 'Entertainment space with kitchen, sound system, and comfortable seating for gatherings and events.',
    image: 'https://images.pexels.com/photos/19147542/pexels-photo-19147542/free-photo-of-a-living-room-with-a-gray-sofa-and-a-white-coffee-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    capacity: 35,
    location: 'Building B, 1st Floor',
    hours: '9:00 AM - 11:00 PM',
    rating: 4.4,
    reviews: 22
  }
];