
import React from 'react';

interface CandidateAdditionalInfoProps {
  nationality?: string;
  current_salary?: number;
  expected_salary?: number;
  notice_period?: string;
}

export const CandidateAdditionalInfo = ({
  nationality,
  current_salary,
  expected_salary,
  notice_period,
}: CandidateAdditionalInfoProps) => {
  // Check if any information is available to display
  if (!nationality && !current_salary && !expected_salary && !notice_period) return null;
  
  return (
    <div className="space-y-2 p-4 bg-white rounded-lg border border-aptiv/10">
      <h3 className="font-medium text-aptiv-gray-700">Additional Information</h3>
      {nationality && (
        <p className="text-sm text-aptiv-gray-600">
          Nationality: {nationality}
        </p>
      )}
      {current_salary && (
        <p className="text-sm text-aptiv-gray-600">
          Current Salary: ${current_salary.toLocaleString()}
        </p>
      )}
      {expected_salary && (
        <p className="text-sm text-aptiv-gray-600">
          Expected Salary: ${expected_salary.toLocaleString()}
        </p>
      )}
      {notice_period && (
        <p className="text-sm text-aptiv-gray-600">
          Notice Period: {notice_period}
        </p>
      )}
    </div>
  );
};
