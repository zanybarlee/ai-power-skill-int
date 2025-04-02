
/**
 * Service for handling CV blinding operations
 */

/**
 * Sends the CV content to the blinding API
 * @param content Original CV content to be blinded
 * @returns Blinded CV content
 */
export const blindCV = async (content: string): Promise<string> => {
  const response = await fetch('http://localhost:9000/blind-cv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cv_content: content
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to blind CV content');
  }
  
  const data = await response.json();
  return data.blind_cv_content;
};
