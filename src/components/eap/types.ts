
export interface Agent {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  agency_details: {
    name?: string;
    location?: string;
    specialization?: string;
    [key: string]: any;
  };
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
}
