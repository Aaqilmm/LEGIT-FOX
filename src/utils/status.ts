/**
 * Status badge utilities for consistent status display
 */

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

export interface StatusConfig {
  label: string;
  color: 'default' | 'blue' | 'yellow' | 'orange' | 'green' | 'red' | 'purple';
}

export const STATUS_CONFIG: Record<CaseStatus, StatusConfig> = {
  draft: { label: 'Draft', color: 'default' },
  received: { label: 'Received', color: 'blue' },
  under_review: { label: 'Under Review', color: 'blue' },
  under_process: { label: 'Under Process', color: 'yellow' },
  awaiting_information: { label: 'Awaiting Information', color: 'orange' },
  transferred: { label: 'Transferred', color: 'purple' },
  coordination_required: { label: 'Waiting', color: 'purple' },
  escalated: { label: 'Escalated', color: 'red' },
  disposed: { label: 'Disposed', color: 'green' },
  reopened: { label: 'Reopened', color: 'yellow' },
};

export function getStatusConfig(status: CaseStatus): StatusConfig {
  return STATUS_CONFIG[status] || STATUS_CONFIG.received;
}
