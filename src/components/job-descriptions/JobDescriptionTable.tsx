
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface JobDescription {
  id: string;
  created_at: string;
  company_name: string | null;
  file_name: string | null;
  status: string | null;
  job_title: string | null;
  location: string | null;
  salary_range: string | null;
}

export const JobDescriptionTable = () => {
  const { data: jobDescriptions, isLoading } = useQuery({
    queryKey: ['jobDescriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as JobDescription[];
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading job descriptions...</div>;
  }

  if (!jobDescriptions?.length) {
    return <div className="text-center py-4 text-gray-500">No job descriptions found</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Uploaded Job Descriptions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary Range</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobDescriptions.map((jd) => (
            <TableRow key={jd.id}>
              <TableCell className="font-medium">
                {jd.job_title || 'Untitled'}
              </TableCell>
              <TableCell>{jd.company_name || 'N/A'}</TableCell>
              <TableCell>{jd.location || 'N/A'}</TableCell>
              <TableCell>{jd.salary_range || 'N/A'}</TableCell>
              <TableCell>
                <Badge 
                  variant={jd.status === 'processed' ? 'default' : 'secondary'}
                  className={jd.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {jd.status || 'pending'}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">
                {new Date(jd.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
