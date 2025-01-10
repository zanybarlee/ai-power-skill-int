import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkX, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const shortlistedCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    location: "San Francisco",
    experience: "5 years",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    email: "sarah.j@example.com",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Backend Developer",
    location: "New York",
    experience: "7 years",
    skills: ["Node.js", "Python", "PostgreSQL"],
    email: "michael.c@example.com",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Full Stack Developer",
    location: "Austin",
    experience: "4 years",
    skills: ["React", "Node.js", "MongoDB"],
    email: "emily.r@example.com",
  },
];

const Shortlists = () => {
  const { toast } = useToast();

  const handleRemove = (candidateId: number) => {
    toast({
      title: "Candidate removed",
      description: "The candidate has been removed from your shortlist.",
    });
  };

  const handleContact = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="bg-forest-light border-mint/10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">
              Shortlisted Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-mint/10 hover:bg-forest">
                  <TableHead className="text-mint">Name</TableHead>
                  <TableHead className="text-mint">Role</TableHead>
                  <TableHead className="text-mint">Location</TableHead>
                  <TableHead className="text-mint">Experience</TableHead>
                  <TableHead className="text-mint">Skills</TableHead>
                  <TableHead className="text-mint text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shortlistedCandidates.map((candidate) => (
                  <TableRow
                    key={candidate.id}
                    className="border-mint/10 hover:bg-forest"
                  >
                    <TableCell className="text-white">{candidate.name}</TableCell>
                    <TableCell className="text-white/80">
                      {candidate.role}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {candidate.location}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {candidate.experience}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-mint border-mint/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleContact(candidate.email)}
                          className="text-mint hover:text-mint hover:bg-forest"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(candidate.id)}
                          className="text-mint hover:text-mint hover:bg-forest"
                        >
                          <BookmarkX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Shortlists;