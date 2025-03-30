
export interface Agent {
  id: string;
  user_id?: string;
  name: string;
  email: string | null;
  phone: string | null;
  agency_details: string | { 
    name?: string;
    location?: string;
    specialization?: string;
    [key: string]: any;
  } | null;
  created_at?: string;
  updated_at?: string;
}

export interface AgentFormData {
  name: string;
  email: string;
  phone: string;
  agency_name?: string;
  agency_location?: string;
  specialization?: string;
  password?: string;
  confirmPassword?: string;
}
