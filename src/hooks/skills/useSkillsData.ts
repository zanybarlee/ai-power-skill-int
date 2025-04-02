
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSkillsData = (userId?: string) => {
  const [organizationSkills, setOrganizationSkills] = useState<any[]>([]);

  // This is a placeholder implementation - in a real app, this would fetch from Supabase
  const { data, isLoading, error } = useQuery({
    queryKey: ['skillsData', userId],
    queryFn: async () => {
      // In a real implementation, we would fetch from the database
      // For now, returning mock data
      return mockSkillsData;
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setOrganizationSkills(data);
    }
  }, [data]);

  return {
    organizationSkills,
    isLoading,
    error
  };
};

// Mock data - in a real implementation, this would come from Supabase
const mockSkillsData = [
  {
    id: 1,
    name: "Cloud Architecture",
    category: "Technical",
    proficiency: 65,
    required: 85,
    department: "IT",
    trend: "increasing"
  },
  {
    id: 2,
    name: "React Development",
    category: "Technical",
    proficiency: 78,
    required: 80,
    department: "Engineering",
    trend: "stable"
  },
  {
    id: 3,
    name: "Project Management",
    category: "Management",
    proficiency: 82,
    required: 85,
    department: "Operations",
    trend: "increasing"
  },
  {
    id: 4,
    name: "Data Analysis",
    category: "Technical",
    proficiency: 70,
    required: 75,
    department: "Analytics",
    trend: "increasing"
  },
  {
    id: 5,
    name: "Leadership",
    category: "Soft Skills",
    proficiency: 75,
    required: 90,
    department: "Management",
    trend: "stable"
  }
];
