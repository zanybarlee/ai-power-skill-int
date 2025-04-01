
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStatusColor, getStatusLabel, STATUS_OPTIONS } from "../utils/statusUtils";

interface StatusDropdownProps {
  status: string;
  onStatusChange: (status: string) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export const StatusDropdown = ({ 
  status, 
  onStatusChange,
  onClick
}: StatusDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => onClick?.(e)}>
        <Button 
          variant="outline" 
          size="sm" 
          className={`${getStatusColor(status || 'matched')} px-2 py-1 text-xs h-auto border shadow-sm`}
        >
          {getStatusLabel(status || 'matched')}
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white shadow-md border border-gray-200" 
        onClick={(e) => onClick?.(e)}
      >
        {STATUS_OPTIONS.map(option => (
          <DropdownMenuItem 
            key={option.value}
            className="hover:bg-gray-100" 
            onClick={() => onStatusChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
