
/**
 * Service for fetching candidate information
 */
import { supabase } from "@/integrations/supabase/client";
import { CandidateDetails } from "../hooks/types";
import { extractJobTitle } from "../utils/blindingUtils";
import { normalizeSkills } from "@/utils/candidateUtils";

/**
 * Fetches candidate details from the database
 * @param candidateId ID of the candidate to fetch
 * @returns Candidate details
 */
export const fetchCandidateDetails = async (candidateId: string): Promise<CandidateDetails> => {
  const { data: matchData, error: matchError } = await supabase
    .from('cv_match')
    .select('*, cv_metadata(*), job_description_id, job_description, job_role, user_id, status')
    .eq('id', candidateId)
    .maybeSingle();

  if (matchError) {
    throw matchError;
  }

  if (!matchData) {
    throw new Error('Candidate not found');
  }

  // Process the skills to ensure they're always a string array
  const skills = normalizeSkills(matchData.cv_metadata?.skills);

  const details: CandidateDetails = {
    ...matchData.cv_metadata,
    skills: skills,
    match_score: matchData.match_score,
    job_description: matchData.job_description,
    job_title: extractJobTitle(matchData.job_description),
    job_id: matchData.job_description_id,
    matched_at: matchData.matched_at,
    job_role: matchData.job_role,
    status: matchData.status || 'matched'
  };
  
  return details;
};
