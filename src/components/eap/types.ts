
export interface Agent {
  id: string;
  user_id?: string;
  name: string;
  contact_email: string | null;
  contact_phone: string | null;
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
  contact_email: string;
  contact_phone: string;
  agency_name?: string;
  agency_location?: string;
  specialization?: string;
}
