
/**
 * Utility functions for formatting CV content
 */

/**
 * Formats text as markdown with appropriate headings and structure
 * @param text Raw CV text content
 */
export const formatAsMarkdown = (text: string): string => {
  if (!text) return '';
  
  const paragraphs = text.split(/\n\s*\n/);
  
  const markdownText = paragraphs.map(para => {
    if (para.trim().startsWith('#')) {
      return para;
    } else if (para.trim().length <= 50 && para.trim() === para.trim().toUpperCase()) {
      return `## ${para.trim()}`;
    }
    
    if (para.includes('\n')) {
      const lines = para.split('\n');
      return lines.map(line => {
        if (line.trim().match(/^[*\-•]\s+/)) {
          return line;
        } 
        else if (line.trim().match(/^\d+\.\s+/)) {
          return line;
        }
        return line;
      }).join('\n');
    }
    
    return para;
  }).join('\n\n');
  
  return markdownText;
};
