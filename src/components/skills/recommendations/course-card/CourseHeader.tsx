
import React from "react";

interface CourseHeaderProps {
  title: string;
  provider: string;
}

export const CourseHeader = ({ title, provider }: CourseHeaderProps) => {
  return (
    <div className="mb-3">
      <h4 className="font-medium text-aptiv-gray-700">{title}</h4>
      <p className="text-sm text-aptiv-gray-500">by {provider}</p>
    </div>
  );
};
