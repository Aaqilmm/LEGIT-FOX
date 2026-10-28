export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: RegulatorySource[];
  similarCases?: SimilarCaseCard[];
}

export interface RegulatorySource {
  id: string;
  title: string;
  documentType: string;
  officialSourceName: string;
  sectionOrProvision?: string;
  pageNumber?: string;
  publicationDate?: string;
  effectiveDate?: string;
  sourceUrl?: string;
  verifiedAt?: string;
  version?: string;
  extractedPassage: string;
  documentStatus: 'current' | 'archived' | 'superseded';
}

export interface SimilarCaseCard {
  caseId: string;
  category: string;
  summary: string;
  outcome: string;
  similarity: number;
}

export interface ComplaintQualityCheck {
  completenessScore: number;
  missingFields: MissingField[];
  suggestions: string[];
  checklist: ChecklistItem[];
}

export interface MissingField {
  field: string;
  required: boolean;
  explanation: string;
  status: 'complete' | 'needed' | 'optional';
}

export interface ChecklistItem {
  id: string;
  label: string;
  status: 'complete' | 'incomplete' | 'not_applicable';
  explanation?: string;
}
