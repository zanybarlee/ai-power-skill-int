import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  X,
  Trash2,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { BlindedPreview } from "./BlindedPreview";
import { CartItem } from "./CartItem";
import { ShareCVsDialog } from "./ShareCVsDialog";
import { fetchCandidateDetails } from "./services/candidateService";
import { blindAllCandidateCVs } from "./utils/batchBlindingUtils";
import { useBlindingToast } from "./hooks/useBlindingToast";

import { blindedContentCache } from "./BlindedPreview";

export function CartDrawer() {
  const { cartItems, clearCart, cartCount } = useCart();
  const [openShare, setOpenShare] = useState(false);
  const [blindPreviewOpen, setBlindPreviewOpen] = useState(false);
  const [blindPreviewCandidateId, setBlindPreviewCandidateId] = useState<string | null>(null);
  const [isBlindingAll, setIsBlindingAll] = useState(false);
  const { showBlindAllResults } = useBlindingToast();

  const handleBlindPreview = (candidateId: string) => {
    setBlindPreviewCandidateId(candidateId);
    setBlindPreviewOpen(true);
  };

  const handleClearAll = () => {
    clearCart();
    Object.keys(blindedContentCache).forEach(key => {
      delete blindedContentCache[key];
    });
  };

  const handleBlindAll = async () => {
    if (cartItems.length === 0 || isBlindingAll) return;
    
    setIsBlindingAll(true);
    
    try {
      // First, collect all candidate CVs
      const candidateContents: Record<string, string> = {};
      const candidatesToBlind: string[] = [];
      
      // Fetch details and collect content for each candidate
      for (const candidate of cartItems) {
        try {
          const details = await fetchCandidateDetails(candidate.id);
          if (details.cv_content) {
            candidateContents[candidate.id] = details.cv_content;
            candidatesToBlind.push(candidate.id);
          }
        } catch (error) {
          console.error(`Error fetching details for candidate ${candidate.id}:`, error);
        }
      }
      
      // Blind all candidate CVs
      const blindedIds = await blindAllCandidateCVs(
        candidatesToBlind, 
        candidateContents, 
        blindedContentCache
      );
      
      // Show results to user
      showBlindAllResults(blindedIds.length, candidatesToBlind.length);
    } catch (error) {
      console.error('Error in blind all operation:', error);
    } finally {
      setIsBlindingAll(false);
    }
  };

  if (cartCount === 0) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Candidate Cart</SheetTitle>
          </SheetHeader>
          <div className="py-8 text-center text-gray-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Your cart is empty</p>
            <p className="text-sm mt-2">
              Add candidates to your cart to share with employers
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-aptiv text-white">
              {cartCount}
            </Badge>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader className="border-b pb-4">
            <div className="flex justify-between items-center">
              <SheetTitle>Candidate Cart ({cartCount})</SheetTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBlindAll}
                  disabled={isBlindingAll}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  {isBlindingAll ? 'Blinding...' : 'Blind All'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearAll}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          </SheetHeader>

          <div className="py-4 flex-1 overflow-auto space-y-4 max-h-[calc(80vh-180px)]">
            {cartItems.map((candidate) => (
              <CartItem 
                key={candidate.id} 
                candidate={candidate} 
                onPreviewBlind={() => handleBlindPreview(candidate.id)}
              />
            ))}
          </div>

          <SheetFooter className="border-t pt-4 mt-auto">
            <div className="flex justify-between w-full">
              <SheetClose asChild>
                <Button variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </SheetClose>
              <Button 
                variant="aptiv"
                onClick={() => setOpenShare(true)}
              >
                <Send className="h-4 w-4 mr-2" />
                Share CVs
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ShareCVsDialog 
        open={openShare}
        onOpenChange={setOpenShare}
        candidates={cartItems}
      />

      {blindPreviewCandidateId && (
        <BlindedPreview
          open={blindPreviewOpen}
          onOpenChange={setBlindPreviewOpen}
          candidateId={blindPreviewCandidateId}
        />
      )}
    </>
  );
}
