
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface CandidateSkillsProps {
  skills: string[];
}

export const CandidateSkills = ({ skills }: CandidateSkillsProps) => {
  return (
    <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
      <h3 className="font-medium text-aptiv-gray-700">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-aptiv border-aptiv/20 bg-aptiv/5"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};
