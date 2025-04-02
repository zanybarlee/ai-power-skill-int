
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Filter } from "lucide-react";
import { Assessment } from "./types/assessmentTypes";

interface AssessmentCardProps {
  assessment: Assessment;
  onStartAssessment: (id: string, title: string) => void;
}

export const AssessmentCard = ({ assessment, onStartAssessment }: AssessmentCardProps) => {
  return (
    <Card key={assessment.id} className="p-5 border-aptiv/10 hover:shadow-md transition-shadow">
      <h4 className="font-medium text-aptiv-gray-700">{assessment.title}</h4>
      <p className="text-sm text-aptiv-gray-500 mt-1 mb-3">{assessment.description}</p>
      
      <div className="flex justify-between text-xs text-aptiv-gray-500 mb-4">
        <div className="flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1" />
          {assessment.duration}
        </div>
        <div className="flex items-center">
          <BookOpen className="w-3.5 h-3.5 mr-1" />
          {assessment.questions} questions
        </div>
      </div>
      
      <Button 
        className="w-full bg-aptiv hover:bg-aptiv-dark"
        onClick={() => onStartAssessment(assessment.id, assessment.title)}
      >
        Start Assessment
      </Button>
    </Card>
  );
};
