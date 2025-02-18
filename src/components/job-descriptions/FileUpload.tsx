
import { Input } from "@/components/ui/input";
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
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={onFileChange}
        className="bg-white"
        disabled={isProcessing}
      />
      <Button
        onClick={onUpload}
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
  );
};
