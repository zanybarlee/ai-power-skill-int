
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, FileUp } from "lucide-react";

interface FileUploadProps {
  isProcessing: boolean;
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: (employerProfileId?: string) => Promise<void>;
}

export const FileUpload = ({ isProcessing, file, onFileChange, onUpload }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      const event = {
        target: {
          files: e.dataTransfer.files
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-md p-8 text-center ${isDragging ? 'border-aptiv bg-aptiv/5' : 'border-gray-200'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <UploadCloud className="h-10 w-10 text-aptiv-gray-400" />
          <h3 className="text-lg font-medium">Drag & Drop File</h3>
          <p className="text-sm text-aptiv-gray-500">or select a file from your computer</p>
          <Input
            type="file"
            onChange={onFileChange}
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <div className="bg-white text-aptiv border border-aptiv rounded-md py-1.5 px-3 text-sm font-medium cursor-pointer hover:bg-aptiv/5 transition">
              Browse Files
            </div>
          </label>
        </div>
      </div>
      {file && (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
          <div className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-aptiv" />
            <span className="text-sm font-medium">{file.name}</span>
            <span className="text-xs text-aptiv-gray-500">({Math.round(file.size / 1024)} KB)</span>
          </div>
          <Button
            onClick={() => onUpload()}
            disabled={isProcessing}
            variant="aptiv"
            size="sm"
          >
            {isProcessing ? "Processing..." : "Process File"}
          </Button>
        </div>
      )}
    </div>
  );
};
