
import { Button } from "@/components/ui/button";
import { Globe, Loader2, Check } from "lucide-react";

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
      variant={status === "complete" ? "outline" : "default"}
    >
      {status === "idle" ? (
        <>
          <Globe className="mr-2 h-4 w-4" />
          Start Crawling
        </>
      ) : status === "complete" ? (
        <>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          Completed
        </>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {status === "crawling" ? "Crawling..." : "Processing..."}
        </>
      )}
    </Button>
  );
};
