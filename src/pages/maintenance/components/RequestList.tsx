import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMaintenanceContext } from '../MaintenanceContext';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

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

const RequestList = () => {
  const { requests } = useMaintenanceContext();
  const [filter, setFilter] = useState<string>('all');
  
  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(request => request.status === filter);
  
  return (
    <div>
      <div className="mb-6 flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'all'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All Requests
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'pending'
              ? 'bg-warning-100 text-warning-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'in_progress'
              ? 'bg-accent-100 text-accent-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            filter === 'completed'
              ? 'bg-success-100 text-success-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-card">
          <p className="text-gray-500">No maintenance requests found.</p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="mt-2 text-primary-600 hover:text-primary-800"
            >
              View all requests
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredRequests.map(request => (
              <li key={request.id}>
                <Link
                  to={`/maintenance/${request.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {statusIcons[request.status]}
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            {request.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                            {request.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                          {statusLabels[request.status]}
                        </span>
                        <span className="ml-4 text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RequestList;