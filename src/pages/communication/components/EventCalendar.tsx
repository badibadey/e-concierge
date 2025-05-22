import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(mockEvents);
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    isSameDay(new Date(event.date), selectedDate)
  );
  
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };
  
  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEEEE';
    const weekStart = startOfWeek(currentMonth);
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center text-xs font-medium text-gray-500" key={i}>
          {format(addDays(weekStart, i), dateFormat)}
        </div>
      );
    }
    
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const hasEvents = events.some(event => isSameDay(new Date(event.date), day));
        
        days.push(
          <div
            className={`min-h-[60px] border border-gray-200 p-1 ${
              !isSameMonth(day, monthStart)
                ? 'bg-gray-50 text-gray-400'
                : isSameDay(day, selectedDate)
                ? 'bg-primary-50 border-primary-500'
                : 'bg-white'
            }`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between">
              <span
                className={`text-sm ${
                  isSameDay(day, new Date())
                    ? 'bg-primary-600 text-white rounded-full h-6 w-6 flex items-center justify-center'
                    : ''
                }`}
              >
                {formattedDate}
              </span>
              {hasEvents && (
                <span className="h-2 w-2 rounded-full bg-accent-500"></span>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="mb-4">{rows}</div>;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-card p-6">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </div>
      
      <div>
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Events for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          
          {selectedDateEvents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No events scheduled for this date.</p>
          ) : (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {format(new Date(event.date), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                    {event.attendees && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                  <div className="mt-4">
                    <button className="btn btn-primary text-sm py-1">RSVP</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h2>
          
          <div className="space-y-4">
            {events
              .filter(event => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 3)
              .map((event) => (
                <div key={event.id} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-2 text-center w-12">
                    <div className="text-xs font-bold text-primary-800">
                      {format(new Date(event.date), 'MMM')}
                    </div>
                    <div className="text-lg font-bold text-primary-800">
                      {format(new Date(event.date), 'd')}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {format(new Date(event.date), 'EEEE, h:mm a')}
                    </p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;