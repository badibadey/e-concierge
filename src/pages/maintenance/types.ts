export type RequestStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type RequestPriority = 'low' | 'medium' | 'high' | 'emergency';

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  createdAt: Date;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  priority: RequestPriority;
  status: RequestStatus;
  photos?: string[];
  comments?: Comment[];
  residentId: string;
  residentName: string;
  residentUnit?: string;
  assignedTo?: string;
  assignedName?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}