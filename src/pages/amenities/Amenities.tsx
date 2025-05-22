import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/common/Tabs';
import FacilityList from './components/FacilityList';
import MyBookings from './components/MyBookings';
import { AmenityProvider } from './AmenityContext';

const Amenities = () => {
  const [activeTab, setActiveTab] = useState('facilities');
  
  return (
    <AmenityProvider>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Amenity Management</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="facilities">Available Facilities</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="facilities">
              <FacilityList />
            </TabsContent>
            
            <TabsContent value="bookings">
              <MyBookings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AmenityProvider>
  );
};

export default Amenities;