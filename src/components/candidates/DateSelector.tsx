import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectorProps {
  date: Date | undefined;
  daysAgo: number;
  onDateChange: (date: Date | undefined) => void;
  onDaysAgoChange: (days: number) => void;
  onCheckResults: () => void;
}

export const DateSelector = ({
  date,
  daysAgo,
  onDateChange,
  onDaysAgoChange,
  onCheckResults,
}: DateSelectorProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((days) => (
          <Button
            key={days}
            variant={!date && daysAgo === days ? "default" : "outline"}
            onClick={() => {
              onDateChange(undefined);
              onDaysAgoChange(days);
              onCheckResults();
            }}
            className={cn(
              !date && daysAgo === days 
                ? "bg-aptiv text-white" 
                : "border-aptiv text-aptiv hover:bg-aptiv hover:text-white",
              "transition-all duration-200"
            )}
          >
            {days === 0 ? "Today" : `${days} days ago`}
          </Button>
        ))}
      </div>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={date ? "default" : "outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                date ? "bg-aptiv text-white" : "border-aptiv text-aptiv hover:bg-aptiv hover:text-white"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                onDateChange(newDate);
                if (newDate) {
                  onDaysAgoChange(-1);
                  onCheckResults();
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};