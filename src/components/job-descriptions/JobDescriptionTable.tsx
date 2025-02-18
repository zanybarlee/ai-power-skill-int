import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { JobDescription } from "./types";

export const JobDescriptionTable = () => {
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null);
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobDescriptions = [], isLoading } = useQuery({
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
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!selectedJob) return;

    try {
      const { error } = await supabase
        .from('job_descriptions')
        .update({
          job_title: selectedJob.job_title,
          company: selectedJob.company,
          location: selectedJob.location,
          original_text: selectedJob.original_text,
          job_requirements: selectedJob.job_requirements,
        })
        .eq('id', selectedJob.id);

      if (error) {
        console.error('Update error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update job description",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Job description updated successfully",
      });

      setEditMode(false);
      await queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update job description",
      });
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job description?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('job_descriptions')
        .delete()
        .eq('id', jobId);

      if (error) {
        console.error('Delete error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete job description",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Job description deleted successfully",
      });

      setSelectedJob(null);
      setEditMode(false);
      await queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete job description",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!jobDescriptions.length) {
    return <div>No job descriptions found.</div>;
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
            <TableHead>Posted Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobDescriptions.map((jd) => (
            <TableRow 
              key={jd.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(jd)}
            >
              <TableCell>{jd.job_title}</TableCell>
              <TableCell>{jd.company}</TableCell>
              <TableCell>{jd.location}</TableCell>
              <TableCell>{new Date(jd.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="bg-[#F1F0FB] border border-purple-100 shadow-lg"
                  >
                    <DropdownMenuItem 
                      onClick={() => {
                        handleRowClick(jd);
                        handleEdit();
                      }}
                      className="hover:bg-purple-100 focus:bg-purple-100"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 hover:bg-red-50 focus:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(jd.id);
                      }}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    value={selectedJob?.job_title || ''}
                    onChange={(e) => setSelectedJob(prev => prev ? { ...prev, job_title: e.target.value } : null)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={selectedJob?.company || ''}
                    onChange={(e) => setSelectedJob(prev => prev ? { ...prev, company: e.target.value } : null)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={selectedJob?.location || ''}
                    onChange={(e) => setSelectedJob(prev => prev ? { ...prev, location: e.target.value } : null)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={selectedJob?.original_text || ''}
                    onChange={(e) => setSelectedJob(prev => prev ? { ...prev, original_text: e.target.value } : null)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Requirements</label>
                  <textarea
                    value={selectedJob?.job_requirements || ''}
                    onChange={(e) => setSelectedJob(prev => prev ? { ...prev, job_requirements: e.target.value } : null)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Company</h3>
                    <p>{selectedJob?.company}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Location</h3>
                    <p>{selectedJob?.location}</p>
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
                <Button 
                  variant="outline"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => {
                    if (selectedJob?.id) {
                      handleDelete(selectedJob.id);
                    }
                  }}
                >
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
