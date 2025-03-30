
import { supabase } from "@/integrations/supabase/client";

export interface ProcessedJobDescription {
  extractedRole: {
    title?: string;
    requirements?: string[];
    skills?: string[];
    experience?: string;
    [key: string]: any;
  };
}

export const processJobDescription = async (content: string): Promise<ProcessedJobDescription> => {
  try {
    // In a full implementation, this would call an AI service to extract structured data
    // For now, we'll use a simple extraction of the first line as the job title
    
    // Call Supabase Edge Function to process with LLM (if implemented)
    // const { data, error } = await supabase.functions.invoke('process-job-description', {
    //   body: { jobDescription: content }
    // });
    
    // if (error) throw error;
    
    // Simplified processing (extract first line as title if it's short enough)
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const possibleTitle = lines[0]?.trim();
    
    const extractedTitle = possibleTitle && possibleTitle.length < 100 
      ? possibleTitle 
      : 'Untitled Job';
    
    return {
      extractedRole: {
        title: extractedTitle,
      }
    };
  } catch (error) {
    console.error('Error processing job description:', error);
    return {
      extractedRole: {
        title: 'Untitled Job'
      }
    };
  }
};

export const uploadFileToStorage = async (file: File) => {
  const fileStorageName = `${crypto.randomUUID()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('job_descriptions')
    .upload(fileStorageName, file);

  if (error) throw error;
  return { data, fileStorageName };  // Changed from fileName to fileStorageName for consistency
};
