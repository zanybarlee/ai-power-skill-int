
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchedCandidatesTable } from "@/components/shortlists/MatchedCandidatesTable";
import { JobDescriptionInput } from "@/components/shortlists/JobDescriptionInput";
import { MatchingResultsList } from "@/components/shortlists/MatchingResultsList";
import { useShortlists } from "@/hooks/useShortlists";

const Shortlists = () => {
  const {
    jobDescription,
    setJobDescription,
    isMatching,
    matchingResults,
    jobDescriptions,
    matchedCandidates,
    handleMatch,
    handleClearMatches,
    selectedJobId,
    setSelectedJobId,
    userId,
    refetchMatchedCandidates
  } = useShortlists();

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
            <JobDescriptionInput 
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              jobDescriptions={jobDescriptions}
              isMatching={isMatching}
              handleMatch={handleMatch}
            />
            
            <MatchingResultsList matchingResults={matchingResults} />
          </CardContent>
        </Card>

        <Card className="border border-aptiv/10 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-aptiv-gray-700">
              Matched Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MatchedCandidatesTable 
              candidates={matchedCandidates} 
              onClearMatches={handleClearMatches}
              onCandidateUpdated={refetchMatchedCandidates}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Shortlists;
