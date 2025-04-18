
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizeSkills } from "@/utils/candidateUtils";

export function useMatchedCandidates(userId?: string | null) {
  const { data: matchedCandidates = [], refetch: refetchMatchedCandidates } = useQuery({
    queryKey: ['matchedCandidates', userId],
    queryFn: async () => {
      try {
        let query = supabase
          .from('cv_match')
          .select(`
            id,
            match_score,
            job_description,
            job_description_id,
            job_role,
            user_id,
            status,
            cv_metadata:cv_metadata_id (
              id,
              name,
              email,
              experience,
              location,
              skills
            )
          `)
          .order('match_score', { ascending: false });
          
        // Filter by user_id if provided
        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching matched candidates:', error);
          throw error;
        }

        // Process job descriptions to extract title before dash
        return data.map((match) => {
          // Extract job title from job_description (text before the first dash)
          let jobTitle = 'Unknown Job';
          
          if (match.job_description) {
            // Find the position of the first dash
            const dashIndex = match.job_description.indexOf('-');
            
            if (dashIndex > 0) {
              // Extract only the text before the dash and trim whitespace
              jobTitle = match.job_description.substring(0, dashIndex).trim();
            } else {
              // If there's no dash, use the whole job description (up to 50 chars)
              jobTitle = match.job_description.length > 50 
                ? match.job_description.substring(0, 50) + '...' 
                : match.job_description;
            }
          }
          
          // Continue with the existing mapped data structure
          return {
            id: match.id,
            name: match.cv_metadata?.name || 'Unknown',
            role: match.job_role || 'Not specified', // Use job_role if available
            location: match.cv_metadata?.location || 'Not specified',
            experience: match.cv_metadata?.experience 
              ? `${match.cv_metadata.experience} years` 
              : 'Not specified',
            skills: normalizeSkills(match.cv_metadata?.skills),
            email: match.cv_metadata?.email || '',
            match_score: Math.round(match.match_score || 0),
            job_title: jobTitle,
            job_id: match.job_description_id,
            job_description: match.job_description || 'No job description',
            job_role: match.job_role,
            user_id: match.user_id,
            status: match.status || 'matched'
          };
        });
      } catch (error) {
        console.error('Error in useMatchedCandidates:', error);
        return [];
      }
    },
    enabled: true // Always enable the query, even if userId is null
  });

  return {
    matchedCandidates,
    refetchMatchedCandidates
  };
}
