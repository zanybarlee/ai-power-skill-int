
import React from "react";

interface CVContentProps {
  content: string;
}

export function CVContent({ content }: CVContentProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">CV Content</h3>
      <div className="whitespace-pre-wrap text-gray-700 text-sm">
        {content || 'No CV content available'}
      </div>
    </div>
  );
}
