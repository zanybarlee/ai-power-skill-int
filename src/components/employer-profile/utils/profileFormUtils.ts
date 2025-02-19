
import { z } from "zod";
import { EmployerProfile } from "../types";
import { supabase } from "@/integrations/supabase/client";

export const profileSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  registration_number: z.string().min(1, "Registration number is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  industry: z.string().min(1, "Industry is required"),
  sub_industry: z.string().min(1, "Sub-industry is required"),
  sub_sub_industry: z.string().min(1, "Sub-sub-industry is required"),
  contact_person: z.string().min(2, "Contact person name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  alternate_contact: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().min(10, "Invalid phone number").optional(),
  }).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const getDefaultFormValues = (profile: EmployerProfile | null): ProfileFormData => {
  return profile || {
    company_name: "",
    registration_number: "",
    country: "",
    state: "",
    industry: "",
    sub_industry: "",
    sub_sub_industry: "",
    contact_person: "",
    designation: "",
    email: "",
    phone: "",
    alternate_contact: {
      name: "",
      designation: "",
      email: "",
      phone: "",
    },
  };
};

export const saveProfile = async (
  values: ProfileFormData,
  profile: EmployerProfile | null
) => {
  const timestamp = new Date().toISOString();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) throw userError;
  if (!user) throw new Error("You must be logged in to create a profile");

  const profileData = {
    user_id: user.id,
    ...values,
    alternate_contact: values.alternate_contact || null,
    is_verified: false,
    is_approved: false,
    profile_completion: 100,
  };

  if (profile?.id) {
    return await supabase
      .from('employer_profiles')
      .update({
        ...profileData,
        updated_at: timestamp,
      })
      .eq('id', profile.id)
      .select('*');
  } else {
    return await supabase
      .from('employer_profiles')
      .insert([{
        ...profileData,
        created_at: timestamp,
        updated_at: timestamp,
      }])
      .select('*');
  }
};
