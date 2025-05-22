import React, { createContext, useContext, useState } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs = ({ 
  children, 
  value, 
  onValueChange 
}: { 
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex overflow-x-auto -mx-4 px-4 pb-2 space-x-1 border-b border-gray-200">
      {children}
    </div>
  );
};

export const TabsTrigger = ({ 
  children, 
  value 
}: { 
  children: React.ReactNode;
  value: string;
}) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => context.onValueChange(value)}
      className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
        isActive
          ? 'text-primary-700 border-b-2 border-primary-700'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ 
  children, 
  value 
}: { 
  children: React.ReactNode;
  value: string;
}) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }
  
  return context.value === value ? (
    <div className="animate-fade-in">{children}</div>
  ) : null;
};