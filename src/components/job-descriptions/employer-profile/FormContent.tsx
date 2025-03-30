
import React from "react";
import { CompanyInfoFields, LocationFields, IndustryFields, ContactFields } from "./FormFields";
import { EmployerProfileFormValues } from "./types";

interface FormContentProps {
  values: EmployerProfileFormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormContent: React.FC<FormContentProps> = ({ values, handleChange }) => {
  return (
    <div className="grid gap-4 py-4">
      <CompanyInfoFields values={values} handleChange={handleChange} />
      <LocationFields values={values} handleChange={handleChange} />
      <IndustryFields values={values} handleChange={handleChange} />
      <ContactFields values={values} handleChange={handleChange} />
    </div>
  );
};
