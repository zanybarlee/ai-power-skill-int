import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkX, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

export const MatchedCandidatesTable = ({ candidates }: MatchedCandidatesTableProps) => {
  const { toast } = useToast();

  const handleRemove = (candidateId: string) => {
    toast({
      title: "Candidate removed",
      description: "The candidate has been removed from your shortlist.",
    });
  };

  const handleContact = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
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
            className="border-aptiv/10 hover:bg-aptiv/5"
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
              <div className="flex justify-end gap-2">
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
  );
};