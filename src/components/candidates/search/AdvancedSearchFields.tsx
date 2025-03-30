
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SearchFormValues } from "../types/searchTypes";

interface AdvancedSearchFieldsProps {
  form: UseFormReturn<SearchFormValues>;
}

export const AdvancedSearchFields = ({ form }: AdvancedSearchFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md border border-gray-100 mt-2 animate-in fade-in duration-300">
      <FormField
        control={form.control}
        name="searchLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-aptiv-gray-600">Location</FormLabel>
            <FormControl>
              <Input 
                placeholder="Singapore, Remote, etc."
                className="bg-white border-aptiv/20 text-aptiv-gray-700"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="searchSkill"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-aptiv-gray-600">Skill</FormLabel>
            <FormControl>
              <Input 
                placeholder="Revit, AutoCAD, etc." 
                className="bg-white border-aptiv/20 text-aptiv-gray-700"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="minExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-aptiv-gray-600">Min. Experience (years)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0"
                placeholder="3" 
                className="bg-white border-aptiv/20 text-aptiv-gray-700"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
