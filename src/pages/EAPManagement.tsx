
import { useState } from "react";
import Layout from "@/components/Layout";
import { AgentList } from "@/components/eap/AgentList";
import { AgentForm } from "@/components/eap/AgentForm";
import { Button } from "@/components/ui/button";
import { Agent } from "@/components/eap/types";
import { PlusCircle } from "lucide-react";

const EAPManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsEditing(true);
  };

  const handleCreateAgent = () => {
    setSelectedAgent(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedAgent(null);
  };

  const handleFormSubmit = () => {
    setIsEditing(false);
    setSelectedAgent(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg p-6 border border-aptiv/10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-aptiv-gray-700">EAP Management</h1>
            {!isEditing && (
              <Button onClick={handleCreateAgent} variant="aptiv" className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Create New Agent
              </Button>
            )}
          </div>

          {isEditing ? (
            <AgentForm 
              agent={selectedAgent} 
              onSubmit={handleFormSubmit} 
              onCancel={handleCancel}
            />
          ) : (
            <AgentList onEdit={handleEditAgent} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EAPManagement;
