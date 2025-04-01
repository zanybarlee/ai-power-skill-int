
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkX, Mail, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  onRemove: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'matched':
      return "text-blue-700 bg-blue-100 border-blue-200";
    case 'shortlisted':
      return "text-purple-700 bg-purple-100 border-purple-200";
    case 'interview_accepted':
      return "text-green-700 bg-green-100 border-green-200";
    case 'interview_rejected':
      return "text-red-700 bg-red-100 border-red-200";
    case 'offer_made':
      return "text-amber-700 bg-amber-100 border-amber-200";
    case 'offer_accepted':
      return "text-emerald-700 bg-emerald-100 border-emerald-200";
    case 'offer_rejected':
      return "text-rose-700 bg-rose-100 border-rose-200";
    default:
      return "text-gray-700 bg-gray-100 border-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'matched':
      return "Matched";
    case 'shortlisted':
      return "Shortlisted";
    case 'interview_accepted':
      return "Interview Accepted";
    case 'interview_rejected':
      return "Interview Rejected";
    case 'offer_made':
      return "Offer Made";
    case 'offer_accepted':
      return "Offer Accepted";
    case 'offer_rejected':
      return "Offer Rejected";
    default:
      return "Unknown";
  }
};

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" size="sm" className={`${getStatusColor(candidate.status || 'matched')} px-2 py-1 text-xs h-auto`}>
                {getStatusLabel(candidate.status || 'matched')}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 bg-white shadow-md border border-gray-200" 
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem 
                className="hover:bg-gray-100" 
                onClick={() => onStatusChange(candidate.id, 'matched')}
              >
                Matched
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-100" 
                onClick={() => onStatusChange(candidate.id, 'shortlisted')}
              >
                Shortlisted
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-100" 
                onClick={() => onStatusChange(candidate.id, 'interview_accepted')}
              >
                Interview Accepted
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-100" 
                onClick={() => onStatusChange(candidate.id, 'interview_rejected')}
              >
                Interview Rejected
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-100" 
                onClick={() => onStatusChange(candidate.id, 'offer_made')}
              >
                Offer Made
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-100" 
                onClick={() => onStatusChange(candidate.id, 'offer_accepted')}
              >
                Offer Accepted
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-100" 
                onClick={() => onStatusChange(candidate.id, 'offer_rejected')}
              >
                Offer Rejected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Badge 
            variant="outline" 
            className={`${getStatusColor(candidate.status || 'matched')} px-2 py-1 text-xs inline-block`}
          >
            {getStatusLabel(candidate.status || 'matched')}
          </Badge>
        )}
      </TableCell>
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
