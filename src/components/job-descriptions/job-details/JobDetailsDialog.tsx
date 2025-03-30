
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUserSession } from "../hooks/useUserSession";
import { useJobDescriptions } from "../hooks/useJobDescriptions";
import { JobDetailsLoading } from "./JobDetailsLoading";
import { JobDetailsError } from "./JobDetailsError";
import { JobDescription } from "../types";
import { JobMainContent } from "./JobMainContent";
import { JobSideContent } from "./JobSideContent";
import { useJobDetails } from "./hooks/useJobDetails";

interface JobDetailsDialogProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
}

export const JobDetailsDialog = ({ jobId, open, onClose }: JobDetailsDialogProps) => {
  const { userId } = useUserSession();
  const { handleDelete } = useJobDescriptions();
  const [isEditing, setIsEditing] = useState(false);
  
  const { 
    job, 
    isLoading, 
    isError 
  } = useJobDetails(jobId, open, userId);

  const handleEdit = () => {
    if (job) {
      setIsEditing(true);
      // In a real implementation, you would navigate to an edit form
      // or open an edit modal here
      window.location.href = `/edit-job/${job.id}`;
    }
  };

  const handleDeleteJob = async () => {
    if (job && job.id) {
      const success = await handleDelete(job.id);
      if (success) {
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        {isLoading && <JobDetailsLoading />}
        {isError && <JobDetailsError />}

        {job && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {job.job_title || "Untitled Job"}
              </DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">
                    {job.company_name || "Unknown Company"}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{job.location || "No location specified"}</span>
                  <span className="text-gray-500">•</span>
                  <Badge variant="outline">{job.status}</Badge>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <JobMainContent job={job} />
              <JobSideContent job={job} />
            </div>
            
            <DialogFooter className="mt-6">
              <div className="flex items-center justify-end gap-2 w-full">
                <Button 
                  variant="outline" 
                  onClick={handleEdit}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteJob}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
