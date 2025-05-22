import { MaintenanceRequest } from '../types';

export const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Leaking faucet in master bathroom',
    description: 'The faucet in the master bathroom is constantly dripping, even when turned off completely. It has been happening for about a week now.',
    category: 'plumbing',
    location: 'Master bathroom',
    priority: 'medium',
    status: 'completed',
    photos: [
      'https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    comments: [
      {
        id: 'c1',
        text: 'A maintenance technician will be visiting your unit tomorrow between 10am-12pm.',
        authorId: 'staff1',
        authorName: 'Maintenance Staff',
        authorRole: 'staff',
        createdAt: new Date('2025-04-01T09:30:00')
      },
      {
        id: 'c2',
        text: 'Thank you, I will be available during that time.',
        authorId: '2',
        authorName: 'John Resident',
        authorRole: 'resident',
        createdAt: new Date('2025-04-01T10:15:00')
      },
      {
        id: 'c3',
        text: 'The issue has been fixed. The washer was worn out and has been replaced.',
        authorId: 'staff1',
        authorName: 'Maintenance Staff',
        authorRole: 'staff',
        createdAt: new Date('2025-04-02T11:45:00')
      }
    ],
    residentId: '2',
    residentName: 'John Resident',
    residentUnit: 'A-301',
    assignedTo: 'staff1',
    assignedName: 'Maintenance Staff',
    createdAt: new Date('2025-03-31T14:20:00'),
    updatedAt: new Date('2025-04-02T11:45:00'),
    completedAt: new Date('2025-04-02T11:45:00')
  },
  {
    id: '2',
    title: 'Air conditioning not cooling properly',
    description: 'The air conditioning unit seems to be running, but the apartment is not cooling down. The temperature has been around 78°F despite setting the thermostat to 72°F.',
    category: 'hvac',
    location: 'Throughout apartment',
    priority: 'high',
    status: 'in_progress',
    comments: [
      {
        id: 'c4',
        text: 'We will send an HVAC technician to inspect your unit. Are you available tomorrow afternoon?',
        authorId: 'staff2',
        authorName: 'Maintenance Manager',
        authorRole: 'staff',
        createdAt: new Date('2025-04-05T11:20:00')
      },
      {
        id: 'c5',
        text: 'Yes, I will be home after 1pm.',
        authorId: '2',
        authorName: 'John Resident',
        authorRole: 'resident',
        createdAt: new Date('2025-04-05T12:10:00')
      }
    ],
    residentId: '2',
    residentName: 'John Resident',
    residentUnit: 'A-301',
    assignedTo: 'staff2',
    assignedName: 'Maintenance Manager',
    createdAt: new Date('2025-04-05T08:45:00'),
    updatedAt: new Date('2025-04-05T12:10:00')
  },
  {
    id: '3',
    title: 'Light fixture not working in kitchen',
    description: 'The overhead light fixture in the kitchen is not working. I have tried replacing the bulbs but it still doesn\'t work.',
    category: 'electrical',
    location: 'Kitchen',
    priority: 'low',
    status: 'pending',
    residentId: '2',
    residentName: 'John Resident',
    residentUnit: 'A-301',
    createdAt: new Date('2025-04-06T15:30:00'),
    updatedAt: new Date('2025-04-06T15:30:00')
  }
];