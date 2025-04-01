
import { Card } from "@/components/ui/card";

interface JobListing {
  title: string;
  company: string;
  location: string;
  industry?: string;
  description: string;
}

interface JobListingCardsProps {
  jobs: JobListing[];
}

export const JobListingCards = ({ jobs }: JobListingCardsProps) => {
  if (jobs.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Found Job Listings ({jobs.length})</h3>
      
      {jobs.map((job, index) => (
        <Card key={index} className="p-4">
          <h4 className="font-medium">{job.title}</h4>
          <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
          {job.industry && (
            <p className="text-sm text-gray-500"><span className="font-medium">Industry:</span> {job.industry}</p>
          )}
          <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
        </Card>
      ))}
    </div>
  );
};
