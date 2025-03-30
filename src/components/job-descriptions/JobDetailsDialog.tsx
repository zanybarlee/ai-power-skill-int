
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { JobDescription } from "./types";
import { useUserSession } from "./hooks/useUserSession";
import { useJobDescriptions } from "./hooks/useJobDescriptions";

interface JobDetailsDialogProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
}

export const JobDetailsDialog = ({ jobId, open, onClose }: JobDetailsDialogProps) => {
  const { userId } = useUserSession();
  const { handleDelete } = useJobDescriptions();
  const [isEditing, setIsEditing] = useState(false);

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: async () => {
      // First fetch the job description
      const { data: jobData, error: jobError } = await supabase
        .from("job_descriptions")
        .select('*')
        .eq("id", jobId)
        .eq("user_id", userId || '')
        .single();

      if (jobError) throw jobError;
      
      // If there's an employer_profile_id, fetch the employer profile
      let employerProfile = undefined;
      if (jobData.employer_profile_id) {
        const { data: profileData, error: profileError } = await supabase
          .from('employer_profiles')
          .select('*')
          .eq('id', jobData.employer_profile_id)
          .single();
          
        if (!profileError && profileData) {
          employerProfile = {
            company_name: profileData.company_name,
            contact_person: profileData.contact_person,
            email: profileData.email,
            phone: profileData.phone,
            country: profileData.country,
            state: profileData.state
          };
        }
      }
      
      // Return job with employer profile
      return {
        ...jobData,
        employer_profiles: employerProfile
      } as JobDescription;
    },
    enabled: !!jobId && open && !!userId,
  });
  
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
        {isLoading && (
          <div className="py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-aptiv" />
            <p className="mt-2 text-gray-500">Loading job details...</p>
          </div>
        )}

        {isError && (
          <div className="py-8 text-center">
            <p className="text-red-500">Error loading job details.</p>
            <p className="mt-2 text-gray-500">The job may not exist or you don't have permission to view it.</p>
          </div>
        )}

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
              <div className="col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Job Description</h3>
                  <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap max-h-72 overflow-y-auto text-gray-700">
                    {job.original_text || "No description available."}
                  </div>
                </div>

                {job.job_requirements && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Requirements</h3>
                    <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap max-h-72 overflow-y-auto text-gray-700">
                      {job.job_requirements}
                    </div>
                  </div>
                )}

                {job.benefits && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Benefits</h3>
                    <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap max-h-72 overflow-y-auto text-gray-700">
                      {job.benefits}
                    </div>
                  </div>
                )}
              </div>

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

                {job.employer_profiles && (
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
                )}
              </div>
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
