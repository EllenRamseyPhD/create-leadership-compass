import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { z } from "zod";
import { insertAssessmentSchema, assessmentResponsesSchema, type AssessmentResponses } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pillarDescriptions = {
  consciousSelfAwareness: "Conscious Self-Awareness - understanding one's current focus and leadership impact",
  relationalIntelligence: "Relational Intelligence - the quality and dynamics of executive team relationships",
  ethicalInfluence: "Ethical Influence - how values and ethics manifest in organizational decisions",
  adaptiveGrowth: "Adaptive Growth - response to disruption and capacity for experimentation",
  transparentCommunication: "Transparent Communication - information flow across leadership levels",
  empoweredAction: "Empowered Action - degree of autonomy and ownership in team decision-making",
};

const responseLabels: Record<string, Record<string, string>> = {
  consciousSelfAwareness: {
    A: "Driving operational performance",
    B: "Strengthening your leadership team",
    C: "Preparing the organization for future growth",
    D: "Reassessing your own leadership impact",
  },
  relationalIntelligence: {
    A: "Highly aligned and trusting",
    B: "Functionally strong but somewhat siloed",
    C: "Capable but inconsistent in communication",
    D: "In transition or rebuilding trust",
  },
  ethicalInfluence: {
    A: "Consistently reflected in strategy",
    B: "Sometimes discussed but not fully lived",
    C: "Primarily reactive when issues arise",
  },
  adaptiveGrowth: {
    A: "I adapt quickly and guide others to do the same",
    B: "I manage change, but it often feels reactive",
    C: "I rely on stability more than experimentation",
  },
  transparentCommunication: {
    A: "Open and reciprocal",
    B: "Clear at the top, mixed elsewhere",
    C: "Controlled and cautious",
  },
  empoweredAction: {
    A: "Yes, autonomy is encouraged",
    B: "Partially, though some rely on approval",
    C: "Not yet—most decisions flow upward",
  },
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/assessments/generate-summary", async (req, res) => {
    try {
      const validationResult = assessmentResponsesSchema.safeParse(req.body.responses);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid assessment responses",
          details: validationResult.error.issues 
        });
      }

      const responses = validationResult.data;

      const responsesText = Object.entries(responses)
        .map(([key, value]) => {
          const pillar = pillarDescriptions[key as keyof AssessmentResponses];
          const label = responseLabels[key]?.[value] || value;
          return `${pillar}: ${label}`;
        })
        .join("\n");

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert leadership consultant analyzing assessment results based on Dr. Ellen Ramsey's CREATE Leadership Model™. The model has six pillars:
- Conscious Self-Awareness
- Relational Intelligence
- Ethical Influence
- Adaptive Growth
- Transparent Communication
- Empowered Action

Generate a thoughtful, professional leadership profile summary (3-4 paragraphs) that:
1. Opens with an overall assessment of the leader's profile
2. Highlights 2-3 key strengths based on their responses
3. Identifies 1-2 growth opportunities with context (not criticism)
4. Closes with an encouraging, strategic insight about their leadership journey

Write in a calm, credible tone befitting an executive consultation. Be specific to their responses but maintain professional warmth. Avoid buzzwords and generic praise.`,
          },
          {
            role: "user",
            content: `Based on these assessment responses, generate a personalized leadership profile:\n\n${responsesText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 600,
      });

      const summary = completion.choices[0].message.content || "Unable to generate summary at this time.";

      res.json({ summary });
    } catch (error) {
      console.error("Error generating summary:", error);
      res.status(500).json({ error: "Failed to generate summary" });
    }
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const responsesValidation = assessmentResponsesSchema.safeParse(req.body.responses);
      
      if (!responsesValidation.success) {
        return res.status(400).json({ 
          error: "Invalid assessment responses",
          details: responsesValidation.error.issues 
        });
      }

      const validationResult = insertAssessmentSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid assessment data",
          details: validationResult.error.issues 
        });
      }

      const assessment = await storage.createAssessment(validationResult.data);
      res.json(assessment);
    } catch (error) {
      console.error("Error saving assessment:", error);
      res.status(500).json({ error: "Failed to save assessment" });
    }
  });

  app.get("/api/assessments", async (req, res) => {
    try {
      const assessments = await storage.getAllAssessments();
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ error: "Failed to fetch assessments" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
