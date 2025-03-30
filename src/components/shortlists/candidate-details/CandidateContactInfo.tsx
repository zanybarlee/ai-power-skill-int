
import React from 'react';

interface CandidateContactInfoProps {
  email: string;
  phone: string;
  location: string;
  matched_at: string;
}

export const CandidateContactInfo = ({
  email,
  phone,
  location,
  matched_at,
}: CandidateContactInfoProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-aptiv/5 rounded-lg">
      <div className="space-y-2">
        <h3 className="font-medium text-aptiv-gray-700">Contact Information</h3>
        <p className="text-sm text-aptiv-gray-600">Email: {email}</p>
        <p className="text-sm text-aptiv-gray-600">Phone: {phone}</p>
        <p className="text-sm text-aptiv-gray-600">Location: {location}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-aptiv-gray-700">Match Details</h3>
        <p className="text-sm text-aptiv-gray-600">
          Matched At: {new Date(matched_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
