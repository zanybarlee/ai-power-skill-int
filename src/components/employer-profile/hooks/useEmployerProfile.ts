
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EmployerProfile } from "../types";

export const useEmployerProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['employerProfile'],
    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from('employer_profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (!profile) return null;

      // Transform the raw database response to match our type
      return {
        ...profile,
        alternate_contact: profile.alternate_contact ? JSON.parse(JSON.stringify(profile.alternate_contact)) : null,
        created_at: profile.created_at || new Date().toISOString(),
        updated_at: profile.updated_at || new Date().toISOString(),
        profile_completion: profile.profile_completion || 0,
        is_verified: profile.is_verified || false,
        is_approved: profile.is_approved || false,
      } as EmployerProfile;
    },
  });

  return {
    profile,
    isLoading,
  };
};
