
import { FileText, Search, Users, Settings, Building, User, List } from "lucide-react";

export const navigationItems = [
  {
    name: "Job Description (JD)",
    icon: FileText,
    path: "/post-job",
  },
  {
    name: "Candidate Search (CV)",
    icon: Search,
    path: "/candidates",
  },
  {
    name: "Shortlists",
    icon: Users,
    path: "/shortlists",
  },
  {
    name: "Employer Profile",
    icon: Building,
    path: "/employer-profile",
  },
  {
    name: "EAP Management",
    icon: User,
    path: "/eap-management",
  },
  {
    name: "EA Division",
    icon: List,
    path: "/ea-division",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
] as const;
