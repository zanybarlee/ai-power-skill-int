
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NewEmployerProfileDialog } from "./NewEmployerProfileDialog";
import { useManualJobForm } from "./hooks/useManualJobForm";
import { EmployerProfileSection } from "./form-sections/EmployerProfileSection";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { DescriptionSection } from "./form-sections/DescriptionSection";

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
          <EmployerProfileSection
            form={form}
            profiles={profiles}
            isLoadingProfiles={isLoadingProfiles}
            onNewProfileClick={() => setIsNewProfileDialogOpen(true)}
          />

          <BasicInfoSection 
            form={form} 
            selectedEmployerProfileId={selectedEmployerProfileId}
          />

          <DescriptionSection form={form} />

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
