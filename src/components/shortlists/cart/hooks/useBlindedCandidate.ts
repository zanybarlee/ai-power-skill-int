
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { extractJobTitle } from "../utils/blindingUtils";

interface CacheItem {
  original: string | null;
  blinded: string | null;
}

type CacheStore = Record<string, CacheItem>;

export function useBlindedCandidate(
  candidateId: string, 
  open: boolean, 
  showContact: boolean,
  cacheStore: CacheStore = {}
) {
  const { toast } = useToast();
  const [candidateDetails, setCandidateDetails] = useState<any>(null);
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

  const formatAsMarkdown = (text: string): string => {
    if (!text) return '';
    
    const paragraphs = text.split(/\n\s*\n/);
    
    const markdownText = paragraphs.map(para => {
      if (para.trim().startsWith('#')) {
        return para;
      } else if (para.trim().length <= 50 && para.trim() === para.trim().toUpperCase()) {
        return `## ${para.trim()}`;
      }
      
      if (para.includes('\n')) {
        const lines = para.split('\n');
        return lines.map(line => {
          if (line.trim().match(/^[*\-•]\s+/)) {
            return line;
          } 
          else if (line.trim().match(/^\d+\.\s+/)) {
            return line;
          }
          return line;
        }).join('\n');
      }
      
      return para;
    }).join('\n\n');
    
    return markdownText;
  };

  const processCV = async () => {
    if (!candidateDetails.cv_content) {
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
      
      const formattedBlindedContent = formatAsMarkdown(data.blind_cv_content);
      
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
