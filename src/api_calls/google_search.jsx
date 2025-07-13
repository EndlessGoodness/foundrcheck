// Google Custom Search API integration
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CX = import.meta.env.VITE_GOOGLE_CX;

/**
 * Search for competitors related to the startup idea
 * @param {string} idea - The startup idea to search for
 * @returns {Promise<Array>} Array of competitor search results
 */
export async function searchCompetitors(idea) {
  if (!API_KEY || !CX) {
    console.error('Google API key or CX not found in environment variables');
    return [];
  }

  try {
    const query = `${idea} competitors startup companies similar`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&num=10`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items) {
      return data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        displayLink: item.displayLink
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error searching for competitors:', error);
    return [];
  }
}

/**
 * Search for trends related to the startup idea
 * @param {string} idea - The startup idea to search for
 * @returns {Promise<Array>} Array of trend search results
 */
export async function searchTrends(idea) {
  if (!API_KEY || !CX) {
    console.error('Google API key or CX not found in environment variables');
    return [];
  }

  try {
    const query = `${idea} market trends 2024 2025 industry growth statistics`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&num=10`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items) {
      return data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        displayLink: item.displayLink
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error searching for trends:', error);
    return [];
  }
}

/**
 * Search for both competitors and trends
 * @param {string} idea - The startup idea to search for
 * @returns {Promise<Object>} Object containing both competitors and trends arrays
 */
export async function searchAll(idea) {
  const [competitors, trends] = await Promise.all([
    searchCompetitors(idea),
    searchTrends(idea)
  ]);
  
  return { competitors, trends };
}
