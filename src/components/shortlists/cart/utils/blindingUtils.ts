
/**
 * Utility functions for handling CV blinding logic
 */

/**
 * Blinds sensitive information in text
 * @param text Text to be blinded
 * @param candidateName Optional candidate name to blind
 */
export const blindText = (text: string, candidateName?: string): string => {
  if (!text) return '';
  
  // Blind email addresses
  let blinded = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]');
  
  // Blind phone numbers (various formats)
  blinded = blinded.replace(/(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/g, '[PHONE REDACTED]');
  blinded = blinded.replace(/(\+\d{1,3}[ -]?)?\d{5,}/g, '[PHONE REDACTED]');
  
  // Blind addresses (simplistic approach)
  blinded = blinded.replace(/\d+\s+[A-Za-z]+\s+(Avenue|Ave|Street|St|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Plaza|Plz|Terrace|Ter|Way)\b/gi, '[ADDRESS REDACTED]');
  
  // Blind names if provided
  if (candidateName) {
    const nameParts = candidateName.split(' ');
    for (const part of nameParts) {
      if (part.length > 2) { // Avoid replacing very short words that might be common
        const nameRegex = new RegExp(`\\b${part}\\b`, 'gi');
        blinded = blinded.replace(nameRegex, '[NAME REDACTED]');
      }
    }
  }
  
  return blinded;
};

/**
 * Extract job title from job description
 * @param jobDescription The full job description
 */
export const extractJobTitle = (jobDescription?: string): string => {
  if (!jobDescription) return 'Unknown Job';
  
  const dashIndex = jobDescription.indexOf('-');
  if (dashIndex > 0) {
    return jobDescription.substring(0, dashIndex).trim();
  } else {
    return jobDescription.length > 50 
      ? jobDescription.substring(0, 50) + '...' 
      : jobDescription;
  }
};
