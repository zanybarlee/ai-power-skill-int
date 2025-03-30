
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizeSkills } from "@/utils/candidateUtils";

export function useMatchedCandidates() {
  const { data: matchedCandidates = [], refetch: refetchMatchedCandidates } = useQuery({
    queryKey: ['matchedCandidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_match')
        .select(`
          id,
          match_score,
          job_description,
          job_description_id,
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

      if (error) {
        console.error('Error fetching matched candidates:', error);
        throw error;
      }

      const jobDescriptionIds = data
        .map(match => match.job_description_id)
        .filter(Boolean) as string[];
      
      let jobTitleMap = new Map();
      
      if (jobDescriptionIds.length > 0) {
        const { data: jobsData } = await supabase
          .from('job_descriptions')
          .select('id, job_title')
          .in('id', jobDescriptionIds);
        
        if (jobsData && jobsData.length > 0) {
          jobsData.forEach(job => {
            jobTitleMap.set(job.id, job.job_title || 'Unknown Job');
          });
        }
      }

      return data.map((match) => {
        const jobTitle = match.job_description_id && jobTitleMap.has(match.job_description_id)
          ? jobTitleMap.get(match.job_description_id)
          : 'Unknown Job';

        return {
          id: match.id,
          name: match.cv_metadata?.name || 'Unknown',
          role: 'Not specified',
          location: match.cv_metadata?.location || 'Not specified',
          experience: match.cv_metadata?.experience 
            ? `${match.cv_metadata.experience} years` 
            : 'Not specified',
          skills: normalizeSkills(match.cv_metadata?.skills),
          email: match.cv_metadata?.email || '',
          match_score: Math.round(match.match_score || 0),
          job_title: jobTitle,
          job_id: match.job_description_id
        };
      });
    }
  });

  return {
    matchedCandidates,
    refetchMatchedCandidates
  };
}
