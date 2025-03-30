
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormValues } from "../job-form-schema";
import { JobDescription } from "../types";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface JobDetailsEditFormProps {
  job: JobDescription;
  onSave: (updatedJob: JobDescription) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export function JobDetailsEditForm({ job, onSave, onCancel, isSaving }: JobDetailsEditFormProps) {
  // Initialize form with current job data
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: job.job_title || "",
      company: job.company_name || "",
      location: job.location || "",
      salary: job.salary_range || "",
      description: job.original_text || "",
      requirements: job.job_requirements || "",
      benefits: job.benefits || "",
      employer_profile_id: job.employer_profile_id || undefined,
    },
  });

  const handleSubmit = async (values: JobFormValues) => {
    // Prepare the updated job object
    const updatedJob: JobDescription = {
      ...job,
      job_title: values.title,
      company_name: values.company,
      location: values.location,
      salary_range: values.salary || null,
      original_text: values.description,
      job_requirements: values.requirements,
      benefits: values.benefits || null,
    };

    // Call the onSave handler with the updated job
    await onSave(updatedJob);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Job Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Job Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Company</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Salary Range</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. $80,000 - $100,000" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Job Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter job description"
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Requirements</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter job requirements"
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Benefits</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter job benefits"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSaving}
            className="flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
