
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
          src="/lovable-uploads/5d0792c7-11b1-4e59-af76-3c687201c682.png" 
          alt="Aptiv8 Logo" 
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
