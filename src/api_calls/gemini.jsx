import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

// Complete schema for all analysis results
const analysisSchema = {
  type: "object",
  properties: {
    market: {
      type: "object",
      properties: {
        Domain_Name: { type: "string" },
        Market_value: { type: "string" },
        Organised_percent: { type: "integer" },
      },
    },
    suggestions: {
      type: "object",
      properties: {
        Suggestions: { type: "string" },
      },
    },
    competitors: {
      type: "object",
      properties: {
        Companies: {
          type: "array",
          items: { type: "string" },
          maxItems: 5,
        },
      },
    },
    technologies: {
      type: "object",
      properties: {
        Technologies: {
          type: "array",
          items: { type: "string" },
        },
      },
    },
    swot: {
      type: "object",
      properties: {
        Strengths: {
          type: "array",
          items: { type: "string" },
        },
        Weaknesses: {
          type: "array",
          items: { type: "string" },
        },
        Opportunities: {
          type: "array",
          items: { type: "string" },
        },
        Threats: {
          type: "array",
          items: { type: "string" },
        },
      },
    },
  },
};

/**
 * Calls Gemini API once with complete analysis prompt and schema.
 * @param {string} startupIdea - The startup idea to analyze.
 * @returns {Promise<any>} The complete analysis response from Gemini.
 */
async function CallGemini(startupIdea) {
  // TODO: Edit this prompt as needed
  const prompt = `You are an expert startup analyst.

Given the startup idea: "${startupIdea}", provide a structured and detailed analysis as per the format below:

---

1. **Market Analysis**
   - **Domain Name**: (e.g., E-commerce, Retail, Finance, Agriculture, etc.)
   - **Estimated Market Value (in INR crores)**: [Only number, no currency symbols or commas]
   - **Organized Market Percentage**: [Only number, percentage value without the % sign]

2. **Suggestions for Improving the Idea**
   - Provide 3–5 actionable suggestions to enhance the core idea and increase its productivity or feasibility.
   - Focus on user experience, market fit, scalability, or monetization.
   - Respond in bullet points.

3. **Competitor Companies**
   - List exactly 5 well-known companies that are direct or indirect competitors in this market domain.
   - Use only company names (e.g., "Notion", "Slack", "Miro", "Figma", "Zoom").
   - Focus on companies that might be found on Product Hunt or are well-known tech companies.
   - Avoid generic descriptions, use specific company names only.

4. **Technologies Required for MVP**
   Categorize the tech stack clearly under the following headers. Use bullet points for each.

   - **Frontend**: (e.g., React, Next.js)
   - **Backend**: (e.g., Node.js, Express)
   - **AI/ML**: (if applicable, e.g., NLP, LLMs)
   - **Data / Storage**: (e.g., PostgreSQL, Firebase)
   - **APIs / Integrations**: (e.g., Google Maps API, Payment Gateway)
   - **DevOps / Hosting**: (e.g., Vercel, Docker, CI/CD tools)

5. **SWOT Analysis**
   Provide a comprehensive SWOT analysis for this startup idea. Each category should have 3-4 bullet points.

   - **Strengths**: Internal positive factors that give the startup an advantage
   - **Weaknesses**: Internal negative factors that could hinder success
   - **Opportunities**: External positive factors that could benefit the startup
   - **Threats**: External negative factors that could pose challenges

---

Only output the information in the structure above — do not include additional commentary or introductory text.`;

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
    },
  });

  const response = await chat.sendMessage({ message: prompt });
  
  // Log the Gemini response
  console.log('=== GEMINI API RESPONSE ===');
  console.log('Raw response:', response.text);
  console.log('===========================');
  
  return response.text;
}

export default CallGemini;