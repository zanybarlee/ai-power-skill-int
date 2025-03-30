
import { JobDescription } from "../types";
import { formatDistanceToNow } from "date-fns";
import { Building, MapPin, DollarSign, Calendar } from "lucide-react";

interface JobSideContentProps {
  job: JobDescription;
}

export function JobSideContent({ job }: JobSideContentProps) {
  return (
    <div className="col-span-1 space-y-4">
      {/* Company Info */}
      {job.company_name && (
        <div className="flex items-start gap-2">
          <Building className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Company</p>
            <p className="text-gray-700">{job.company_name}</p>
          </div>
        </div>
      )}

      {/* Location */}
      {job.location && (
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Location</p>
            <p className="text-gray-700">{job.location}</p>
          </div>
        </div>
      )}

      {/* Salary Range */}
      {job.salary_range && (
        <div className="flex items-start gap-2">
          <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Salary Range</p>
            <p className="text-gray-700">{job.salary_range}</p>
          </div>
        </div>
      )}

      {/* Posted Date */}
      {job.created_at && (
        <div className="flex items-start gap-2">
          <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Posted</p>
            <p className="text-gray-700">
              {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
      )}

      {/* Contact Information (If from Employer Profile) */}
      {job.employer_profiles && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Contact Information</h3>
          {job.employer_profiles.contact_person && (
            <p className="text-sm text-gray-700">
              {job.employer_profiles.contact_person}
            </p>
          )}
          {job.employer_profiles.email && (
            <p className="text-sm text-gray-700">
              <a href={`mailto:${job.employer_profiles.email}`} className="text-blue-600 hover:underline">
                {job.employer_profiles.email}
              </a>
            </p>
          )}
          {job.employer_profiles.phone && (
            <p className="text-sm text-gray-700">
              {job.employer_profiles.phone}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
