
import { SearchForm } from "./search/SearchForm";
import { SearchResults } from "./search/SearchResults";
import { useCandidateSearch } from "./hooks/useCandidateSearch";

export const SearchTab = () => {
  const {
    form,
    isLoading,
    isSearching,
    formattedResults,
    handleTalentSearch
  } = useCandidateSearch();

  return (
    <div className="space-y-6">
      <SearchForm 
        form={form}
        isLoading={isLoading}
        isSearching={isSearching}
        onSearch={handleTalentSearch}
      />

      <SearchResults candidates={formattedResults} />
    </div>
  );
};
