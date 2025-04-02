
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DevelopmentPlanCard = () => {
  return (
    <Card className="p-6 bg-white border-aptiv/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-aptiv-gray-700">Your Development Plan</h3>
          <p className="text-sm text-aptiv-gray-500">
            A customized learning path based on your skill gaps and career goals
          </p>
        </div>
        <Button variant="outline" size="sm">
          Edit Plan
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="border-l-4 border-aptiv pl-4">
          <h4 className="font-medium text-aptiv-gray-700">Short-term (1-3 months)</h4>
          <ul className="mt-2 space-y-2">
            <li className="text-sm text-aptiv-gray-600">Complete "Cloud Architecture Fundamentals" course</li>
            <li className="text-sm text-aptiv-gray-600">Participate in weekly hands-on lab sessions</li>
            <li className="text-sm text-aptiv-gray-600">Shadow senior architect on current project</li>
          </ul>
        </div>
        
        <div className="border-l-4 border-aptiv-gray-300 pl-4">
          <h4 className="font-medium text-aptiv-gray-700">Medium-term (3-6 months)</h4>
          <ul className="mt-2 space-y-2">
            <li className="text-sm text-aptiv-gray-600">Begin Kubernetes certification preparation</li>
            <li className="text-sm text-aptiv-gray-600">Attend Strategic Leadership workshop</li>
            <li className="text-sm text-aptiv-gray-600">Lead a small technical project applying new skills</li>
          </ul>
        </div>
        
        <div className="border-l-4 border-aptiv-gray-300 pl-4">
          <h4 className="font-medium text-aptiv-gray-700">Long-term (6-12 months)</h4>
          <ul className="mt-2 space-y-2">
            <li className="text-sm text-aptiv-gray-600">Obtain Kubernetes Administrator certification</li>
            <li className="text-sm text-aptiv-gray-600">Complete advanced cloud architecture coursework</li>
            <li className="text-sm text-aptiv-gray-600">Mentor junior team members in cloud technologies</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
