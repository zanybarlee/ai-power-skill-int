
import { Candidate } from "../types/searchTypes";
import { CandidateTable } from "../CandidateTable";

interface SearchResultsProps {
  candidates: Candidate[];
}

export const SearchResults = ({ candidates }: SearchResultsProps) => {
  if (candidates.length === 0) {
    return null;
  }

  return (
    <>
      <div className="text-aptiv-gray-700 mb-4">
        Found {candidates.length} candidates
      </div>
      <CandidateTable candidates={candidates} />
    </>
  );
};
