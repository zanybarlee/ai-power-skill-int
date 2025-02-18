
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

interface FileUploadProps {
  isProcessing: boolean;
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => Promise<void>;
}

export const FileUpload = ({ isProcessing, file, onFileChange, onUpload }: FileUploadProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500">Upload a job description file (PDF, Word, or text):</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="file"
          onChange={onFileChange}
          accept=".pdf,.doc,.docx,.txt"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-aptiv/10 file:text-aptiv hover:file:bg-aptiv/20 text-sm text-gray-700"
          disabled={isProcessing}
        />
        <Button
          onClick={onUpload}
          disabled={isProcessing || !file}
          className="bg-aptiv hover:bg-aptiv/90 w-full sm:w-auto"
        >
          {isProcessing ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Upload File
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
