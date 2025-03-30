
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkX, Mail } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  email: string;
  match_score: number;
  job_title?: string;
  job_id?: string;
}

interface CandidateTableRowProps {
  candidate: Candidate;
  onRowClick: (id: string) => void;
  onContact: (email: string) => void;
  onRemove: (id: string) => void;
}

export const CandidateTableRow = ({
  candidate,
  onRowClick,
  onContact,
  onRemove,
}: CandidateTableRowProps) => {
  return (
    <TableRow
      key={candidate.id}
      className="border-aptiv/10 hover:bg-aptiv/5 cursor-pointer"
      onClick={() => onRowClick(candidate.id)}
    >
      <TableCell className="text-aptiv-gray-700 font-medium">
        {candidate.name}
      </TableCell>
      <TableCell className="text-aptiv-gray-600">{candidate.job_title || "Unknown Job"}</TableCell>
      <TableCell className="text-aptiv-gray-600">{candidate.location}</TableCell>
      <TableCell className="text-aptiv-gray-600">{candidate.experience}</TableCell>
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
      <TableCell className="text-aptiv-gray-600">{candidate.match_score}%</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onContact(candidate.email)}
            className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(candidate.id)}
            className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
          >
            <BookmarkX className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
