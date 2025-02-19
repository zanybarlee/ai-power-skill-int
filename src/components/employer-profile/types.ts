
export interface EmployerProfile {
  id: string;
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
  alternate_contact?: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  is_verified: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  profile_completion: number;
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
