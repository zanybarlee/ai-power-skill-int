
import { useState } from "react";
import Layout from "@/components/Layout";
import { ProfileForm } from "@/components/employer-profile/ProfileForm";
import { ProfileHeader } from "@/components/employer-profile/ProfileHeader";
import { useEmployerProfile } from "@/components/employer-profile/hooks/useEmployerProfile";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { EmployerProfile as EmployerProfileType } from "@/components/employer-profile/types";

const EmployerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<EmployerProfileType | null>(null);
  const { profiles, isLoading } = useEmployerProfile();

  const handleCreateNew = () => {
    setSelectedProfile(null);
    setIsEditing(true);
  };

  const handleSelectProfile = (profile: EmployerProfileType) => {
    setSelectedProfile(profile);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="h-8 w-8 border-t-2 border-b-2 border-aptiv rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-aptiv-gray-700">Employer Profiles</h1>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add New Profile
          </Button>
        </div>

        {profiles && profiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`bg-white rounded-lg p-6 border cursor-pointer transition-all ${
                  selectedProfile?.id === profile.id
                    ? "border-aptiv"
                    : "border-aptiv/10 hover:border-aptiv/30"
                }`}
                onClick={() => handleSelectProfile(profile)}
              >
                <h3 className="text-lg font-semibold text-aptiv-gray-700">{profile.company_name}</h3>
                <p className="text-sm text-aptiv-gray-500">{profile.industry}</p>
                <p className="text-sm text-aptiv-gray-500">{profile.location}</p>
              </div>
            ))}
          </div>
        ) : !isEditing ? (
          <div className="bg-white rounded-lg p-6 border border-aptiv/10 text-center">
            <p className="text-aptiv-gray-500">
              No employer profiles yet. Click 'Add New Profile' to create one.
            </p>
          </div>
        ) : null}

        {(selectedProfile || isEditing) && (
          <>
            <ProfileHeader 
              profile={selectedProfile} 
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
            />
            <ProfileForm 
              profile={selectedProfile}
              isEditing={isEditing}
              onCancel={() => {
                setIsEditing(false);
                if (!selectedProfile) {
                  setSelectedProfile(null);
                }
              }}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default EmployerProfile;
