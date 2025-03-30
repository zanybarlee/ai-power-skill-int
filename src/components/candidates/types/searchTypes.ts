
export interface DatabaseResult {
  id: string;
  name: string | null;
  experience: number | null;
  location: string | null;
  skills: unknown;
  email: string | null;
  phone: string | null;
  education: string | null;
  cv_content: string | null;
  certifications: unknown;
  nationality?: string | null;
  current_salary?: number | null;
  expected_salary?: number | null;
  notice_period?: string | null;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  availability: string;
  email: string;
  phone: string;
  education: string;
  cv_content: string;
  certifications: string[];
  nationality?: string;
  current_salary?: number;
  expected_salary?: number;
  notice_period?: string;
}

export interface SearchFormValues {
  searchName: string;
  searchLocation: string;
  searchSkill: string;
  minExperience: string;
}
