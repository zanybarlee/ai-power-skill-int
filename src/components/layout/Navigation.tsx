
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/config/navigation";

interface NavigationProps {
  isSidebarOpen: boolean;
}

export const Navigation = ({ isSidebarOpen }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className={cn(
      "flex-1 p-4 flex flex-col gap-2",
      !isSidebarOpen && "lg:items-center"
    )}>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md",
            "hover:bg-aptiv hover:text-white",
            location.pathname === item.path
              ? "bg-aptiv text-white"
              : "text-aptiv-gray-200",
            !isSidebarOpen && "lg:justify-center"
          )}
        >
          <item.icon size={20} />
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
  );
};
