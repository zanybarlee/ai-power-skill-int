
import { EmployerProfileFormValues } from "./types";

export const isFormValid = (values: EmployerProfileFormValues): boolean => {
  // Ensure all required fields are filled
  return (
    values.company_name.trim() !== "" &&
    values.contact_person.trim() !== "" &&
    values.email.trim() !== "" &&
    values.phone.trim() !== "" &&
    values.country.trim() !== "" &&
    values.state.trim() !== "" &&
    values.industry.trim() !== "" &&
    values.registration_number.trim() !== "" &&
    values.designation.trim() !== "" &&
    values.sub_industry.trim() !== "" &&
    values.sub_sub_industry.trim() !== ""
  );
};
