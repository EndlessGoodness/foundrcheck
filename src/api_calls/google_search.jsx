// Google Custom Search API integration for trends and competitor research
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CX = import.meta.env.VITE_GOOGLE_CX;

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
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API HTTP error:', response.status, errorText);
      return [];
    }
    
    const data = await response.json();
    
    if (data.error) {
      console.error('Google API error:', data.error);
      return [];
    }
    
    if (data.items) {
      return data.items.map(item => ({
        title: item.title || 'No title',
        link: item.link || '',
        snippet: item.snippet || 'No description available',
        displayLink: item.displayLink || ''
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error searching for trends:', error);
    return [];
  }
}

/**
 * Legacy function for backward compatibility
 * Now only searches for trends since competitors are handled by Google Search API
 * @param {string} idea - The startup idea to search for
 * @returns {Promise<Object>} Object containing trends array and empty competitors array
 */
export async function searchAll(idea) {
  const trends = await searchTrends(idea);
  
  return { 
    competitors: [], // Empty since we use RapidAPI for competitors
    trends: trends 
  };
}

/**
 * Search for company information using Google Search API
 * @param {string} companyName - The company name to search for
 * @returns {Promise<Object>} Object containing company information
 */
export async function searchCompanyInfo(companyName) {
  if (!API_KEY || !CX) {
    console.error('Google API key or CX not found in environment variables');
    return null;
  }

  try {
    const query = `${companyName} company website official startup tech`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&num=3`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google API HTTP error for ${companyName}:`, response.status, errorText);
      return null;
    }
    
    const data = await response.json();
    
    if (data.error) {
      console.error(`Google API error for ${companyName}:`, data.error);
      return null;
    }
    
    if (data.items && data.items.length > 0) {
      // Take the first result as the most relevant
      const firstResult = data.items[0];
      return {
        name: companyName,
        description: firstResult.snippet || 'No description available',
        link: firstResult.link || '',
        displayLink: firstResult.displayLink || '',
        // Generate a slug for consistency with the old format
        slug: companyName.toLowerCase().replace(/\s+/g, '-'),
        // Default values for compatibility
        image: '',
        upvotes: 0,
        topics: []
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error searching for company ${companyName}:`, error);
    return null;
  }
}

/**
 * Search for multiple companies using Google Search API
 * @param {Array<string>} companyNames - Array of company names to search for
 * @returns {Promise<Array>} Array of company information objects
 */
export async function searchCompetitors(companyNames) {
  if (!companyNames || companyNames.length === 0) {
    return [];
  }
  
  const competitorDetails = [];
  
  // Search for each company individually
  for (const companyName of companyNames.slice(0, 5)) {
    const companyInfo = await searchCompanyInfo(companyName);
    if (companyInfo) {
      competitorDetails.push(companyInfo);
    }
  }
  
  // Log the final competitors search results
  console.log('=== GOOGLE SEARCH COMPETITORS ===');
  console.log('Total competitors found:', competitorDetails.length);
  console.log('Competitor details:', competitorDetails);
  console.log('==================================');
  
  return competitorDetails;
}
