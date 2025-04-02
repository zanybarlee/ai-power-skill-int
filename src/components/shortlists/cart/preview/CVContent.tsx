
import React from "react";
import ReactMarkdown from "react-markdown";

interface CVContentProps {
  content: string;
}

export function CVContent({ content }: CVContentProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">CV Content</h3>
      {content ? (
        <div className="prose prose-sm max-w-none text-gray-700">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <div className="text-gray-700 text-sm">No CV content available</div>
      )}
    </div>
  );
}
