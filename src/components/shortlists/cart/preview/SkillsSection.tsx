
import React from "react";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  skills: string[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills && Array.isArray(skills) ? 
          skills.map((skill: string, i: number) => (
            <Badge 
              key={i} 
              variant="outline" 
              className="bg-aptiv/5 text-aptiv border-aptiv/20"
            >
              {skill}
            </Badge>
          )) : 
          <p className="text-gray-500">No skills listed</p>
        }
      </div>
    </div>
  );
}
