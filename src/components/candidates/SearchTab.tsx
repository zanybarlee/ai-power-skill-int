import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { normalizeSkills } from "@/utils/candidateUtils";

interface SearchResult {
  id: string;
  name: string | null;
  role: string;
  experience: number | null;
  location: string | null;
  skills: string[];
  availability: string;
}

export const SearchTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchCandidates = async () => {
    if (!searchTerm) {
      throw new Error("Please enter a search query");
    }

    const { data, error } = await supabase
      .from('cv_metadata')
      .select('id, name, experience, location, skills')
      .or(`name.ilike.%${searchTerm}%, skills->>'skills'.ilike.%${searchTerm}%`);

    if (error) {
      throw error;
    }

    return data.map((item): SearchResult => ({
      id: item.id,
      name: item.name || 'Unknown',
      role: 'Not specified', // Since we don't have role data
      experience: item.experience,
      location: item.location || 'Not specified',
      skills: normalizeSkills(item.skills),
      availability: 'Not specified'
    }));
  };

  const { data: searchResults, refetch, isLoading } = useQuery({
    queryKey: ['candidates', searchTerm],
    queryFn: searchCandidates,
    enabled: false,
    retry: false,
  });

  const handleTalentSearch = async () => {
    if (!searchTerm) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      await refetch();
      toast({
        title: "Success",
        description: "Search completed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search for talent",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="relative md:col-span-2">
        <Input
          placeholder="Search by name or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-forest border-mint/20 text-white placeholder:text-white/50"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
      </div>

      <Button 
        onClick={handleTalentSearch}
        disabled={isLoading || isSearching}
        className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2"
      >
        {(isLoading || isSearching) ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            Search Talent
          </>
        )}
      </Button>
    </div>
  );
};