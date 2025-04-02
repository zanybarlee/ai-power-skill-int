
import React from "react";

interface CoursePrerequisitesProps {
  prerequisites?: string[];
}

export const CoursePrerequisites = ({ prerequisites }: CoursePrerequisitesProps) => {
  if (!prerequisites || prerequisites.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Prerequisites</h3>
      <ul className="list-disc pl-5 space-y-1">
        {prerequisites.map((prereq, index) => (
          <li key={index} className="text-aptiv-gray-600">{prereq}</li>
        ))}
      </ul>
    </div>
  );
};
