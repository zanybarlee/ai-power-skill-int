
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormValues } from "../job-form-schema";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EmployerProfile } from "../employer-profile/types";
import { useEmployerProfiles } from "./useEmployerProfiles";
import { useUserSession } from "./useUserSession";

export const useManualJobForm = () => {
  const queryClient = useQueryClient();
  const [isNewProfileDialogOpen, setIsNewProfileDialogOpen] = useState(false);
  const { profiles, isLoading: isLoadingProfiles } = useEmployerProfiles();
  const { userId } = useUserSession();

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
        employer_profile_id: values.employer_profile_id || null,
        // Remove agent_id to avoid foreign key constraint error
        // agent_id: userId || null,
        user_id: userId || null // Keep user_id field for ownership tracking
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

  return {
    form,
    profiles,
    isLoadingProfiles,
    isNewProfileDialogOpen,
    selectedEmployerProfileId,
    setIsNewProfileDialogOpen,
    onSubmit,
    handleProfileCreated
  };
};
