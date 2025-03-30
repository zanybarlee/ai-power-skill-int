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
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("jobDescription", jobDescription);
  }, [jobDescription]);

  const { data: jobDescriptions } = useQuery({
    queryKey: ['jobDescriptions', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('id, job_title, original_text, job_requirements')
        .eq('user_id', userId)
        .not('original_text', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
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
    setSelectedJobId(jobDescriptionId);
    
    try {
      console.log("Starting match with job ID:", jobDescriptionId);
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
    handleClearMatches,
    selectedJobId,
    setSelectedJobId,
    userId
  };
}
