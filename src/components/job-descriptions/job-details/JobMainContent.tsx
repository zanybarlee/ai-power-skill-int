
import { JobDescription } from "../types";

interface JobMainContentProps {
  job: JobDescription;
}

export const JobMainContent = ({ job }: JobMainContentProps) => {
  return (
    <div className="col-span-2 space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Job Description</h3>
        <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap max-h-72 overflow-y-auto text-gray-700">
          {job.original_text || "No description available."}
        </div>
      </div>

      {job.job_requirements && (
        <div>
          <h3 className="text-lg font-medium mb-2">Requirements</h3>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap max-h-72 overflow-y-auto text-gray-700">
            {job.job_requirements}
          </div>
        </div>
      )}

      {job.benefits && (
        <div>
          <h3 className="text-lg font-medium mb-2">Benefits</h3>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap max-h-72 overflow-y-auto text-gray-700">
            {job.benefits}
          </div>
        </div>
      )}
    </div>
  );
};
