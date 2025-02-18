
import { FileText, Search, Users, Settings } from "lucide-react";

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
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
] as const;
