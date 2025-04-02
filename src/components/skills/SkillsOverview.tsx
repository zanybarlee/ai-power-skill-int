
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Users, BookOpen, BarChart2 } from "lucide-react";
import { useSkillsData } from "@/hooks/skills/useSkillsData";

interface SkillsOverviewProps {
  userId?: string;
}

export const SkillsOverview = ({ userId }: SkillsOverviewProps) => {
  const { organizationSkills, isLoading } = useSkillsData(userId);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="h-8 w-8 border-t-2 border-b-2 border-aptiv rounded-full animate-spin"></div>
      </div>
    );
  }

  const topSkills = [
    { name: "Project Management", proficiency: 87 },
    { name: "React Development", proficiency: 92 },
    { name: "Data Analysis", proficiency: 78 },
    { name: "UI/UX Design", proficiency: 81 },
    { name: "Cloud Architecture", proficiency: 75 },
  ];

  const metrics = [
    { 
      title: "Skills Mapped", 
      value: "247", 
      icon: <BrainCircuit className="w-6 h-6 text-aptiv" />,
      change: "+15%"
    },
    { 
      title: "Total Employees", 
      value: "142", 
      icon: <Users className="w-6 h-6 text-aptiv" />,
      change: "+3%"
    },
    { 
      title: "Assessments", 
      value: "856", 
      icon: <BookOpen className="w-6 h-6 text-aptiv" />,
      change: "+12%"
    },
    { 
      title: "Skill Gap Score", 
      value: "76/100", 
      icon: <BarChart2 className="w-6 h-6 text-aptiv" />,
      change: "+8%"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4 bg-white border-aptiv/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-aptiv-gray-500 text-sm">{metric.title}</p>
                <p className="text-2xl font-semibold text-aptiv-gray-700 mt-1">{metric.value}</p>
                <p className="text-aptiv text-xs mt-1">{metric.change} from last month</p>
              </div>
              <div className="bg-aptiv/10 p-2 rounded-lg">
                {metric.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Skills */}
      <Card className="p-6 bg-white border-aptiv/10">
        <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Top Organizational Skills</h3>
        <div className="space-y-4">
          {topSkills.map((skill, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-aptiv-gray-600">{skill.name}</span>
                <span className="text-sm text-aptiv-gray-500">{skill.proficiency}%</span>
              </div>
              <Progress value={skill.proficiency} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Skills Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-aptiv/10">
          <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Skills by Department</h3>
          <div className="h-64 flex items-center justify-center text-aptiv-gray-500">
            Chart visualization would be displayed here
          </div>
        </Card>

        <Card className="p-6 bg-white border-aptiv/10">
          <h3 className="text-lg font-medium text-aptiv-gray-700 mb-4">Skills Growth Trends</h3>
          <div className="h-64 flex items-center justify-center text-aptiv-gray-500">
            Line chart visualization would be displayed here
          </div>
        </Card>
      </div>
    </div>
  );
};
