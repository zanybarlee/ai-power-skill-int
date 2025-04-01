
export interface MatchResult {
  name: string;
  score: number;
  details: string;
  email?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: number;
}

export interface MatchedCandidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  email: string;
  match_score: number;
  job_title?: string;
  job_id?: string;
  job_description?: string;
}
