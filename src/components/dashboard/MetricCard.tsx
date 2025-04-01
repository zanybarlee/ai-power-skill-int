
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: number | string;
  changeText: string;
  icon: LucideIcon;
}

export const MetricCard = ({ title, value, changeText, icon: Icon }: MetricCardProps) => {
  return (
    <Card className="bg-white border-aptiv/10 p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-aptiv-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-aptiv-gray-700 mt-2">{value}</p>
          <p className="text-aptiv text-sm mt-2 flex items-center">
            <span className="inline-block mr-1">↑</span>
            {changeText}
          </p>
        </div>
        <div className="bg-aptiv/10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-aptiv" />
        </div>
      </div>
    </Card>
  );
};
