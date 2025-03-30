
import { Button } from "@/components/ui/button";
import { EmployerProfile } from "./types";
import { Building, CheckCircle2, AlertCircle } from "lucide-react";

interface ProfileHeaderProps {
  profile: EmployerProfile | null;
  isEditing: boolean;
  onEdit: () => void;
}

export const ProfileHeader = ({ profile, isEditing, onEdit }: ProfileHeaderProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-aptiv/10">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 bg-aptiv/10 rounded-lg flex items-center justify-center">
            <Building className="h-8 w-8 text-aptiv" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-aptiv-gray-700">
              {profile?.company_name || "Complete Your Profile"}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {profile?.is_verified ? (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Pending Verification</span>
                </div>
              )}
              {profile?.profile_completion && (
                <div className="text-sm text-aptiv-gray-500">
                  • {profile.profile_completion}% Complete
                </div>
              )}
            </div>
          </div>
        </div>
        {!isEditing && (
          <Button onClick={onEdit} variant="aptiv">
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};
