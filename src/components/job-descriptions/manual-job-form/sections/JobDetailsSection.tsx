
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { JobFormValues } from "../../job-form-schema";
import { Input } from "@/components/ui/input";

interface JobDetailsSectionProps {
  form: UseFormReturn<JobFormValues>;
  selectedEmployerProfileId: string;
}

export const JobDetailsSection = ({ form, selectedEmployerProfileId }: JobDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">Basic Job Information</h3>
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
};
