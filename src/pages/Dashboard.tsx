
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useUserSession } from "@/components/job-descriptions/hooks/useUserSession";
import { UserHeader } from "@/components/dashboard/UserHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { RecentActivity } from "@/components/dashboard/ActivityItem";

interface DashboardStats {
  jobPostings: number;
  candidates: number;
  matches: number;
  successRate: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    jobPostings: 0,
    candidates: 0,
    matches: 0,
    successRate: 0,
  });
  
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  
  // Get the current user's ID
  const { userId, isLoading: isUserLoading } = useUserSession();

  // Get user details
  useEffect(() => {
    const getUserDetails = async () => {
      if (!userId) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email);
        setUserAvatar(session.user.user_metadata?.avatar_url || null);
      }
    };
    
    getUserDetails();
  }, [userId]);

  const { data: jobDescriptions, isLoading: isJobsLoading } = useQuery({
    queryKey: ['dashboardJobs', userId],
    queryFn: async () => {
      // Only query if we have a userId
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId, // Only run the query if userId is available
  });

  const { data: cvMetadata, isLoading: isCandidatesLoading } = useQuery({
    queryKey: ['dashboardCandidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_metadata')
        .select('*')
        .limit(100);
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: matches, isLoading: isMatchesLoading } = useQuery({
    queryKey: ['dashboardMatches', userId],
    queryFn: async () => {
      // Only query if we have a userId
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('cv_match')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId, // Only run the query if userId is available
  });

  // Generate recent activities from the fetched data
  const getRecentActivities = (): RecentActivity[] => {
    const activities: RecentActivity[] = [];
    
    // Add job posting activities
    jobDescriptions?.slice(0, 3).forEach(job => {
      activities.push({
        id: job.id,
        type: 'job',
        title: 'New Job Posted',
        description: job.job_title || 'Job Position',
        timestamp: new Date(job.created_at).toLocaleString()
      });
    });

    // Add candidate match activities
    matches?.slice(0, 3).forEach(match => {
      activities.push({
        id: match.id,
        type: 'match',
        title: 'Candidate Match',
        description: `${match.job_role || 'Position'} - ${Math.round(match.match_score)}% match`,
        timestamp: new Date(match.matched_at || match.created_at).toLocaleString()
      });
    });

    // Sort by timestamp (newest first)
    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 3);
  };

  useEffect(() => {
    if (jobDescriptions && cvMetadata && matches) {
      // Calculate stats
      const jobPostingsCount = jobDescriptions.length;
      const candidatesCount = cvMetadata.length;
      const matchesCount = matches.length;
      
      // Calculate success rate (matches with score > 70%)
      const successfulMatches = matches.filter(match => match.match_score > 70).length;
      const successRate = matchesCount > 0 
        ? Math.round((successfulMatches / matchesCount) * 100)
        : 0;
      
      setStats({
        jobPostings: jobPostingsCount,
        candidates: candidatesCount,
        matches: matchesCount,
        successRate
      });
    }
  }, [jobDescriptions, cvMetadata, matches]);

  const isLoading = isUserLoading || isJobsLoading || isCandidatesLoading || isMatchesLoading;
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
