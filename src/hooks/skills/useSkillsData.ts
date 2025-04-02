
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SkillData {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  required: number;
  department: string;
  trend: "increasing" | "decreasing" | "stable";
  description?: string;
  priority?: "high" | "medium" | "low";
}

export interface DepartmentSkillData {
  department: string;
  skillCount: number;
  averageProficiency: number;
}

export interface SkillTrendData {
  month: string;
  technicalAvg: number;
  softSkillsAvg: number;
  leadershipAvg: number;
}

export const useSkillsData = (userId?: string) => {
  const [organizationSkills, setOrganizationSkills] = useState<SkillData[]>([]);
  const [departmentSkills, setDepartmentSkills] = useState<DepartmentSkillData[]>([]);
  const [skillTrends, setSkillTrends] = useState<SkillTrendData[]>([]);
  const [topSkills, setTopSkills] = useState<SkillData[]>([]);
  const [skillGaps, setSkillGaps] = useState<any[]>([]);

  // This is a placeholder implementation - in a real app, this would fetch from Supabase
  const { data, isLoading, error } = useQuery({
    queryKey: ['skillsData', userId],
    queryFn: async () => {
      // In a real implementation, we would fetch from the database
      // For now, returning mock data
      return {
        organizationSkills: mockSkillsData,
        departmentSkills: mockDepartmentData,
        skillTrends: mockTrendData,
        topSkills: mockTopSkills,
        skillGaps: mockSkillGaps
      };
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setOrganizationSkills(data.organizationSkills);
      setDepartmentSkills(data.departmentSkills);
      setSkillTrends(data.skillTrends);
      setTopSkills(data.topSkills);
      setSkillGaps(data.skillGaps);
    }
  }, [data]);

  return {
    organizationSkills,
    departmentSkills,
    skillTrends,
    topSkills,
    skillGaps,
    isLoading,
    error
  };
};

// Mock data - in a real implementation, this would come from Supabase
const mockSkillsData: SkillData[] = [
  {
    id: 1,
    name: "Cloud Architecture",
    category: "Technical",
    proficiency: 65,
    required: 85,
    department: "IT",
    trend: "increasing",
    description: "Knowledge of cloud infrastructure and architecture patterns",
    priority: "high"
  },
  {
    id: 2,
    name: "React Development",
    category: "Technical",
    proficiency: 78,
    required: 80,
    department: "Engineering",
    trend: "stable",
    description: "Building user interfaces with React and related technologies",
    priority: "medium"
  },
  {
    id: 3,
    name: "Project Management",
    category: "Management",
    proficiency: 82,
    required: 85,
    department: "Operations",
    trend: "increasing",
    description: "Planning, executing, and closing projects successfully",
    priority: "high"
  },
  {
    id: 4,
    name: "Data Analysis",
    category: "Technical",
    proficiency: 70,
    required: 75,
    department: "Analytics",
    trend: "increasing",
    description: "Interpreting data and making data-driven decisions",
    priority: "medium"
  },
  {
    id: 5,
    name: "Leadership",
    category: "Soft Skills",
    proficiency: 75,
    required: 90,
    department: "Management",
    trend: "stable",
    description: "Guiding teams and inspiring organizational growth",
    priority: "high"
  },
  {
    id: 6,
    name: "UI/UX Design",
    category: "Technical",
    proficiency: 81,
    required: 85,
    department: "Design",
    trend: "increasing",
    description: "Creating user-centered designs and experiences",
    priority: "medium"
  },
  {
    id: 7,
    name: "DevOps",
    category: "Technical",
    proficiency: 68,
    required: 80,
    department: "IT",
    trend: "increasing",
    description: "Implementing CI/CD pipelines and automation",
    priority: "high"
  },
  {
    id: 8,
    name: "Artificial Intelligence",
    category: "Technical",
    proficiency: 62,
    required: 75,
    department: "R&D",
    trend: "increasing",
    description: "Developing AI and machine learning solutions",
    priority: "medium"
  },
  {
    id: 9,
    name: "Communication",
    category: "Soft Skills",
    proficiency: 85,
    required: 90,
    department: "All",
    trend: "stable",
    description: "Effective written and verbal communication",
    priority: "high"
  },
  {
    id: 10,
    name: "Strategic Planning",
    category: "Management",
    proficiency: 78,
    required: 85,
    department: "Executive",
    trend: "stable",
    description: "Long-term planning and goal setting",
    priority: "high"
  }
];

