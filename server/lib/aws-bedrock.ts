import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({
  region: "us-east-1", // or your preferred region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

interface ListingSummaryParams {
  clientName: string;
  summaryTitle: string;
  listingUrls: string[];
  preferences: string;
  messageStyle: string;
  cta: string;
}

interface PropertyAnalysisResponse {
  recommendations: string[];
  marketAnalysis: string;
  priceEstimate: {
    value: number;
    range: {
      min: number;
      max: number;
    };
  };
}

// Generate listing summary using AWS Bedrock with Claude
export async function generateListingSummary(params: ListingSummaryParams): Promise<string> {
  const { clientName, summaryTitle, listingUrls, preferences, messageStyle, cta } = params;

  const prompt = `
    You are an AI assistant helping real estate agents generate personalized listing summaries for their clients.
    Create a message that is engaging, informative, and formatted clearly.

    **Client Name:** ${clientName || "No name provided"}  
    **Summary Title:** ${summaryTitle || "Handpicked Listings for You"}  
    **Listings:**  
    ${listingUrls.join('\n') || "No listings provided"}  
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
    const input = {
      modelId: "anthropic.claude-v2",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 1000,
        temperature: 0.7,
        top_k: 250,
        top_p: 0.999,
        stop_sequences: ["\n\nHuman:"]
      })
    };

    const command = new InvokeModelCommand(input);
    const response = await bedrockClient.send(command);

    const responseBody = new TextDecoder().decode(response.body);
    const result = JSON.parse(responseBody);

    if (!result.completion) {
      throw new Error('No content generated');
    }

    return result.completion.trim();
  } catch (error: any) {
    console.error('AWS Bedrock API error:', error);
    throw new Error('Failed to generate listing summary: ' + error.message);
  }
}

// Analyze property details and provide market insights
export async function analyzeProperty(propertyDetails: string): Promise<PropertyAnalysisResponse> {
  const prompt = `
    Analyze the following property details and provide:
    1. Property recommendations
    2. Market analysis
    3. Estimated price range

    Property Details:
    ${propertyDetails}

    Provide the response in JSON format with the following structure:
    {
      "recommendations": string[],
      "marketAnalysis": string,
      "priceEstimate": {
        "value": number,
        "range": {
          "min": number,
          "max": number
        }
      }
    }
  `;

  try {
    const input = {
      modelId: "anthropic.claude-v2",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 1000,
        temperature: 0.7,
        top_k: 250,
        top_p: 0.999,
        stop_sequences: ["\n\nHuman:"],
        response_format: { type: "json_object" }
      })
    };

    const command = new InvokeModelCommand(input);
    const response = await bedrockClient.send(command);

    const responseBody = new TextDecoder().decode(response.body);
    const result = JSON.parse(responseBody);

    return result as PropertyAnalysisResponse;
  } catch (error: any) {
    console.error('AWS Bedrock API error:', error);
    throw new Error('Failed to analyze property: ' + error.message);
  }
}

// Chat with AI using AWS Bedrock
export async function chatWithBedrockAI(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  context?: string
): Promise<string> {
  try {
    const systemContext = context || 'You are a real estate AI assistant. Help users find and understand property listings.';

    const formattedMessages = messages.map(msg => 
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');

    const prompt = `${systemContext}\n\n${formattedMessages}\n\nAssistant:`;

    const input = {
      modelId: "anthropic.claude-v2",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt,
        max_tokens_to_sample: 1000,
        temperature: 0.7,
        top_k: 250,
        top_p: 0.999,
        stop_sequences: ["\n\nHuman:"]
      })
    };

    const command = new InvokeModelCommand(input);
    const response = await bedrockClient.send(command);

    const responseBody = new TextDecoder().decode(response.body);
    const result = JSON.parse(responseBody);

    return result.completion || "I couldn't process that request.";
  } catch (error: any) {
    console.error('AWS Bedrock API error:', error);
    throw new Error('Failed to process chat: ' + error.message);
  }
}