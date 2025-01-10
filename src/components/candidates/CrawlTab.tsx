import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CrawlTab = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      <p className="text-white/70 text-sm">
        Supported formats: PDF, DOC, DOCX
      </p>
    </div>
  );
};