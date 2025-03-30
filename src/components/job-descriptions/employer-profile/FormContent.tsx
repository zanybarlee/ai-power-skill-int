
import { Separator } from "@/components/ui/separator";
import { EmployerProfileFormValues } from "./types";
import { CompanyInfoFields, LocationFields, IndustryFields, ContactFields } from "./FormFields";

interface FormContentProps {
  values: EmployerProfileFormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormContent: React.FC<FormContentProps> = ({ values, handleChange }) => {
  return (
    <div className="space-y-5 py-2 pb-4">
      <h3 className="font-medium text-sm">Company Information</h3>
      <CompanyInfoFields values={values} handleChange={handleChange} />
      
      <Separator className="my-4" />
      
      <h3 className="font-medium text-sm">Location</h3>
      <LocationFields values={values} handleChange={handleChange} />
      
      <Separator className="my-4" />
      
      <h3 className="font-medium text-sm">Industry Information</h3>
      <IndustryFields values={values} handleChange={handleChange} />
      
      <Separator className="my-4" />
      
      <h3 className="font-medium text-sm">Contact Information</h3>
      <ContactFields values={values} handleChange={handleChange} />
    </div>
  );
};
