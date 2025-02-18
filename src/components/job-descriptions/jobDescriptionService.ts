
import { supabase } from "@/integrations/supabase/client";
import { ProcessedData } from "./types";

export const processJobDescription = async (
  content: string,
  fileName: string | null = null,
  fileType: string | null = null
) => {
  // Process JD with OpenAI
  const { data, error: processError } = await supabase.functions
    .invoke<ProcessedData>('process-job-description', {
      body: { jobDescription: content }
    });

  if (processError) throw processError;
  if (!data) throw new Error('No data returned from processing');

  // Save to database
  const { error: dbError } = await supabase.rpc('insert_job_description', {
    p_original_text: content,
    p_extracted_role: data.extractedRole,
    p_file_name: fileName || 'manual-input.txt',
    p_file_type: fileType || 'text/plain',
    p_file_url: null as string | null
  });

  if (dbError) throw dbError;

  return data;
};

export const uploadFileToStorage = async (file: File) => {
  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('job_descriptions')
    .upload(fileName, file);

  if (error) throw error;
  return data;
};
