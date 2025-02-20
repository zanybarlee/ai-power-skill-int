
export interface ProcessedData {
  extractedRole: {
    title?: string;
    requirements?: string[];
    skills?: string[];
    experience?: string;
    [key: string]: any;
  };
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
  benefits: string | null;  // Added this line
}
