import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { searchTalent } from "@/services/talentSearch";

export const CrawlTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Enter search query (e.g., BIM Modeler)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-forest border-mint/20 text-white"
        />
        <Button
          onClick={handleSearchTalent}
          disabled={isLoading}
          className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          {isLoading ? "Crawling..." : "Crawl CV"}
        </Button>
      </div>
    </div>
  );
};