
import { Button } from "@/components/ui/button";
import { Globe, Loader2 } from "lucide-react";

interface CrawlButtonProps {
  onClick: () => void;
  disabled: boolean;
  status: "idle" | "crawling" | "processing" | "complete";
}

export const CrawlButton = ({ onClick, disabled, status }: CrawlButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled}
      className="whitespace-nowrap"
    >
      {status === "idle" ? (
        <>
          <Globe className="mr-2 h-4 w-4" />
          Start Crawling
        </>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {status === "crawling" ? "Crawling..." : 
           status === "processing" ? "Processing..." : 
           "Completed"}
        </>
      )}
    </Button>
  );
};
