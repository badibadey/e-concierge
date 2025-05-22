import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

const AdminSettings = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-2 text-sm text-gray-700">
        Configure application settings and preferences
      </p>
      
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">General Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Basic configuration for your community application
          </p>
        </div>
        
        {success && (
          <div className="mx-6 mt-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-md" role="alert">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>Settings have been updated successfully.</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-4">Community Information</h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="community-name" className="block text-sm font-medium text-gray-700">
                  Community Name
                </label>
                <input
                  type="text"
                  id="community-name"
                  className="input mt-1"
                  defaultValue="Harmony Heights Residences"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="input mt-1"
                  defaultValue="contact@harmonyheights.com"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  className="input mt-1"
                  defaultValue="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <select id="timezone" className="input mt-1">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/Anchorage">Alaska Time (AKT)</option>
                  <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-base font-medium text-gray-900 mb-4">Notification Settings</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email-notifications" className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-gray-500">
                    Send email notifications for new maintenance requests, announcements, and important updates.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="push-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="push-notifications" className="font-medium text-gray-700">
                    Push Notifications
                  </label>
                  <p className="text-gray-500">
                    Enable push notifications for mobile app users.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="maintenance-updates"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="maintenance-updates" className="font-medium text-gray-700">
                    Maintenance Updates
                  </label>
                  <p className="text-gray-500">
                    Send notifications when maintenance requests are updated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-base font-medium text-gray-900 mb-4">Marketplace Settings</h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="delivery-fee" className="block text-sm font-medium text-gray-700">
                  Delivery Fee ($)
                </label>
                <input
                  type="number"
                  id="delivery-fee"
                  min="0"
                  step="0.01"
                  className="input mt-1"
                  defaultValue="2.50"
                />
              </div>
              <div>
                <label htmlFor="delivery-time" className="block text-sm font-medium text-gray-700">
                  Estimated Delivery Time (minutes)
                </label>
                <input
                  type="number"
                  id="delivery-time"
                  min="0"
                  className="input mt-1"
                  defaultValue="30"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="marketplace-hours" className="block text-sm font-medium text-gray-700">
                Marketplace Operating Hours
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-1">
                <div>
                  <label htmlFor="opening-time" className="block text-xs text-gray-500">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    id="opening-time"
                    className="input mt-1"
                    defaultValue="08:00"
                  />
                </div>
                <div>
                  <label htmlFor="closing-time" className="block text-xs text-gray-500">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    id="closing-time"
                    className="input mt-1"
                    defaultValue="22:00"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-base font-medium text-gray-900 mb-4">Maintenance Request Settings</h4>
            <div className="space-y-4">
              <div>
                <label htmlFor="emergency-contact" className="block text-sm font-medium text-gray-700">
                  Emergency Maintenance Contact
                </label>
                <input
                  type="tel"
                  id="emergency-contact"
                  className="input mt-1"
                  defaultValue="(555) 987-6543"
                />
              </div>
              <div>
                <label htmlFor="maintenance-response-time" className="block text-sm font-medium text-gray-700">
                  Target Response Time (hours)
                </label>
                <input
                  type="number"
                  id="maintenance-response-time"
                  min="0"
                  className="input mt-1"
                  defaultValue="24"
                />
                <p className="mt-1 text-xs text-gray-500">
                  The target time for initial response to non-emergency maintenance requests.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;