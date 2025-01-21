import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, ClipboardList, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { searchTalent } from "@/services/talentSearch";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, subDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CandidateDetailsDialog } from "@/components/shortlists/CandidateDetailsDialog";

export const CrawlTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true); // Changed to true by default
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

  // Fetch results when component mounts
  useEffect(() => {
    handleCheckResults();
  }, []); // Empty dependency array means this runs once on mount

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
    const dateText = date 
      ? format(date, "PPP")
      : daysAgo === 0 
        ? "today" 
        : `${daysAgo} days ago`;
    toast({
      title: "Results Updated",
      description: `Showing ${crawlResults?.length || 0} results from ${dateText}`,
    });
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
        <Input
          type="text"
          placeholder="Enter search query (e.g., BIM Modeler)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white border-aptiv/20 text-aptiv-gray-700"
        />
        <Button
          onClick={handleSearchTalent}
          disabled={isLoading}
          className="bg-aptiv hover:bg-aptiv/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base py-6 px-8"
        >
          <Search className="h-5 w-5 mr-2" />
          {isLoading ? "Crawling..." : "Crawl CV"}
        </Button>
        <Button
          onClick={handleCheckResults}
          variant="outline"
          className="border-aptiv text-aptiv hover:bg-aptiv hover:text-white transition-all duration-200"
        >
          <ClipboardList className="h-5 w-5 mr-2" />
          Check Results
        </Button>
      </div>

      {/* Date Selection */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((days) => (
            <Button
              key={days}
              variant={!date && daysAgo === days ? "default" : "outline"}
              onClick={() => {
                setDate(undefined);
                setDaysAgo(days);
                if (showResults) handleCheckResults();
              }}
              className={cn(
                !date && daysAgo === days 
                  ? "bg-aptiv text-white" 
                  : "border-aptiv text-aptiv hover:bg-aptiv hover:text-white",
                "transition-all duration-200"
              )}
            >
              {days === 0 ? "Today" : `${days} days ago`}
            </Button>
          ))}
        </div>
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={date ? "default" : "outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  date ? "bg-aptiv text-white" : "border-aptiv text-aptiv hover:bg-aptiv hover:text-white"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  if (newDate) {
                    setDaysAgo(-1);
                    if (showResults) handleCheckResults();
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Results Pane - Always visible now */}
      <div className="bg-white rounded-lg border border-aptiv/10 p-6">
        <h2 className="text-lg font-semibold text-aptiv-gray-700 mb-4">
          Crawl Results {date 
            ? format(date, "PPP")
            : daysAgo === 0 
              ? "Today" 
              : `(${daysAgo} days ago)`}
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crawlResults?.map((result) => (
                <TableRow 
                  key={result.id}
                  className="cursor-pointer hover:bg-aptiv/5"
                  onClick={() => handleRowClick(result)}
                >
                  <TableCell>{result.name || 'N/A'}</TableCell>
                  <TableCell>{result.email || 'N/A'}</TableCell>
                  <TableCell>{result.location || 'N/A'}</TableCell>
                  <TableCell>{result.experience ? `${result.experience} years` : 'N/A'}</TableCell>
                  <TableCell>
                    {result.created_at 
                      ? format(new Date(result.created_at), 'HH:mm:ss')
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnquiry(result);
                      }}
                      variant="outline"
                      size="sm"
                      className="text-aptiv hover:text-white hover:bg-aptiv"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Enquire
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!crawlResults || crawlResults.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No results found for {date 
                      ? format(date, "PPP")
                      : daysAgo === 0 
                        ? "today" 
                        : `${daysAgo} days ago`}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

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
