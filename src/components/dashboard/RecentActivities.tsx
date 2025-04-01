
import { Card } from "@/components/ui/card";
import { ActivityItem, RecentActivity } from "./ActivityItem";

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-aptiv-gray-700 mb-4">Recent Activity</h2>
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              isLast={index === activities.length - 1} 
            />
          ))}
        </div>
      ) : (
        <p className="text-aptiv-gray-500 text-center py-8">No recent activities found</p>
      )}
    </Card>
  );
};
