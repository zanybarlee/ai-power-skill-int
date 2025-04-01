
import { BarChart, PieChart, Activity } from "lucide-react";

export interface RecentActivity {
  id: string;
  type: 'job' | 'candidate' | 'match';
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityItemProps {
  activity: RecentActivity;
  isLast: boolean;
}

export const ActivityItem = ({ activity, isLast }: ActivityItemProps) => {
  return (
    <div className={`flex items-center justify-between py-3 ${
      !isLast ? 'border-b border-aptiv/10' : ''
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
  );
};
