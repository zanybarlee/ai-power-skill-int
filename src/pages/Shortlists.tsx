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
import { useState, useEffect } from "react";
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
  const [jobDescription, setJobDescription] = useState(() => {
    return localStorage.getItem("jobDescription") || "";
  });
  const [isMatching, setIsMatching] = useState(false);
  const [matchingResult, setMatchingResult] = useState<string | null>(() => {
    return localStorage.getItem("matchingResult");
  });

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("jobDescription", jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    if (matchingResult) {
      localStorage.setItem("matchingResult", matchingResult);
    }
  }, [matchingResult]);

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
        <Card className="border border-aptiv/10 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-aptiv-gray-700">
              Match Candidates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-aptiv-gray-600 text-sm font-medium">
                Job Description
              </label>
              <Textarea
                placeholder="Enter job description to find best matches..."
                className="bg-white border-aptiv/20 text-aptiv-gray-700 placeholder:text-aptiv-gray-400"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button
                onClick={handleMatch}
                disabled={isMatching}
                className="bg-aptiv text-white hover:bg-aptiv-dark"
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
              <div className="mt-4 p-4 bg-white border border-aptiv/10 rounded-md">
                <h3 className="text-aptiv font-medium mb-2">Matching Results</h3>
                <p className="text-aptiv-gray-700 whitespace-pre-wrap">
                  {matchingResult}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-aptiv/10 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-aptiv-gray-700">
              Shortlisted Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-aptiv/10">
                  <TableHead className="text-aptiv-gray-600">Name</TableHead>
                  <TableHead className="text-aptiv-gray-600">Role</TableHead>
                  <TableHead className="text-aptiv-gray-600">Location</TableHead>
                  <TableHead className="text-aptiv-gray-600">Experience</TableHead>
                  <TableHead className="text-aptiv-gray-600">Skills</TableHead>
                  <TableHead className="text-aptiv-gray-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shortlistedCandidates.map((candidate) => (
                  <TableRow
                    key={candidate.id}
                    className="border-aptiv/10 hover:bg-aptiv/5"
                  >
                    <TableCell className="text-aptiv-gray-700 font-medium">
                      {candidate.name}
                    </TableCell>
                    <TableCell className="text-aptiv-gray-600">
                      {candidate.role}
                    </TableCell>
                    <TableCell className="text-aptiv-gray-600">
                      {candidate.location}
                    </TableCell>
                    <TableCell className="text-aptiv-gray-600">
                      {candidate.experience}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-aptiv border-aptiv/20 bg-aptiv/5"
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
                          className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(candidate.id)}
                          className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
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