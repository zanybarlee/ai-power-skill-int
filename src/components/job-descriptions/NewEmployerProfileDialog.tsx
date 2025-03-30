
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { EmployerProfileData } from "./types";
import { toast } from "sonner";

type EmployerProfile = {
  id: string;
} & EmployerProfileData;

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
  const [values, setValues] = useState({
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

  const isFormValid = () => {
    // Ensure all required fields are filled
    return (
      values.company_name.trim() !== "" &&
      values.contact_person.trim() !== "" &&
      values.email.trim() !== "" &&
      values.phone.trim() !== "" &&
      values.country.trim() !== "" &&
      values.state.trim() !== "" &&
      values.industry.trim() !== "" &&
      values.registration_number.trim() !== "" &&
      values.designation.trim() !== "" &&
      values.sub_industry.trim() !== "" &&
      values.sub_sub_industry.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company_name" className="text-right">
                Company Name
              </Label>
              <Input
                type="text"
                id="company_name"
                name="company_name"
                value={values.company_name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registration_number" className="text-right">
                Registration Number
              </Label>
              <Input
                type="text"
                id="registration_number"
                name="registration_number"
                value={values.registration_number}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                type="text"
                id="country"
                name="country"
                value={values.country}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={values.state}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="industry" className="text-right">
                Industry
              </Label>
              <Input
                type="text"
                id="industry"
                name="industry"
                value={values.industry}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sub_industry" className="text-right">
                Sub Industry
              </Label>
              <Input
                type="text"
                id="sub_industry"
                name="sub_industry"
                value={values.sub_industry}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sub_sub_industry" className="text-right">
                Sub Sub Industry
              </Label>
              <Input
                type="text"
                id="sub_sub_industry"
                name="sub_sub_industry"
                value={values.sub_sub_industry}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact_person" className="text-right">
                Contact Person
              </Label>
              <Input
                type="text"
                id="contact_person"
                name="contact_person"
                value={values.contact_person}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation
              </Label>
              <Input
                type="text"
                id="designation"
                name="designation"
                value={values.designation}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create profile</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
