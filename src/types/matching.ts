export type SuggestedRelationship =
  | 'potential_duplicate'
  | 'related_issue'
  | 'historical_example'
  | 'possible_action_overlap';

export type ReviewStatus = 'pending' | 'confirmed' | 'dismissed' | 'related' | 'duplicate';

export interface RelatedCaseSuggestion {
  id: string;
  sourceComplaintId: string;
  candidateComplaintId: string;
  semanticSimilarity?: number;
  matchingReasons: string[];
  sameInstitution: boolean;
  suggestedRelationship: SuggestedRelationship;
  reviewStatus: ReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewReason?: string;
  isDemo: boolean;
}
