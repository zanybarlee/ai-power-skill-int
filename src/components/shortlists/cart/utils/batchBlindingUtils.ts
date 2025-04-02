
import { blindCV } from "../services/blindingService";
import { formatAsMarkdown } from "./formatUtils";
import { CacheStore } from "../hooks/types";
import { useToast } from "@/hooks/use-toast";

/**
 * Blinds all unprocessed CVs in the cart
 * @param candidateIds Array of candidate IDs to process
 * @param candidateContents Map of candidate contents indexed by ID
 * @param cacheStore Cache store to update with blinded content
 * @returns Array of IDs that were successfully blinded
 */
export const blindAllCandidateCVs = async (
  candidateIds: string[],
  candidateContents: Record<string, string>,
  cacheStore: CacheStore
): Promise<string[]> => {
  const successfullyBlinded: string[] = [];
  const errors: string[] = [];

  // Process each candidate in the array
  for (const candidateId of candidateIds) {
    // Skip if no content available
    if (!candidateContents[candidateId]) {
      continue;
    }
    
    // Skip if already blinded (cache exists)
    if (cacheStore[candidateId]?.blinded) {
      successfullyBlinded.push(candidateId);
      continue;
    }
    
    try {
      // Blind the CV content
      const blindedContent = await blindCV(candidateContents[candidateId]);
      const formattedBlindedContent = formatAsMarkdown(blindedContent);
      
      // Initialize cache if needed
      if (!cacheStore[candidateId]) {
        cacheStore[candidateId] = {
          original: formatAsMarkdown(candidateContents[candidateId]),
          blinded: null
        };
      }
      
      // Store in cache
      cacheStore[candidateId] = {
        ...cacheStore[candidateId],
        blinded: formattedBlindedContent
      };
      
      successfullyBlinded.push(candidateId);
    } catch (error) {
      console.error(`Error blinding CV for candidate ${candidateId}:`, error);
      errors.push(candidateId);
    }
  }
  
  return successfullyBlinded;
};

export const useBlindAllToast = () => {
  const { toast } = useToast();
  
  const showBlindAllResults = (successful: number, total: number) => {
    if (successful === 0) {
      toast({
        title: "No CVs to blind",
        description: "All CVs are already blinded or no content available.",
      });
    } else if (successful === total) {
      toast({
        title: "All CVs blinded",
        description: `Successfully blinded ${successful} candidate CVs.`,
      });
    } else {
      toast({
        title: "CVs blinded with issues",
        description: `Blinded ${successful} out of ${total} candidate CVs.`,
        variant: "destructive",
      });
    }
  };
  
  return { showBlindAllResults };
};
