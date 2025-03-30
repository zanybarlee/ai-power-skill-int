
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Agent, AgentFormData } from "../types";

const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contact_email: z.string().email("Please enter a valid email address"),
  contact_phone: z.string().min(5, "Please enter a valid phone number"),
  agency_name: z.string().optional(),
  agency_location: z.string().optional(),
  specialization: z.string().optional(),
});

export const useAgentForm = (agent: Agent | null, onSubmit: () => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse agency_details if it's a string
  const agencyDetails = agent?.agency_details 
    ? (typeof agent.agency_details === 'string' 
      ? JSON.parse(agent.agency_details || '{}') 
      : agent.agency_details)
    : {};

  const form = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: agent?.name || "",
      contact_email: agent?.contact_email || "",
      contact_phone: agent?.contact_phone || "",
      agency_name: agencyDetails?.name || "",
      agency_location: agencyDetails?.location || "",
      specialization: agencyDetails?.specialization || "",
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

      // Create the agency details JSON object
      const agencyDetails = {
        name: values.agency_name || "",
        location: values.agency_location || "",
        specialization: values.specialization || "",
      };

      // Create a properly structured object for agent data
      const agentData = {
        name: values.name,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone,
        user_id: userId,
        agency_details: JSON.stringify(agencyDetails), // Convert to string for database storage
      };

      console.log("Saving agent profile with data:", agentData);

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

      if (result.error) {
        console.error("Supabase error:", result.error);
        throw result.error;
      }

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

  return {
    form,
    isSubmitting,
    handleSubmit,
  };
};
