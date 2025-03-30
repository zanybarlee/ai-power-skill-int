
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isUpdate: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  isSubmitting, 
  isUpdate 
}) => {
  return (
    <div className="flex justify-end gap-4 mt-6">
      <Button 
        variant="outline" 
        onClick={onCancel} 
        type="button" 
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-aptiv hover:bg-aptiv-dark"
      >
        {isSubmitting ? "Saving..." : (isUpdate ? "Update Agent" : "Create Agent")}
      </Button>
    </div>
  );
};
