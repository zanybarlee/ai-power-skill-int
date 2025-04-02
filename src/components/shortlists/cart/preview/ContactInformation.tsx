
import React from "react";
import { EyeOff } from "lucide-react";

interface ContactInformationProps {
  email?: string;
  phone?: string;
  showContact: boolean;
}

export function ContactInformation({ email, phone, showContact }: ContactInformationProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
      {showContact ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email:</p>
            <p className="font-medium">{email || 'Not provided'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Phone:</p>
            <p className="font-medium">{phone || 'Not provided'}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-700">
            <EyeOff className="h-4 w-4 inline-block mr-2" />
            Contact information is hidden for candidate privacy
          </p>
        </div>
      )}
    </div>
  );
}
