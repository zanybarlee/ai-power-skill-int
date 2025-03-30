
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { processJobDescription } from "@/services/jobDescriptionService";
import { JobPostingTabs } from "@/components/job-descriptions/JobPostingTabs";
import { JobDescriptionHistory } from "@/components/job-descriptions/JobDescriptionHistory";
import { useUserSession } from "@/components/job-descriptions/hooks/useUserSession";

const PostJob = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const queryClient = useQueryClient();
  const {
    userId
  } = useUserSession();

  // For debugging purposes
  useEffect(() => {
    if (userId) {
      console.log("Current User ID:", userId);
    }
  }, [userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF, Word document, or text file");
      return;
    }
    setFile(selectedFile);
  };

  const handleFileUpload = async (employerProfileId?: string) => {
    if (!file) {
      // This is called from the crawler tab without a file, so we just refresh the job list
      queryClient.invalidateQueries({
        queryKey: ['jobDescriptions']
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      const {
        error: uploadError
      } = await supabase.storage.from('job_descriptions').upload(fileName, file);
      if (uploadError) throw uploadError;

      // Read file content for processing
      const fileContent = await file.text();

      // Process with LLM and store in database
      const processedData = await processJobDescription(fileContent);

      // Create record in job_descriptions table
      const {
        error: insertError
      } = await supabase.from('job_descriptions').insert({
        original_text: fileContent,
        job_title: processedData?.extractedRole?.title || null,
        file_name: file.name,
        file_type: file.type,
        file_url: fileName,
        employer_profile_id: employerProfileId || null,
        agent_id: userId || null,
        user_id: userId || null,
        status: 'processed'
      });
      if (insertError) throw insertError;
      toast.success("File uploaded and processed successfully!");
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      queryClient.invalidateQueries({
        queryKey: ['jobDescriptions']
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleTextSubmit = async (employerProfileId?: string) => {
    if (!textInput.trim()) {
      toast.error("Please enter job description text");
      return;
    }
    setIsProcessing(true);
    try {
      // Process with LLM
      const processedData = await processJobDescription(textInput);

      // Create record in job_descriptions table
      const {
        error
      } = await supabase.from('job_descriptions').insert({
        original_text: textInput,
        job_title: processedData?.extractedRole?.title || null,
        employer_profile_id: employerProfileId || null,
        agent_id: userId || null,
        user_id: userId || null,
        status: 'processed'
      });
      if (error) throw error;
      toast.success("Job description processed successfully!");
      setTextInput("");
      queryClient.invalidateQueries({
        queryKey: ['jobDescriptions']
      });
    } catch (error) {
      console.error('Text submission error:', error);
      toast.error("Failed to process job description. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-6 mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Job Descriptions</h1>
        
        <JobPostingTabs 
          isProcessing={isProcessing} 
          file={file} 
          textInput={textInput} 
          onFileChange={handleFileChange} 
          onFileUpload={handleFileUpload} 
          onTextChange={handleTextChange} 
          onTextSubmit={handleTextSubmit} 
        />
        
        <JobDescriptionHistory />
      </div>
    </Layout>
  );
};

export default PostJob;
