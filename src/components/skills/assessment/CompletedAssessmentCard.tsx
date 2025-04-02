
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { CompletedAssessment } from "./types/assessmentTypes";
import { AssessmentDetailsDialog } from "./AssessmentDetailsDialog";

interface CompletedAssessmentCardProps {
  assessment: CompletedAssessment;
}

export const CompletedAssessmentCard = ({ assessment }: CompletedAssessmentCardProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <Card className="p-5 border-aptiv/10">
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
          <Button 
            variant="outline" 
            size="sm" 
            className="text-aptiv"
            onClick={() => setDetailsOpen(true)}
          >
            View Details
          </Button>
          <Button variant="outline" size="sm" className="text-aptiv">
            Download Report
          </Button>
        </div>
      </Card>

      <AssessmentDetailsDialog 
        assessment={assessment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};
