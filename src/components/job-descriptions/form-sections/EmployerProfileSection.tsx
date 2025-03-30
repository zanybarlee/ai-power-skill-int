
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { JobFormValues } from "../job-form-schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmployerProfile } from "../employer-profile/types";

interface EmployerProfileSectionProps {
  form: UseFormReturn<JobFormValues>;
  profiles?: EmployerProfile[];
  isLoadingProfiles: boolean;
  onNewProfileClick: () => void;
}

export const EmployerProfileSection = ({ 
  form, 
  profiles, 
  isLoadingProfiles, 
  onNewProfileClick 
}: EmployerProfileSectionProps) => {
  return (
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
              onClick={onNewProfileClick}
            >
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
