
import { FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionOptionProps } from "./types";

export const QuestionOption = ({ option }: QuestionOptionProps) => {
  return (
    <div key={option.id} className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50">
      <RadioGroupItem value={option.id} id={option.id} />
      <FormLabel htmlFor={option.id} className="w-full cursor-pointer font-normal">
        {option.text}
      </FormLabel>
    </div>
  );
};
