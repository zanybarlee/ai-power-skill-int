
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmployerProfileFormValues } from "./types";

interface FormFieldsProps {
  values: EmployerProfileFormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyInfoFields: React.FC<FormFieldsProps> = ({ values, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company_name" className="text-right">
          Company Name
        </Label>
        <Input
          type="text"
          id="company_name"
          name="company_name"
          value={values.company_name}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="registration_number" className="text-right">
          Registration Number
        </Label>
        <Input
          type="text"
          id="registration_number"
          name="registration_number"
          value={values.registration_number}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
    </>
  );
};

export const LocationFields: React.FC<FormFieldsProps> = ({ values, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="country" className="text-right">
          Country
        </Label>
        <Input
          type="text"
          id="country"
          name="country"
          value={values.country}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="state" className="text-right">
          State
        </Label>
        <Input
          type="text"
          id="state"
          name="state"
          value={values.state}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
    </>
  );
};

export const IndustryFields: React.FC<FormFieldsProps> = ({ values, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="industry" className="text-right">
          Industry
        </Label>
        <Input
          type="text"
          id="industry"
          name="industry"
          value={values.industry}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="sub_industry" className="text-right">
          Sub Industry
        </Label>
        <Input
          type="text"
          id="sub_industry"
          name="sub_industry"
          value={values.sub_industry}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="sub_sub_industry" className="text-right">
          Sub Sub Industry
        </Label>
        <Input
          type="text"
          id="sub_sub_industry"
          name="sub_sub_industry"
          value={values.sub_sub_industry}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
    </>
  );
};

export const ContactFields: React.FC<FormFieldsProps> = ({ values, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contact_person" className="text-right">
          Contact Person
        </Label>
        <Input
          type="text"
          id="contact_person"
          name="contact_person"
          value={values.contact_person}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="designation" className="text-right">
          Designation
        </Label>
        <Input
          type="text"
          id="designation"
          name="designation"
          value={values.designation}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Phone
        </Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
    </>
  );
};
