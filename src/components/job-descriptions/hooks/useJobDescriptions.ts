
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobDescription } from "../types";
import { useToast } from "@/hooks/use-toast";

export const useJobDescriptions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobDescriptions = [], isLoading } = useQuery({
    queryKey: ['jobDescriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as JobDescription[];
    },
  });

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job description?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('job_descriptions')
        .delete()
        .eq('id', jobId);

      if (error) {
        console.error('Delete error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete job description",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Job description deleted successfully",
      });

      await queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
      return true;
    } catch (error) {
      console.error('Delete error:', error);
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
      const { error } = await supabase
        .from('job_descriptions')
        .update({
          job_title: jobDescription.job_title,
          company_name: jobDescription.company_name,
          location: jobDescription.location,
          original_text: jobDescription.original_text,
          job_requirements: jobDescription.job_requirements,
          benefits: jobDescription.benefits,  // Added this line
        })
        .eq('id', jobDescription.id);

      if (error) {
        console.error('Update error:', error);
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
      console.error('Update error:', error);
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
    handleDelete,
    handleUpdate,
  };
};
