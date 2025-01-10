import { useState } from "react";
import { Menu, X, FileText, Search, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigationItems = [
    {
      name: "Post Job",
      icon: FileText,
      path: "/post-job",
    },
    {
      name: "Candidate Search",
      icon: Search,
      path: "/candidates",
    },
    {
      name: "Shortlists",
      icon: Users,
      path: "/shortlists",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div className="min-h-screen flex w-full bg-forest">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static h-full bg-forest-light",
          "transition-all duration-300 z-40 flex flex-col",
          isSidebarOpen ? "w-64" : "w-0 lg:w-20"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-mint/10">
          <h1 
            className={cn(
              "text-mint font-bold tracking-wider",
              !isSidebarOpen && "lg:hidden"
            )}
          >
            APTIV8
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-forest rounded-md text-mint transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 p-4 flex flex-col gap-2",
          !isSidebarOpen && "lg:items-center"
        )}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all",
                "hover:bg-forest hover:text-mint group",
                location.pathname === item.path
                  ? "bg-forest text-mint"
                  : "text-white/70",
                !isSidebarOpen && "lg:justify-center"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-transform",
                  "group-hover:scale-110"
                )}
              />
              <span 
                className={cn(
                  "font-medium text-sm",
                  !isSidebarOpen && "lg:hidden"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className={cn(
          "p-4 border-t border-mint/10",
          !isSidebarOpen && "lg:flex lg:justify-center"
        )}>
          <button 
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md w-full",
              "text-white/70 hover:bg-forest hover:text-mint transition-all group",
              !isSidebarOpen && "lg:justify-center lg:w-auto"
            )}
          >
            <LogOut 
              size={20} 
              className="group-hover:scale-110 transition-transform"
            />
            <span className={cn(
              "font-medium text-sm",
              !isSidebarOpen && "lg:hidden"
            )}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="h-16 border-b border-mint/10 flex items-center px-4">
          <h2 className="text-white/90 font-medium">
            {navigationItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
          </h2>
        </header>
        <main className="p-4">{children}</main>
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