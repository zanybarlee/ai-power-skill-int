
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Agent } from "./types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AgentListProps {
  onEdit: (agent: Agent) => void;
}

export const AgentList = ({ onEdit }: AgentListProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("agent_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Transform the data to match the Agent type
      const transformedData: Agent[] = data.map(agent => {
        // Parse agency_details if it's a string
        let agencyDetails;
        try {
          agencyDetails = agent.agency_details ? 
            (typeof agent.agency_details === 'string' 
              ? JSON.parse(agent.agency_details) 
              : agent.agency_details)
            : { name: "", location: "", specialization: "" };
        } catch (e) {
          console.error("Error parsing agency_details:", e);
          agencyDetails = { name: "", location: "", specialization: "" };
        }

        return {
          id: agent.id,
          user_id: agent.user_id,
          name: agent.name,
          email: agent.email || "",
          phone: agent.phone || "",
          agency_details: agencyDetails,
          created_at: agent.created_at,
          updated_at: agent.updated_at
        };
      });
      
      setAgents(transformedData);
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load agent profiles. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this agent profile?")) return;

    try {
      const { error } = await supabase
        .from("agent_profiles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Agent profile deleted successfully",
      });
      
      setAgents(agents.filter(agent => agent.id !== id));
    } catch (error) {
      console.error("Error deleting agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete agent profile. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading agent profiles...</div>;
  }

  if (agents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No agent profiles found. Create a new agent profile to get started.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Agency</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => {
          const agencyName = typeof agent.agency_details === 'object' && agent.agency_details 
            ? agent.agency_details.name 
            : '';
            
          return (
            <TableRow key={agent.id}>
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell>{agent.email || "—"}</TableCell>
              <TableCell>{agent.phone || "—"}</TableCell>
              <TableCell>{agencyName || "—"}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(agent)}>
                  <Pencil size={16} />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(agent.id)}>
                  <Trash2 size={16} className="text-red-500" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
