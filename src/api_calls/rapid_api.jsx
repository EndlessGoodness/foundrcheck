// Cache to store the result and prevent multiple API calls
let cachedCompetitors = null;
let lastAnalysisHash = null;

export async function searchProductHuntCompetitors(analysisResults) {
  // Create a hash of the analysis results for better caching
  const analysisHash = JSON.stringify(analysisResults?.competitors?.Companies || []);
  
  // Check if we already have a cached result for this analysis
  if (cachedCompetitors && lastAnalysisHash === analysisHash) {
    return cachedCompetitors;
  }

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  
  if (!apiKey) {
    console.error('RapidAPI key not found in environment variables');
    return [];
  }

  // Extract competitor company names from Gemini analysis
  const competitorNames = analysisResults?.competitors?.Companies || [];

  if (competitorNames.length === 0) {
    cachedCompetitors = [];
    lastAnalysisHash = analysisHash;
    return [];
  }

  const competitorDetails = [];

  // Fetch details for each competitor company (limit to 5)
  for (const companyName of competitorNames.slice(0, 5)) {
    try {
      const url = `https://producthunt3.p.rapidapi.com/v2/producthunt/product/info?query=${encodeURIComponent(companyName)}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'producthunt3.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      const result = await response.text();
      
      // Try to parse the JSON response
      let product;
      try {
        product = JSON.parse(result);
      } catch (parseError) {
        console.error(`JSON parse error for "${companyName}":`, parseError);
        continue; // Skip this company and try the next one
      }

      // Check if we have a valid product response
      if (!product || typeof product !== 'object') {
        continue; // Skip this company and try the next one
      }

      // This API returns the product data directly
      if (product && (product.name || product.slug || product.id)) {
        const mappedProduct = {
          name: product.name || companyName,
          slug: product.slug || companyName.toLowerCase().replace(/\s+/g, '-'),
          description: product.tagline || 'No description available',
          link: product.social_links?.website || `https://www.producthunt.com/posts/${product.slug || companyName.toLowerCase().replace(/\s+/g, '-')}`,
          image: product.logo || '',
          upvotes: product.posts_count || 0,
          topics: product.categories || [],
        };
        competitorDetails.push(mappedProduct);
      } else {
        console.warn(`No valid product data found for "${companyName}"`);
      }

    } catch (error) {
      console.error(`Product Hunt API error for "${companyName}":`, error.message);
      continue; // Skip this company and try the next one
    }
  }

  // Log the final competitors API output
  console.log('=== COMPETITORS API RESPONSE ===');
  console.log('Total competitors found:', competitorDetails.length);
  console.log('Competitor details:', competitorDetails);
  console.log('================================');
  
  cachedCompetitors = competitorDetails;
  lastAnalysisHash = analysisHash;
  return competitorDetails;
}
