export interface DashboardMetrics {
  totalComplaints: number;
  pending: number;
  underReview: number;
  underProcess: number;
  disposed: number;
  transferred: number;
  overdue: number;
  escalated: number;
  overlapsAwaitingReview: number;
  averageAge: number;
}

export interface BureauWorkload {
  bureauId: string;
  bureauName: string;
  totalCases: number;
  pending: number;
  overdue: number;
}

export interface TrendData {
  month: string;
  received: number;
  disposed: number;
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  reason?: string;
  beforeSummary?: string;
  afterSummary?: string;
  isDemo: boolean;
}
