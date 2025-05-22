import { Booking } from '../types';
import { addDays, addHours, subDays } from 'date-fns';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const mockBookings: Booking[] = [
  {
    id: '1',
    facilityId: '3', // Conference Room
    facilityName: 'Conference Room',
    userId: '2', // Resident user
    userName: 'John Resident',
    date: addDays(today, 2),
    startTime: addHours(addDays(today, 2), 14), // 2pm
    endTime: addHours(addDays(today, 2), 16), // 4pm
    guests: 5,
    notes: 'Team meeting with video presentation',
    status: 'confirmed',
    createdAt: subDays(today, 3)
  },
  {
    id: '2',
    facilityId: '1', // Fitness Center
    facilityName: 'Fitness Center',
    userId: '2', // Resident user
    userName: 'John Resident',
    date: addDays(today, 1),
    startTime: addHours(addDays(today, 1), 8), // 8am
    endTime: addHours(addDays(today, 1), 9), // 9am
    guests: 1,
    status: 'confirmed',
    createdAt: subDays(today, 1)
  },
  {
    id: '3',
    facilityId: '5', // BBQ Area
    facilityName: 'BBQ Area',
    userId: '2', // Resident user
    userName: 'John Resident',
    date: addDays(today, 5),
    startTime: addHours(addDays(today, 5), 17), // 5pm
    endTime: addHours(addDays(today, 5), 20), // 8pm
    guests: 8,
    notes: 'Birthday celebration',
    status: 'confirmed',
    createdAt: subDays(today, 2)
  },
  {
    id: '4',
    facilityId: '2', // Swimming Pool
    facilityName: 'Swimming Pool',
    userId: '2', // Resident user
    userName: 'John Resident',
    date: subDays(today, 7),
    startTime: addHours(subDays(today, 7), 14), // 2pm
    endTime: addHours(subDays(today, 7), 16), // 4pm
    guests: 3,
    status: 'confirmed',
    createdAt: subDays(today, 10)
  },
  {
    id: '5',
    facilityId: '4', // Co-working Space
    facilityName: 'Co-working Space',
    userId: '2', // Resident user
    userName: 'John Resident',
    date: subDays(today, 14),
    startTime: addHours(subDays(today, 14), 9), // 9am
    endTime: addHours(subDays(today, 14), 17), // 5pm
    guests: 1,
    notes: 'Remote work day',
    status: 'cancelled',
    createdAt: subDays(today, 20)
  }
];