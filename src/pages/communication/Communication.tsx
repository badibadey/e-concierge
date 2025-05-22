import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/common/Tabs';
import Announcements from './components/Announcements';
import AiAssistant from './components/AiAssistant';
import Faq from './components/Faq';
import EventCalendar from './components/EventCalendar';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Communication Hub</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="announcements">
            <Announcements />
          </TabsContent>
          
          <TabsContent value="assistant">
            <AiAssistant />
          </TabsContent>
          
          <TabsContent value="events">
            <EventCalendar />
          </TabsContent>
          
          <TabsContent value="faq">
            <Faq />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Communication;