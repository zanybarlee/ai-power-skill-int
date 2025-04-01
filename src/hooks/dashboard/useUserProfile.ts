
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserSession } from "@/components/job-descriptions/hooks/useUserSession";

export function useUserProfile() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  
  // Get the current user's ID
  const { userId, isLoading: isUserLoading } = useUserSession();

  // Get user details
  useEffect(() => {
    const getUserDetails = async () => {
      if (!userId) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email);
        setUserAvatar(session.user.user_metadata?.avatar_url || null);
      }
    };
    
    getUserDetails();
  }, [userId]);

  return { userId, userEmail, userAvatar, isLoading: isUserLoading };
}
