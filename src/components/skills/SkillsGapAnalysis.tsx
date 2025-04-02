
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
import { useSkillsData } from "@/hooks/skills/useSkillsData";

interface SkillsGapAnalysisProps {
  userId?: string;
  onViewRecommendations?: () => void;
}

export const SkillsGapAnalysis = ({ userId, onViewRecommendations }: SkillsGapAnalysisProps) => {
  const { skillGaps, isLoading } = useSkillsData(userId);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="h-8 w-8 border-t-2 border-b-2 border-aptiv rounded-full animate-spin"></div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-50";
      case "medium": return "text-amber-500 bg-amber-50";
      case "low": return "text-green-500 bg-green-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6 bg-white border-aptiv/10">
        <h3 className="text-lg font-medium text-aptiv-gray-700">Skills Gap Summary</h3>
        <p className="text-sm text-aptiv-gray-500 mt-1 mb-4">
          Based on your organization's needs and employee assessments, we've identified these key skill gaps.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4 flex items-center">
            <AlertTriangle className="text-red-500 w-8 h-8 mr-3" />
            <div>
              <p className="text-sm font-medium text-aptiv-gray-700">Critical Gaps</p>
              <p className="text-2xl font-semibold text-red-500">5</p>
            </div>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4 flex items-center">
            <AlertTriangle className="text-amber-500 w-8 h-8 mr-3" />
            <div>
              <p className="text-sm font-medium text-aptiv-gray-700">Moderate Gaps</p>
              <p className="text-2xl font-semibold text-amber-500">8</p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex items-center">
            <CheckCircle className="text-green-500 w-8 h-8 mr-3" />
            <div>
              <p className="text-sm font-medium text-aptiv-gray-700">Aligned Skills</p>
              <p className="text-2xl font-semibold text-green-500">32</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Detailed Gap Analysis */}
      {skillGaps.map((category, idx) => (
        <Card key={idx} className="p-6 bg-white border-aptiv/10">
          <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">{category.category} Skills</h3>
          
          <div className="space-y-6">
            {category.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-aptiv-gray-700">{skill.name}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityColor(skill.priority)}`}>
                      {skill.priority} priority
                    </span>
                  </div>
                  <span className="text-sm text-aptiv-gray-500">
                    {skill.current}% / {skill.required}%
                  </span>
                </div>
                
                <div className="relative pt-2">
                  <Progress value={skill.current} className="h-2 bg-gray-200" />
                  <div 
                    className="absolute top-0 bottom-0 border-r-2 border-red-500" 
                    style={{ left: `${skill.required}%`, height: '100%' }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-aptiv-gray-500">
                  <span>Current Level</span>
                  <span>Required Level</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              className="bg-aptiv hover:bg-aptiv-dark"
              onClick={onViewRecommendations}
            >
              View Training Recommendations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      ))}
      
      {/* Business Impact */}
      <Card className="p-6 bg-white border-aptiv/10">
        <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2">Business Impact Analysis</h3>
        <p className="text-sm text-aptiv-gray-500 mb-4">
          Understanding how skills gaps affect business outcomes and strategic objectives.
        </p>
        
        <div className="border border-aptiv/10 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-aptiv-gray-700 mb-2">Cloud Architecture Gap Impact</h4>
          <p className="text-sm text-aptiv-gray-500">
            Current skill gaps in cloud architecture are limiting your organization's ability to migrate legacy systems 
            and implement scalable solutions, potentially increasing operational costs by 15-20%.
          </p>
          <Button variant="link" className="text-aptiv p-0 h-auto mt-2">
            View detailed report <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
        
        <div className="border border-aptiv/10 rounded-lg p-4">
          <h4 className="font-medium text-aptiv-gray-700 mb-2">Leadership Skills Gap Impact</h4>
          <p className="text-sm text-aptiv-gray-500">
            Gaps in strategic planning skills among mid-level managers may be contributing to project delays 
            and reduced team productivity, with an estimated 8% efficiency loss.
          </p>
          <Button variant="link" className="text-aptiv p-0 h-auto mt-2">
            View detailed report <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
