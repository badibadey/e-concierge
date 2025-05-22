import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { MaintenanceRequest } from './types';
import { mockRequests } from './data/mockRequests';

type MaintenanceContextType = {
  requests: MaintenanceRequest[];
  addRequest: (request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateRequest: (id: string, updates: Partial<MaintenanceRequest>) => void;
  getRequest: (id: string) => MaintenanceRequest | undefined;
};

const MaintenanceContext = createContext<MaintenanceContextType | null>(null);

export const useMaintenanceContext = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenanceContext must be used within a MaintenanceProvider');
  }
  return context;
};

export const MaintenanceProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  
  useEffect(() => {
    // Load mock requests
    setRequests(mockRequests);
  }, []);
  
  const addRequest = (request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newRequest: MaintenanceRequest = {
      id: Math.random().toString(36).substring(2, 9),
      ...request,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setRequests(prevRequests => [newRequest, ...prevRequests]);
  };
  
  const updateRequest = (id: string, updates: Partial<MaintenanceRequest>) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id
          ? { ...request, ...updates, updatedAt: new Date() }
          : request
      )
    );
  };
  
  const getRequest = (id: string) => {
    return requests.find(request => request.id === id);
  };
  
  return (
    <MaintenanceContext.Provider
      value={{
        requests,
        addRequest,
        updateRequest,
        getRequest,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};