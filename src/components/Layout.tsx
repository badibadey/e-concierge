import { Outlet } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import Sidebar from './navigation/Sidebar';
import Footer from './navigation/Footer';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="h-16"> {/* Placeholder o wysokości navbara */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      </div>
      
      {/* Główna zawartość */}
      <div className="flex flex-1 pb-24">
        {/* Sidebar for tablet/desktop */}
        {!isMobile && (
          <aside className="w-64 hidden lg:block bg-white border-r border-gray-200">
            <Sidebar />
          </aside>
        )}
        
        {/* Mobile sidebar */}
        {isMobile && (
          <div
            className={`fixed inset-0 z-50 lg:hidden ${
              sidebarOpen ? 'block' : 'hidden'
            }`}
          >
            <div 
              className="fixed inset-0 bg-gray-900/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed top-0 left-0 bottom-0 w-64 bg-white">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-primary-700">e-consigier</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <Sidebar onItemClick={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;