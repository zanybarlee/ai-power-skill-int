
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { normalizeSkills } from "@/utils/candidateUtils";
import { CandidateTable } from "./CandidateTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

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

interface SearchFormValues {
  searchName: string;
  searchLocation: string;
  searchSkill: string;
  minExperience: string;
}

export const SearchTab = () => {
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const form = useForm<SearchFormValues>({
    defaultValues: {
      searchName: "",
      searchLocation: "",
      searchSkill: "",
      minExperience: "",
    },
  });

  const searchCandidates = async (data: SearchFormValues) => {
    const { searchName, searchLocation, searchSkill, minExperience } = data;
    
    if (!searchName && !searchLocation && !searchSkill && !minExperience) {
      throw new Error("Please enter at least one search criterion");
    }

    console.log("Searching with criteria:", data);
    
    // Start with a query builder
    let query = supabase
      .from('cv_metadata')
      .select('id, name, experience, location, skills')
      .limit(20);
    
    // Add filters based on provided criteria
    if (searchName) {
      query = query.ilike('name', `%${searchName}%`);
    }
    
    if (searchLocation) {
      query = query.ilike('location', `%${searchLocation}%`);
    }
    
    if (minExperience && !isNaN(parseInt(minExperience))) {
      query = query.gte('experience', parseInt(minExperience));
    }
    
    // Skills is a JSON/JSONB array, so we need to use containedBy or special operators
    if (searchSkill) {
      // This assumes skills is stored as a JSON array
      query = query.contains('skills', [searchSkill]);
    }
    
    const { data: results, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Raw data from Supabase:", results);
    return (results || []) as DatabaseResult[];
  };

  const { data: searchResults, refetch, isLoading } = useQuery({
    queryKey: ['candidates', form.watch()],
    queryFn: () => searchCandidates(form.getValues()),
    enabled: false,
    retry: false,
  });

  const handleTalentSearch = async () => {
    const formValues = form.getValues();
    const hasAnyCriteria = Object.values(formValues).some(value => value !== "");
    
    if (!hasAnyCriteria) {
      toast({
        title: "Error",
        description: "Please enter at least one search criterion",
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

  const formattedResults = searchResults?.map((result): Candidate => ({
    id: result.id,
    name: result.name || 'Unknown',
    role: 'Not specified',
    experience: result.experience ? `${result.experience} years` : 'Not specified',
    location: result.location || 'Not specified',
    skills: normalizeSkills(result.skills),
    availability: 'Not specified'
  })) || [];

  return (
    <div className="space-y-6">
      <Form {...form}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <FormField
                control={form.control}
                name="searchName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Search by name..."
                        {...field}
                        className="pl-10 bg-white border-aptiv/20 text-aptiv-gray-700 placeholder:text-aptiv-gray-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-aptiv-gray-400" />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleTalentSearch}
                disabled={isLoading || isSearching}
                className="bg-aptiv hover:bg-aptiv/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base py-6 flex-1"
              >
                {(isLoading || isSearching) ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search Talent
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="border-aptiv/20"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {showAdvancedSearch && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md border border-gray-100 mt-2 animate-in fade-in duration-300">
              <FormField
                control={form.control}
                name="searchLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-aptiv-gray-600">Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Singapore, Remote, etc."
                        className="bg-white border-aptiv/20 text-aptiv-gray-700"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="searchSkill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-aptiv-gray-600">Skill</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Revit, AutoCAD, etc." 
                        className="bg-white border-aptiv/20 text-aptiv-gray-700"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-aptiv-gray-600">Min. Experience (years)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="3" 
                        className="bg-white border-aptiv/20 text-aptiv-gray-700"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </Form>

      {formattedResults.length > 0 && (
        <>
          <div className="text-aptiv-gray-700 mb-4">
            Found {formattedResults.length} candidates
          </div>
          <CandidateTable candidates={formattedResults} />
        </>
      )}
    </div>
  );
};
