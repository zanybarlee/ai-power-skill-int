
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import { FileUpload } from "./FileUpload";
import { TextInput } from "./TextInput";
import { processJobDescription, uploadFileToStorage } from "./jobDescriptionService";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const UploadJD = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const queryClient = useQueryClient();

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!allowedFileTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, Word document, or text file",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setTextInput(""); // Clear text input when file is selected
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    setFile(null); // Clear file when text is input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { fileStorageName } = await uploadFileToStorage(file);
      const fileContent = await file.text();
      
      const processedData = await processJobDescription(fileContent);
      
      // Create record in job_descriptions table
      const { error: insertError } = await supabase
        .from('job_descriptions')
        .insert({
          original_text: fileContent,
          job_title: processedData.extractedRole.title,
          file_name: file.name,
          file_type: file.type,
          file_url: fileStorageName,
          status: 'processed'
          // Removed user_id field since it doesn't exist in the database
        });

      if (insertError) throw insertError;
      
      toast({
        title: "Success",
        description: "Job description processed successfully",
      });

      // Clear inputs
      setFile(null);
      setTextInput("");
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Refresh job descriptions list
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload and process job description",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const processedData = await processJobDescription(textInput);
      
      // Create record in job_descriptions table
      const { error } = await supabase
        .from('job_descriptions')
        .insert({
          original_text: textInput,
          job_title: processedData.extractedRole.title,
          status: 'processed'
          // Removed user_id field since it doesn't exist in the database
        });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Job description processed successfully",
      });

      setTextInput("");
      
      // Refresh job descriptions list
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Error",
        description: "Failed to process job description",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Add Job Description</h2>
        <p className="text-sm text-gray-500">
          Upload a file or enter your job description text directly.
        </p>
      </div>

      <div className="space-y-4">
        <FileUpload
          isProcessing={isProcessing}
          file={file}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
        />

        <TextInput
          isProcessing={isProcessing}
          textInput={textInput}
          onTextChange={handleTextInputChange}
          onSubmit={handleTextSubmit}
        />

        {file && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>Selected file: {file.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
