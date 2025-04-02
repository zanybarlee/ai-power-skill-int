
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AssessmentQuestions } from "./questions";
import { AssessmentCard } from "./AssessmentCard";
import { CompletedAssessmentCard } from "./CompletedAssessmentCard";
import { useAssessmentData } from "./hooks/useAssessmentData";

interface SkillsAssessmentProps {
  userId?: string;
}

export const SkillsAssessment = ({ userId }: SkillsAssessmentProps) => {
  const { toast } = useToast();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [activeAssessmentTitle, setActiveAssessmentTitle] = useState<string>("");
  const [completedAssessments, setCompletedAssessments] = useState([
    {
      id: "proj-1",
      title: "Project Management Skills",
      completedDate: "2024-05-15",
      score: 87,
      strengths: ["Resource allocation", "Timeline management", "Risk assessment"],
      improvements: ["Stakeholder communication", "Budget planning"]
    },
    {
      id: "lead-1",
      title: "Leadership Assessment",
      completedDate: "2024-04-02",
      score: 92,
      strengths: ["Team motivation", "Conflict resolution", "Strategic vision"],
      improvements: ["Delegation", "Work-life balance promotion"]
    }
  ]);

  const { assessments } = useAssessmentData();

  const handleStartAssessment = (id: string, title: string) => {
    setActiveAssessment(id);
    setActiveAssessmentTitle(title);
    toast({
      title: "Assessment Started",
      description: "You've started the assessment. Complete all questions to receive your results.",
    });
  };

  const handleCompleteAssessment = (results: any) => {
    // In a real app, you would save these results to the database
    const newCompletedAssessment = {
      id: results.assessmentId,
      title: activeAssessmentTitle,
      completedDate: results.completedDate,
      score: results.score,
      strengths: ["Skill area identified as strength", "Another strength area"],
      improvements: ["Area for improvement", "Another improvement opportunity"]
    };

    setCompletedAssessments(prev => [newCompletedAssessment, ...prev]);
    setActiveAssessment(null);
  };

  const handleCancelAssessment = () => {
    setActiveAssessment(null);
    toast({
      title: "Assessment Cancelled",
      description: "You've cancelled the assessment. Your progress has not been saved.",
    });
  };

  // If there's an active assessment, show the assessment questions
  if (activeAssessment) {
    return (
      <AssessmentQuestions 
        assessmentId={activeAssessment}
        assessmentTitle={activeAssessmentTitle}
        onComplete={handleCompleteAssessment}
        onCancel={handleCancelAssessment}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Available Assessments */}
      <Card className="p-6 bg-white border-aptiv/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-aptiv-gray-700">Available Assessments</h3>
          {/* Filter button moved to AssessmentCard component */}
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onStartAssessment={handleStartAssessment}
            />
          ))}
        </div>
      </Card>

      {/* Completed Assessments */}
      <Card className="p-6 bg-white border-aptiv/10">
        <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Completed Assessments</h3>
        
        {completedAssessments.length > 0 ? (
          <div className="space-y-4">
            {completedAssessments.map((assessment) => (
              <CompletedAssessmentCard 
                key={assessment.id} 
                assessment={assessment} 
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-aptiv-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>You haven't completed any assessments yet</p>
          </div>
        )}
      </Card>
    </div>
  );
};
