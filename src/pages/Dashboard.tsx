
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { BarChart, PieChart, LineChart, Activity, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  jobPostings: number;
  candidates: number;
  matches: number;
  successRate: number;
}

interface RecentActivity {
  id: string;
  type: 'job' | 'candidate' | 'match';
  title: string;
  description: string;
  timestamp: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    jobPostings: 0,
    candidates: 0,
    matches: 0,
    successRate: 0,
  });

  const { data: jobDescriptions, isLoading: isJobsLoading } = useQuery({
    queryKey: ['dashboardJobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
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
    queryKey: ['dashboardMatches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_match')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
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

  const isLoading = isJobsLoading || isCandidatesLoading || isMatchesLoading;
  const recentActivities = getRecentActivities();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700">Dashboard Overview</h1>
          <span className="text-aptiv-gray-500">{new Date().toLocaleDateString()}</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-aptiv" />
            <span className="ml-2 text-aptiv-gray-600">Loading dashboard data...</span>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-aptiv-gray-500 text-sm">Job Postings</p>
                    <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">{stats.jobPostings}</p>
                    <p className="text-aptiv text-sm mt-2 flex items-center">
                      <span className="inline-block mr-1">↑</span>
                      5% increase
                    </p>
                  </div>
                  <div className="bg-aptiv/10 p-3 rounded-lg">
                    <BarChart className="w-6 h-6 text-aptiv" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-aptiv-gray-500 text-sm">Candidates</p>
                    <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">{stats.candidates}</p>
                    <p className="text-aptiv text-sm mt-2 flex items-center">
                      <span className="inline-block mr-1">↑</span>
                      12% increase
                    </p>
                  </div>
                  <div className="bg-aptiv/10 p-3 rounded-lg">
                    <PieChart className="w-6 h-6 text-aptiv" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-aptiv-gray-500 text-sm">Matches</p>
                    <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">{stats.matches}</p>
                    <p className="text-aptiv text-sm mt-2 flex items-center">
                      <span className="inline-block mr-1">↑</span>
                      15% increase
                    </p>
                  </div>
                  <div className="bg-aptiv/10 p-3 rounded-lg">
                    <Activity className="w-6 h-6 text-aptiv" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-aptiv-gray-500 text-sm">Success Rate</p>
                    <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">{stats.successRate}%</p>
                    <p className="text-aptiv text-sm mt-2 flex items-center">
                      <span className="inline-block mr-1">↑</span>
                      3% increase
                    </p>
                  </div>
                  <div className="bg-aptiv/10 p-3 rounded-lg">
                    <LineChart className="w-6 h-6 text-aptiv" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Recent Activity</h2>
              {recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} className={`flex items-center justify-between py-3 ${
                      index < recentActivities.length - 1 ? 'border-b border-aptiv/10' : ''
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="bg-aptiv/10 p-2 rounded-lg">
                          {activity.type === 'job' && <BarChart className="w-5 h-5 text-aptiv" />}
                          {activity.type === 'candidate' && <PieChart className="w-5 h-5 text-aptiv" />}
                          {activity.type === 'match' && <Activity className="w-5 h-5 text-aptiv" />}
                        </div>
                        <div>
                          <p className="text-aptiv-gray-700 font-medium">{activity.title}</p>
                          <p className="text-aptiv-gray-500 text-sm">{activity.description}</p>
                        </div>
                      </div>
                      <span className="text-aptiv-gray-500 text-sm">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-aptiv-gray-500 text-center py-8">No recent activities found</p>
              )}
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
