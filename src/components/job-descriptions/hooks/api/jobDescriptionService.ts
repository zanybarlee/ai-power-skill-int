
import { supabase } from "@/integrations/supabase/client";
import { JobDescription } from "../../types";

export async function fetchJobDescriptions(userId: string): Promise<JobDescription[]> {
  if (!userId) {
    return [];
  }

  try {
    // Fetch job descriptions and handle employer profiles separately
    const { data, error } = await supabase
      .from('job_descriptions')
      .select('*')
      .eq('agent_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // For each job description that has an employer_profile_id, fetch the employer profile
    const enhancedData = await Promise.all((data || []).map(async (item) => {
      // If there's an employer_profile_id, fetch the profile
      if (item.employer_profile_id) {
        const { data: profileData, error: profileError } = await supabase
          .from('employer_profiles')
          .select('*')
          .eq('id', item.employer_profile_id)
          .single();
        
        if (!profileError && profileData) {
          return {
            ...item,
            employer_profiles: {
              company_name: profileData.company_name,
              contact_person: profileData.contact_person,
              email: profileData.email,
              phone: profileData.phone,
              country: profileData.country,
              state: profileData.state
            }
          };
        }
      }
      
      // Return the item without employer_profiles if no profile found
      return {
        ...item,
        employer_profiles: undefined
      };
    }));
    
    console.log('Fetched job descriptions:', enhancedData);
    
    // Convert the raw data to our JobDescription type
    return enhancedData.map(item => ({
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
      employer_profiles: item.employer_profiles
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
