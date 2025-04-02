
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CourseOverviewProps {
  description: string;
  tags: string[];
}

export const CourseOverview = ({ description, tags }: CourseOverviewProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Course Overview</h3>
      <p className="text-aptiv-gray-600">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, i) => (
          <Badge key={i} variant="outline" className="bg-aptiv/10 text-aptiv border-0">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
