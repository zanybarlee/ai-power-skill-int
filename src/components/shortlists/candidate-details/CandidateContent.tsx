
import React from 'react';

interface CandidateContentProps {
  title: string;
  content: string;
}

export const CandidateContent = ({ title, content }: CandidateContentProps) => {
  return (
    <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
      <h3 className="font-medium text-aptiv-gray-700">{title}</h3>
      <p className="text-sm text-aptiv-gray-600 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
};
