
import { useShortlistsAuth } from "./shortlists/useShortlistsAuth";
import { useJobDescriptionData } from "./shortlists/useJobDescriptionData";
import { useMatchedCandidates } from "./shortlists/useMatchedCandidates";
import { useMatchingLogic } from "./shortlists/useMatchingLogic";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export function useShortlists() {
  const { toast } = useToast();
  const { userId } = useShortlistsAuth();
  const { jobDescription, setJobDescription, jobDescriptions } = useJobDescriptionData(userId);
  const { matchedCandidates, refetchMatchedCandidates } = useMatchedCandidates(userId);
  const { 
    isMatching, 
    matchingResults, 
    selectedJobId,
    setSelectedJobId,
    handleMatch: handleMatchCore,
    handleClearMatches: handleClearMatchesCore
  } = useMatchingLogic(refetchMatchedCandidates);

  const handleMatch = async (jobDescriptionId?: string) => {
    // Extract job role from job description text (before the dash if present)
    let jobRole = undefined;
    
    if (jobDescription) {
      const dashIndex = jobDescription.indexOf('-');
      if (dashIndex > 0) {
        jobRole = jobDescription.substring(0, dashIndex).trim();
      }
    }
    
    await handleMatchCore(jobDescription, jobDescriptionId, jobRole, userId);
  };

  const handleClearMatches = async () => {
    try {
      let query = supabase.from('cv_match').delete();
      
      // If userId is available, only delete the user's matches
      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.not('id', 'is', null);
      }
      
      const { error } = await query;
      
      if (error) throw error;

      // Clear UI state
      handleClearMatchesCore();
      
      toast({
        title: "Matches cleared",
        description: "All your matches have been cleared from the table and database.",
      });
    } catch (error) {
      console.error('Error clearing matches:', error);
      toast({
        title: "Error",
        description: "Failed to clear matches. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    jobDescription,
    setJobDescription,
    isMatching,
    matchingResults,
    jobDescriptions,
    matchedCandidates,
    handleMatch,
    handleClearMatches,
    selectedJobId,
    setSelectedJobId,
    userId
  };
}
