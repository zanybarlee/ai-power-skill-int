
import { FileText, Search, Users, Settings, Building, User, LayoutDashboard, BrainCircuit } from "lucide-react";

export const navigationItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
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
    name: "Skills Intelligence",
    icon: BrainCircuit,
    path: "/skills-intelligence",
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
