
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { JobDescription } from "./types";
import { useJobDescriptions } from "./hooks/useJobDescriptions";
import { JobDetailsDialog } from "./JobDetailsDialog";

export const JobDescriptionTable = () => {
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null);
  const { jobDescriptions, isLoading, handleDelete, handleUpdate } = useJobDescriptions();

  const handleRowClick = (job: JobDescription) => {
    setSelectedJob(job);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!jobDescriptions.length) {
    return <div>No job descriptions found.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Uploaded Job Descriptions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Posted Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobDescriptions.map((jd) => (
            <TableRow 
              key={jd.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(jd)}
            >
              <TableCell>{jd.job_title}</TableCell>
              <TableCell>{jd.company_name}</TableCell>
              <TableCell>{jd.location}</TableCell>
              <TableCell>{new Date(jd.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="bg-[#F1F0FB] border border-purple-100 shadow-lg"
                  >
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(jd);
                      }}
                      className="hover:bg-purple-100 focus:bg-purple-100"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 hover:bg-red-50 focus:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(jd.id);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <JobDetailsDialog
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};
