
export interface ProcessedData {
  extractedRole: {
    title?: string;
    requirements?: string[];
    skills?: string[];
    experience?: string;
    [key: string]: any;
  };
}

export interface EmployerProfileData {
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
}

export interface JobDescription {
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
  user_id: string | null;
  employer_profiles?: EmployerProfileData;
}
