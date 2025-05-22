import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Clock, Send, Loader2 } from 'lucide-react';
import { useMaintenanceContext } from '../MaintenanceContext';
import { useAuth } from '../../../context/AuthContext';

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

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  emergency: 'Emergency',
};

const priorityColors = {
  low: 'bg-success-100 text-success-800',
  medium: 'bg-accent-100 text-accent-800',
  high: 'bg-warning-100 text-warning-800',
  emergency: 'bg-error-100 text-error-800',
};

const RequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRequest, updateRequest } = useMaintenanceContext();
  const { user } = useAuth();
  
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const request = getRequest(id!);
  
  if (!request) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900">Request not found</h2>
        <p className="mt-2 text-gray-500">The maintenance request you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/maintenance')}
          className="mt-4 btn btn-primary"
        >
          Back to Maintenance
        </button>
      </div>
    );
  }
  
  const handleSendComment = () => {
    if (!comment.trim()) return;
    
    setIsSending(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const updatedComments = [
        ...(request.comments || []),
        {
          id: Math.random().toString(36).substring(2, 9),
          text: comment,
          authorId: user?.id || '',
          authorName: user?.name || '',
          authorRole: user?.role || 'resident',
          createdAt: new Date(),
        },
      ];
      
      updateRequest(request.id, { comments: updatedComments });
      setComment('');
      setIsSending(false);
    }, 1000);
  };
  
  return (
    <div>
      <button
        onClick={() => navigate('/maintenance')}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Maintenance Requests</span>
      </button>
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{request.title}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Submitted by {request.residentName} • {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                {statusLabels[request.status]}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[request.priority]}`}>
                {priorityLabels[request.priority]} Priority
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{request.description}</p>
            </div>
            
            {request.photos && request.photos.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Photos</h3>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {request.photos.map((photo, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-32">
                      <img
                        src={photo}
                        alt={`Request photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Comments</h3>
              
              {(!request.comments || request.comments.length === 0) ? (
                <div className="mt-2 text-center py-8 bg-gray-50 rounded-md">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-500">No comments yet</p>
                </div>
              ) : (
                <div className="mt-2 space-y-4">
                  {request.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-900">{comment.authorName}</div>
                          <span className="mx-2 text-gray-500">•</span>
                          <div className="text-sm text-gray-500">
                            {comment.authorRole === 'staff' || comment.authorRole === 'admin' ? 'Staff' : 'Resident'}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4">
                <div className="relative">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className="input"
                  ></textarea>
                  <button
                    onClick={handleSendComment}
                    disabled={!comment.trim() || isSending}
                    className="absolute bottom-2 right-2 p-2 rounded-full text-primary-600 hover:text-primary-800 hover:bg-primary-50 disabled:text-gray-400 disabled:hover:bg-transparent"
                  >
                    {isSending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
              
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="mt-1 font-medium text-gray-900">
                    {statusLabels[request.status]}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Category</div>
                  <div className="mt-1 font-medium text-gray-900">
                    {request.category.charAt(0).toUpperCase() + request.category.slice(1)}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Location</div>
                  <div className="mt-1 font-medium text-gray-900">{request.location}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Priority</div>
                  <div className="mt-1 font-medium text-gray-900">
                    {priorityLabels[request.priority]}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Submitted By</div>
                  <div className="mt-1 font-medium text-gray-900">{request.residentName}</div>
                </div>
                
                {request.residentUnit && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Unit</div>
                    <div className="mt-1 font-medium text-gray-900">{request.residentUnit}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Submitted On</div>
                  <div className="mt-1 font-medium text-gray-900">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="pt-4">
                    <div className="flex items-center text-warning-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="text-sm">Waiting for staff response</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {(user?.role === 'admin' || user?.role === 'staff') && request.status !== 'completed' && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Actions</h3>
                <div className="mt-2 space-y-2">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => updateRequest(request.id, { status: 'in_progress' })}
                      className="w-full btn btn-primary"
                    >
                      Start Working on Request
                    </button>
                  )}
                  
                  {request.status === 'in_progress' && (
                    <button
                      onClick={() => updateRequest(request.id, { status: 'completed' })}
                      className="w-full btn btn-success"
                    >
                      Mark as Completed
                    </button>
                  )}
                  
                  {['pending', 'in_progress'].includes(request.status) && (
                    <button
                      onClick={() => updateRequest(request.id, { status: 'cancelled' })}
                      className="w-full btn btn-outline text-error-600 border-error-200 hover:bg-error-50"
                    >
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;