
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Filter } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { SearchFormValues } from "../types/searchTypes";
import { AdvancedSearchFields } from "./AdvancedSearchFields";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

interface SearchFormProps {
  form: UseFormReturn<SearchFormValues>;
  isLoading: boolean;
  isSearching: boolean;
  onSearch: () => Promise<void>;
}

export const SearchForm = ({ 
  form, 
  isLoading, 
  isSearching, 
  onSearch 
}: SearchFormProps) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <FormField
              control={form.control}
              name="searchName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search by name..."
                      {...field}
                      className="pl-10 bg-white border-aptiv/20 text-aptiv-gray-700 placeholder:text-aptiv-gray-400"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-aptiv-gray-400" />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={onSearch}
              disabled={isLoading || isSearching}
              variant="aptiv"
              className="shadow-lg hover:shadow-xl transition-all duration-200 text-base py-6 flex-1"
            >
              {(isLoading || isSearching) ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search Talent
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="border-aptiv/20"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {showAdvancedSearch && <AdvancedSearchFields form={form} />}
      </div>
    </Form>
  );
};
