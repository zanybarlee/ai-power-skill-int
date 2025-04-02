
import { useToast } from "@/hooks/use-toast";
import { blindAllToastMessages } from "../utils/batchBlindingUtils";

export const useBlindingToast = () => {
  const { toast } = useToast();
  
  const showBlindAllResults = (successful: number, total: number) => {
    if (successful === 0) {
      toast(blindAllToastMessages.noBlindingNeeded);
    } else if (successful === total) {
      toast(blindAllToastMessages.blindingSuccess(successful));
    } else {
      toast(blindAllToastMessages.blindingPartial(successful, total));
    }
  };
  
  return { showBlindAllResults };
};
