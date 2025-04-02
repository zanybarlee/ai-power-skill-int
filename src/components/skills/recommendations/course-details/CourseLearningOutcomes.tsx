
import React from "react";
import { CheckCircle } from "lucide-react";

interface CourseLearningOutcomesProps {
  learningOutcomes?: string[];
}

export const CourseLearningOutcomes = ({ learningOutcomes }: CourseLearningOutcomesProps) => {
  if (!learningOutcomes || learningOutcomes.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Learning Outcomes</h3>
      <ul className="space-y-2">
        {learningOutcomes.map((outcome, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-aptiv-gray-600">{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
