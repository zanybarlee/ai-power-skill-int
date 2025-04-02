
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
          <DialogDescription>
            Could not load candidate details. Please try again.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
