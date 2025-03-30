
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
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { EmployerProfile } from "../employer-profile/types";
import { NewEmployerProfileDialog } from "./NewEmployerProfileDialog";
import { useEmployerProfiles } from "./hooks/useEmployerProfiles";

export const ManualJobForm = () => {
  const queryClient = useQueryClient();
  const [isNewProfileDialogOpen, setIsNewProfileDialogOpen] = useState(false);
  const { profiles, isLoading: isLoadingProfiles } = useEmployerProfiles();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      requirements: "",
      benefits: "",
      employer_profile_id: "",
    },
  });

  // Update company name when employer profile is selected
  const selectedEmployerProfileId = form.watch("employer_profile_id");
  
  useEffect(() => {
    if (selectedEmployerProfileId && profiles) {
      const selectedProfile = profiles.find(profile => profile.id === selectedEmployerProfileId);
      if (selectedProfile) {
        form.setValue("company", selectedProfile.company_name);
      }
    }
  }, [selectedEmployerProfileId, profiles, form]);

  async function onSubmit(values: JobFormValues) {
    console.log('Submitting form with values:', values);
    try {
      const jobData = {
        original_text: values.description,
        job_title: values.title,
        company_name: values.company,
        location: values.location,
        salary_range: values.salary,
        job_requirements: values.requirements,
        benefits: values.benefits,
        status: 'pending',
        employer_profile_id: values.employer_profile_id || null
      };
      console.log('Inserting job data:', jobData);

      const { data, error } = await supabase
        .from('job_descriptions')
        .insert(jobData)
        .select();

      console.log('Supabase response:', { data, error });
      
      if (error) throw error;

      toast.success("Job posted successfully!");
      form.reset();
      
      queryClient.invalidateQueries({ queryKey: ['jobDescriptions'] });
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error("Failed to post job. Please try again.");
    }
  }

  const handleProfileCreated = (profile: EmployerProfile) => {
    queryClient.invalidateQueries({ queryKey: ['employerProfiles'] });
    form.setValue("employer_profile_id", profile.id);
    form.setValue("company", profile.company_name);
    setIsNewProfileDialogOpen(false);
    toast.success("Employer profile created successfully!");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="employer_profile_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Employer Profile</FormLabel>
                <div className="flex gap-2">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingProfiles}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employer profile" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {profiles?.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.company_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNewProfileDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="Company name" {...field} readOnly={!!selectedEmployerProfileId} />
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

          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Benefits</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List the benefits and perks offered"
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
      
      <NewEmployerProfileDialog 
        isOpen={isNewProfileDialogOpen} 
        onClose={() => setIsNewProfileDialogOpen(false)}
        onProfileCreated={handleProfileCreated}
      />
    </>
  );
};
