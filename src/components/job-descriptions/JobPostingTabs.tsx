
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobUploadTab } from "./JobUploadTab";
import { JobTextTab } from "./JobTextTab";
import { JobManualTab } from "./JobManualTab";

interface JobPostingTabsProps {
  isProcessing: boolean;
  file: File | null;
  textInput: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: (employerProfileId?: string) => Promise<void>;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTextSubmit: (employerProfileId?: string) => Promise<void>;
}

export const JobPostingTabs = ({
  isProcessing,
  file,
  textInput,
  onFileChange,
  onFileUpload,
  onTextChange,
  onTextSubmit,
}: JobPostingTabsProps) => {
  return (
    <Tabs defaultValue="manual" className="mb-8">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        <TabsTrigger value="upload">Upload JD</TabsTrigger>
        <TabsTrigger value="text">Paste Text</TabsTrigger>
      </TabsList>
      
      <TabsContent value="manual">
        <JobManualTab />
      </TabsContent>

      <TabsContent value="upload">
        <JobUploadTab 
          isProcessing={isProcessing} 
          file={file} 
          onFileChange={onFileChange} 
          onUpload={onFileUpload} 
        />
      </TabsContent>
      
      <TabsContent value="text">
        <JobTextTab 
          isProcessing={isProcessing} 
          textInput={textInput} 
          onTextChange={onTextChange} 
          onSubmit={onTextSubmit} 
        />
      </TabsContent>
    </Tabs>
  );
};
