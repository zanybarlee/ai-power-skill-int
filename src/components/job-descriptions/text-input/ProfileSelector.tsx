
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployerProfiles } from "../hooks/useEmployerProfiles";

interface ProfileSelectorProps {
  selectedEmployerProfileId: string | undefined;
  setSelectedEmployerProfileId: (id: string) => void;
  isDisabled: boolean;
}

export const ProfileSelector = ({ 
  selectedEmployerProfileId,
  setSelectedEmployerProfileId,
  isDisabled
}: ProfileSelectorProps) => {
  const { profiles, isLoading: isLoadingProfiles } = useEmployerProfiles();

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 mb-1">Select Employer Profile</p>
      <Select 
        value={selectedEmployerProfileId} 
        onValueChange={setSelectedEmployerProfileId}
        disabled={isLoadingProfiles || isDisabled}
      >
        <SelectTrigger className="w-full bg-white border-aptiv/20">
          <SelectValue placeholder="Select employer profile" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {profiles?.map((profile) => (
            <SelectItem key={profile.id} value={profile.id}>
              {profile.company_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
