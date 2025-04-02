
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, BookmarkX, ShoppingCartPlus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CandidateActionsProps {
  email: string;
  candidateId: string;
  candidate: any;
  jobDescriptionId?: string;
  onContact: (email: string) => void;
  onRemove: (candidateId: string, jobDescriptionId?: string) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export const CandidateActions = ({
  email,
  candidateId,
  candidate,
  jobDescriptionId,
  onContact,
  onRemove,
  onClick,
}: CandidateActionsProps) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(candidate);
  };

  return (
    <div className="flex justify-end gap-2" onClick={onClick}>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onContact(email);
        }}
        className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
        title="Contact candidate"
      >
        <Mail className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleAddToCart}
        className={`hover:bg-aptiv/5 ${
          isInCart(candidateId) 
            ? "text-aptiv" 
            : "text-aptiv-gray-600 hover:text-aptiv"
        }`}
        title={isInCart(candidateId) ? "Already in cart" : "Add to cart"}
        disabled={isInCart(candidateId)}
      >
        <ShoppingCartPlus className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(candidateId, jobDescriptionId);
        }}
        className="text-aptiv-gray-600 hover:text-aptiv hover:bg-aptiv/5"
        title="Remove from shortlist"
      >
        <BookmarkX className="h-4 w-4" />
      </Button>
    </div>
  );
};
