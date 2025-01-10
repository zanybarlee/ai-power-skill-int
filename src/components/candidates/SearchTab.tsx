import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { normalizeSkills } from "@/utils/candidateUtils";
import { CandidateTable } from "./CandidateTable";

interface DatabaseResult {
  id: string;
  name: string | null;
  experience: number | null;
  location: string | null;
  skills: unknown;
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  availability: string;
}

export const SearchTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchCandidates = async () => {
    if (!searchTerm.trim()) {
      throw new Error("Please enter a search query");
    }

    const sanitizedSearchTerm = searchTerm.trim();
    console.log("Searching for:", sanitizedSearchTerm);

    try {
      // Search by name only
      const { data: nameResults, error: nameError } = await supabase
        .from('cv_metadata')
        .select('id, name, experience, location, skills')
        .ilike('name', `%${sanitizedSearchTerm}%`);

      if (nameError) {
        console.error("Name search error:", nameError);
        throw nameError;
      }

      console.log("Search results:", nameResults);
      return nameResults as DatabaseResult[];
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  };

  const { data: searchResults, refetch, isLoading } = useQuery({
    queryKey: ['candidates', searchTerm],
    queryFn: searchCandidates,
    enabled: false,
    retry: false,
  });

  const handleTalentSearch = async () => {
    if (!searchTerm.trim()) {
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

  // Transform database results to match Candidate interface
  const formattedResults: Candidate[] = searchResults?.map((result): Candidate => {
    console.log("Formatting result:", result);
    return {
      id: result.id,
      name: result.name || 'Unknown',
      role: 'Not specified',
      experience: result.experience ? `${result.experience} years` : 'Not specified',
      location: result.location || 'Not specified',
      skills: normalizeSkills(result.skills),
      availability: 'Not specified'
    };
  }) || [];

  console.log("Formatted results:", formattedResults);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Input
            placeholder="Search by name..."
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

      {formattedResults.length > 0 && (
        <>
          <div className="text-white mb-4">
            Found {formattedResults.length} candidates
          </div>
          <CandidateTable candidates={formattedResults} />
        </>
      )}
    </div>
  );
};