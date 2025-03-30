interface MatchingQuery {
  description: string;
}

export const queryBestMatch = async (jobDescription: string) => {
  try {
    const response = await fetch(
      "http://localhost:9000/match-job",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          job_description: jobDescription
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