import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { searchTalent } from "@/services/talentSearch";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subDays } from "date-fns";
import { CandidateDetailsDialog } from "@/components/shortlists/CandidateDetailsDialog";
import { SearchBar } from "./SearchBar";
import { DateSelector } from "./DateSelector";
import { ResultsTable } from "./ResultsTable";

export const CrawlTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [daysAgo, setDaysAgo] = useState(0);
  const [date, setDate] = useState<Date>();
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: crawlResults, refetch: refetchResults } = useQuery({
    queryKey: ['crawlResults', date || daysAgo],
    queryFn: async () => {
      let targetDate;
      if (date) {
        targetDate = new Date(date);
      } else {
        targetDate = subDays(new Date(), daysAgo);
      }
      targetDate.setHours(0, 0, 0, 0);
      const nextDate = new Date(targetDate);
      nextDate.setDate(targetDate.getDate() + 1);

      const { data, error } = await supabase
        .from('cv_metadata')
        .select('*')
        .gte('created_at', targetDate.toISOString())
        .lt('created_at', nextDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    handleCheckResults();
  }, []);

  const handleSearchTalent = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const params = {
        search_query: searchQuery,
        uen: "200311331R",
        user_guid: "59884f68-8db5-4fe7-a0a3-baa466c1c808",
        session_id: "session-" + Date.now(),
        context_id: "context-" + Date.now(),
        search_id: "search-" + Date.now(),
      };

      const result = await searchTalent(params);
      await refetchResults();
      toast({
        title: "Success",
        description: "CV crawl completed successfully",
      });
      console.log('Search results:', result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to crawl CV",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnquiry = (candidate: any) => {
    toast({
      title: "Enquiry Sent",
      description: `Your enquiry about ${candidate.name || 'this candidate'} has been sent. We'll get back to you soon.`,
    });
  };

  const handleCheckResults = async () => {
    await refetchResults();
    setShowResults(true);
  };

  const handleRowClick = (candidate: any) => {
    const candidateDetails = {
      ...candidate,
      match_score: null,
      job_description: null,
      matched_at: candidate.created_at,
    };
    setSelectedCandidate(candidateDetails);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <SearchBar
          searchQuery={searchQuery}
          isLoading={isLoading}
          onSearchChange={setSearchQuery}
          onSearch={handleSearchTalent}
        />
        <Button
          onClick={handleCheckResults}
          variant="outline"
          className="border-aptiv text-aptiv hover:bg-aptiv hover:text-white transition-all duration-200"
        >
          <ClipboardList className="h-5 w-5 mr-2" />
          Check Results
        </Button>
      </div>

      <DateSelector
        date={date}
        daysAgo={daysAgo}
        onDateChange={setDate}
        onDaysAgoChange={setDaysAgo}
        onCheckResults={handleCheckResults}
      />

      <ResultsTable
        results={crawlResults || []}
        date={date}
        daysAgo={daysAgo}
        onEnquiry={handleEnquiry}
        onRowClick={handleRowClick}
      />

      <CandidateDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedCandidate(null);
        }}
        candidate={selectedCandidate}
      />
    </div>
  );
};