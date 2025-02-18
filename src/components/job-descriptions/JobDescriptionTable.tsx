
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface JobDescription {
  id: string;
  created_at: string;
  company_name: string | null;
  file_name: string | null;
  status: string | null;
  job_title: string | null;
  location: string | null;
  salary_range: string | null;
  original_text: string | null;
  job_requirements: string | null;
}

export const JobDescriptionTable = () => {
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState<Partial<JobDescription>>({});
  const queryClient = useQueryClient();

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

  const handleRowClick = (job: JobDescription) => {
    setSelectedJob(job);
    setEditedJob(job);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!selectedJob?.id) return;

    try {
      const { error } = await supabase
        .from('job_descriptions')
        .update({
          job_title: editedJob.job_title,
          company_name: editedJob.company_name,
          location: editedJob.location,
          salary_range: editedJob.salary_range,
          original_text: editedJob.original_text,
          job_requirements: editedJob.job_requirements,
        })
        .eq('id', selectedJob.id);

      if (error) throw error;

      toast.success("Job description updated successfully");
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
      setEditMode(false);
      setSelectedJob(null);
    } catch (error) {
      toast.error("Failed to update job description");
      console.error('Error updating job:', error);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job description?')) return;

    try {
      const { error } = await supabase
        .from('job_descriptions')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      toast.success("Job description deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
      setSelectedJob(null);
    } catch (error) {
      toast.error("Failed to delete job description");
      console.error('Error deleting job:', error);
    }
  };

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
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobDescriptions.map((jd) => (
            <TableRow 
              key={jd.id}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell className="font-medium" onClick={() => handleRowClick(jd)}>
                {jd.job_title || 'Untitled'}
              </TableCell>
              <TableCell onClick={() => handleRowClick(jd)}>{jd.company_name || 'N/A'}</TableCell>
              <TableCell onClick={() => handleRowClick(jd)}>{jd.location || 'N/A'}</TableCell>
              <TableCell onClick={() => handleRowClick(jd)}>{jd.salary_range || 'N/A'}</TableCell>
              <TableCell onClick={() => handleRowClick(jd)}>
                <Badge 
                  variant={jd.status === 'processed' ? 'default' : 'secondary'}
                  className={jd.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {jd.status || 'pending'}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600" onClick={() => handleRowClick(jd)}>
                {new Date(jd.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      handleRowClick(jd);
                      handleEdit();
                    }}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(jd.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedJob} onOpenChange={() => {
        setSelectedJob(null);
        setEditMode(false);
      }}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[#F1F0FB]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editMode ? 'Edit Job Description' : (selectedJob?.job_title || 'Job Details')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {editMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Input
                      value={editedJob.job_title || ''}
                      onChange={(e) => setEditedJob({ ...editedJob, job_title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={editedJob.company_name || ''}
                      onChange={(e) => setEditedJob({ ...editedJob, company_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={editedJob.location || ''}
                      onChange={(e) => setEditedJob({ ...editedJob, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Salary Range</label>
                    <Input
                      value={editedJob.salary_range || ''}
                      onChange={(e) => setEditedJob({ ...editedJob, salary_range: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Description</label>
                  <Textarea
                    value={editedJob.original_text || ''}
                    onChange={(e) => setEditedJob({ ...editedJob, original_text: e.target.value })}
                    className="min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Requirements</label>
                  <Textarea
                    value={editedJob.job_requirements || ''}
                    onChange={(e) => setEditedJob({ ...editedJob, job_requirements: e.target.value })}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Company</h3>
                    <p className="text-gray-600">{selectedJob?.company_name || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Location</h3>
                    <p className="text-gray-600">{selectedJob?.location || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Salary Range</h3>
                    <p className="text-gray-600">{selectedJob?.salary_range || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Status</h3>
                    <Badge 
                      variant={selectedJob?.status === 'processed' ? 'default' : 'secondary'}
                      className={selectedJob?.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {selectedJob?.status || 'pending'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Job Description</h3>
                  <div className="bg-white p-4 rounded-md whitespace-pre-wrap">
                    {selectedJob?.original_text || 'No description available'}
                  </div>
                </div>

                {selectedJob?.job_requirements && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Requirements</h3>
                    <div className="bg-white p-4 rounded-md whitespace-pre-wrap">
                      {selectedJob.job_requirements}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            {editMode ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleDelete(selectedJob?.id!)}>
                  Delete
                </Button>
                <Button onClick={handleEdit}>
                  Edit
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
