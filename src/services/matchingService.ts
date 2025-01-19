interface MatchingQuery {
  description: string;
  num_candidates: number;
}

export const queryBestMatch = async (jobDescription: string) => {
  try {
    const response = await fetch(
      "http://localhost:8005/api/match-candidates",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          description: jobDescription,
          num_candidates: 5 
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch matching results');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error querying best match:', error);
    throw new Error('Error querying best match: ' + (error as Error).message);
  }
};