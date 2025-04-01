
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useJobDescriptionData(userId: string | null) {
  // Start with an empty job description instead of loading from localStorage
  const [jobDescription, setJobDescription] = useState("");

  // Remove the useEffect that saves to localStorage - we don't want to persist this value
  
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

  return {
    jobDescription,
    setJobDescription,
    jobDescriptions
  };
}
