
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NewEmployerProfileDialog } from "../NewEmployerProfileDialog";
import { useManualJobForm } from "../hooks/useManualJobForm";
import { EmployerSection } from "./sections/EmployerSection";
import { JobDetailsSection } from "./sections/JobDetailsSection";
import { JobDescriptionSection } from "./sections/JobDescriptionSection";

export const ManualJobForm = () => {
  const {
    form,
    profiles,
    isLoadingProfiles,
    isNewProfileDialogOpen,
    selectedEmployerProfileId,
    setIsNewProfileDialogOpen,
    onSubmit,
    handleProfileCreated
  } = useManualJobForm();

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <EmployerSection
            form={form}
            profiles={profiles}
            isLoadingProfiles={isLoadingProfiles}
            onNewProfileClick={() => setIsNewProfileDialogOpen(true)}
          />

          <JobDetailsSection 
            form={form} 
            selectedEmployerProfileId={selectedEmployerProfileId}
          />

          <JobDescriptionSection form={form} />

          <Button type="submit" className="w-full">
            Post Job
          </Button>
        </form>
      </Form>
      
      <NewEmployerProfileDialog 
        open={isNewProfileDialogOpen} 
        onClose={() => setIsNewProfileDialogOpen(false)}
        onProfileCreated={handleProfileCreated}
      />
    </>
  );
};
