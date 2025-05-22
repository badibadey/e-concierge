import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Facility, Booking } from './types';
import { mockFacilities } from './data/mockFacilities';
import { mockBookings } from './data/mockBookings';
import { useAuth } from '../../context/AuthContext';

type AmenityContextType = {
  facilities: Facility[];
  bookings: Booking[];
  userBookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
  cancelBooking: (id: string) => void;
  getFacility: (id: string) => Facility | undefined;
  getBookingsForFacility: (facilityId: string, date: Date) => Booking[];
  isTimeSlotAvailable: (facilityId: string, date: Date, startTime: Date, endTime: Date) => boolean;
};

const AmenityContext = createContext<AmenityContextType | null>(null);

export const useAmenityContext = () => {
  const context = useContext(AmenityContext);
  if (!context) {
    throw new Error('useAmenityContext must be used within an AmenityProvider');
  }
  return context;
};

export const AmenityProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    // Load mock data
    setFacilities(mockFacilities);
    setBookings(mockBookings);
  }, []);
  
  // Filter bookings for the current user
  const userBookings = bookings.filter(
    booking => booking.userId === user?.id
  );
  
  const createBooking = (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      ...booking,
      status: 'confirmed',
      createdAt: new Date(),
    };
    
    setBookings(prevBookings => [...prevBookings, newBooking]);
  };
  
  const cancelBooking = (id: string) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    );
  };
  
  const getFacility = (id: string) => {
    return facilities.find(facility => facility.id === id);
  };
  
  const getBookingsForFacility = (facilityId: string, date: Date) => {
    // Filter bookings for the facility and date
    return bookings.filter(
      booking =>
        booking.facilityId === facilityId &&
        booking.status !== 'cancelled' &&
        isSameDay(new Date(booking.date), date)
    );
  };
  
  const isTimeSlotAvailable = (
    facilityId: string,
    date: Date,
    startTime: Date,
    endTime: Date
  ) => {
    const facilitiyBookings = getBookingsForFacility(facilityId, date);
    
    // Check if the time slot overlaps with any existing bookings
    const hasOverlap = facilitiyBookings.some(booking => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      
      return (
        (startTime >= bookingStart && startTime < bookingEnd) ||
        (endTime > bookingStart && endTime <= bookingEnd) ||
        (startTime <= bookingStart && endTime >= bookingEnd)
      );
    });
    
    return !hasOverlap;
  };
  
  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  return (
    <AmenityContext.Provider
      value={{
        facilities,
        bookings,
        userBookings,
        createBooking,
        cancelBooking,
        getFacility,
        getBookingsForFacility,
        isTimeSlotAvailable,
      }}
    >
      {children}
    </AmenityContext.Provider>
  );
};