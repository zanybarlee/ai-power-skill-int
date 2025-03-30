
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Agent, AgentFormData } from "./types";

const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  agency_name: z.string().optional(),
  agency_location: z.string().optional(),
  specialization: z.string().optional(),
});

interface AgentFormProps {
  agent: Agent | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const AgentForm = ({ agent, onSubmit, onCancel }: AgentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: agent?.name || "",
      email: agent?.email || "",
      phone: agent?.phone || "",
      agency_name: agent?.agency_details?.name || "",
      agency_location: agent?.agency_details?.location || "",
      specialization: agent?.agency_details?.specialization || "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: AgentFormData) => {
    try {
      setIsSubmitting(true);

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const agentData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        agency_details: {
          name: values.agency_name,
          location: values.agency_location,
          specialization: values.specialization,
        },
        user_id: userId,
      };

      let result;

      if (agent) {
        // Update existing agent
        result = await supabase
          .from("agent_profiles")
          .update(agentData)
          .eq("id", agent.id);
      } else {
        // Create new agent
        result = await supabase
          .from("agent_profiles")
          .insert([agentData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: agent ? "Agent profile updated successfully" : "Agent profile created successfully",
      });

      onSubmit();
    } catch (error) {
      console.error("Error saving agent profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save agent profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Agent Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="agent@example.com" {...field} />
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
                <FormLabel>Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agency_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agency Name</FormLabel>
                <FormControl>
                  <Input placeholder="Recruitment Agency" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agency_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agency Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input placeholder="IT, Sales, Marketing, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onCancel} type="button" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : (agent ? "Update Agent" : "Create Agent")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
