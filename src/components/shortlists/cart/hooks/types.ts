
/**
 * Type definitions for blinded candidate hooks and components
 */

export interface CandidateDetails {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  job_role?: string;
  role?: string;
  experience?: string | number;
  skills?: string[];
  cv_content?: string;
  match_score?: number;
  job_description?: string;
  job_title?: string;
  job_id?: string;
  matched_at?: string;
  status?: string;
}

export interface CacheItem {
  original: string | null;
  blinded: string | null;
}

export type CacheStore = Record<string, CacheItem>;

export interface BlindedCandidateResult {
  candidateDetails: CandidateDetails | null;
  isLoading: boolean;
  processedCVContent: string;
  isBlindingCV: boolean;
  setCache: (original: string | null, blinded: string | null) => void;
  hasCache: boolean;
}
