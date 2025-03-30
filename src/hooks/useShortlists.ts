
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { queryBestMatch } from "@/services/matchingService";
import { normalizeSkills } from "@/utils/candidateUtils";
import { useToast } from "@/hooks/use-toast";

interface MatchResult {
  name: string;
  score: number;
  details: string;
  email?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: number;
}

interface MatchedCandidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  email: string;
  match_score: number;
  job_title?: string;
  job_id?: string;
}

export function useShortlists() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [jobDescription, setJobDescription] = useState(() => {
    return localStorage.getItem("jobDescription") || "";
  });
  const [isMatching, setIsMatching] = useState(false);
  const [matchingResults, setMatchingResults] = useState<MatchResult[]>([]);

  useEffect(() => {
    localStorage.setItem("jobDescription", jobDescription);
  }, [jobDescription]);

  const { data: jobDescriptions } = useQuery({
    queryKey: ['jobDescriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('id, job_title, original_text, job_requirements')
        .not('original_text', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: matchedCandidates = [], refetch: refetchMatchedCandidates } = useQuery({
    queryKey: ['matchedCandidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_match')
        .select(`
          id,
          match_score,
          job_description,
          cv_metadata:cv_metadata_id (
            id,
            name,
            email,
            experience,
            location,
            skills
          ),
          job_descriptions:job_description_id (
            id,
            job_title
          )
        `)
        .order('match_score', { ascending: false });

      if (error) {
        console.error('Error fetching matched candidates:', error);
        throw error;
      }

      return data.map((match) => ({
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
        job_title: match.job_descriptions?.job_title || 'Unknown Job',
        job_id: match.job_descriptions?.id
      }));
    }
  });

  const handleMatch = async (jobDescriptionId?: string) => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsMatching(true);
    try {
      // Pass job description ID if available
      const result = await queryBestMatch(jobDescription, jobDescriptionId);
      
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
    jobDescription,
    setJobDescription,
    isMatching,
    matchingResults,
    jobDescriptions,
    matchedCandidates,
    handleMatch,
    handleClearMatches
  };
}
