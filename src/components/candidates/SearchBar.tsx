import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        placeholder="Enter search query (e.g., BIM Modeler)"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-white border-aptiv/20 text-aptiv-gray-700"
      />
      <Button
        onClick={onSearch}
        disabled={isLoading}
        className="bg-aptiv hover:bg-aptiv/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base py-6 px-8"
      >
        <Search className="h-5 w-5 mr-2" />
        {isLoading ? "Crawling..." : "Crawl CV"}
      </Button>
    </div>
  );
};