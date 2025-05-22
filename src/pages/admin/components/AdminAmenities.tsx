import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const AdminAmenities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Amenities</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage community amenities and bookings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="btn btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Amenity
          </button>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amenity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Fitness Center" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Fitness Center</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Building A, Ground Floor
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  20 people
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5:00 AM - 11:00 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  68 this month
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-error-600 hover:text-error-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Swimming Pool" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Swimming Pool</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Building B, Rooftop
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  30 people
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  7:00 AM - 10:00 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  85 this month
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-error-600 hover:text-error-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Conference Room" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Conference Room</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Building A, 3rd Floor
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  12 people
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  8:00 AM - 10:00 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  45 this month
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-error-600 hover:text-error-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/7070/space-desk-workspace-coworking.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Co-working Space" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Co-working Space</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Building C, 2nd Floor
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15 people
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  6:00 AM - 12:00 AM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  32 this month
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Maintenance
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-error-600 hover:text-error-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/2033989/pexels-photo-2033989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="BBQ Area" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">BBQ Area</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Garden Terrace
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  25 people
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10:00 AM - 10:00 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  52 this month
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-error-600 hover:text-error-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">5</span> of{' '}
              <span className="font-medium">6</span> amenities
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAmenities;