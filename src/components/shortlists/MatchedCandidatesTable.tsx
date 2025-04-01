
import { Table, TableBody } from "@/components/ui/table";
// Import directly from the hooks file, not through the re-export
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
  status?: string;
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

  const handleStatusChange = async (candidateId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('cv_match')
        .update({ status })
        .eq('id', candidateId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Candidate status has been updated successfully.`,
      });
      
      // Note: In a production app, we would refresh the candidates list here
      // For now, we're relying on the parent component to handle this via refetching
      
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update candidate status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearMatches = async () => {
    try {
      // This function now just calls the prop function
      onClearMatches();
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
              onStatusChange={handleStatusChange}
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