// Department skills distribution
const mockDepartmentData: DepartmentSkillData[] = [
  { department: "IT", skillCount: 48, averageProficiency: 72 },
  { department: "Engineering", skillCount: 65, averageProficiency: 78 },
  { department: "Operations", skillCount: 35, averageProficiency: 81 },
  { department: "Analytics", skillCount: 29, averageProficiency: 75 },
  { department: "Management", skillCount: 42, averageProficiency: 79 },
  { department: "Design", skillCount: 28, averageProficiency: 83 }
];

// Skills growth trends over time
const mockTrendData: SkillTrendData[] = [
  { month: "Jan", technicalAvg: 65, softSkillsAvg: 72, leadershipAvg: 68 },
  { month: "Feb", technicalAvg: 67, softSkillsAvg: 73, leadershipAvg: 70 },
  { month: "Mar", technicalAvg: 69, softSkillsAvg: 74, leadershipAvg: 71 },
  { month: "Apr", technicalAvg: 70, softSkillsAvg: 75, leadershipAvg: 72 },
  { month: "May", technicalAvg: 72, softSkillsAvg: 76, leadershipAvg: 74 },
  { month: "Jun", technicalAvg: 74, softSkillsAvg: 77, leadershipAvg: 75 }
];

// Top skills for overview
const mockTopSkills: SkillData[] = [
  { id: 11, name: "Project Management", category: "Management", proficiency: 87, required: 85, department: "Operations", trend: "increasing" },
  { id: 12, name: "React Development", category: "Technical", proficiency: 92, required: 90, department: "Engineering", trend: "stable" },
  { id: 13, name: "Data Analysis", category: "Technical", proficiency: 78, required: 75, department: "Analytics", trend: "increasing" },
  { id: 14, name: "UI/UX Design", category: "Technical", proficiency: 81, required: 80, department: "Design", trend: "stable" },
  { id: 15, name: "Cloud Architecture", category: "Technical", proficiency: 75, required: 85, department: "IT", trend: "increasing" }
];

// Skills gaps for Gap Analysis tab
const mockSkillGaps = [
  { 
    category: "Technical",
    skills: [
      { name: "Cloud Architecture", current: 65, required: 85, priority: "high" },
      { name: "Kubernetes", current: 45, required: 80, priority: "high" },
      { name: "GraphQL", current: 50, required: 75, priority: "medium" },
      { name: "Cybersecurity", current: 60, required: 85, priority: "high" },
      { name: "Data Science", current: 55, required: 75, priority: "medium" }
    ]
  },
  { 
    category: "Soft Skills",
    skills: [
      { name: "Conflict Resolution", current: 70, required: 85, priority: "medium" },
      { name: "Public Speaking", current: 60, required: 80, priority: "low" },
      { name: "Emotional Intelligence", current: 75, required: 90, priority: "high" },
      { name: "Time Management", current: 65, required: 80, priority: "medium" }
    ]
  },
  { 
    category: "Leadership",
    skills: [
      { name: "Strategic Planning", current: 75, required: 90, priority: "high" },
      { name: "Team Development", current: 80, required: 90, priority: "medium" },
      { name: "Change Management", current: 65, required: 85, priority: "high" },
      { name: "Vision Communication", current: 70, required: 85, priority: "medium" }
    ]
  }
];
