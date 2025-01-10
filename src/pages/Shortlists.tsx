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
import { BookmarkX, Mail, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { queryBestMatch } from "@/services/matchingService";
import { Textarea } from "@/components/ui/textarea";

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
  const [jobDescription, setJobDescription] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [matchingResult, setMatchingResult] = useState<string | null>(null);

  const handleRemove = (candidateId: number) => {
    toast({
      title: "Candidate removed",
      description: "The candidate has been removed from your shortlist.",
    });
  };

  const handleContact = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsMatching(true);
    try {
      const result = await queryBestMatch(jobDescription);
      setMatchingResult(result);
      toast({
        title: "Match Complete",
        description: "Best matches have been found based on the job description.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="bg-forest-light border-mint/10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">
              Match Candidates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-mint text-sm">Job Description</label>
              <Textarea
                placeholder="Enter job description to find best matches..."
                className="bg-forest border-mint/20 text-white placeholder:text-white/50"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button
                onClick={handleMatch}
                disabled={isMatching}
                className="bg-mint text-forest hover:bg-mint/90"
              >
                {isMatching ? (
                  "Finding Matches..."
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Find Best Matches
                  </>
                )}
              </Button>
            </div>
            
            {matchingResult && (
              <div className="mt-4 p-4 bg-forest rounded-md">
                <h3 className="text-mint font-medium mb-2">Matching Results</h3>
                <p className="text-white/90 whitespace-pre-wrap">{matchingResult}</p>
              </div>
            )}
          </CardContent>
        </Card>

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
