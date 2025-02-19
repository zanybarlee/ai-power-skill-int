
import { useState } from "react";
import Layout from "@/components/Layout";
import { ProfileForm } from "@/components/employer-profile/ProfileForm";
import { ProfileHeader } from "@/components/employer-profile/ProfileHeader";
import { useEmployerProfile } from "@/components/employer-profile/hooks/useEmployerProfile";

const EmployerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, isLoading } = useEmployerProfile();

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
        <ProfileHeader 
          profile={profile} 
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
        />
        <ProfileForm 
          profile={profile}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    </Layout>
  );
};

export default EmployerProfile;
