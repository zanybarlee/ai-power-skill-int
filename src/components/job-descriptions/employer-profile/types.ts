
export interface EmployerProfileFormValues {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  industry: string;
  sub_industry: string;
  sub_sub_industry: string;
  designation: string;
  registration_number: string;
}

export interface EmployerProfile {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  industry: string;
  sub_industry: string;
  sub_sub_industry: string;
  designation: string;
  registration_number: string;
  is_verified: boolean;
  is_approved: boolean;
  profile_completion: number;
}
