
import React from "react";

interface BasicInformationProps {
  name: string;
  role: string;
  location: string;
  experience: string | number;
  showContact: boolean;
}

export function BasicInformation({ name, role, location, experience, showContact }: BasicInformationProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">Basic Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Name:</p>
          <p className="font-medium">
            {showContact ? name || 'Unknown' : '[NAME REDACTED]'}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Role:</p>
          <p className="font-medium">{role || 'Not specified'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Location:</p>
          <p className="font-medium">
            {showContact ? location || 'Not specified' : '[LOCATION REDACTED]'}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Experience:</p>
          <p className="font-medium">{experience ? `${experience} years` : 'Not specified'}</p>
        </div>
      </div>
    </div>
  );
}
