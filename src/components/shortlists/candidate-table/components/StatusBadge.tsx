
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusLabel } from "../utils/statusUtils";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className={`${getStatusColor(status || 'matched')} px-2 py-1 text-xs inline-block`}
    >
      {getStatusLabel(status || 'matched')}
    </Badge>
  );
};
