
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserSession } from "@/components/job-descriptions/hooks/useUserSession";

export type DashboardStats = {
  jobPostings: number;
  candidates: number;
  matches: number;
  successRate: number;
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    jobPostings: 0,
    candidates: 0,
    matches: 0,
    successRate: 0,
  });
  
  const { userId } = useUserSession();

  const { data: jobDescriptions, isLoading: isJobsLoading } = useQuery({
    queryKey: ['dashboardJobs', userId],
    queryFn: async () => {
      // Only query if we have a userId
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId, // Only run the query if userId is available
  });

  const { data: cvMetadata, isLoading: isCandidatesLoading } = useQuery({
    queryKey: ['dashboardCandidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_metadata')
        .select('*')
        .limit(100);
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: matches, isLoading: isMatchesLoading } = useQuery({
    queryKey: ['dashboardMatches', userId],
    queryFn: async () => {
      // Only query if we have a userId
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('cv_match')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId, // Only run the query if userId is available
  });

  useEffect(() => {
    if (jobDescriptions && cvMetadata && matches) {
      // Calculate stats
      const jobPostingsCount = jobDescriptions.length;
      const candidatesCount = cvMetadata.length;
      const matchesCount = matches.length;
      
      // Calculate success rate (matches with score > 70%)
      const successfulMatches = matches.filter(match => match.match_score > 70).length;
      const successRate = matchesCount > 0 
        ? Math.round((successfulMatches / matchesCount) * 100)
        : 0;
      
      setStats({
        jobPostings: jobPostingsCount,
        candidates: candidatesCount,
        matches: matchesCount,
        successRate
      });
    }
  }, [jobDescriptions, cvMetadata, matches]);

  const isLoading = isJobsLoading || isCandidatesLoading || isMatchesLoading;

  return { stats, isLoading };
}
