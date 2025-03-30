
import React from "react";

interface MatchResult {
  name: string;
  score: number;
  details: string;
  email?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: number;
}

interface MatchingResultsListProps {
  matchingResults: MatchResult[];
}

export const MatchingResultsList: React.FC<MatchingResultsListProps> = ({ matchingResults }) => {
  if (matchingResults.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4 p-4 bg-white border border-aptiv/10 rounded-md">
      <h3 className="text-aptiv font-medium mb-2">Matching Results</h3>
      <div className="space-y-2">
        {matchingResults.map((result, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium">{result.name}</span>
              <span className="text-aptiv">{result.score}% Match</span>
            </div>
            {result.details && (
              <p className="text-sm text-gray-600 mt-1">{result.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
