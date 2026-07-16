import type { AiToolId } from "./tools";
import { buildPrompt, generateFallbackResponse } from "./tools";

interface GenerateOptions {
  toolId: AiToolId;
  inputs: Record<string, string>;
}

async function callGroq(prompt: string): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Vyralify's AI assistant for Instagram faceless page creators. Be concise, actionable, and format output with markdown.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    console.error("Groq API error:", await response.text());
    return null;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? null;
}

async function callNvidia(prompt: string): Promise<string | null> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return null;

  const baseUrl =
    process.env.NVIDIA_API_BASE ||
    "https://integrate.api.nvidia.com/v1/chat/completions";

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.NVIDIA_MODEL || "meta/llama-3.1-70b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You are Vyralify's AI assistant for Instagram faceless page creators. Be concise, actionable, and format output with markdown.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
      stream: false,
    }),
  });

  if (!response.ok) {
    console.error("NVIDIA API error:", await response.text());
    return null;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? null;
}

export async function generateAiContent({ toolId, inputs }: GenerateOptions): Promise<{
  content: string;
  provider: "groq" | "nvidia" | "fallback";
}> {
  const prompt = buildPrompt(toolId, inputs);

  const groqResult = await callGroq(prompt);
  if (groqResult) {
    return { content: groqResult, provider: "groq" };
  }

  const nvidiaResult = await callNvidia(prompt);
  if (nvidiaResult) {
    return { content: nvidiaResult, provider: "nvidia" };
  }

  return {
    content: generateFallbackResponse(toolId, inputs),
    provider: "fallback",
  };
}
