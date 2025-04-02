import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getPropertyRecommendations(
  criteria: string
): Promise<{
  recommendations: string[];
  explanation: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a real estate expert AI. Analyze the user's criteria and provide property recommendations along with explanations. Respond with JSON in this format: { 'recommendations': string[], 'explanation': string }",
        },
        {
          role: "user",
          content: criteria,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    return content ? JSON.parse(content) : { recommendations: [], explanation: "No recommendations available" };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error("Failed to get property recommendations: " + errorMessage);
  }
}

export async function analyzeListing(
  listingDetails: string
): Promise<{
  analysis: string;
  marketValue: number;
  priceRange: { min: number; max: number };
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a real estate market analyst. Analyze the listing details and provide insights along with estimated market value and price range. Respond with JSON in this format: { 'analysis': string, 'marketValue': number, 'priceRange': { min: number, max: number } }",
        },
        {
          role: "user",
          content: listingDetails,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    throw new Error("Failed to analyze listing: " + error.message);
  }
}

export async function generateListingSummary(
  params: {
    clientName: string;
    summaryTitle: string;
    listingUrls: string[];
    preferences: string;
    messageStyle: string;
    cta: string;
  }
): Promise<string> {
  try {
    const { clientName, summaryTitle, listingUrls, preferences, messageStyle, cta } = params;
    const prompt = `Create a property listing summary with the following details:
      - Client: ${clientName}
      - Title: ${summaryTitle}
      - Listing URLs: ${listingUrls.join(', ')}
      - Client Preferences: ${preferences}
      - Style: ${messageStyle}
      - Call to Action: ${cta}

      Format the response as a professional real estate listing summary.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional real estate agent creating personalized property listings.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content || "Failed to generate summary";
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error("Failed to generate listing summary: " + errorMessage);
  }
}

export async function chatWithAI(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  context?: string
): Promise<string> {
  try {
    // Add system context if provided
    const systemMessage = context ? {
      role: 'system' as const,
      content: `You are a real estate AI assistant. ${context}`
    } : {
      role: 'system' as const,
      content: 'You are a real estate AI assistant. Help users find and understand property listings.'
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [systemMessage, ...messages],
    });

    return response.choices[0].message.content || "I couldn't process that request.";
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error("Failed to process chat: " + errorMessage);
  }
}