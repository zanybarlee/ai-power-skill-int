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
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  alternate_contact: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().min(8, "Phone number must be at least 8 digits").optional().or(z.literal("")),
  }).optional().default({}),
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
): Promise<{ data?: EmployerProfile; error?: Error }> => {
  try {
    console.log("Starting saveProfile with values:", values);
    const timestamp = new Date().toISOString();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log("Auth check result:", { user, userError });
    
    if (userError) throw userError;
    if (!user) throw new Error("You must be logged in to create a profile");

    // Ensure all required fields are present
    const profileData = {
      user_id: user.id,
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
      alternate_contact: values.alternate_contact || null,
      is_verified: false,
      is_approved: false,
      profile_completion: 100,
    };

    console.log("Prepared profile data:", profileData);

    let result;
    if (profile?.id) {
      console.log("Updating existing profile with ID:", profile.id);
      // Update existing profile
      result = await supabase
        .from('employer_profiles')
        .update({
          ...profileData,
          updated_at: timestamp,
        })
        .eq('id', profile.id);
    } else {
      console.log("Creating new profile");
      // Check if a profile already exists for this user to handle the unique constraint
      const { data: existingProfile } = await supabase
        .from('employer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      console.log("Existing profile check:", existingProfile);
      
      if (existingProfile) {
        console.log("Updating existing profile found for user");
        // Update the existing profile if one exists
        result = await supabase
          .from('employer_profiles')
          .update({
            ...profileData,
            updated_at: timestamp,
          })
          .eq('id', existingProfile.id);
      } else {
        console.log("Inserting new profile");
        // Insert a new profile
        result = await supabase
          .from('employer_profiles')
          .insert({
            ...profileData,
            created_at: timestamp,
            updated_at: timestamp,
          });
      }
    }

    console.log("Database operation result:", result);

    if (result.error) {
      console.error("Error saving profile:", result.error);
      throw result.error;
    }

    // Fetch the updated or created profile to return
    const { data: updatedProfile, error: fetchError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log("Fetch updated profile result:", { updatedProfile, fetchError });

    if (fetchError) {
      console.error("Error fetching updated profile:", fetchError);
      throw fetchError;
    }

    console.log("Profile saved successfully:", updatedProfile);
    return { data: updatedProfile as EmployerProfile };

  } catch (error) {
    console.error("Error in saveProfile:", error);
    return { error: error as Error };
  }
};
