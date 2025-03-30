
export const JobDetailsError = () => (
  <div className="py-8 text-center">
    <p className="text-red-500">Error loading job details.</p>
    <p className="mt-2 text-gray-500">The job may not exist or you don't have permission to view it.</p>
  </div>
);
