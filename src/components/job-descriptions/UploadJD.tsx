
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProcessedData {
  extractedRole: {
    title?: string;
    requirements?: string[];
    skills?: string[];
    experience?: string;
    [key: string]: any;
  };
}

export const UploadJD = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");

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

  const processJobDescription = async (content: string) => {
    setIsProcessing(true);
    try {
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
        p_file_name: file?.name || 'manual-input.txt',
        p_file_type: file?.type || 'text/plain',
        p_file_url: null as string | null
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Job description processed successfully",
      });

      // Clear inputs
      setFile(null);
      setTextInput("");
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
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
      // Upload file to storage
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('job_descriptions')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Read file content
      const fileContent = await file.text();
      await processJobDescription(fileContent);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload and process job description",
        variant: "destructive",
      });
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

    await processJobDescription(textInput);
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
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="bg-white"
            disabled={isProcessing}
          />
          <Button
            onClick={handleUpload}
            disabled={isProcessing || !file}
            className="bg-aptiv hover:bg-aptiv/90"
          >
            {isProcessing ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Upload File
              </>
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Or enter job description text:</p>
          <Textarea
            placeholder="Enter job description here..."
            value={textInput}
            onChange={handleTextInputChange}
            className="min-h-[200px]"
            disabled={isProcessing}
          />
          <Button
            onClick={handleTextSubmit}
            disabled={isProcessing || !textInput.trim()}
            className="bg-aptiv hover:bg-aptiv/90 w-full sm:w-auto"
          >
            {isProcessing ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Process Text
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
    </div>
  );
};
