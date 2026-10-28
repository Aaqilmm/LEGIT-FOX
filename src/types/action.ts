import { VisibilityLevel } from './complaint';

export type ActionType =
  | 'case_created'
  | 'status_changed'
  | 'bureau_assigned'
  | 'officer_assigned'
  | 'information_requested'
  | 'information_received'
  | 'coordination_requested'
  | 'coordination_response'
  | 'case_transferred'
  | 'case_escalated'
  | 'case_closed'
  | 'case_reopened'
  | 'note_added';

export interface CaseAction {
  id: string;
  complaintId: string;
  actionType: ActionType;
  summary: string;
  remarks?: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  occurredAt: string;
  evidenceReferences?: string[];
  visibility: VisibilityLevel;
  isDemo: boolean;
}
