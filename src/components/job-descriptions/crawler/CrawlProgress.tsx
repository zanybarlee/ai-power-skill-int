
import { Progress } from "@/components/ui/progress";

interface CrawlProgressProps {
  progress: number;
  status: "idle" | "crawling" | "processing" | "complete";
}

export const CrawlProgress = ({ progress, status }: CrawlProgressProps) => {
  if (status === "idle") return null;
  
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2 bg-gray-100" />
      <p className="text-sm text-gray-600">
        {status === "crawling" ? "Crawling website for job listings..." :
         status === "processing" ? "Processing and storing job descriptions..." :
         "Import complete!"}
        {progress > 0 && progress < 100 && ` (${Math.round(progress)}%)`}
      </p>
    </div>
  );
};
