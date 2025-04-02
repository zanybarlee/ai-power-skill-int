
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, BarChart2, TrendingUp, AlertTriangle } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface GapAnalysisDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportTitle: string;
  reportType: "cloud" | "leadership" | "technical" | "other";
}

export const GapAnalysisDetailDialog = ({
  open,
  onOpenChange,
  reportTitle,
  reportType,
}: GapAnalysisDetailDialogProps) => {
  // Define different report data based on the report type
  const getReportData = () => {
    switch (reportType) {
      case "cloud":
        return {
          impactAreas: [
            { area: "System Migration", impact: "High", description: "Delayed migration from legacy systems" },
            { area: "Scalability", impact: "High", description: "Limited ability to handle increased workloads" },
            { area: "Cost Efficiency", impact: "Medium", description: "Higher operational costs (15-20% increase)" },
            { area: "Innovation", impact: "Medium", description: "Reduced ability to implement new cloud-native features" },
          ],
          recommendations: [
            "Prioritize cloud architecture training for senior developers",
            "Implement a mentorship program with experienced cloud architects",
            "Create a phased migration plan for legacy systems",
            "Develop internal documentation on cloud best practices",
          ],
          metrics: [
            { metric: "Migration Delays", current: "3-4 months", target: "1 month" },
            { metric: "Cloud Spend Efficiency", current: "65%", target: "85%" },
            { metric: "Deployment Frequency", current: "Bi-weekly", target: "Daily" },
            { metric: "Service Availability", current: "99.5%", target: "99.95%" },
          ],
        };
      case "leadership":
        return {
          impactAreas: [
            { area: "Project Delivery", impact: "Medium", description: "Average 8% delay in project timelines" },
            { area: "Team Productivity", impact: "Medium", description: "Estimated 8-10% efficiency loss" },
            { area: "Resource Allocation", impact: "Low", description: "Suboptimal resource distribution" },
            { area: "Strategic Alignment", impact: "High", description: "Misalignment between team execution and strategic goals" },
          ],
          recommendations: [
            "Implement strategic planning workshops for mid-level managers",
            "Establish a leadership community of practice for peer learning",
            "Create a formal mentorship program with executive leaders",
            "Develop KPIs that align team performance with strategic goals",
          ],
          metrics: [
            { metric: "Project Timeline Adherence", current: "82%", target: "95%" },
            { metric: "Team Satisfaction", current: "75%", target: "90%" },
            { metric: "Strategic Goal Alignment", current: "70%", target: "95%" },
            { metric: "Resource Utilization", current: "78%", target: "90%" },
          ],
        };
      default:
        return {
          impactAreas: [
            { area: "Business Process", impact: "Medium", description: "Moderate impact on operations" },
            { area: "Team Capability", impact: "Medium", description: "Skills gap affecting performance" },
            { area: "Innovation", impact: "Low", description: "Some limitations on new initiatives" },
          ],
          recommendations: [
            "Conduct targeted training in identified skill areas",
            "Implement knowledge sharing sessions",
            "Review and revise standard operating procedures",
          ],
          metrics: [
            { metric: "Process Efficiency", current: "75%", target: "90%" },
            { metric: "Skill Proficiency", current: "70%", target: "85%" },
            { metric: "Innovation Rate", current: "65%", target: "80%" },
          ],
        };
    }
  };

  const reportData = getReportData();
  
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high": return "text-red-500 bg-red-50";
      case "medium": return "text-amber-500 bg-amber-50";
      case "low": return "text-green-500 bg-green-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-aptiv-gray-700">
              {reportTitle} Impact Analysis
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="text-aptiv-gray-500">
            Detailed analysis of business impact and recommended actions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Summary Section */}
          <div className="bg-aptiv-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-aptiv-gray-700 mb-2 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-aptiv" />
              Impact Summary
            </h3>
            <p className="text-sm text-aptiv-gray-600">
              {reportType === "cloud" 
                ? "Current skill gaps in cloud architecture are creating significant bottlenecks in your digital transformation initiatives, affecting system migration timelines and increasing operational costs."
                : reportType === "leadership" 
                ? "Gaps in strategic planning skills among mid-level managers are contributing to project delays and reduced team productivity, with measurable impacts on delivery timelines and resource utilization."
                : "Identified skill gaps are affecting operational efficiency and innovation capacity, with moderate impact on business performance metrics."}
            </p>
          </div>

          {/* Impact Areas Table */}
          <div>
            <h3 className="text-lg font-medium text-aptiv-gray-700 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
              Business Impact Areas
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Impact Area</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.impactAreas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.area}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                        {item.impact}
                      </span>
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Recommendations Section */}
          <div>
            <h3 className="text-lg font-medium text-aptiv-gray-700 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Recommended Actions
            </h3>
            <ul className="space-y-2">
              {reportData.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">
                    {index + 1}
                  </span>
                  <span className="text-aptiv-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics Table */}
          <div>
            <h3 className="text-lg font-medium text-aptiv-gray-700 mb-3">Performance Metrics</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Current State</TableHead>
                  <TableHead>Target State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.metrics.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell>{item.current}</TableCell>
                    <TableCell className="text-aptiv">{item.target}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button className="bg-aptiv hover:bg-aptiv-dark">Download Full Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
