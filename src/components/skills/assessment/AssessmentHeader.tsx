
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface AssessmentHeaderProps {
  title: string;
}

export const AssessmentHeader = ({ title }: AssessmentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-aptiv-gray-700">{title}</h3>
      <Button variant="outline" size="sm" className="text-aptiv">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};
