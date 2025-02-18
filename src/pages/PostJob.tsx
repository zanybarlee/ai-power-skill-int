
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

  const handleFileUpload = async () => {
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

      toast.success("File uploaded successfully!");
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

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      toast.error("Please enter job description text");
      return;
    }

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('job_descriptions')
        .insert({
          original_text: textInput,
          status: 'pending'
        });

      if (error) throw error;

      toast.success("Job description submitted successfully!");
      setTextInput("");
      
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Text submission error:', error);
      toast.error("Failed to submit job description. Please try again.");
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
