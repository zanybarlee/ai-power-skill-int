
import { useState } from "react";
import Layout from "@/components/Layout";
import { ProfileForm } from "@/components/employer-profile/ProfileForm";
import { ProfileHeader } from "@/components/employer-profile/ProfileHeader";
import { useEmployerProfile } from "@/components/employer-profile/hooks/useEmployerProfile";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { EmployerProfile as EmployerProfileType } from "@/components/employer-profile/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
          <div className="bg-white rounded-lg border border-aptiv/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow
                    key={profile.id}
                    className={`cursor-pointer ${
                      selectedProfile?.id === profile.id ? "bg-aptiv/5" : ""
                    }`}
                    onClick={() => handleSelectProfile(profile)}
                  >
                    <TableCell className="font-medium">{profile.company_name}</TableCell>
                    <TableCell>{profile.industry}</TableCell>
                    <TableCell>{`${profile.state}, ${profile.country}`}</TableCell>
                    <TableCell>{profile.contact_person}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          profile.is_verified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {profile.is_verified ? "Verified" : "Pending"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
