
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployerProfiles } from "./hooks/useEmployerProfiles";
import { useState } from "react";

interface FileUploadProps {
  isProcessing: boolean;
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: (employerProfileId?: string) => Promise<void>;
}

export const FileUpload = ({ isProcessing, file, onFileChange, onUpload }: FileUploadProps) => {
  const { profiles, isLoading: isLoadingProfiles } = useEmployerProfiles();
  const [selectedEmployerProfileId, setSelectedEmployerProfileId] = useState<string | undefined>(undefined);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Upload a job description file (PDF, Word, or text):</p>
      
      <div className="space-y-4">
        <input
          type="file"
          onChange={onFileChange}
          accept=".pdf,.doc,.docx,.txt"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-aptiv/10 file:text-aptiv hover:file:bg-aptiv/20 text-sm text-gray-700"
          disabled={isProcessing}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1">Select Employer Profile</p>
            <Select 
              value={selectedEmployerProfileId} 
              onValueChange={setSelectedEmployerProfileId}
              disabled={isLoadingProfiles || isProcessing}
            >
              <SelectTrigger className="w-full bg-white border-aptiv/20">
                <SelectValue placeholder="Select employer profile" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {profiles?.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => onUpload(selectedEmployerProfileId)}
            disabled={isProcessing || !file}
            className="bg-aptiv hover:bg-aptiv/90 w-full"
          >
            {isProcessing ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Upload & Process
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
