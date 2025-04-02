
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatAsMarkdown } from "../utils/formatUtils";
import { blindCV } from "../services/blindingService";
import { fetchCandidateDetails } from "../services/candidateService";
import { CandidateDetails, CacheStore, BlindedCandidateResult } from "./types";

export function useBlindedCandidate(
  candidateId: string, 
  open: boolean, 
  showContact: boolean,
  cacheStore: CacheStore = {}
): BlindedCandidateResult {
  const { toast } = useToast();
  const [candidateDetails, setCandidateDetails] = useState<CandidateDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [processedCVContent, setProcessedCVContent] = useState<string>('');
  const [isBlindingCV, setIsBlindingCV] = useState(false);
  const [hasCache, setHasCache] = useState<boolean>(false);

  // Check if we have cache for this candidate on mount
  useEffect(() => {
    if (candidateId && cacheStore[candidateId]) {
      setHasCache(true);
    } else {
      setHasCache(false);
    }
  }, [candidateId, cacheStore]);

  useEffect(() => {
    if (open && candidateId) {
      fetchCandidate();
    }
  }, [open, candidateId]);

  useEffect(() => {
    if (candidateDetails?.cv_content) {
      processCV();
    }
  }, [candidateDetails, showContact]);

  const fetchCandidate = async () => {
    try {
      setIsLoading(true);
      const details = await fetchCandidateDetails(candidateId);
      
      setCandidateDetails(details);
      if (details.cv_content) {
        // Initialize cache if needed
        if (!cacheStore[candidateId]) {
          cacheStore[candidateId] = {
            original: null,
            blinded: null
          };
        }
        
        // Store formatted original content
        if (!cacheStore[candidateId].original) {
          cacheStore[candidateId].original = formatAsMarkdown(details.cv_content);
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
    if (!candidateDetails?.cv_content) {
      setProcessedCVContent('No CV content available');
      return;
    }
    
    // Get cache for this candidate
    const candidateCache = cacheStore[candidateId] || { original: null, blinded: null };
    
    if (showContact) {
      // Use original content from cache or generate it
      const original = candidateCache.original || formatAsMarkdown(candidateDetails.cv_content);
      setProcessedCVContent(original);
      return;
    }
    
    // Check if we have blinded content cached for this candidate
    if (candidateCache.blinded) {
      setProcessedCVContent(candidateCache.blinded);
      return;
    }
    
    try {
      setIsBlindingCV(true);
      
      const blindedContent = await blindCV(candidateDetails.cv_content);
      const formattedBlindedContent = formatAsMarkdown(blindedContent);
      
      // Store in cache for this candidate
      cacheStore[candidateId] = {
        ...candidateCache,
        blinded: formattedBlindedContent
      };
      
      setProcessedCVContent(formattedBlindedContent);
    } catch (error) {
      console.error('Error blinding CV content:', error);
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

  // Function to manually set values in cache
  const setCache = (original: string | null, blinded: string | null) => {
    if (candidateId) {
      cacheStore[candidateId] = {
        original,
        blinded
      };
    }
  };

  return {
    candidateDetails,
    isLoading,
    processedCVContent,
    isBlindingCV,
    setCache,
    hasCache
  };
}
