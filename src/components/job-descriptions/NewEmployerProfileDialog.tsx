
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EmployerProfile } from "../employer-profile/types";

const newEmployerProfileSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  registration_number: z.string().min(2, "Registration number must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  sub_industry: z.string().min(2, "Sub industry must be at least 2 characters"),
  sub_sub_industry: z.string().min(2, "Sub sub industry must be at least 2 characters"),
  contact_person: z.string().min(2, "Contact person must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
});

type NewEmployerProfileFormValues = z.infer<typeof newEmployerProfileSchema>;

interface NewEmployerProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: (profile: EmployerProfile) => void;
}

export const NewEmployerProfileDialog = ({
  isOpen,
  onClose,
  onProfileCreated,
}: NewEmployerProfileDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewEmployerProfileFormValues>({
    resolver: zodResolver(newEmployerProfileSchema),
    defaultValues: {
      company_name: "",
      registration_number: "",
      country: "",
      state: "",
      industry: "",
      sub_industry: "",
      sub_sub_industry: "",
      contact_person: "",
      designation: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: NewEmployerProfileFormValues) {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("employer_profiles")
        .insert(values)
        .select()
        .single();

      if (error) throw error;
      
      onProfileCreated(data as EmployerProfile);
    } catch (error) {
      console.error("Error creating employer profile:", error);
      toast.error("Failed to create employer profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Employer Profile</DialogTitle>
          <DialogDescription>
            Create a new employer profile to associate with the job description.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registration_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter industry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sub_industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter sub industry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sub_sub_industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub-Sub Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter sub-sub industry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contact_person"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact person name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Employer Profile"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
