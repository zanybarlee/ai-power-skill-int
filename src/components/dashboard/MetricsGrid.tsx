
import { BarChart, PieChart, LineChart, Activity } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface DashboardStats {
  jobPostings: number;
  candidates: number;
  matches: number;
  successRate: number;
}

interface MetricsGridProps {
  stats: DashboardStats;
}

export const MetricsGrid = ({ stats }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Job Postings"
        value={stats.jobPostings}
        changeText="5% increase"
        icon={BarChart}
      />
      <MetricCard
        title="Candidates"
        value={stats.candidates}
        changeText="12% increase"
        icon={PieChart}
      />
      <MetricCard
        title="Matches"
        value={stats.matches}
        changeText="15% increase"
        icon={Activity}
      />
      <MetricCard
        title="Success Rate"
        value={`${stats.successRate}%`}
        changeText="3% increase"
        icon={LineChart}
      />
    </div>
  );
};
