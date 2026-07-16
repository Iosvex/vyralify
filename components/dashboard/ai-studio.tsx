"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase/client";
import { AI_TOOLS, type AiToolId } from "@/lib/ai/tools";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Copy,
  Check,
  Loader2,
  Lock,
  Wand2,
} from "lucide-react";

interface AiStudioProps {
  hasAccess: boolean;
  tier: "standard" | "pro" | null;
}

export default function AiStudio({ hasAccess, tier }: AiStudioProps) {
  const [activeTool, setActiveTool] = useState<AiToolId>("caption");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tool = AI_TOOLS.find((t) => t.id === activeTool)!;

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!hasAccess) return;

    const missing = tool.fields.filter((f) => f.required && !inputs[f.name]?.trim());
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    setLoading(true);
    setError(null);
    setOutput("");

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("Please sign in to use AI tools.");
        return;
      }

      const idToken = await user.getIdToken();

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ toolId: activeTool, inputs }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed. Please try again.");
        return;
      }

      setOutput(data.content);
      setProvider(data.provider);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasAccess) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">AI Studio</h1>
          <p className="text-zinc-500">Five AI-powered tools to supercharge your content creation.</p>
        </div>

        <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <CardContent className="p-12 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-600">
              <Lock className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Tools Require an Active Plan</h3>
              <p className="mt-2 text-sm text-zinc-500 max-w-md mx-auto">
                Unlock the full AI Studio — Caption Generator, Hook Generator, Content Ideas,
                Content Planner, and Growth Assistant — when you subscribe to Vyralify.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 max-w-3xl mx-auto text-left">
              {AI_TOOLS.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-3 text-xs"
                >
                  <span className="text-base">{t.emoji}</span>
                  <p className="font-semibold mt-1 text-zinc-900 dark:text-zinc-100">{t.name}</p>
                </div>
              ))}
            </div>
            <a href="/#pricing">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                View Plans &amp; Subscribe
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-blue-600" />
            AI Studio
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Generate captions, hooks, ideas, and growth plans — powered by AI.
          </p>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
          {tier === "pro" ? "Pro Access" : "Standard Access"}
        </span>
      </div>

      {/* Tool selector tabs */}
      <div className="flex flex-wrap gap-2">
        {AI_TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTool(t.id);
              setInputs({});
              setOutput("");
              setError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTool === t.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:border-blue-200"
            }`}
          >
            <span>{t.emoji}</span>
            {t.name.replace("AI ", "")}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input panel */}
        <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wand2 className="h-5 w-5 text-blue-600" />
              {tool.emoji} {tool.name}
            </CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tool.fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  {field.label}
                  {field.required && <span className="text-blue-600 ml-0.5">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    value={inputs[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={inputs[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={inputs[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>
            ))}

            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output panel */}
        <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Output</CardTitle>
              <CardDescription>
                {provider
                  ? `Generated via ${provider === "fallback" ? "template engine (add API keys for live AI)" : provider}`
                  : "Your AI-generated content will appear here"}
              </CardDescription>
            </div>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            )}
          </CardHeader>
          <CardContent>
            {output ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400">
                <Sparkles className="h-10 w-10 mb-3 opacity-30" />
                <p className="text-sm">Fill in the fields and hit Generate</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
