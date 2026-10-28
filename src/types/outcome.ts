export type OutcomeType =
  | 'fully_resolved'
  | 'partially_resolved'
  | 'not_substantiated'
  | 'referred_elsewhere'
  | 'withdrawn'
  | 'procedurally_closed'
  | 'unresolved_at_closure'
  | 'other';

export interface CaseOutcome {
  id: string;
  complaintId: string;
  outcomeType: OutcomeType;
  resolutionSummary: string;
  actionsTaken: string[];
  evidenceReferenceSummary?: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  closedAt: string;
  followUpRequired: boolean;
  sourceCaseReference?: string;
  notes?: string;
  isDemo: boolean;
}
