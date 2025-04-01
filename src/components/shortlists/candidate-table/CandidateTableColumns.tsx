
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export const CandidateTableColumns = () => {
  return (
    <TableHeader className="bg-aptiv/5">
      <TableRow>
        <TableHead className="text-aptiv-gray-700">Name</TableHead>
        <TableHead className="text-aptiv-gray-700">Job Role</TableHead>
        <TableHead className="text-aptiv-gray-700">Location</TableHead>
        <TableHead className="text-aptiv-gray-700">Experience</TableHead>
        <TableHead className="text-aptiv-gray-700">Skills</TableHead>
        <TableHead className="text-aptiv-gray-700">Match Score</TableHead>
        <TableHead className="text-aptiv-gray-700">Status</TableHead>
        <TableHead className="text-aptiv-gray-700 text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
