
import { RecentActivity } from "@/components/dashboard/ActivityItem";

export function useRecentActivities(
  jobDescriptions: any[] | undefined,
  matches: any[] | undefined
) {
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

  return { getRecentActivities };
}
