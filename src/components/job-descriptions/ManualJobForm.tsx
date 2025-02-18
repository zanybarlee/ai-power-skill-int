
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobFormSchema, type JobFormValues } from "./job-form-schema";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ManualJobForm = () => {
  const queryClient = useQueryClient();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      requirements: "",
    },
  });

  async function onSubmit(values: JobFormValues) {
    try {
      const { error } = await supabase
        .from('job_descriptions')
        .insert({
          original_text: values.description,
          job_title: values.title,
          company_name: values.company,
          location: values.location,
          salary_range: values.salary,
          job_requirements: values.requirements,
          status: 'pending'
        });
      
      if (error) throw error;

      toast.success("Job posted successfully!");
      form.reset();
      
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error("Failed to post job. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Software Engineer" {...field} />
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
              <FormLabel className="text-gray-700">Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your company name" {...field} />
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
              <FormLabel className="text-gray-700">Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. New York, NY" {...field} />
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
              <FormLabel className="text-gray-700">Salary Range</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $80,000 - $120,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the role and responsibilities"
                  className="min-h-[120px]"
                  {...field}
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
              <FormLabel className="text-gray-700">Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List the required skills and qualifications"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Post Job
        </Button>
      </form>
    </Form>
  );
};
