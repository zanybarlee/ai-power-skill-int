
import Layout from "@/components/Layout";
import { FileUpload } from "@/components/job-descriptions/FileUpload";
import { TextInput } from "@/components/job-descriptions/TextInput";
import { JobDescriptionTable } from "@/components/job-descriptions/JobDescriptionTable";
import { ManualJobForm } from "@/components/job-descriptions/ManualJobForm";
import { Separator } from "@/components/job-descriptions/Separator";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { processJobDescription } from "@/services/jobDescriptionService";

const PostJob = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF, Word document, or text file");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileUpload = async (employerProfileId?: string) => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsProcessing(true);
    try {
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('job_descriptions')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Read file content for processing
      const fileContent = await file.text();
      
      // Process with LLM and store in database
      const processedData = await processJobDescription(fileContent);
      
      // Create record in job_descriptions table
      const { error: insertError } = await supabase
        .from('job_descriptions')
        .insert({
          original_text: fileContent,
          job_title: processedData?.extractedRole?.title || null,
          file_name: file.name,
          file_type: file.type,
          file_url: fileName,
          employer_profile_id: employerProfileId || null,
          status: 'processed'
        });

      if (insertError) throw insertError;

      toast.success("File uploaded and processed successfully!");
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
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
      const { error } = await supabase
        .from('job_descriptions')
        .insert({
          original_text: textInput,
          job_title: processedData?.extractedRole?.title || null,
          employer_profile_id: employerProfileId || null,
          status: 'processed'
        });

      if (error) throw error;

      toast.success("Job description processed successfully!");
      setTextInput("");
      
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Text submission error:', error);
      toast.error("Failed to process job description. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-lg p-6 border border-aptiv/10">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">Post a New Job</h1>
          
          <div className="mb-8">
            <FileUpload
              isProcessing={isProcessing}
              file={file}
              onFileChange={handleFileChange}
              onUpload={handleFileUpload}
            />
          </div>

          <Separator text="Or paste job description" />

          <div className="mb-8">
            <TextInput
              isProcessing={isProcessing}
              textInput={textInput}
              onTextChange={handleTextChange}
              onSubmit={handleTextSubmit}
            />
          </div>

          <Separator text="Or manually enter job details" />
          
          <ManualJobForm />
        </div>

        <div className="bg-white rounded-lg p-6 border border-aptiv/10">
          <JobDescriptionTable />
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;
