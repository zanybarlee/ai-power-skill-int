
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const UploadJD = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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

    setIsUploading(true);
    try {
      // Upload file to storage
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('job_descriptions')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Read file content
      const fileContent = await file.text();

      // Process JD with OpenAI
      const { data: processedData, error: processError } = await supabase.functions
        .invoke('process-job-description', {
          body: { jobDescription: fileContent }
        });

      if (processError) throw processError;

      // Save to database
      const { error: dbError } = await supabase
        .from('job_descriptions')
        .insert({
          original_text: fileContent,
          extracted_role: processedData.extractedRole,
          file_name: file.name,
          file_type: file.type,
          file_url: fileData?.path,
          status: 'processed'
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Job description uploaded and processed successfully",
      });

      setFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload and process job description",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Upload Job Description</h2>
        <p className="text-sm text-gray-500">
          Upload a job description file (PDF, Word, or text) to process and analyze.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="bg-white"
        />
        <Button
          onClick={handleUpload}
          disabled={isUploading || !file}
          className="bg-aptiv hover:bg-aptiv/90"
        >
          {isUploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Upload JD
            </>
          )}
        </Button>
      </div>

      {file && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>Selected file: {file.name}</span>
        </div>
      )}
    </div>
  );
};
