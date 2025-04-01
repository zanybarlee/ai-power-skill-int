
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryBestMatch } from "@/services/matchingService";
import { MatchResult } from "./types";

export function useMatchingLogic(refetchMatchedCandidates: () => Promise<any>) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isMatching, setIsMatching] = useState(false);
  const [matchingResults, setMatchingResults] = useState<MatchResult[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(undefined);

  const handleMatch = async (
    jobDescription: string, 
    jobDescriptionId?: string,
    jobRole?: string,
    userId?: string
  ) => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsMatching(true);
    setSelectedJobId(jobDescriptionId);
    
    try {
      console.log("useMatchingLogic - Starting match with job ID:", jobDescriptionId);
      console.log("useMatchingLogic - Starting match with job role:", jobRole);
      console.log("useMatchingLogic - Starting match with user ID:", userId);
      
      const result = await queryBestMatch(jobDescription, jobDescriptionId, jobRole, userId);
      
      const parsedResults = Array.isArray(result.matches) 
        ? result.matches.map((match) => ({
            name: match.candidate.name || 'Unknown',
            score: Math.round(match.match_record.match_score * 100),
            details: match.match_record.job_description || '',
            email: match.candidate.email,
            phone: match.candidate.phone,
            location: match.candidate.location,
            skills: match.candidate.skills,
            experience: match.candidate.experience
          }))
        : [];
      
      setMatchingResults(parsedResults);
      
      await refetchMatchedCandidates();
      
      toast({
        title: "Match Complete",
        description: result.message || "Best matches have been found based on the job description.",
      });
    } catch (error) {
      console.error('Matching error:', error);
      toast({
        title: "Error",
        description: "Failed to find matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMatching(false);
    }
  };

  const handleClearMatches = () => {
    setMatchingResults([]);
    queryClient.setQueryData(['matchedCandidates'], []);
  };

  return {
    isMatching,
    matchingResults,
    selectedJobId,
    setSelectedJobId,
    handleMatch,
    handleClearMatches,
  };
}
