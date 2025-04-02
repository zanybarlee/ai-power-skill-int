
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { Question } from "./types";
import { QuestionOption } from "./QuestionOption";

interface QuestionCardProps {
  question: Question;
  form: UseFormReturn<{
    answer: string;
  }, any, undefined>;
}

export const QuestionCard = ({ question, form }: QuestionCardProps) => {
  return (
    <div className="mb-8">
      <h4 className="text-base font-medium mb-4 text-aptiv-gray-700">
        {question.text}
      </h4>
      
      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                className="space-y-3"
              >
                {question.options.map((option) => (
                  <QuestionOption key={option.id} option={option} />
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
