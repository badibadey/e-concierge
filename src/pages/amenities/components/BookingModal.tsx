import { useState } from 'react';
import { X, Calendar, Clock, Loader2, CheckCircle } from 'lucide-react';
import { useAmenityContext } from '../AmenityContext';
import { useAuth } from '../../../context/AuthContext';
import { addDays, format, isBefore, set } from 'date-fns';

type BookingModalProps = {
  facilityId: string;
  onClose: () => void;
};

const BookingModal = ({ facilityId, onClose }: BookingModalProps) => {
  const { user } = useAuth();
  const { getFacility, createBooking, isTimeSlotAvailable } = useAmenityContext();
  
  const facility = getFacility(facilityId);
  
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  if (!facility) {
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!date || !startTime || !endTime) {
      setError('Please select a date and time for your booking.');
      return;
    }
    
    const bookingDate = new Date(date);
    const startDateTime = combineDateAndTime(bookingDate, startTime);
    const endDateTime = combineDateAndTime(bookingDate, endTime);
    
    // Validate that start time is before end time
    if (isBefore(endDateTime, startDateTime)) {
      setError('End time must be after start time.');
      return;
    }
    
    // Validate that booking is in the future
    if (isBefore(startDateTime, new Date())) {
      setError('Booking must be in the future.');
      return;
    }
    
    // Check if the time slot is available
    if (!isTimeSlotAvailable(facilityId, bookingDate, startDateTime, endDateTime)) {
      setError('This time slot is already booked. Please select a different time.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Create a new booking
    const newBooking = {
      facilityId,
      facilityName: facility.name,
      userId: user?.id || '',
      userName: user?.name || '',
      date: bookingDate,
      startTime: startDateTime,
      endTime: endDateTime,
      guests: numGuests,
      notes,
    };
    
    setTimeout(() => {
      createBooking(newBooking);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close the modal after showing success message
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1000);
  };
  
  // Helper function to combine date and time
  const combineDateAndTime = (date: Date, timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return set(date, { hours, minutes, seconds: 0, milliseconds: 0 });
  };
  
  // Generate time slots based on facility hours
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 8; // Starting hour (8 AM)
    let minute = 0;
    
    while (hour < 22) { // End at 10 PM
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
      
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 animate-fade-in">
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-success-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Booking Confirmed!</h2>
            <p className="mt-2 text-gray-600">
              Your booking for {facility.name} on {format(new Date(date), 'MMMM d, yyyy')} from {startTime} to {endTime} has been confirmed.
            </p>
            <button
              onClick={onClose}
              className="mt-6 btn btn-primary"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Book {facility.name}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md text-sm mb-4" role="alert">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date <span className="text-error-600">*</span>
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  max={format(addDays(new Date(), 30), 'yyyy-MM-dd')}
                  className="input pl-10"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">You can book up to 30 days in advance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time <span className="text-error-600">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="input pl-10"
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={`start-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  End Time <span className="text-error-600">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="input pl-10"
                    required
                    disabled={!startTime}
                  >
                    <option value="">Select time</option>
                    {timeSlots
                      .filter((time) => time > startTime)
                      .map((time) => (
                        <option key={`end-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="numGuests" className="block text-sm font-medium text-gray-700">
                Number of Guests
              </label>
              <input
                type="number"
                id="numGuests"
                value={numGuests}
                onChange={(e) => setNumGuests(parseInt(e.target.value))}
                min="1"
                max={facility.capacity}
                className="input mt-1"
              />
              <p className="mt-1 text-xs text-gray-500">Maximum capacity: {facility.capacity} people</p>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="input mt-1"
                placeholder="Any special requirements or information"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Booking...
                </>
              ) : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;