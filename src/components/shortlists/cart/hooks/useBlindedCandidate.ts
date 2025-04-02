
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { extractJobTitle } from "../utils/blindingUtils";

export function useBlindedCandidate(candidateId: string, open: boolean, showContact: boolean) {
  const { toast } = useToast();
  const [candidateDetails, setCandidateDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [processedCVContent, setProcessedCVContent] = useState<string>('');
  const [isBlindingCV, setIsBlindingCV] = useState(false);
  const [cachedBlindedContent, setCachedBlindedContent] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState<string | null>(null);

  useEffect(() => {
    if (open && candidateId) {
      fetchCandidateDetails();
    }
  }, [open, candidateId]);

  useEffect(() => {
    if (candidateDetails?.cv_content) {
      processCV();
    }
  }, [candidateDetails, showContact]);

  const fetchCandidateDetails = async () => {
    try {
      setIsLoading(true);
      const { data: matchData, error: matchError } = await supabase
        .from('cv_match')
        .select('*, cv_metadata(*), job_description_id, job_description, job_role, user_id, status')
        .eq('id', candidateId)
        .maybeSingle();

      if (matchError) {
        throw matchError;
      }

      if (matchData) {
        const details = {
          ...matchData.cv_metadata,
          match_score: matchData.match_score,
          job_description: matchData.job_description,
          job_title: extractJobTitle(matchData.job_description),
          job_id: matchData.job_description_id,
          matched_at: matchData.matched_at,
          job_role: matchData.job_role,
          status: matchData.status || 'matched'
        };
        
        setCandidateDetails(details);
        // Store the original content when first fetched
        if (details.cv_content) {
          setOriginalContent(details.cv_content);
        }
      }
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      toast({
        title: "Error",
        description: "Failed to load candidate details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processCV = async () => {
    if (!candidateDetails.cv_content) {
      setProcessedCVContent('No CV content available');
      return;
    }
    
    if (showContact) {
      // If showing contact info, use the original content
      setProcessedCVContent(originalContent || candidateDetails.cv_content);
      return;
    }
    
    // Check if we already have the blinded content cached
    if (cachedBlindedContent) {
      setProcessedCVContent(cachedBlindedContent);
      return;
    }
    
    try {
      setIsBlindingCV(true);
      
      // Call the blind-cv API endpoint with the updated URL
      const response = await fetch('http://localhost:9000/blind-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cv_content: candidateDetails.cv_content
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to blind CV content');
      }
      
      const data = await response.json();
      
      // Cache the blinded content
      setCachedBlindedContent(data.blind_cv_content);
      setProcessedCVContent(data.blind_cv_content);
    } catch (error) {
      console.error('Error blinding CV content:', error);
      // Fallback message if API fails
      setProcessedCVContent('Error processing CV content. Some personal information may be visible.');
      toast({
        title: "Warning",
        description: "Could not properly blind the CV content.",
        variant: "destructive",
      });
    } finally {
      setIsBlindingCV(false);
    }
  };

  return {
    candidateDetails,
    isLoading,
    processedCVContent,
    isBlindingCV
  };
}
