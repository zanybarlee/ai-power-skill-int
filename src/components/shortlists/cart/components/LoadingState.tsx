
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface LoadingStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoadingState({ open, onOpenChange }: LoadingStateProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loading candidate details...</DialogTitle>
          <DialogDescription>
            Please wait while we retrieve the candidate information.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
