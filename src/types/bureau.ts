export interface Bureau {
  id: string;
  code: string;
  displayName: string;
  description: string;
  active: boolean;
  supportedCategories: string[];
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export const COMPLAINT_CATEGORIES = [
  'document_retention',
  'fee_refund',
  'academic_malpractice',
  'infrastructure',
  'faculty_shortage',
  'admission_grievance',
  'examination_related',
  'ragging',
  'discrimination',
  'other',
] as const;

export type ComplaintCategory = (typeof COMPLAINT_CATEGORIES)[number];
