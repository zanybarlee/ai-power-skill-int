
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useUserSession() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserId() {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching user session:', error);
          setIsLoading(false);
          return;
        }
        
        if (data.session) {
          setUserId(data.session.user.id);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Unexpected error in useUserSession:', error);
        setIsLoading(false);
      }
    }
    
    fetchUserId();
  }, []);

  return { userId, isLoading };
}
