
import { FileText, Search, Users, Settings, Building, User, LayoutDashboard, Briefcase } from "lucide-react";

export const navigationItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Job Description (JD)",
    icon: Briefcase,
    path: "/post-job",
  },
  {
    name: "Candidate Search (CV)",
    icon: FileText,
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
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
] as const;
