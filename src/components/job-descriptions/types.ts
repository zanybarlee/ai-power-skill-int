
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
  job_title: string;
  company: string;
  location: string;
  original_text: string;
  job_requirements?: string;
  created_at: string;
  status: string;
}
