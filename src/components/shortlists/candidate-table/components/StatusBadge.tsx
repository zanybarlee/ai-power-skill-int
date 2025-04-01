
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusLabel } from "../utils/statusUtils";

interface StatusBadgeProps {
  status: string;
  jobDescriptionId?: string;
}

export const StatusBadge = ({ status, jobDescriptionId }: StatusBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className={`${getStatusColor(status || 'matched')} px-2 py-1 text-xs inline-block`}
    >
      {getStatusLabel(status || 'matched')}
      {jobDescriptionId && <span className="ml-1 opacity-75 text-2xs">(ID: {jobDescriptionId.substring(0, 6)})</span>}
    </Badge>
  );
};
