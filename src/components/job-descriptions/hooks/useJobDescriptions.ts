
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { JobDescription } from "../types";
import { fetchJobDescriptions, deleteJobDescription, updateJobDescription } from "./api/jobDescriptionService";
import { useUserSession } from "./useUserSession";

export const useJobDescriptions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { userId } = useUserSession();

  const { 
    data: jobDescriptions = [], 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['jobDescriptions', userId],
    queryFn: () => fetchJobDescriptions(userId || ''),
    enabled: !!userId, // Only run the query when we have a userId
  });

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job description?')) {
      return false;
    }

    try {
      const success = await deleteJobDescription(jobId);

      if (!success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete job description",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Job description deleted successfully",
      });

      await queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete job description",
      });
      return false;
    }
  };

  const handleUpdate = async (jobDescription: JobDescription) => {
    try {
      const success = await updateJobDescription(jobDescription);

      if (!success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update job description",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Job description updated successfully",
      });

      await queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update job description",
      });
      return false;
    }
  };

  return {
    jobDescriptions,
    isLoading,
    isError,
    handleDelete,
    handleUpdate,
  };
};
