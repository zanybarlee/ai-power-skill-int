interface TalentSearchParams {
  search_query: string;
  uen: string;
  user_guid: string;
  session_id: string;
  context_id: string;
  search_id: string;
}

export const searchTalent = async (params: TalentSearchParams) => {
  try {
    const response = await fetch('http://cens.synology.me:9001/search_talent/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to search for talent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching for talent:', error);
    throw error;
  }
};