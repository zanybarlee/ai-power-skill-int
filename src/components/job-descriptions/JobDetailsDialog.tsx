
import { useState } from "react";
import { JobDescription } from "./types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JobDetailsDialogProps {
  job: JobDescription | null;
  onClose: () => void;
  onDelete: (id: string) => Promise<boolean>;
  onUpdate: (job: JobDescription) => Promise<boolean>;
}

export const JobDetailsDialog = ({ 
  job, 
  onClose,
  onDelete,
  onUpdate,
}: JobDetailsDialogProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState<JobDescription | null>(job);

  const handleEdit = () => {
    setEditMode(true);
    setEditedJob(job);
  };

  const handleSave = async () => {
    if (!editedJob) return;
    const success = await onUpdate(editedJob);
    if (success) {
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    if (!job?.id) return;
    const success = await onDelete(job.id);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[#F1F0FB]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editMode ? 'Edit Job Description' : (job?.job_title || 'Job Details')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  value={editedJob?.job_title || ''}
                  onChange={(e) => setEditedJob(prev => prev ? { ...prev, job_title: e.target.value } : null)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  value={editedJob?.company_name || ''}
                  onChange={(e) => setEditedJob(prev => prev ? { ...prev, company_name: e.target.value } : null)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={editedJob?.location || ''}
                  onChange={(e) => setEditedJob(prev => prev ? { ...prev, location: e.target.value } : null)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editedJob?.original_text || ''}
                  onChange={(e) => setEditedJob(prev => prev ? { ...prev, original_text: e.target.value } : null)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                  value={editedJob?.job_requirements || ''}
                  onChange={(e) => setEditedJob(prev => prev ? { ...prev, job_requirements: e.target.value } : null)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700">Company</h3>
                  <p>{job?.company_name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Location</h3>
                  <p>{job?.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Job Description</h3>
                <div className="bg-white p-4 rounded-md whitespace-pre-wrap">
                  {job?.original_text || 'No description available'}
                </div>
              </div>

              {job?.job_requirements && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Requirements</h3>
                  <div className="bg-white p-4 rounded-md whitespace-pre-wrap">
                    {job.job_requirements}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <DialogFooter>
          {editMode ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button onClick={handleEdit}>
                Edit
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
