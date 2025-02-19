
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EmployerProfile } from "../types";

export const useEmployerProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['employerProfile'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('employer_profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return profiles as EmployerProfile | null;
    },
  });

  return {
    profile,
    isLoading,
  };
};
