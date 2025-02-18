
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JobDescription {
  id: string;
  created_at: string;
  company_name: string | null;
  file_name: string | null;
  status: string | null;
  job_title: string | null;
  location: string | null;
  salary_range: string | null;
  original_text: string | null;
  job_requirements: string | null;
}

export const JobDescriptionTable = () => {
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null);

  const { data: jobDescriptions, isLoading } = useQuery({
    queryKey: ['jobDescriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as JobDescription[];
    },
  });

  const handleRowClick = (job: JobDescription) => {
    setSelectedJob(job);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading job descriptions...</div>;
  }

  if (!jobDescriptions?.length) {
    return <div className="text-center py-4 text-gray-500">No job descriptions found</div>;
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
            <TableHead>Salary Range</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobDescriptions.map((jd) => (
            <TableRow 
              key={jd.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(jd)}
            >
              <TableCell className="font-medium">
                {jd.job_title || 'Untitled'}
              </TableCell>
              <TableCell>{jd.company_name || 'N/A'}</TableCell>
              <TableCell>{jd.location || 'N/A'}</TableCell>
              <TableCell>{jd.salary_range || 'N/A'}</TableCell>
              <TableCell>
                <Badge 
                  variant={jd.status === 'processed' ? 'default' : 'secondary'}
                  className={jd.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {jd.status || 'pending'}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">
                {new Date(jd.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedJob?.job_title || 'Job Details'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Company</h3>
                <p className="text-gray-600">{selectedJob?.company_name || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Location</h3>
                <p className="text-gray-600">{selectedJob?.location || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Salary Range</h3>
                <p className="text-gray-600">{selectedJob?.salary_range || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Status</h3>
                <Badge 
                  variant={selectedJob?.status === 'processed' ? 'default' : 'secondary'}
                  className={selectedJob?.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {selectedJob?.status || 'pending'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Job Description</h3>
              <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                {selectedJob?.original_text || 'No description available'}
              </div>
            </div>

            {selectedJob?.job_requirements && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Requirements</h3>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                  {selectedJob.job_requirements}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
