
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { CandidateDetailsDialog } from "@/components/shortlists/CandidateDetailsDialog";
import { useCandidateDetails } from "@/components/shortlists/candidate-table/useCandidateDetails";
import { Badge } from "../ui/badge";

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
  const {
    selectedCandidateId,
    candidateDetails,
    isDialogOpen,
    fetchCandidateDetails,
    handleCloseDialog,
  } = useCandidateDetails();

  const handleRowClick = (id: string) => {
    fetchCandidateDetails(id);
  };

  return (
    <>
      <ScrollArea className="h-[600px] rounded-md border border-aptiv/10">
        <Table>
          <TableHeader className="bg-aptiv/5">
            <TableRow>
              <TableHead className="text-aptiv-gray-700">Name</TableHead>
              <TableHead className="text-aptiv-gray-700">Role</TableHead>
              <TableHead className="text-aptiv-gray-700">Experience</TableHead>
              <TableHead className="text-aptiv-gray-700">Location</TableHead>
              <TableHead className="text-aptiv-gray-700">Skills</TableHead>
              <TableHead className="text-aptiv-gray-700">Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow 
                key={candidate.id} 
                className="hover:bg-aptiv/5 border-aptiv/10 cursor-pointer"
                onClick={() => handleRowClick(candidate.id)}
              >
                <TableCell className="text-aptiv-gray-700">{candidate.name}</TableCell>
                <TableCell className="text-aptiv-gray-700">{candidate.role}</TableCell>
                <TableCell className="text-aptiv-gray-700">{candidate.experience}</TableCell>
                <TableCell className="text-aptiv-gray-700">{candidate.location}</TableCell>
                <TableCell className="text-aptiv-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-aptiv border-aptiv/20 bg-aptiv/5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-aptiv-gray-700">{candidate.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {candidateDetails && (
        <CandidateDetailsDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          candidate={candidateDetails}
        />
      )}
    </>
  );
};
