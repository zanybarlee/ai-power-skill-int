import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  availability: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
}

export const CandidateTable = ({ candidates }: CandidateTableProps) => {
  return (
    <ScrollArea className="h-[600px] rounded-md border border-mint/10">
      <Table>
        <TableHeader className="bg-forest">
          <TableRow>
            <TableHead className="text-mint">Name</TableHead>
            <TableHead className="text-mint">Role</TableHead>
            <TableHead className="text-mint">Experience</TableHead>
            <TableHead className="text-mint">Location</TableHead>
            <TableHead className="text-mint">Skills</TableHead>
            <TableHead className="text-mint">Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id} className="hover:bg-forest border-mint/10">
              <TableCell className="text-white">{candidate.name}</TableCell>
              <TableCell className="text-white">{candidate.role}</TableCell>
              <TableCell className="text-white">{candidate.experience}</TableCell>
              <TableCell className="text-white">{candidate.location}</TableCell>
              <TableCell className="text-white">
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-mint/10 text-mint"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-white">{candidate.availability}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};