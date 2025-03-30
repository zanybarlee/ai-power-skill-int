
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

      // Create a new Supabase user if this is a new agent and we have password fields
      if (!agent && values.email && values.password) {
        // Use the standard signup method instead of admin API
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password as string,
          options: {
            data: {
              name: values.name,
              phone: values.phone,
              role: 'agent'
            }
          }
        });

        if (authError) {
          console.error("Error creating user:", authError);
          throw new Error(`Failed to create user account: ${authError.message}`);
        }

        if (authData?.user) {
          userId = authData.user.id;
          console.log("Created new user with ID:", userId);
          
          // If we successfully created a user, we need to sign back in as the admin
          // to continue creating the agent profile
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: session.user.email as string,
            password: "", // You should prompt for password if needed, or use another auth method
          });
          
          if (signInError) {
            console.error("Error signing back in as admin:", signInError);
            // We'll continue anyway since we already have the user ID
          }
        }
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
        user_id: userId || null, // Use the newly created user ID
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
        description: agent ? "Agent profile updated successfully" : "Agent profile created successfully with user account",
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
