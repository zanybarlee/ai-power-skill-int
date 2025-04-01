
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useCandidateDetails = () => {
  const { toast } = useToast();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [candidateDetails, setCandidateDetails] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchCandidateDetails = async (candidateId: string) => {
    try {
      // First try to get from cv_match table (for shortlisted candidates)
      const { data: matchData, error: matchError } = await supabase
        .from('cv_match')
        .select('*, cv_metadata(*), job_description_id, job_description, job_role, user_id, status')
        .eq('id', candidateId)
        .maybeSingle();

      if (matchError) {
        throw matchError;
      }

      if (matchData) {
        // If we found data in cv_match, process it
        
        // Extract job title from job_description (text before the first dash)
        let jobTitle = 'Unknown Job';
        
        if (matchData.job_description) {
          // Find the position of the first dash
          const dashIndex = matchData.job_description.indexOf('-');
          
          if (dashIndex > 0) {
            // Extract only the text before the dash and trim whitespace
            jobTitle = matchData.job_description.substring(0, dashIndex).trim();
          } else {
            // If there's no dash, use up to the first 50 chars
            jobTitle = matchData.job_description.length > 50 
              ? matchData.job_description.substring(0, 50) + '...'
              : matchData.job_description;
          }
        }
        
        // If we have a job_description_id, try to get a more specific job title from job_descriptions
        if (matchData.job_description_id) {
          console.log("Fetching job title for ID:", matchData.job_description_id);
          const { data: jobData, error: jobError } = await supabase
            .from('job_descriptions')
            .select('job_title')
            .eq('id', matchData.job_description_id)
            .maybeSingle();
          
          if (jobError) {
            console.error("Error fetching job title:", jobError);
          }
          
          if (jobData && jobData.job_title) {
            console.log("Found job title:", jobData.job_title);
            jobTitle = jobData.job_title;
          }
        }

        const details = {
          ...matchData.cv_metadata,
          match_score: matchData.match_score,
          job_description: matchData.job_description,
          job_title: jobTitle,
          job_id: matchData.job_description_id,
          matched_at: matchData.matched_at,
          job_description_id: matchData.job_description_id, // Ensure we have this field
          job_role: matchData.job_role,
          user_id: matchData.user_id,
          status: matchData.status || 'matched'
        };
        
        console.log("Candidate details prepared from cv_match:", details);
        setCandidateDetails(details);
        setSelectedCandidateId(candidateId);
        setIsDialogOpen(true);
        return;
      }

      // If not found in cv_match, try directly in cv_metadata
      const { data: cvData, error: cvError } = await supabase
        .from('cv_metadata')
        .select('*')
        .eq('id', candidateId)
        .single();

      if (cvError) throw cvError;

      if (cvData) {
        const details = {
          ...cvData,
          match_score: null,
          job_description: null,
          job_title: null,
          job_id: null,
          matched_at: null,
          job_role: null,
          user_id: null,
          status: 'matched' // Default status for candidates not in cv_match
        };
        
        console.log("Candidate details prepared from cv_metadata:", details);
        setCandidateDetails(details);
        setSelectedCandidateId(candidateId);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      toast({
        title: "Error",
        description: "Failed to load candidate details.",
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCandidateId(null);
    setCandidateDetails(null);
  };

  return {
    selectedCandidateId,
    candidateDetails,
    isDialogOpen,
    fetchCandidateDetails,
    handleCloseDialog,
  };
};
