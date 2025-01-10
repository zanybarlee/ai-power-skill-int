import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        <div className="flex h-16 items-center justify-between px-4 border-b border-mint/10">
          <h1 className={cn("text-mint font-semibold", !isSidebarOpen && "lg:hidden")}>
            TalentSource
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-forest rounded-md text-mint"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className={cn("p-4", !isSidebarOpen && "lg:items-center lg:justify-center")}>
          {/* Navigation items will go here */}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="h-16 border-b border-mint/10 flex items-center px-4">
          <h2 className="text-white/90 font-medium">Dashboard</h2>
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