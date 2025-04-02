
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
      improvements: ["Stakeholder communication", "Budget planning"],
      performanceBreakdown: [
        { name: "Planning & Organization", score: 92 },
        { name: "Team Management", score: 85 },
        { name: "Risk Assessment", score: 90 },
        { name: "Communication", score: 76 },
        { name: "Budget Management", score: 79 }
      ],
      recommendations: [
        "Consider advanced training in stakeholder communication techniques",
        "Explore budget planning methodologies for large-scale projects",
        "Join the project management community of practice"
      ],
      detailedQuestions: [
        {
          question: "What is the primary purpose of a project charter?",
          userAnswer: "To formally authorize the project and document initial requirements",
          isCorrect: true,
          explanation: "The project charter formally authorizes the existence of the project and provides the project manager with the authority to apply resources to project activities."
        },
        {
          question: "Which of the following is NOT typically included in a risk management plan?",
          userAnswer: "Detailed financial forecasts for the next fiscal year",
          isCorrect: true,
          explanation: "Financial forecasts are part of financial planning, not specifically the risk management plan."
        },
        {
          question: "What is the best way to handle stakeholders who have high influence but low interest in the project?",
          userAnswer: "Monitor them with minimum effort",
          isCorrect: false,
          correctAnswer: "Keep them satisfied",
          explanation: "High influence stakeholders should be kept satisfied even if they have low interest, as they can significantly impact the project if they become dissatisfied."
        }
      ]
    },
    {
      id: "lead-1",
      title: "Leadership Assessment",
      completedDate: "2024-04-02",
      score: 92,
      strengths: ["Team motivation", "Conflict resolution", "Strategic vision"],
      improvements: ["Delegation", "Work-life balance promotion"],
      performanceBreakdown: [
        { name: "Strategic Thinking", score: 95 },
        { name: "Team Building", score: 93 },
        { name: "Conflict Resolution", score: 94 },
        { name: "Delegation", score: 82 },
        { name: "Emotional Intelligence", score: 91 }
      ],
      recommendations: [
        "Practice delegating more significant tasks to team members",
        "Implement work-life balance initiatives for your team",
        "Join a leadership mentorship program"
      ],
      detailedQuestions: [
        {
          question: "What leadership style emphasizes collaboration and team input in decision-making?",
          userAnswer: "Democratic leadership",
          isCorrect: true,
          explanation: "Democratic leadership involves team members in decision-making processes and encourages collaboration."
        },
        {
          question: "What is the primary benefit of delegation for a leader?",
          userAnswer: "It reduces the leader's workload",
          isCorrect: false,
          correctAnswer: "It develops team members' skills and builds trust",
          explanation: "While reducing workload is a benefit, the primary benefit of delegation is developing team members and building trust and capability within the team."
        }
      ]
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
