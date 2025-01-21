import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, ClipboardList } from "lucide-react";
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

export const CrawlTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [daysAgo, setDaysAgo] = useState(0); // 0 = today, 1 = yesterday, etc.

  // Query to fetch results from selected date
  const { data: crawlResults, refetch: refetchResults } = useQuery({
    queryKey: ['crawlResults', daysAgo],
    queryFn: async () => {
      const targetDate = subDays(new Date(), daysAgo);
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
    }
  });

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
    const dateText = daysAgo === 0 ? "today" : `${daysAgo} days ago`;
    toast({
      title: "Results Updated",
      description: `Showing ${crawlResults?.length || 0} results from ${dateText}`,
    });
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
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((days) => (
          <Button
            key={days}
            variant={daysAgo === days ? "default" : "outline"}
            onClick={() => {
              setDaysAgo(days);
              if (showResults) handleCheckResults();
            }}
            className={`${
              daysAgo === days 
                ? "bg-aptiv text-white" 
                : "border-aptiv text-aptiv hover:bg-aptiv hover:text-white"
            } transition-all duration-200`}
          >
            {days === 0 ? "Today" : `${days} days ago`}
          </Button>
        ))}
      </div>

      {/* Results Pane */}
      {showResults && (
        <div className="bg-white rounded-lg border border-aptiv/10 p-6">
          <h2 className="text-lg font-semibold text-aptiv-gray-700 mb-4">
            Crawl Results {daysAgo === 0 ? "Today" : `(${daysAgo} days ago)`}
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
                  <TableRow key={result.id}>
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
                        onClick={() => handleEnquiry(result)}
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
                      No results found for {daysAgo === 0 ? "today" : `${daysAgo} days ago`}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};