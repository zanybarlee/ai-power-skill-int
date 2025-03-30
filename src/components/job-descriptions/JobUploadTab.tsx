
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/job-descriptions/FileUpload";

interface JobUploadTabProps {
  isProcessing: boolean;
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: (employerProfileId?: string) => Promise<void>;
}

export const JobUploadTab = ({ isProcessing, file, onFileChange, onUpload }: JobUploadTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Job Description</CardTitle>
        <CardDescription>
          Upload a PDF, Word document, or text file containing a job description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUpload
          isProcessing={isProcessing}
          file={file}
          onFileChange={onFileChange}
          onUpload={onUpload}
        />
      </CardContent>
    </Card>
  );
};
