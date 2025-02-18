
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { navigationItems } from "@/config/navigation";
import { SidebarHeader } from "./layout/SidebarHeader";
import { Navigation } from "./layout/Navigation";
import { LogoutButton } from "./layout/LogoutButton";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          navigate("/auth", { replace: true });
          return;
        }

        if (!session) {
          navigate("/auth", { replace: true });
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        setIsLoading(false);
        navigate("/auth", { replace: true });
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !session) {
        navigate("/auth", { replace: true });
      }
      
      if (event === 'TOKEN_REFRESHED' && session) {
        setIsLoading(false);
      }
    });

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 border-t-2 border-b-2 border-aptiv rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 bg-aptiv-gray-700 z-40",
          isSidebarOpen ? "w-64" : "w-0 lg:w-20"
        )}
      >
        <SidebarHeader 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <Navigation isSidebarOpen={isSidebarOpen} />
        <LogoutButton isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        <header className="h-16 border-b border-aptiv/10 flex items-center px-4 bg-white">
          <h2 className="text-aptiv-gray-700 font-medium">
            {navigationItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
          </h2>
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
        <Footer />
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
