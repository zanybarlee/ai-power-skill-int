import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: {
          session
        },
        error
      } = await supabase.auth.getSession();
      if (error) {
        setErrorMessage(getErrorMessage(error));
        return;
      }
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();

    // Listen for auth state changes
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
      if (event === "USER_UPDATED") {
        const {
          error
        } = await supabase.auth.getSession();
        if (error) {
          setErrorMessage(getErrorMessage(error));
        }
      }
      // Clear error message on successful events
      if (["SIGNED_IN", "SIGNED_UP", "PASSWORD_RECOVERY"].includes(event)) {
        setErrorMessage("");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case 'invalid_credentials':
          return 'Invalid email or password. Please check your credentials and try again.';
        case 'email_not_confirmed':
          return 'Please verify your email address before signing in.';
        case 'user_not_found':
          return 'No user found with these credentials.';
        case 'invalid_grant':
          return 'Invalid login credentials.';
        default:
          return error.message;
      }
    }
    return error.message;
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img alt="Logo" className="mx-auto h-12 w-auto" src="/lovable-uploads/54b4b57c-dd47-4a8d-9d91-f39d95bddd82.png" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Welcome to AI Power Talent Management</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errorMessage && <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>}
          <SupabaseAuth supabaseClient={supabase} appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#ea384c',
                brandAccent: '#d62238'
              }
            }
          }
        }} providers={[]} />
        </div>
      </div>
    </div>;
};
export default Auth;