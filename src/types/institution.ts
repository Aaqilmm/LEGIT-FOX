export interface Institution {
  id: string;
  aictePermanentId: string;
  name: string;
  region: string;
  state: string;
  addressSummary: string;
  institutionType?: string;
  status: 'active' | 'inactive' | 'under_review';
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}
