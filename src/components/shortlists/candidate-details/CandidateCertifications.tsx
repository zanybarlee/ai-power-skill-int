
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface CandidateCertificationsProps {
  certifications: string[];
}

export const CandidateCertifications = ({ certifications }: CandidateCertificationsProps) => {
  if (!certifications || certifications.length === 0) return null;
  
  return (
    <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
      <h3 className="font-medium text-aptiv-gray-700">Certifications</h3>
      <div className="flex flex-wrap gap-2">
        {certifications.map((cert, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-aptiv border-aptiv/20 bg-aptiv/5"
          >
            {cert}
          </Badge>
        ))}
      </div>
    </div>
  );
};
