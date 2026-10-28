export type CoordinationStatus = 'pending' | 'in_progress' | 'completed' | 'declined';

export interface CoordinationRequest {
  id: string;
  relatedComplaintIds: string[];
  requestingBureauId: string;
  targetBureauIds: string[];
  reason: string;
  requestedAction: string;
  dueAt?: string;
  status: CoordinationStatus;
  responses: CoordinationResponse[];
  assignedResponsibility?: string;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
}

export interface CoordinationResponse {
  id: string;
  bureauId: string;
  respondedBy: string;
  respondedAt: string;
  response: string;
  agreed: boolean;
}
