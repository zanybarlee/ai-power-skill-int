import { useState } from "react";
import { Menu, X, FileText, Search, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

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
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed lg:static h-full bg-aptiv-gray-700",
            "transition-all duration-300 z-40 flex flex-col",
            isSidebarOpen ? "w-64" : "w-0 lg:w-20"
          )}
        >
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-aptiv/10">
            <h1 
              className={cn(
                "text-white font-bold tracking-wider",
                !isSidebarOpen && "lg:hidden"
              )}
            >
              APTIV8
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-aptiv-gray-600 rounded-md text-white transition-colors"
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
                  "hover:bg-aptiv hover:text-white group",
                  location.pathname === item.path
                    ? "bg-aptiv text-white"
                    : "text-aptiv-gray-200",
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
            "p-4 border-t border-aptiv/10",
            !isSidebarOpen && "lg:flex lg:justify-center"
          )}>
            <button 
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md w-full",
                "text-aptiv-gray-200 hover:bg-aptiv hover:text-white transition-all group",
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
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <header className="h-16 border-b border-aptiv/10 flex items-center px-4 bg-white">
            <h2 className="text-aptiv-gray-700 font-medium">
              {navigationItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
            </h2>
          </header>
          <main className="flex-1 p-4 mb-auto">
            {children}
          </main>
          <Footer />
        </div>
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