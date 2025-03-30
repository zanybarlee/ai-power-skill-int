
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobDescription } from "../types";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export const useJobDescriptions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  // Get the current user's ID when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching user session:', error);
        return;
      }
      
      if (data.session) {
        setUserId(data.session.user.id);
      }
    };
    
    fetchUserId();
  }, []);

  // Define a simpler type for database response to avoid deep type instantiation
  interface JobDescriptionResponse {
    id: string;
    job_title: string | null;
    company_name: string | null;
    location: string | null;
    original_text: string;
    job_requirements: string | null;
    created_at: string;
    status: string | null;
    file_name: string | null;
    file_type: string | null;
    file_url: string | null;
    salary_range: string | null;
    benefits: string | null;
    employer_profile_id: string | null;
    agent_id: string | null;
    employer_profiles?: {
      company_name: string;
      contact_person?: string;
      email?: string;
      phone?: string;
    } | null;
  }

  const { data: jobDescriptions = [], isLoading, isError } = useQuery({
    queryKey: ['jobDescriptions', userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      const { data, error } = await supabase
        .from('job_descriptions')
        .select(`
          *,
          employer_profiles:employer_profile_id (
            company_name,
            contact_person,
            email,
            phone
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Fetched job descriptions for user:', userId, data); // Debug log
      
      // Type assertion to match our expected response type
      const typedData = data as JobDescriptionResponse[];
      
      // Transform data to match JobDescription type
      return typedData.map(item => {
        const jobDesc: JobDescription = {
          id: item.id,
          job_title: item.job_title,
          company_name: item.company_name,
          location: item.location,
          original_text: item.original_text,
          job_requirements: item.job_requirements,
          created_at: item.created_at,
          status: item.status,
          file_name: item.file_name,
          file_type: item.file_type,
          file_url: item.file_url,
          salary_range: item.salary_range,
          benefits: item.benefits,
          employer_profile_id: item.employer_profile_id,
          agent_id: item.agent_id,
        };
        
        // Add employer_profiles if available
        if (item.employer_profiles) {
          jobDesc.employer_profiles = item.employer_profiles;
        }
        
        return jobDesc;
      });
    },
    enabled: !!userId, // Only run the query when we have a userId
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
    console.log('Updating job description:', jobDescription); // Debug log
    try {
      const updateData = {
        job_title: jobDescription.job_title,
        company_name: jobDescription.company_name,
        location: jobDescription.location,
        original_text: jobDescription.original_text,
        job_requirements: jobDescription.job_requirements,
        benefits: jobDescription.benefits,
      };
      console.log('Update data:', updateData); // Debug log

      const { data, error } = await supabase
        .from('job_descriptions')
        .update(updateData)
        .eq('id', jobDescription.id)
        .select();

      console.log('Update response:', { data, error }); // Debug log

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
    isError,
    handleDelete,
    handleUpdate,
  };
};
