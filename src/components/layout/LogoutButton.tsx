
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LogoutButtonProps {
  isSidebarOpen: boolean;
}

export const LogoutButton = ({ isSidebarOpen }: LogoutButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn(
      "p-4 border-t border-aptiv/10",
      !isSidebarOpen && "lg:flex lg:justify-center"
    )}>
      <button 
        onClick={handleLogout}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-md w-full",
          "text-aptiv-gray-200 hover:bg-aptiv hover:text-white",
          !isSidebarOpen && "lg:justify-center lg:w-auto"
        )}
      >
        <LogOut size={20} />
        <span className={cn(
          "font-medium text-sm",
          !isSidebarOpen && "lg:hidden"
        )}>
          Logout
        </span>
      </button>
    </div>
  );
};
