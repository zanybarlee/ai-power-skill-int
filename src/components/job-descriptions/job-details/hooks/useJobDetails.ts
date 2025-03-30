
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobDescription } from "../../types";

export const useJobDetails = (jobId: string, open: boolean, userId: string | null) => {
  const { 
    data: job, 
    isLoading, 
    isError,
    refetch 
  } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: async () => {
      // First fetch the job description
      const { data: jobData, error: jobError } = await supabase
        .from("job_descriptions")
        .select('*')
        .eq("id", jobId)
        .eq("user_id", userId || '')
        .single();

      if (jobError) throw jobError;
      
      // If there's an employer_profile_id, fetch the employer profile
      let employerProfile = undefined;
      if (jobData.employer_profile_id) {
        const { data: profileData, error: profileError } = await supabase
          .from('employer_profiles')
          .select('*')
          .eq('id', jobData.employer_profile_id)
          .single();
          
        if (!profileError && profileData) {
          employerProfile = {
            company_name: profileData.company_name,
            contact_person: profileData.contact_person,
            email: profileData.email,
            phone: profileData.phone,
            country: profileData.country,
            state: profileData.state
          };
        }
      }
      
      // Return job with employer profile
      return {
        ...jobData,
        employer_profiles: employerProfile
      } as JobDescription;
    },
    enabled: !!jobId && open && !!userId,
  });
  
  return { job, isLoading, isError, refetch };
};
