import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { queryBestMatch } from "@/services/matchingService";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MatchedCandidatesTable } from "@/components/shortlists/MatchedCandidatesTable";
import { normalizeSkills } from "@/utils/candidateUtils";

const Shortlists = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState(() => {
    return localStorage.getItem("jobDescription") || "";
  });
  const [isMatching, setIsMatching] = useState(false);
  const [matchingResult, setMatchingResult] = useState<string | null>(() => {
    return localStorage.getItem("matchingResult");
  });

  const { data: matchedCandidates = [] } = useQuery({
    queryKey: ['matchedCandidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cv_match')
        .select(`
          id,
          match_score,
          cv_metadata:cv_metadata_id (
            id,
            name,
            email,
            experience,
            location,
            skills
          )
        `)
        .order('match_score', { ascending: false });

      if (error) {
        console.error('Error fetching matched candidates:', error);
        throw error;
      }

      return data.map((match) => ({
        id: match.id,
        name: match.cv_metadata?.name || 'Unknown',
        role: 'Not specified',
        location: match.cv_metadata?.location || 'Not specified',
        experience: match.cv_metadata?.experience 
          ? `${match.cv_metadata.experience} years` 
          : 'Not specified',
        skills: normalizeSkills(match.cv_metadata?.skills),
        email: match.cv_metadata?.email || '',
        match_score: Math.round(match.match_score || 0)
      }));
    }
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
            <MatchedCandidatesTable candidates={matchedCandidates} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Shortlists;