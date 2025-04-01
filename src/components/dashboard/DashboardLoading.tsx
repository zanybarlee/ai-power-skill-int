
import { Loader2 } from "lucide-react";

export const DashboardLoading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-aptiv" />
      <span className="ml-2 text-aptiv-gray-600">Loading dashboard data...</span>
    </div>
  );
};
