
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { UserHeader } from "@/components/dashboard/UserHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { useUserProfile } from "@/hooks/dashboard/useUserProfile";
import { useDashboardStats } from "@/hooks/dashboard/useDashboardStats";
import { useRecentActivities } from "@/hooks/dashboard/useRecentActivities";

const Dashboard = () => {
  const { userId, userEmail, userAvatar, isLoading: isUserLoading } = useUserProfile();
  const { stats, isLoading: isStatsLoading } = useDashboardStats();
  
  // Query for data needed by activities
  const { data: jobDescriptions } = useQuery({
    queryKey: ['dashboardJobs', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });

  const { data: matches } = useQuery({
    queryKey: ['dashboardMatches', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('cv_match')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });

  const { getRecentActivities } = useRecentActivities(jobDescriptions, matches);
  
  const isLoading = isUserLoading || isStatsLoading;
  const recentActivities = getRecentActivities();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700">Dashboard Overview</h1>
          <UserHeader userId={userId} userEmail={userEmail} userAvatar={userAvatar} />
        </div>

        {isLoading ? (
          <DashboardLoading />
        ) : (
          <>
            {/* Key Metrics */}
            <MetricsGrid stats={stats} />

            {/* Recent Activity */}
            <RecentActivities activities={recentActivities} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
