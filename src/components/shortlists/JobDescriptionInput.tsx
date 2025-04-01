
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobDescription {
  id: string;
  job_title: string;
  original_text: string;
  job_requirements: string;
}

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  jobDescriptions?: JobDescription[];
  isMatching: boolean;
  handleMatch: (jobDescriptionId?: string, jobRole?: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  setJobDescription,
  jobDescriptions,
  isMatching,
  handleMatch,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(undefined);
  const [selectedJobRole, setSelectedJobRole] = useState<string | undefined>(undefined);

  const handleJobDescriptionSelect = (id: string) => {
    const selectedJob = jobDescriptions?.find(job => job.id === id);
    if (selectedJob) {
      const fullDescription = [
        selectedJob.original_text,
        selectedJob.job_requirements
      ].filter(Boolean).join('\n\n');
      
      setJobDescription(fullDescription);
      setSelectedJobId(id);
      setSelectedJobRole(selectedJob.job_title || undefined);
      console.log("Selected job ID:", id);
      console.log("Selected job title:", selectedJob.job_title);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="space-y-2">
          <label className="text-aptiv-gray-600 text-sm font-medium">
            From Job Descriptions
          </label>
          <Select onValueChange={handleJobDescriptionSelect}>
            <SelectTrigger className="w-full bg-white border-aptiv/20">
              <SelectValue placeholder="Select from existing job descriptions" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {jobDescriptions?.length ? (
                jobDescriptions.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.job_title || 'Untitled Job'}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-jobs" disabled>
                  No job descriptions found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <label className="text-aptiv-gray-600 text-sm font-medium">
          Job Description
        </label>
        <Textarea
          placeholder="Enter job description to find best matches..."
          className="bg-white border-aptiv/20 text-aptiv-gray-700 placeholder:text-aptiv-gray-400"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => handleMatch(selectedJobId, selectedJobRole)}
            disabled={isMatching}
            variant="aptiv"
            className="w-fit"
          >
            {isMatching ? (
              "Finding Matches..."
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Find Best Matches
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
