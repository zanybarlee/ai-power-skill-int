
export interface ProcessedData {
  extractedRole: {
    title?: string;
    requirements?: string[];
    skills?: string[];
    experience?: string;
    [key: string]: any;
  };
}
