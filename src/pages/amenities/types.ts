export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: number;
  location: string;
  hours: string;
  rating: number;
  reviews: number;
}

export type BookingStatus = 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  userId: string;
  userName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
  notes?: string;
  status: BookingStatus;
  createdAt: Date;
}