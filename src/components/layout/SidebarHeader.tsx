
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
          src="/lovable-uploads/54b4b57c-dd47-4a8d-9d91-f39d95bddd82.png" 
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
