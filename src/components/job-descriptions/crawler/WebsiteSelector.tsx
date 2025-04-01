
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Briefcase } from "lucide-react";

interface WebsiteSelectorProps {
  websiteSource: string;
  setWebsiteSource: (value: string) => void;
  customUrl: string;
  setCustomUrl: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  disabled: boolean;
}

export const WebsiteSelector = ({
  websiteSource,
  setWebsiteSource,
  customUrl,
  setCustomUrl,
  industry,
  setIndustry,
  disabled
}: WebsiteSelectorProps) => {
  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1">
        <label htmlFor="website" className="block text-sm font-medium text-gray-600 mb-1">
          Website
        </label>
        <Select 
          value={websiteSource} 
          onValueChange={setWebsiteSource}
          disabled={disabled}
        >
          <SelectTrigger id="website" className="w-full bg-white">
            <SelectValue placeholder="Select a job board" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="https://www.mycareersfuture.gov.sg">MyCareerFuture</SelectItem>
            <SelectItem value="https://www.jobstreet.com.sg">JobStreet.com</SelectItem>
            <SelectItem value="https://sg.indeed.com">Indeed</SelectItem>
            <SelectItem value="other">Other (specify URL)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {websiteSource === "other" && (
        <div className="flex-1">
          <label htmlFor="customUrl" className="block text-sm font-medium text-gray-600 mb-1">
            Custom URL
          </label>
          <Input
            id="customUrl"
            type="url"
            placeholder="https://example.com/careers"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            disabled={disabled}
            className="w-full"
          />
        </div>
      )}
      
      <div className="flex-1">
        <label htmlFor="industry" className="block text-sm font-medium text-gray-600 mb-1">
          Industry Field
        </label>
        <div className="relative">
          <Input
            id="industry"
            type="text"
            placeholder="e.g. Technology, Healthcare"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            disabled={disabled}
            className="w-full pl-9"
          />
          <Briefcase className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
