import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { searchTalent } from "@/services/talentSearch";

export const SearchTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

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
      const searchParams = {
        search_query: searchTerm,
        uen: "200311331R",
        user_guid: "59884f68-8db5-4fe7-a0a3-baa466c1c808",
        session_id: `session-${Date.now()}`,
        context_id: `context-${Date.now()}`,
        search_id: `search-${Date.now()}`,
      };

      const result = await searchTalent(searchParams);
      
      toast({
        title: "Success",
        description: "Talent search completed successfully",
      });
      
      console.log('Search results:', result);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for talent",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="relative md:col-span-2">
        <Input
          placeholder="Search by name or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-forest border-mint/20 text-white placeholder:text-white/50"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
      </div>
      
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="bg-forest border-mint/20 text-white">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
          <SelectItem value="Backend Developer">Backend Developer</SelectItem>
          <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        onClick={handleTalentSearch}
        disabled={isSearching}
        className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2"
      >
        {isSearching ? (
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