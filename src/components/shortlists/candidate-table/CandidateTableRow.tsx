
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./components/StatusBadge";
import { StatusDropdown } from "./components/StatusDropdown";
import { CandidateActions } from "./components/CandidateActions";

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
  job_description?: string;
  job_role?: string;
  status?: string;
}

interface CandidateTableRowProps {
  candidate: Candidate;
  onRowClick: (id: string) => void;
  onContact: (email: string) => void;
  onRemove: (id: string, jobDescriptionId?: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

export const CandidateTableRow = ({
  candidate,
  onRowClick,
  onContact,
  onRemove,
  onStatusChange,
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
      <TableCell className="text-aptiv-gray-600">{candidate.job_role || candidate.role || "Unknown Role"}</TableCell>
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
      <TableCell>
        {onStatusChange ? (
          <StatusDropdown 
            status={candidate.status || 'matched'} 
            onStatusChange={(status) => onStatusChange(candidate.id, status)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <StatusBadge status={candidate.status || 'matched'} jobDescriptionId={candidate.job_id} />
        )}
      </TableCell>
      <TableCell className="text-right">
        <CandidateActions 
          email={candidate.email}
          candidateId={candidate.id}
          candidate={candidate}
          jobDescriptionId={candidate.job_id}
          onContact={onContact}
          onRemove={onRemove}
          onClick={(e) => e.stopPropagation()}
        />
      </TableCell>
    </TableRow>
  );
};
