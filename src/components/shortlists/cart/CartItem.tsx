
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { MatchedCandidate } from "@/hooks/shortlists/types";
import { getStatusColor, getStatusLabel } from "../candidate-table/utils/statusUtils";

interface CartItemProps {
  candidate: MatchedCandidate;
  onPreviewBlind: () => void;
}

export function CartItem({ candidate, onPreviewBlind }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900">{candidate.name}</h3>
          <p className="text-sm text-gray-600">{candidate.role || candidate.job_role || "Not specified"}</p>
        </div>
        <Badge 
          variant="outline" 
          className={getStatusColor(candidate.status || 'matched')}
        >
          {getStatusLabel(candidate.status || 'matched')}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="text-xs text-gray-600">
          <span className="font-medium">Location:</span> {candidate.location || "Not specified"}
        </div>
        <div className="text-xs text-gray-600">
          <span className="font-medium">Experience:</span> {candidate.experience || "Not specified"}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {candidate.skills.slice(0, 3).map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-aptiv border-aptiv/20 bg-aptiv/5 text-xs"
          >
            {skill}
          </Badge>
        ))}
        {candidate.skills.length > 3 && (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-600 border-gray-200 text-xs"
          >
            +{candidate.skills.length - 3} more
          </Badge>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-aptiv font-medium">
          Match: {candidate.match_score}%
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewBlind}
            className="text-gray-600 hover:text-gray-800"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(candidate.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
