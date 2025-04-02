
import React from "react";

interface MatchInformationProps {
  matchScore: number;
  jobTitle: string;
  matchedAt?: string;
}

export function MatchInformation({ matchScore, jobTitle, matchedAt }: MatchInformationProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">Match Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Match Score:</p>
          <p className="font-medium text-aptiv">{Math.round(matchScore || 0)}%</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Job Title:</p>
          <p className="font-medium">{jobTitle || 'Not specified'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Matched At:</p>
          <p className="font-medium">
            {matchedAt ? 
              new Date(matchedAt).toLocaleDateString() : 
              'Unknown'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
