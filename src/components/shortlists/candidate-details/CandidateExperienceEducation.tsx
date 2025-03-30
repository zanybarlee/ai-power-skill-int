
import React from 'react';

interface CandidateExperienceEducationProps {
  experience: number;
  education: string;
}

export const CandidateExperienceEducation = ({
  experience,
  education,
}: CandidateExperienceEducationProps) => {
  return (
    <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
      <h3 className="font-medium text-aptiv-gray-700">Experience & Education</h3>
      <p className="text-sm text-aptiv-gray-600">
        Experience: {experience} years
      </p>
      <p className="text-sm text-aptiv-gray-600">Education: {education}</p>
    </div>
  );
};
