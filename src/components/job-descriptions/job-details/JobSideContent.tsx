
import { format } from "date-fns";
import { JobDescription } from "../types";

interface JobSideContentProps {
  job: JobDescription;
}

export const JobSideContent = ({ job }: JobSideContentProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Details</h3>
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          {job.salary_range && (
            <div>
              <p className="text-sm font-medium text-gray-700">Salary Range</p>
              <p className="text-sm text-gray-600">{job.salary_range}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-700">Created</p>
            <p className="text-sm text-gray-600">
              {job.created_at ? format(new Date(job.created_at), "PPP") : "Unknown"}
            </p>
          </div>
          {job.file_name && (
            <div>
              <p className="text-sm font-medium text-gray-700">File</p>
              <p className="text-sm text-gray-600 break-all">{job.file_name}</p>
            </div>
          )}
        </div>
      </div>

      {job.employer_profiles && <EmployerProfileSection job={job} />}
    </div>
  );
};

const EmployerProfileSection = ({ job }: JobSideContentProps) => {
  if (!job.employer_profiles) return null;
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Employer Profile</h3>
      <div className="bg-gray-50 p-4 rounded-md space-y-2">
        <div>
          <p className="text-sm font-medium text-gray-700">Company Name</p>
          <p className="text-sm text-gray-600">{job.employer_profiles.company_name}</p>
        </div>
        {job.employer_profiles.contact_person && (
          <div>
            <p className="text-sm font-medium text-gray-700">Contact Person</p>
            <p className="text-sm text-gray-600">{job.employer_profiles.contact_person}</p>
          </div>
        )}
        {job.employer_profiles.email && (
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-sm text-gray-600">{job.employer_profiles.email}</p>
          </div>
        )}
        {job.employer_profiles.phone && (
          <div>
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p className="text-sm text-gray-600">{job.employer_profiles.phone}</p>
          </div>
        )}
        {(job.employer_profiles.country || job.employer_profiles.state) && (
          <div>
            <p className="text-sm font-medium text-gray-700">Location</p>
            <p className="text-sm text-gray-600">
              {[job.employer_profiles.state, job.employer_profiles.country].filter(Boolean).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
