import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateListingSummary({
  clientName,
  summaryTitle,
  listingUrls,
  preferences,
  messageStyle,
  cta
}: {
  clientName: string;
  summaryTitle: string;
  listingUrls: string;
  preferences: string;
  messageStyle: string;
  cta: string;
}) {
  const prompt = `
    You are an AI assistant helping real estate agents generate personalized listing summaries for their clients.
    Create a message that is engaging, informative, and formatted clearly.

    **Client Name:** ${clientName || "No name provided"}  
    **Summary Title:** ${summaryTitle || "Handpicked Listings for You"}  
    **Listings:**  
    ${listingUrls || "No listings provided"}  
    **Client Preferences:** ${preferences || "No specific preferences"}  
    **Message Style:** ${messageStyle}  
    **Call-to-Action:** ${cta}  

    ### **Instructions:**
    - Use a professional yet friendly tone.
    - Clearly highlight key property features like price, location, and special amenities.
    - Use bullet points for listing details.
    - Include a warm closing and call to action.

    **Generate the message below:**
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('No content generated');
    }

    return response.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please try again later or contact support.');
    }
    throw new Error('Failed to generate listing summary: ' + error.message);
  }
}