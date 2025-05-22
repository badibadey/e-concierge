import { Calendar, ShoppingCart, Wrench, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {user?.unit ? `Unit ${user.unit} • ` : ''}
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="module-grid">
        {/* Marketplace Module */}
        <Link to="/marketplace" className="card group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Marketplace</h3>
            <ShoppingCart className="h-6 w-6 text-primary-600" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Order food, drinks, and essential items delivered right to your doorstep.
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-primary-600 group-hover:text-primary-800">
              Browse products
            </span>
          </div>
        </Link>

        {/* Maintenance Module */}
        <Link to="/maintenance" className="card group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
            <Wrench className="h-6 w-6 text-secondary-600" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Submit and track maintenance requests for your residence.
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-secondary-600 group-hover:text-secondary-800">
              Report an issue
            </span>
          </div>
        </Link>

        {/* Communication Module */}
        <Link to="/communication" className="card group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Communication</h3>
            <Calendar className="h-6 w-6 text-accent-600" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Stay updated with community announcements and talk to our AI assistant.
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-accent-600 group-hover:text-accent-800">
              View updates
            </span>
          </div>
        </Link>

        {/* Amenities Module */}
        <Link to="/amenities" className="card group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
            <Building className="h-6 w-6 text-success-600" />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Book community amenities like the gym, pool, or meeting rooms.
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-success-600 group-hover:text-success-800">
              Book now
            </span>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 rounded-full p-1">
                  <ShoppingCart className="h-4 w-4 text-primary-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Your order has been delivered</p>
                  <p className="text-sm text-gray-500">Order #1234 - 2 items</p>
                  <p className="mt-1 text-xs text-gray-400">Today at 2:30 PM</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-secondary-100 rounded-full p-1">
                  <Wrench className="h-4 w-4 text-secondary-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Maintenance request completed</p>
                  <p className="text-sm text-gray-500">Ticket #5678 - Leaky faucet repair</p>
                  <p className="mt-1 text-xs text-gray-400">Yesterday at 10:15 AM</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-success-100 rounded-full p-1">
                  <Building className="h-4 w-4 text-success-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Amenity booking confirmed</p>
                  <p className="text-sm text-gray-500">Pool area - Saturday, 2:00 PM to 4:00 PM</p>
                  <p className="mt-1 text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;