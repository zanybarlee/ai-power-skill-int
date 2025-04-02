
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AssessmentQuestions } from "./AssessmentQuestions";

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

  const assessments = [
    {
      id: "tech-1",
      title: "Technical Skills Assessment",
      description: "Evaluate proficiency in programming, database management, and system architecture",
      duration: "45 mins",
      questions: 35,
      status: "ready"
    },
    {
      id: "soft-1",
      title: "Soft Skills Evaluation",
      description: "Assess communication, teamwork, problem-solving, and leadership capabilities",
      duration: "30 mins",
      questions: 25,
      status: "ready"
    },
    {
      id: "mgmt-1",
      title: "Management Competency",
      description: "Evaluate strategic planning, team management, and delegation skills",
      duration: "60 mins",
      questions: 40,
      status: "ready"
    },
    {
      id: "ai-1",
      title: "AI & Data Science Knowledge",
      description: "Assess understanding of AI concepts, machine learning, and data analytics",
      duration: "50 mins",
      questions: 30,
      status: "ready"
    }
  ];

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
          <Button variant="outline" size="sm" className="text-aptiv">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {assessments.map((assessment) => (
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
                onClick={() => handleStartAssessment(assessment.id, assessment.title)}
              >
                Start Assessment
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Completed Assessments */}
      <Card className="p-6 bg-white border-aptiv/10">
        <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Completed Assessments</h3>
        
        {completedAssessments.length > 0 ? (
          <div className="space-y-4">
            {completedAssessments.map((assessment) => (
              <Card key={assessment.id} className="p-5 border-aptiv/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-aptiv-gray-700">{assessment.title}</h4>
                    <p className="text-xs text-aptiv-gray-500 mt-1">
                      Completed on: {new Date(assessment.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-aptiv/10 rounded-full px-3 py-1 text-aptiv font-medium">
                    Score: {assessment.score}%
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-aptiv-gray-600 mb-2">Strengths</h5>
                    <ul className="space-y-1">
                      {assessment.strengths.map((strength, i) => (
                        <li key={i} className="text-xs text-aptiv-gray-500 flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-aptiv-gray-600 mb-2">Areas for Improvement</h5>
                    <ul className="space-y-1">
                      {assessment.improvements.map((improvement, i) => (
                        <li key={i} className="text-xs text-aptiv-gray-500 flex items-center">
                          <Clock className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="text-aptiv">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="text-aptiv">
                    Download Report
                  </Button>
                </div>
              </Card>
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
