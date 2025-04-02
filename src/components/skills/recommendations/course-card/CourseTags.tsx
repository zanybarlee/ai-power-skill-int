
import React from "react";

interface CourseTagsProps {
  tags: string[];
}

export const CourseTags = ({ tags }: CourseTagsProps) => {
  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {tags.map((tag: string, i: number) => (
        <span key={i} className="text-xs bg-aptiv/10 text-aptiv px-2 py-0.5 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  );
};
