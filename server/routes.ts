import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertPropertySchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Property routes
  app.get("/api/properties", async (_req, res) => {
    const properties = await storage.getAllProperties();
    res.json(properties);
  });

  app.get("/api/properties/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const property = await storage.getProperty(id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.json(property);
  });

  app.post("/api/properties", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const property = await storage.createProperty(req.body);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(error.issues);
      }
      throw error;
    }
  });

  // Chat endpoint using OpenAI
  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const { messages, context } = req.body;

      const chatMessages = messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      }));

      if (context) {
        chatMessages.unshift({
          role: "system",
          content: context
        });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Using the latest model as per the blueprint
        messages: chatMessages,
      });

      const response = completion.choices[0].message.content;
      res.json({ response });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to process chat' });
    }
  });

  // Content generation route
  app.post("/api/generate", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const { clientName, summaryTitle, listingUrls, preferences, messageStyle, cta } = req.body;

      const prompt = `Create a property listing summary with the following details:
        - Client: ${clientName}
        - Title: ${summaryTitle}
        - Listings: ${listingUrls.join('\n')}
        - Preferences: ${preferences}
        - Style: ${messageStyle}
        - Call to Action: ${cta}
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Using the latest model as per the blueprint
        messages: [
          {
            role: "system",
            content: "You are a professional real estate agent creating personalized property listings."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      const generatedContent = completion.choices[0].message.content;
      res.json({ generatedContent });
    } catch (error) {
      console.error('Content generation error:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}