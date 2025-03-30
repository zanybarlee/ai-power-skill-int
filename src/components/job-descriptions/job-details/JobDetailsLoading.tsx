
import { Loader2 } from "lucide-react";

export const JobDetailsLoading = () => (
  <div className="py-8 text-center">
    <Loader2 className="h-8 w-8 animate-spin mx-auto text-aptiv" />
    <p className="mt-2 text-gray-500">Loading job details...</p>
  </div>
);
