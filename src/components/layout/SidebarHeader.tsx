
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const SidebarHeader = ({ isSidebarOpen, onToggleSidebar }: SidebarHeaderProps) => {
  return (
    <div className="h-16 flex items-center justify-between px-4 border-b border-aptiv/10">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/b704481d-f77d-4afa-9e3f-249a3adc666f.png" 
          alt="CENS Logo" 
          className={cn(
            "h-8",
            isSidebarOpen ? "w-32" : "w-12 lg:w-12"
          )}
        />
      </div>
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-aptiv-gray-600 rounded-md text-white"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
};
