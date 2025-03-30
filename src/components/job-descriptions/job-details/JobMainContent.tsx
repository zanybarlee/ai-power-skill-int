
import { JobDescription } from "../types";

interface JobMainContentProps {
  job: JobDescription;
}

export function JobMainContent({ job }: JobMainContentProps) {
  return (
    <div className="col-span-2 space-y-6">
      {/* Job Description Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Job Description</h3>
        <div className="whitespace-pre-wrap text-gray-700">
          {job.original_text || "No description provided."}
        </div>
      </div>

      {/* Requirements Section */}
      {job.job_requirements && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Requirements</h3>
          <div className="whitespace-pre-wrap text-gray-700">
            {job.job_requirements}
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {job.benefits && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Benefits</h3>
          <div className="whitespace-pre-wrap text-gray-700">
            {job.benefits}
          </div>
        </div>
      )}
    </div>
  );
}
