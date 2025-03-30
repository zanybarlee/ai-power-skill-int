
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { JobDescription } from "./types";
import { useUserSession } from "./hooks/useUserSession";

interface JobDetailsDialogProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
}

export const JobDetailsDialog = ({ jobId, open, onClose }: JobDetailsDialogProps) => {
  const { userId } = useUserSession();

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_descriptions")
        .select(`
          *,
          employer_profiles:employer_profile_id (
            company_name,
            contact_person,
            email,
            phone,
            country,
            state
          )
        `)
        .eq("id", jobId)
        .eq("agent_id", userId || '')
        .single();

      if (error) throw error;
      
      // Map the data to our JobDescription type
      return {
        ...data,
        employer_profiles: data.employer_profiles ? {
          company_name: data.employer_profiles.company_name,
          contact_person: data.employer_profiles.contact_person,
          email: data.employer_profiles.email,
          phone: data.employer_profiles.phone,
          country: data.employer_profiles.country,
          state: data.employer_profiles.state
        } : undefined
      } as JobDescription;
    },
    enabled: !!jobId && open && !!userId,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
