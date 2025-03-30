
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobUploadTab } from "./JobUploadTab";
import { JobTextTab } from "./JobTextTab";
import { JobManualTab } from "./JobManualTab";
import { JobCrawlerTab } from "./JobCrawlerTab";

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
      <TabsList className="grid w-full grid-cols-4 mb-6 bg-white border border-aptiv/20 rounded-lg p-1">
        <TabsTrigger 
          value="manual"
          className="data-[state=active]:bg-aptiv data-[state=active]:text-white data-[state=active]:shadow-none text-aptiv-gray-600 hover:text-aptiv px-8 py-2.5"
        >
          Manual Entry
        </TabsTrigger>
        <TabsTrigger 
          value="upload"
          className="data-[state=active]:bg-aptiv data-[state=active]:text-white data-[state=active]:shadow-none text-aptiv-gray-600 hover:text-aptiv px-8 py-2.5"
        >
          Upload JD
        </TabsTrigger>
        <TabsTrigger 
          value="text"
          className="data-[state=active]:bg-aptiv data-[state=active]:text-white data-[state=active]:shadow-none text-aptiv-gray-600 hover:text-aptiv px-8 py-2.5"
        >
          Paste Text
        </TabsTrigger>
        <TabsTrigger 
          value="crawler"
          className="data-[state=active]:bg-aptiv data-[state=active]:text-white data-[state=active]:shadow-none text-aptiv-gray-600 hover:text-aptiv px-8 py-2.5"
        >
          Crawl JD
        </TabsTrigger>
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
      
      <TabsContent value="crawler">
        <JobCrawlerTab 
          isProcessing={isProcessing}
          onJobsImport={onFileUpload}
        />
      </TabsContent>
    </Tabs>
  );
};
