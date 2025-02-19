
export interface EmployerProfile {
  id: string;
  user_id: string | null;
  company_name: string;
  registration_number: string;
  country: string;
  state: string;
  industry: string;
  sub_industry: string;
  sub_sub_industry: string;
  contact_person: string;
  designation: string;
  email: string;
  phone: string;
  alternate_contact: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  } | null;
  is_verified: boolean;
  is_approved: boolean;
  profile_completion: number;
  verification_token: string | null;
  verification_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Industry {
  id: string;
  name: string;
  sub_industries: SubIndustry[];
}

export interface SubIndustry {
  id: string;
  name: string;
  sub_sub_industries: SubSubIndustry[];
}

export interface SubSubIndustry {
  id: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  states: State[];
}

export interface State {
  code: string;
  name: string;
}
