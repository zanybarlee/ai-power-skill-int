
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ErrorStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ErrorState({ open, onOpenChange }: ErrorStateProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
        </DialogHeader>
        <p>Could not load candidate details. Please try again.</p>
      </DialogContent>
    </Dialog>
  );
}
