
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface CourseActionsProps {
  onEnroll: (courseTitle: string) => void;
  courseTitle: string;
  onOpenChange: (open: boolean) => void;
}

export const CourseActions = ({ onEnroll, courseTitle, onOpenChange }: CourseActionsProps) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button 
        variant="outline" 
        className="flex items-center"
        onClick={() => window.open("https://example.com/course-catalog", "_blank")}
      >
        Provider Website
        <ExternalLink className="ml-1 h-4 w-4" />
      </Button>
      <Button 
        className="bg-aptiv hover:bg-aptiv-dark"
        onClick={() => {
          onEnroll(courseTitle);
          onOpenChange(false);
        }}
      >
        Enroll Now
      </Button>
    </div>
  );
};
