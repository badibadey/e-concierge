import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Plus } from 'lucide-react';
import RequestList from './components/RequestList';
import NewRequest from './components/NewRequest';
import RequestDetail from './components/RequestDetail';
import { MaintenanceProvider } from './MaintenanceContext';

const Maintenance = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  
  return (
    <MaintenanceProvider>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Maintenance Requests</h1>
          <button
            onClick={() => setShowNewRequest(true)}
            className="btn btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Request
          </button>
        </div>
        
        {showNewRequest ? (
          <NewRequest onClose={() => setShowNewRequest(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<RequestList />} />
            <Route path="/:id" element={<RequestDetail />} />
          </Routes>
        )}
      </div>
    </MaintenanceProvider>
  );
};

export default Maintenance;