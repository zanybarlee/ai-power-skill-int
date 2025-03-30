
interface MatchingQuery {
  description: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  location: string;
  current_salary?: number;
  expected_salary?: number;
  notice_period?: string;
}

interface MatchRecord {
  id: string;
  cv_metadata_id: string;
  job_description: string;
  matched_at: string;
  match_score: number;
  status: string;
  created_at: string;
}

interface MatchResponse {
  message: string;
  matches: Array<{
    candidate: Candidate;
    match_record: MatchRecord;
  }>;
}

export const queryBestMatch = async (jobDescription: string): Promise<MatchResponse> => {
  try {
    const response = await fetch(
      "http://localhost:9000/match-job",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          job_description: jobDescription
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch matching results');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error querying best match:', error);
    throw new Error('Error querying best match: ' + (error as Error).message);
  }
};
