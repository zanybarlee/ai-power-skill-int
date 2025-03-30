
import { EmployerProfileFormValues } from "./types";

export const isFormValid = (values: EmployerProfileFormValues): boolean => {
  // Check required fields
  const requiredFields: Array<keyof EmployerProfileFormValues> = [
    "company_name",
    "registration_number",
    "country",
    "state", 
    "industry",
    "sub_industry",
    "sub_sub_industry",
    "contact_person",
    "designation",
    "email",
    "phone"
  ];

  for (const field of requiredFields) {
    if (!values[field]) {
      return false;
    }
  }

  // Email validation (simple check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(values.email)) {
    return false;
  }

  return true;
};
