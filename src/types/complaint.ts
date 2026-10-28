import { ComplaintCategory } from './bureau';

export type CaseStatus =
  | 'draft'
  | 'received'
  | 'under_review'
  | 'under_process'
  | 'awaiting_information'
  | 'transferred'
  | 'coordination_required'
  | 'escalated'
  | 'disposed'
  | 'reopened';

export type VisibilityLevel = 'public' | 'internal' | 'confidential';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Complaint {
  id: string;
  caseId: string;
  institutionId: string | null;
  submittedById: string;
  submitterEmail: string;
  submitterPhone: string;
  submitterRegion: string;
  subject: string;
  originalDescription: string;
  draftDescription?: string;
  category: ComplaintCategory;
  status: CaseStatus;
  riskLevel: RiskLevel;
  assignedBureauId: string | null;
  assignedOfficerId: string | null;
  receivedAt: string;
  lastActionAt: string;
  nextActionAt?: string;
  expectedDisposalAt?: string;
  closedAt?: string;
  visibilityLevel: VisibilityLevel;
  sourceType: 'demo' | 'student_portal' | 'authorized_import';
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintDraft {
  id: string;
  userId: string;
  institutionName?: string;
  category?: ComplaintCategory;
  description: string;
  completenessScore: number;
  missingFields: string[];
  createdAt: string;
  updatedAt: string;
}
