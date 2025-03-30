
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
import { JobMainContent } from "./JobMainContent";
import { JobSideContent } from "./JobSideContent";
import { useJobDetails } from "./hooks/useJobDetails";
import { JobDetailsEditForm } from "./JobDetailsEditForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface JobDetailsDialogProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
}

export const JobDetailsDialog = ({ jobId, open, onClose }: JobDetailsDialogProps) => {
  const { userId } = useUserSession();
  const { handleDelete, handleUpdate } = useJobDescriptions();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();
  
  const { 
    job, 
    isLoading, 
    isError,
    refetch
  } = useJobDetails(jobId, open, userId);

  const handleEdit = () => {
    if (job) {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async (updatedJob: any) => {
    if (!job) return;
    
    try {
      setIsSaving(true);
      const success = await handleUpdate(updatedJob);
      
      if (success) {
        toast({
          title: "Job updated",
          description: "Job description has been updated successfully.",
        });
        await refetch();
        setIsEditing(false);
      } else {
        toast({
          title: "Update failed",
          description: "Failed to update job description. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast({
        title: "Update error",
        description: "An error occurred while updating the job description.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteJob = async () => {
    if (job && job.id) {
      setIsDeleting(true);
      try {
        const success = await handleDelete(job.id);
        if (success) {
          toast({
            title: "Job deleted",
            description: "Job description has been deleted successfully.",
          });
          setDeleteConfirmOpen(false);
          onClose();
        } else {
          toast({
            title: "Delete failed",
            description: "Failed to delete job description. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Delete error",
          description: "An error occurred while deleting the job description.",
          variant: "destructive",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
          {isLoading && <JobDetailsLoading />}
          {isError && <JobDetailsError />}

          {job && !isEditing && (
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
                    onClick={() => setDeleteConfirmOpen(true)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}

          {job && isEditing && (
            <div className="p-2">
              <h2 className="text-xl font-bold mb-4">Edit Job Description</h2>
              <JobDetailsEditForm 
                job={job} 
                onSave={handleSaveChanges} 
                onCancel={handleCancelEdit}
                isSaving={isSaving}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job description
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDeleteJob();
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
