
import { Loader2 } from "lucide-react";
import { CVContent } from "../preview/CVContent";

interface CVContentWithLoadingProps {
  content: string;
  isLoading: boolean;
}

export function CVContentWithLoading({ content, isLoading }: CVContentWithLoadingProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">CV Content</h3>
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-aptiv" />
          <span className="ml-2 text-gray-600">Processing CV content...</span>
        </div>
      </div>
    );
  }
  
  return <CVContent content={content} />;
}
