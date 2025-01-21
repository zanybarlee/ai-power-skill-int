import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkX, Mail, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CandidateDetailsDialog } from "./CandidateDetailsDialog";

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
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [candidateDetails, setCandidateDetails] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      // Clear matches from the database
      const { error } = await supabase
        .from('cv_match')
        .delete()
        .neq('id', ''); // This will delete all records

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

  const handleRowClick = async (candidateId: string) => {
    try {
      const { data: matchData, error: matchError } = await supabase
        .from('cv_match')
        .select('*, cv_metadata(*)')
        .eq('id', candidateId)
        .single();

      if (matchError) throw matchError;

      if (matchData) {
        const details = {
          ...matchData.cv_metadata,
          match_score: matchData.match_score,
          job_description: matchData.job_description,
          matched_at: matchData.matched_at,
        };
        setCandidateDetails(details);
        setSelectedCandidateId(candidateId);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      toast({
        title: "Error",
        description: "Failed to load candidate details.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-aptiv-gray-600">
          {candidates.length} candidates matched
        </div>
        {candidates.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearMatches}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Matches
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-aptiv/10">
            <TableHead className="text-aptiv-gray-600">Name</TableHead>
            <TableHead className="text-aptiv-gray-600">Role</TableHead>
            <TableHead className="text-aptiv-gray-600">Location</TableHead>
            <TableHead className="text-aptiv-gray-600">Experience</TableHead>
            <TableHead className="text-aptiv-gray-600">Skills</TableHead>
            <TableHead className="text-aptiv-gray-600">Match Score</TableHead>
            <TableHead className="text-aptiv-gray-600 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow
              key={candidate.id}
              className="border-aptiv/10 hover:bg-aptiv/5 cursor-pointer"
              onClick={() => handleRowClick(candidate.id)}
            >
              <TableCell className="text-aptiv-gray-700 font-medium">
                {candidate.name}
              </TableCell>
              <TableCell className="text-aptiv-gray-600">
                {candidate.role}
              </TableCell>
              <TableCell className="text-aptiv-gray-600">
                {candidate.location}
              </TableCell>
              <TableCell className="text-aptiv-gray-600">
                {candidate.experience}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-aptiv border-aptiv/20 bg-aptiv/5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-aptiv-gray-600">
                {candidate.match_score}%
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleContact(candidate.email)}
                    className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(candidate.id)}
                    className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
                  >
                    <BookmarkX className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CandidateDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedCandidateId(null);
          setCandidateDetails(null);
        }}
        candidate={candidateDetails}
      />
    </>
  );
};