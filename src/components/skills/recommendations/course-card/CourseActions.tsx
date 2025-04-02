
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface CourseActionsProps {
  onEnroll: () => void;
  onViewDetails: () => void;
  isTeamCourse: boolean;
}

export const CourseActions = ({ onEnroll, onViewDetails, isTeamCourse }: CourseActionsProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        className="bg-aptiv hover:bg-aptiv-dark"
        onClick={onEnroll}
      >
        {isTeamCourse ? "Request for Team" : "Enroll Now"}
      </Button>
      <Button 
        variant="outline"
        onClick={onViewDetails}
      >
        Learn More <ExternalLink className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
};
