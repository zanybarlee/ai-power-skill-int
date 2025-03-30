
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface SearchBarProps {
  searchQuery: string;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ 
  searchQuery, 
  isLoading, 
  onSearchChange, 
  onSearch 
}: SearchBarProps) => {
  const [inputType, setInputType] = useState<"select" | "text">("select");
  const [userId, setUserId] = useState<string | null>(null);

  // Track the current user's ID
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const { data: jobTitles } = useQuery({
    queryKey: ['jobTitles', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('job_title')
        .eq('user_id', userId)  // Filter by the current user's ID
        .not('job_title', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return [...new Set(data.map(job => job.job_title))] as string[];
    },
    enabled: !!userId,  // Only run the query when we have a userId
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setInputType("select")}
          className={`px-3 py-1 rounded-md text-sm ${
            inputType === "select" 
              ? "bg-aptiv text-white" 
              : "bg-gray-100 text-gray-600"
          }`}
        >
          From Job Titles
        </button>
        <button
          onClick={() => setInputType("text")}
          className={`px-3 py-1 rounded-md text-sm ${
            inputType === "text" 
              ? "bg-aptiv text-white" 
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Free Text
        </button>
      </div>

      <div className="flex items-center gap-4">
        {inputType === "select" ? (
          <Select
            value={searchQuery}
            onValueChange={onSearchChange}
          >
            <SelectTrigger className="w-[300px] bg-white border-aptiv/20">
              <SelectValue placeholder="Select a job title" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {jobTitles && jobTitles.length > 0 ? (
                jobTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-jobs" disabled>
                  No job titles found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type="text"
            placeholder="Enter search query (e.g., BIM Modeler)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[300px] bg-white border-aptiv/20 text-aptiv-gray-700"
          />
        )}

        <Button
          onClick={onSearch}
          disabled={isLoading}
          className="bg-aptiv hover:bg-aptiv/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base py-6 px-8"
        >
          <Search className="h-5 w-5 mr-2" />
          {isLoading ? "Crawling..." : "Crawl CV"}
        </Button>
      </div>
    </div>
  );
};
