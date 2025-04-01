
interface MatchingQuery {
  description: string;
  job_description_id?: string;
  job_role?: string;
  user_id?: string;
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
  job_description_id?: string;
  matched_at: string;
  match_score: number;
  status: string;
  created_at: string;
  user_id?: string;
  job_role?: string;
}

interface MatchResponse {
  message: string;
  matches: Array<{
    candidate: Candidate;
    match_record: MatchRecord;
  }>;
}

export const queryBestMatch = async (
  jobDescription: string, 
  jobDescriptionId?: string,
  jobRole?: string,
  userId?: string
): Promise<MatchResponse> => {
  try {
    console.log("matchingService - Sending match request with job_description_id:", jobDescriptionId);
    console.log("matchingService - Sending match request with job_role:", jobRole);
    console.log("matchingService - Sending match request with user_id:", userId);
    
    const response = await fetch(
      "http://localhost:9000/match-job",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          job_description: jobDescription,
          job_description_id: jobDescriptionId,
          job_role: jobRole || undefined, // Ensure job_role is defined or undefined (not null or "")
          user_id: userId || undefined  // Ensure user_id is defined or undefined (not null or "")
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch matching results');
    }
    
    const result = await response.json();
    console.log("Match response received:", result);
    return result;
  } catch (error) {
    console.error('Error querying best match:', error);
    throw new Error('Error querying best match: ' + (error as Error).message);
  }
};
