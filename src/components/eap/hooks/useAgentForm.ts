
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Agent, AgentFormData } from "../types";

const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  agency_name: z.string().optional(),
  agency_location: z.string().optional(),
  specialization: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  // If it's a new agent (password is required) we need to check that both password fields match
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  // If it's a new agent (password is required) we need to check that password has a minimum length
  if (data.password) {
    return data.password.length >= 6;
  }
  return true;
}, {
  message: "Password must be at least 6 characters",
  path: ["password"],
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
      email: agent?.email || "",
      phone: agent?.phone || "",
      agency_name: agencyDetails?.name || "",
      agency_location: agencyDetails?.location || "",
      specialization: agencyDetails?.specialization || "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: AgentFormData) => {
    try {
      setIsSubmitting(true);

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      const adminUserId = session?.user?.id;

      if (!adminUserId) {
        throw new Error("User not authenticated");
      }

      let userId = agent?.user_id;

      // Only attempt to create a user if this is a new agent (and not editing an existing one)
      if (!agent && values.email && values.password) {
        // Skip user creation in development mode, just create the agent profile
        // In a production environment, you would properly implement user creation
        userId = null; // No linked user ID for development
        
        console.log("Development mode: Skipping user creation to avoid email confirmation issues");
        toast({
          title: "Development Mode",
          description: "User account creation skipped. In production, this would create a new user.",
        });
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
        email: values.email,
        phone: values.phone,
        user_id: userId, // This will be null for new agents in development
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
        description: error instanceof Error ? error.message : "Failed to save agent profile. Please try again.",
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
