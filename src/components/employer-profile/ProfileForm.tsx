
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EmployerProfile } from "./types";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CompanyInfoSection } from "./components/CompanyInfoSection";
import { IndustryInfoSection } from "./components/IndustryInfoSection";
import { ContactInfoSection } from "./components/ContactInfoSection";
import { profileSchema, getDefaultFormValues, saveProfile, ProfileFormData } from "./utils/profileFormUtils";

interface ProfileFormProps {
  profile: EmployerProfile | null;
  isEditing: boolean;
  onCancel: () => void;
}

export const ProfileForm = ({ profile, isEditing, onCancel }: ProfileFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("ProfileForm mounted", { isEditing, profile });
  }, [isEditing, profile]);
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: getDefaultFormValues(profile),
  });

  const onSubmit = async (values: ProfileFormData) => {
    try {
      const result = await saveProfile(values, profile);

      if (result.error) {
        throw result.error;
      }

      await queryClient.invalidateQueries({ queryKey: ['employerProfiles'] });

      toast({
        title: "Success",
        description: profile?.id ? "Profile updated successfully" : "Profile created successfully",
      });
      
      onCancel();
    } catch (error) {
      console.error('Error:', error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save profile. Please try again.",
      });
    }
  };

  if (!isEditing && !profile) {
    return (
      <div className="bg-white rounded-lg p-6 border border-aptiv/10 text-center">
        <p className="text-aptiv-gray-500">
          Click 'Edit Profile' to start creating your employer profile.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CompanyInfoSection form={form} />
        <IndustryInfoSection form={form} />
        <ContactInfoSection form={form} />

        {isEditing && (
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
