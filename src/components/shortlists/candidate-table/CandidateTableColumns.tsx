
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CandidateTableColumns = () => {
  return (
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
  );
};
