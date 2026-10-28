import { CaseOutcome } from '@/types/outcome';

export const DEMO_OUTCOMES: CaseOutcome[] = [
  {
    id: 'outcome-001',
    complaintId: 'complaint-010',
    outcomeType: 'fully_resolved',
    resolutionSummary:
      'Institution was directed to immediately release the original certificates. Verified that all dues were cleared. Certificates were handed over to the student.',
    actionsTaken: [
      'Inspection of dues records conducted',
      'Institution directed to release certificates within 7 days',
      'Follow-up verification completed',
    ],
    evidenceReferenceSummary: 'Dues clearance certificate, Release order, Student acknowledgment',
    verified: true,
    verifiedBy: 'user-officer-1',
    verifiedAt: '2024-01-20T10:00:00Z',
    closedAt: '2024-01-15T11:30:00Z',
    followUpRequired: false,
    sourceCaseReference: 'CASE-2023-010',
    notes:
      'This outcome is applicable when all dues are genuinely cleared and institution has no valid reason to withhold documents.',
    isDemo: true,
  },
  {
    id: 'outcome-002',
    complaintId: 'complaint-013',
    outcomeType: 'fully_resolved',
    resolutionSummary:
      'After investigation, institution was found to be withholding transcripts without justification. Official notice issued and documents released.',
    actionsTaken: [
      'Notice issued to institution',
      'Examination of student records',
      'Direction for immediate document release',
      'Compliance verified',
    ],
    evidenceReferenceSummary: 'Official notice, Compliance report, Document handover receipt',
    verified: true,
    verifiedBy: 'user-officer-1',
    verifiedAt: '2023-11-05T14:00:00Z',
    closedAt: '2023-10-30T14:00:00Z',
    followUpRequired: false,
    sourceCaseReference: 'CASE-2023-013',
    notes:
      'Similar cases should verify whether institution has any legitimate hold on documents before directing release.',
    isDemo: true,
  },
  {
    id: 'outcome-003',
    complaintId: 'complaint-019',
    outcomeType: 'partially_resolved',
    resolutionSummary:
      'Mark sheets were released but with significant delay. Institution was warned about timely document issuance.',
    actionsTaken: [
      'Verification of dues status',
      'Direction to issue mark sheets',
      'Warning issued for future compliance',
    ],
    evidenceReferenceSummary: 'Dues verification report, Mark sheet issuance record',
    verified: true,
    verifiedBy: 'user-officer-1',
    verifiedAt: '2023-09-15T16:00:00Z',
    closedAt: '2023-09-10T15:00:00Z',
    followUpRequired: true,
    sourceCaseReference: 'CASE-2023-019',
    notes: 'Delay was procedural rather than intentional withholding.',
    isDemo: true,
  },
  {
    id: 'outcome-004',
    complaintId: 'complaint-010',
    outcomeType: 'not_substantiated',
    resolutionSummary:
      'Investigation revealed that student had pending library fines that were not cleared as claimed. Institution had valid reason to withhold documents.',
    actionsTaken: [
      'Detailed audit of library records',
      'Student notified of pending dues',
      'Case closed after due verification',
    ],
    evidenceReferenceSummary: 'Library records, Pending dues statement',
    verified: false,
    closedAt: '2024-01-10T12:00:00Z',
    followUpRequired: false,
    notes:
      'This is an alternative outcome example. Always verify dues status independently before directing document release.',
    isDemo: true,
  },
  {
    id: 'outcome-005',
    complaintId: 'complaint-013',
    outcomeType: 'referred_elsewhere',
    resolutionSummary:
      'Matter involved pending legal proceedings. Case referred to appropriate legal authority.',
    actionsTaken: ['Initial assessment conducted', 'Legal matter identified', 'Referral to legal cell'],
    verified: false,
    closedAt: '2023-10-25T11:00:00Z',
    followUpRequired: true,
    sourceCaseReference: 'CASE-2023-013',
    notes: 'Not applicable when no legal proceedings are involved.',
    isDemo: true,
  },
];
