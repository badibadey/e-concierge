import { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, AlertTriangle, Eye, XCircle } from 'lucide-react';

type MaintenanceRequest = {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'emergency';
  residentName: string;
  residentUnit: string;
  assignedTo?: string;
  createdAt: string;
};

const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Leaking faucet in master bathroom',
    category: 'plumbing',
    status: 'completed',
    priority: 'medium',
    residentName: 'John Resident',
    residentUnit: 'A-301',
    assignedTo: 'Maintenance Team',
    createdAt: '2025-03-31T14:20:00'
  },
  {
    id: '2',
    title: 'Air conditioning not cooling properly',
    category: 'hvac',
    status: 'in_progress',
    priority: 'high',
    residentName: 'John Resident',
    residentUnit: 'A-301',
    assignedTo: 'HVAC Technician',
    createdAt: '2025-04-05T08:45:00'
  },
  {
    id: '3',
    title: 'Light fixture not working in kitchen',
    category: 'electrical',
    status: 'pending',
    priority: 'low',
    residentName: 'John Resident',
    residentUnit: 'A-301',
    createdAt: '2025-04-06T15:30:00'
  },
  {
    id: '4',
    title: 'Broken window in living room',
    category: 'structural',
    status: 'in_progress',
    priority: 'medium',
    residentName: 'Sarah Thompson',
    residentUnit: 'B-204',
    assignedTo: 'Maintenance Team',
    createdAt: '2025-04-02T10:15:00'
  },
  {
    id: '5',
    title: 'Clogged toilet',
    category: 'plumbing',
    status: 'completed',
    priority: 'high',
    residentName: 'Michael Chen',
    residentUnit: 'C-112',
    assignedTo: 'Plumbing Specialist',
    createdAt: '2025-04-01T09:30:00'
  },
  {
    id: '6',
    title: 'Pest control needed',
    category: 'pest',
    status: 'cancelled',
    priority: 'medium',
    residentName: 'Emily Johnson',
    residentUnit: 'A-402',
    createdAt: '2025-03-28T16:45:00'
  }
];

const statusIcons = {
  pending: <Clock className="h-5 w-5 text-warning-500" />,
  in_progress: <AlertTriangle className="h-5 w-5 text-accent-500" />,
  completed: <CheckCircle className="h-5 w-5 text-success-500" />,
  cancelled: <XCircle className="h-5 w-5 text-error-500" />,
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const statusColors = {
  pending: 'bg-warning-100 text-warning-800',
  in_progress: 'bg-accent-100 text-accent-800',
  completed: 'bg-success-100 text-success-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  low: 'bg-success-100 text-success-800',
  medium: 'bg-accent-100 text-accent-800',
  high: 'bg-warning-100 text-warning-800',
  emergency: 'bg-error-100 text-error-800',
};

const AdminMaintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Filter requests based on search query, status, and category
  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.residentUnit.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage and track maintenance requests from residents
        </p>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="relative max-w-lg w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:flex space-x-4">
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                className="input"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="hvac">HVAC</option>
                <option value="structural">Structural</option>
                <option value="pest">Pest Control</option>
                <option value="appliance">Appliance</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resident
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {statusIcons[request.status]}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{request.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.residentName}</div>
                    <div className="text-sm text-gray-500">{request.residentUnit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.category.charAt(0).toUpperCase() + request.category.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[request.priority]}`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[request.status]}`}>
                      {statusLabels[request.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.assignedTo || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredRequests.length}</span> of{' '}
              <span className="font-medium">{mockRequests.length}</span> requests
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

export default AdminMaintenance;