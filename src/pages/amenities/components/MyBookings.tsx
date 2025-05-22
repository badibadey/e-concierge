import { useState } from 'react';
import { format } from 'date-fns';
import { useAmenityContext } from '../AmenityContext';
import { Booking } from '../types';
import { Calendar, Clock, Users, MapPin, X } from 'lucide-react';

const MyBookings = () => {
  const { userBookings, cancelBooking } = useAmenityContext();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  
  // Separate bookings into upcoming and past
  const now = new Date();
  const upcomingBookings = userBookings.filter(
    booking => 
      booking.status !== 'cancelled' && 
      new Date(booking.startTime) > now
  ).sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
  
  const pastBookings = userBookings.filter(
    booking => 
      booking.status === 'cancelled' || 
      new Date(booking.startTime) <= now
  ).sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  
  const handleCancelBooking = (id: string) => {
    setCancellingId(id);
    
    // Simulate API call delay
    setTimeout(() => {
      cancelBooking(id);
      setCancellingId(null);
    }, 1000);
  };
  
  const renderBooking = (booking: Booking) => {
    const isCancelled = booking.status === 'cancelled';
    const isPast = new Date(booking.startTime) <= now;
    const isCancelling = booking.id === cancellingId;
    
    return (
      <div 
        key={booking.id} 
        className={`bg-white rounded-lg shadow-card p-4 ${
          isCancelled ? 'opacity-60' : ''
        }`}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{booking.facilityName}</h3>
          {isCancelled ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Cancelled
            </span>
          ) : isPast ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
              Confirmed
            </span>
          )}
        </div>
        
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              {format(new Date(booking.startTime), 'h:mm a')} - {format(new Date(booking.endTime), 'h:mm a')}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
          </div>
          {booking.notes && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-gray-600">{booking.notes}</p>
            </div>
          )}
        </div>
        
        {!isCancelled && !isPast && (
          <div className="mt-4">
            <button
              onClick={() => handleCancelBooking(booking.id)}
              disabled={isCancelling}
              className="w-full btn btn-outline text-error-600 border-error-200 hover:bg-error-50"
            >
              {isCancelling ? (
                <>
                  <span className="animate-pulse">Cancelling...</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel Booking
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Bookings</h2>
        
        {upcomingBookings.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-card">
            <p className="text-gray-500">You don't have any upcoming bookings.</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {upcomingBookings.map(renderBooking)}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Past Bookings</h2>
        
        {pastBookings.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-card">
            <p className="text-gray-500">You don't have any past bookings.</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pastBookings.map(renderBooking)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;