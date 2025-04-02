
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InfoIcon, Book, Award, ClipboardList, CheckCircle, XCircle } from "lucide-react";
import { CompletedAssessment } from "./types/assessmentTypes";

interface AssessmentDetailsDialogProps {
  assessment: CompletedAssessment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AssessmentDetailsDialog = ({ assessment, open, onOpenChange }: AssessmentDetailsDialogProps) => {
  const scoreClass = assessment.score >= 80 
    ? "text-green-500" 
    : assessment.score >= 60 
      ? "text-amber-500" 
      : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-aptiv-gray-700 flex items-center gap-2">
            <Book className="h-5 w-5" />
            {assessment.title} Assessment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Summary Card */}
          <Card className="p-5 border-aptiv/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-aptiv-gray-700">Assessment Summary</h3>
                <p className="text-sm text-aptiv-gray-500">
                  Completed on: {new Date(assessment.completedDate).toLocaleDateString()}
                </p>
              </div>
              <div className={`text-2xl font-bold mt-2 sm:mt-0 ${scoreClass}`}>
                Score: {assessment.score}%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-aptiv-gray-600 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1.5 text-aptiv" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {assessment.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-aptiv-gray-600 flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-aptiv-gray-600 mb-2 flex items-center">
                    <ClipboardList className="w-4 h-4 mr-1.5 text-aptiv" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {assessment.improvements.map((improvement, i) => (
                      <li key={i} className="text-sm text-aptiv-gray-600 flex items-start">
                        <XCircle className="w-4 h-4 text-amber-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-aptiv-gray-600 mb-2 flex items-center">
                    <InfoIcon className="w-4 h-4 mr-1.5 text-aptiv" />
                    Performance Breakdown
                  </h4>
                  <div className="space-y-3">
                    {assessment.performanceBreakdown?.map((area, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-aptiv-gray-600">{area.name}</span>
                          <span className="font-medium">{area.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-aptiv" 
                            style={{ width: `${area.score}%` }}
                          ></div>
                        </div>
                      </div>
                    )) || (
                      <p className="text-sm text-aptiv-gray-500 italic">
                        Detailed breakdown not available for this assessment.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-aptiv-gray-600 mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {assessment.recommendations?.map((recommendation, i) => (
                      <li key={i} className="text-sm text-aptiv-gray-600">
                        • {recommendation}
                      </li>
                    )) || (
                      <li className="text-sm text-aptiv-gray-500 italic">
                        Personalized recommendations are being generated.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Assessment Details */}
          <Card className="p-5 border-aptiv/10">
            <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Detailed Results</h3>
            
            {assessment.detailedQuestions?.map((question, i) => (
              <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <p className="font-medium text-aptiv-gray-700 mb-2">Question {i + 1}: {question.question}</p>
                <div className="pl-4 border-l-2 border-aptiv">
                  <p className="text-sm text-aptiv-gray-600 mb-1">
                    <span className="font-medium">Your answer:</span> {question.userAnswer}
                  </p>
                  <p className={`text-sm ${question.isCorrect ? 'text-green-500' : 'text-red-500'} mb-2`}>
                    {question.isCorrect ? 'Correct' : 'Incorrect'}
                  </p>
                  {!question.isCorrect && question.correctAnswer && (
                    <p className="text-sm text-aptiv-gray-600">
                      <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                    </p>
                  )}
                  {question.explanation && (
                    <p className="text-sm text-aptiv-gray-500 mt-2 bg-gray-50 p-2 rounded">
                      {question.explanation}
                    </p>
                  )}
                </div>
              </div>
            )) || (
              <p className="text-aptiv-gray-500 italic">
                Detailed question analysis is not available for this assessment.
              </p>
            )}
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-aptiv hover:bg-aptiv-dark">
            Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
