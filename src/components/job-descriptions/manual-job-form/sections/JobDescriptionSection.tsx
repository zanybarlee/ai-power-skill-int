
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { JobFormValues } from "../../job-form-schema";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionSectionProps {
  form: UseFormReturn<JobFormValues>;
}

export const JobDescriptionSection = ({ form }: JobDescriptionSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">Job Details</h3>
      
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
    </div>
  );
};
