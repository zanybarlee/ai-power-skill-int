import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { format } from "date-fns";

interface ResultsTableProps {
  results: any[];
  date: Date | undefined;
  daysAgo: number;
  onEnquiry: (candidate: any) => void;
  onRowClick: (candidate: any) => void;
}

export const ResultsTable = ({
  results,
  date,
  daysAgo,
  onEnquiry,
  onRowClick,
}: ResultsTableProps) => {
  const getDateText = () => {
    if (date) return format(date, "PPP");
    return daysAgo === 0 ? "today" : `${daysAgo} days ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-aptiv/10 p-6">
      <h2 className="text-lg font-semibold text-aptiv-gray-700 mb-4">
        Crawl Results {getDateText()}
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
            {results?.map((result) => (
              <TableRow 
                key={result.id}
                className="cursor-pointer hover:bg-aptiv/5"
                onClick={() => onRowClick(result)}
              >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnquiry(result);
                    }}
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
            {(!results || results.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No results found for {getDateText()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};