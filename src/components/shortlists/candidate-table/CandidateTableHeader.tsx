
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CandidateTableHeaderProps {
  candidatesCount: number;
  onClearMatches: () => void;
}

export const CandidateTableHeader = ({
  candidatesCount,
  onClearMatches,
}: CandidateTableHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-aptiv-gray-600">
        {candidatesCount} candidates matched
      </div>
      {candidatesCount > 0 && (
        <Button
          variant="destructive"
          size="sm"
          onClick={onClearMatches}
          className="bg-red-600 hover:bg-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Matches
        </Button>
      )}
    </div>
  );
};
