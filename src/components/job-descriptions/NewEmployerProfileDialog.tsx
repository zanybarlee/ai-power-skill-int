
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { EmployerProfileData } from "./types";
import { toast } from "sonner";
import { FormContent } from "./employer-profile/FormContent";
import { EmployerProfileFormValues, EmployerProfile } from "./employer-profile/types";
import { isFormValid } from "./employer-profile/utils";

interface NewEmployerProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onProfileCreated: (profile: EmployerProfile) => void;
}

export const NewEmployerProfileDialog: React.FC<NewEmployerProfileDialogProps> = ({
  open,
  onClose,
  onProfileCreated,
}) => {
  const [values, setValues] = useState<EmployerProfileFormValues>({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    industry: "",
    sub_industry: "",
    sub_sub_industry: "",
    designation: "",
    registration_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid(values)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("employer_profiles")
        .insert({
          company_name: values.company_name,
          registration_number: values.registration_number,
          country: values.country,
          state: values.state, 
          industry: values.industry,
          sub_industry: values.sub_industry,
          sub_sub_industry: values.sub_sub_industry,
          contact_person: values.contact_person,
          designation: values.designation,
          email: values.email,
          phone: values.phone,
          is_verified: false,
          is_approved: false,
          profile_completion: 100
        })
        .select()
        .single();

      if (error) throw error;
      
      onProfileCreated(data as EmployerProfile);
      toast.success("Employer profile created successfully");
      onClose();
    } catch (error) {
      console.error("Error creating employer profile:", error);
      toast.error("Failed to create employer profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Employer Profile</DialogTitle>
          <DialogDescription>
            Fill in the information below to create a new employer profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FormContent values={values} handleChange={handleChange} />
          <DialogFooter>
            <Button type="submit">Create profile</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
