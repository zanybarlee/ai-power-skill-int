
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
      const { data: matchData, error: matchError } = await supabase
        .from('cv_match')
        .select('*, cv_metadata(*)')
        .eq('id', candidateId)
        .single();

      if (matchError) throw matchError;

      if (matchData) {
        const details = {
          ...matchData.cv_metadata,
          match_score: matchData.match_score,
          job_description: matchData.job_description,
          matched_at: matchData.matched_at,
        };
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
