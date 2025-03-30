
import { EmployerProfileData } from "../types";

export type JobDescriptionStatus = 'pending' | 'processed' | 'approved' | 'rejected';

// Database response type that matches exactly what we get from Supabase
export type DatabaseJobDescription = {
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
};
