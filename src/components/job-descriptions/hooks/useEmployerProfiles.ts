
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EmployerProfile } from "../../employer-profile/types";

export const useEmployerProfiles = () => {
  const { data: profiles, isLoading, isError } = useQuery({
    queryKey: ['employerProfiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_profiles')
        .select('*')
        .order('company_name', { ascending: true });

      if (error) {
        throw error;
      }

      return data as EmployerProfile[];
    },
  });

  return {
    profiles,
    isLoading,
    isError,
  };
};
