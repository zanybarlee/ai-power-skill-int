import { useState } from "react";
import { Menu, X, PenSquare, ListTodo, Settings, LogOut } from "lucide-react";
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
      name: "Create Post",
      icon: PenSquare,
      path: "/post-job",
    },
    {
      name: "Manage Posts",
      icon: ListTodo,
      path: "/candidates",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      name: "Logout",
      icon: LogOut,
      path: "/logout",
      className: "mt-auto",
    },
  ];

  return (
    <div className="min-h-screen flex w-full bg-forest">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static h-full bg-forest-light border-r border-mint/10",
          "transition-all duration-300 z-40",
          isSidebarOpen ? "w-64" : "w-0 lg:w-20"
        )}
      >
        <div className="flex h-16 items-center px-4 border-b border-mint/10">
          <h1 className={cn("text-xl font-bold text-white", !isSidebarOpen && "lg:hidden")}>
            APTIV8
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-forest rounded-md text-mint ml-auto"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className={cn(
          "flex flex-col h-[calc(100vh-4rem)]",
          "p-4 space-y-2",
          !isSidebarOpen && "lg:items-center"
        )}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                "hover:bg-forest hover:text-mint",
                location.pathname === item.path
                  ? "bg-forest text-mint"
                  : "text-white/70",
                !isSidebarOpen && "lg:justify-center",
                item.className
              )}
            >
              <item.icon size={20} />
              <span className={cn("font-medium", !isSidebarOpen && "lg:hidden")}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
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