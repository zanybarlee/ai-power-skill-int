interface MatchingQuery {
  question: string;
}

export const queryBestMatch = async (jobDescription: string) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:3001/api/v1/prediction/daed1735-5e05-4058-b4d7-090c5bceccc0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: jobDescription }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch matching results');
    }
    
    const result = await response.json();
    return result.text;
  } catch (error) {
    throw new Error('Error querying best match: ' + (error as Error).message);
  }
};