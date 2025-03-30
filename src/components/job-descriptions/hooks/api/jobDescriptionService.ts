
import { supabase } from "@/integrations/supabase/client";
import { DatabaseJobDescription } from "../types";
import { JobDescription } from "../../types";

export async function fetchJobDescriptions(userId: string): Promise<JobDescription[]> {
  if (!userId) {
    return [];
  }

  try {
    // Remove the user_id filter since that column doesn't exist in job_descriptions table
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
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    console.log('Fetched job descriptions:', data);
    
    // Convert the raw data to our JobDescription type
    return (data || []).map(item => ({
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
      employer_profiles: item.employer_profiles || undefined
    }));
  } catch (err) {
    console.error('Error fetching job descriptions:', err);
    throw err;
  }
}

export async function deleteJobDescription(jobId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('job_descriptions')
      .delete()
      .eq('id', jobId);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

export async function updateJobDescription(jobDescription: JobDescription): Promise<boolean> {
  try {
    const updateData = {
      job_title: jobDescription.job_title,
      company_name: jobDescription.company_name,
      location: jobDescription.location,
      original_text: jobDescription.original_text,
      job_requirements: jobDescription.job_requirements,
      benefits: jobDescription.benefits,
    };

    const { data, error } = await supabase
      .from('job_descriptions')
      .update(updateData)
      .eq('id', jobDescription.id)
      .select();

    if (error) {
      console.error('Update error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Update error:', error);
    return false;
  }
}
