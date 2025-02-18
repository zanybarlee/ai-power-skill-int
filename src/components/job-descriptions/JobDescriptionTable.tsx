
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
  title: string | null;
  file_name: string | null;
  status: string | null;
  extracted_role: {
    skills?: string[];
    requirements?: string[];
  } | null;
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
            <TableHead>Title</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Requirements</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobDescriptions.map((jd) => (
            <TableRow key={jd.id}>
              <TableCell className="font-medium">
                {jd.title || 'Untitled'}
              </TableCell>
              <TableCell>{jd.file_name || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {jd.extracted_role?.skills?.slice(0, 3).map((skill, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="bg-aptiv/10 text-aptiv"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {(jd.extracted_role?.skills?.length || 0) > 3 && (
                    <Badge variant="secondary" className="bg-gray-100">
                      +{(jd.extracted_role?.skills?.length || 0) - 3} more
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {jd.extracted_role?.requirements?.slice(0, 2).map((req, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {req.length > 50 ? `${req.substring(0, 50)}...` : req}
                    </div>
                  ))}
                  {(jd.extracted_role?.requirements?.length || 0) > 2 && (
                    <div className="text-sm text-gray-400">
                      +{(jd.extracted_role?.requirements?.length || 0) - 2} more
                    </div>
                  )}
                </div>
              </TableCell>
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
