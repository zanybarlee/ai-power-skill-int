
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CandidateDetailsDialog } from "./CandidateDetailsDialog";
import { CandidateTableHeader } from "./candidate-table/CandidateTableHeader";
import { CandidateTableColumns } from "./candidate-table/CandidateTableColumns";
import { CandidateTableRow } from "./candidate-table/CandidateTableRow";
import { useCandidateDetails } from "./candidate-table/useCandidateDetails";

interface MatchedCandidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  email: string;
  match_score: number;
}

interface MatchedCandidatesTableProps {
  candidates: MatchedCandidate[];
  onClearMatches: () => void;
}

export const MatchedCandidatesTable = ({ candidates, onClearMatches }: MatchedCandidatesTableProps) => {
  const { toast } = useToast();
  const {
    candidateDetails,
    isDialogOpen,
    fetchCandidateDetails,
    handleCloseDialog
  } = useCandidateDetails();

  const handleRemove = (candidateId: string) => {
    toast({
      title: "Candidate removed",
      description: "The candidate has been removed from your shortlist.",
    });
  };

  const handleContact = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleClearMatches = async () => {
    try {
      const { error } = await supabase
        .from('cv_match')
        .delete()
        .not('id', 'is', null);

      if (error) throw error;

      // Clear UI state
      onClearMatches();
      
      toast({
        title: "Matches cleared",
        description: "All matches have been cleared from the table and database.",
      });
    } catch (error) {
      console.error('Error clearing matches:', error);
      toast({
        title: "Error",
        description: "Failed to clear matches. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CandidateTableHeader
        candidatesCount={candidates.length}
        onClearMatches={handleClearMatches}
      />

      <Table>
        <CandidateTableColumns />
        <TableBody>
          {candidates.map((candidate) => (
            <CandidateTableRow
              key={candidate.id}
              candidate={candidate}
              onRowClick={fetchCandidateDetails}
              onContact={handleContact}
              onRemove={handleRemove}
            />
          ))}
        </TableBody>
      </Table>

      <CandidateDetailsDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        candidate={candidateDetails}
      />
    </>
  );
};
