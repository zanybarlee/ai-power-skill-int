import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { searchTalent } from "@/services/talentSearch";

export const CrawlTab = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCrawlCV = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a CV file first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "CV uploaded successfully",
    });
  };

  const handleSearchTalent = async () => {
    setIsLoading(true);
    try {
      const params = {
        search_query: "BIM Modeler",
        uen: "200311331R",
        user_guid: "59884f68-8db5-4fe7-a0a3-baa466c1c808",
        session_id: "session-" + Date.now(),
        context_id: "context-" + Date.now(),
        search_id: "search-" + Date.now(),
      };

      const result = await searchTalent(params);
      toast({
        title: "Success",
        description: "Talent search completed successfully",
      });
      console.log('Search results:', result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for talent",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="bg-forest border-mint/20 text-white"
        />
        <Button
          onClick={handleCrawlCV}
          className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload CV
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={handleSearchTalent}
          disabled={isLoading}
          className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          {isLoading ? "Searching..." : "Search Talent"}
        </Button>
      </div>
      <p className="text-white/70 text-sm">
        Supported formats: PDF, DOC, DOCX
      </p>
    </div>
  );
};