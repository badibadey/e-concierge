import { useState } from 'react';
import { useAmenityContext } from '../AmenityContext';
import BookingModal from './BookingModal';

const FacilityList = () => {
  const { facilities } = useAmenityContext();
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  
  const openBookingModal = (facilityId: string) => {
    setSelectedFacility(facilityId);
  };
  
  const closeBookingModal = () => {
    setSelectedFacility(null);
  };
  
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <div key={facility.id} className="card group">
            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={facility.image}
                alt={facility.name}
                className="h-48 w-full object-cover object-center transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{facility.description}</p>
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <span>Capacity: {facility.capacity} people</span>
                <span className="mx-2">•</span>
                <span>{facility.location}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                <span>Hours: {facility.hours}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`h-4 w-4 ${
                      index < facility.rating
                        ? 'text-accent-500'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.934l-6.18 3.254 1.181-6.878L.083 7.57l6.9-1L10 .282 13.016 6.57l6.9 1-4.917 4.74 1.18 6.876L10 15.934z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({facility.reviews} reviews)
                </span>
              </div>
              <button
                onClick={() => openBookingModal(facility.id)}
                className="btn btn-primary text-sm py-1.5"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedFacility && (
        <BookingModal facilityId={selectedFacility} onClose={closeBookingModal} />
      )}
    </div>
  );
};

export default FacilityList;