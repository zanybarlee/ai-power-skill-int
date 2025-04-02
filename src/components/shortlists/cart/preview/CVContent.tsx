
import React from "react";
import { blindText } from "../utils/blindingUtils";

interface CVContentProps {
  content: string;
  showContact: boolean;
  candidateName?: string;
}

export function CVContent({ content, showContact, candidateName }: CVContentProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">CV Content</h3>
      <div className="whitespace-pre-wrap text-gray-700 text-sm">
        {showContact ? 
          content || 'No CV content available' : 
          blindText(content, candidateName) || 'No CV content available'
        }
      </div>
    </div>
  );
}
