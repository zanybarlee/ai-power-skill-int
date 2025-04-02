
import React from "react";

interface CourseSyllabusProps {
  syllabus?: string[];
}

export const CourseSyllabus = ({ syllabus }: CourseSyllabusProps) => {
  if (!syllabus || syllabus.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Course Syllabus</h3>
      <ul className="space-y-2">
        {syllabus.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-aptiv/10 text-aptiv flex items-center justify-center mr-2 text-xs">
              {index + 1}
            </span>
            <span className="text-aptiv-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
