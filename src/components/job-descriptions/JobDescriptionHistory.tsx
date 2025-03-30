
import { JobDescriptionTable } from "@/components/job-descriptions/JobDescriptionTable";

export const JobDescriptionHistory = () => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Job Descriptions</h2>
      <JobDescriptionTable />
    </div>
  );
};
