
import { Progress } from "@/components/ui/progress";
import { ProgressHeaderProps } from "./types";

export const ProgressHeader = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  assessmentTitle, 
  progress 
}: ProgressHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-aptiv-gray-700">{assessmentTitle}</h3>
        <span className="text-sm text-aptiv-gray-500">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
      </div>
      <Progress value={progress} className="h-2 mb-6" />
    </>
  );
};
