
import { useJobDescriptions } from "./hooks/useJobDescriptions";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { JobDetailsDialog } from "./JobDetailsDialog";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const JobDescriptionTable = () => {
  const { jobDescriptions, isLoading, isError } = useJobDescriptions();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-aptiv" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <p className="text-red-500 font-medium">Error loading job descriptions.</p>
          <p className="text-gray-500 text-sm">
            There might be an issue with your connection or the database. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!jobDescriptions || jobDescriptions.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">No job descriptions found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Recent Job Descriptions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobDescriptions.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {job.job_title || "Untitled Job"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {job.company_name || "Unknown Company"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant={
                      job.status === 'processed' ? 'outline' :
                      job.status === 'pending' ? 'secondary' :
                      'default'
                    }
                  >
                    {job.status || "pending"}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.created_at && formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJobId(job.id)}
                    className="inline-flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJobId && (
        <JobDetailsDialog
          jobId={selectedJobId}
          open={!!selectedJobId}
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </div>
  );
};
