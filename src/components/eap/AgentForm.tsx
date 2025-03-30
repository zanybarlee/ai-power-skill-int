
import React from "react";
import { Form } from "@/components/ui/form";
import { Agent } from "./types";
import { useAgentForm } from "./hooks/useAgentForm";
import { AgentBasicInfoFields, AgentAgencyInfoFields, AgentUserCredentialsFields } from "./components/AgentFormFields";
import { FormActions } from "./components/FormActions";

interface AgentFormProps {
  agent: Agent | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const AgentForm: React.FC<AgentFormProps> = ({ agent, onSubmit, onCancel }) => {
  const { form, isSubmitting, handleSubmit } = useAgentForm(agent, onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AgentBasicInfoFields form={form} />
            {!agent && <AgentUserCredentialsFields form={form} />}
          </div>
          <AgentAgencyInfoFields form={form} />
        </div>

        <FormActions 
          onCancel={onCancel} 
          isSubmitting={isSubmitting} 
          isUpdate={!!agent} 
        />
      </form>
    </Form>
  );
};
