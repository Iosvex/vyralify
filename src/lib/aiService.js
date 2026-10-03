/**
 * Vyralify Real AI Intelligence Service
 * Powered by Groq (LLaMA-3 / GPT-OSS) and Google Gemini with live API keys.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Call Groq Live API with model fallback
 */
export async function callRealAi({ prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 }) {
  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  // 1. Try Groq (Ultra-fast low latency)
  if (GROQ_API_KEY) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages,
          temperature,
          max_tokens: maxTokens
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return { text: content, provider: 'groq:gpt-oss-120b' };
      }
    } catch (e) {
      console.warn('Groq primary model failed, trying fallback model:', e.message);
    }

    // Try Groq compact model
    try {
      const res2 = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages,
          temperature,
          max_tokens: maxTokens
        })
      });

      if (res2.ok) {
        const data2 = await res2.json();
        const content2 = data2.choices?.[0]?.message?.content;
        if (content2) return { text: content2, provider: 'groq:gpt-oss-20b' };
      }
    } catch (e2) {
      console.warn('Groq secondary model failed:', e2.message);
    }
  }

  // 2. Try Gemini API
  if (GEMINI_API_KEY) {
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemPrompt ? `[SYSTEM]: ${systemPrompt}\n\n` : ''}${prompt}` }
                ]
              }
            ]
          })
        }
      );

      if (geminiRes.ok) {
        const gemData = await geminiRes.json();
        const gemText = gemData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (gemText) return { text: gemText, provider: 'google:gemini-flash' };
      }
    } catch (gemErr) {
      console.warn('Gemini fallback failed:', gemErr.message);
    }
  }

  throw new Error('All AI providers were unreachable. Please verify your internet connection or API quota.');
}

/**
 * Generate 5 High-Retention Viral Reel Hooks for a given niche
 */
export async function generateLiveViralHooks({ niche, topic, format = 'Reels' }) {
  const prompt = `You are Vyralify's Elite Viral Content Strategist.
Generate 5 high-converting, pattern-interrupt viral hook scripts for an Instagram ${format} in the "${niche}" niche${topic ? ` focused on "${topic}"` : ''}.
Follow the 3-second retention rule.

Format output cleanly with:
1. Hook Archetype (e.g. The Contrarian, The Negative Hook, The Secret Vault, The Before/After)
2. Exact Text On Screen (Punchy 5-7 words)
3. Spoken Audio Hook (First 2.5 seconds)
4. Visual Action / Frame Framing`;

  return callRealAi({ prompt });
}

/**
 * Audit an Instagram profile's bio and proposition in real time
 */
export async function auditLiveBio({ handle, currentBio, niche }) {
  const prompt = `Analyze this Instagram creator profile:
Handle: @${handle}
Niche: ${niche}
Current Bio: "${currentBio || 'Not set'}"

Provide an aggressive, high-converting audit:
1. Health Score (0-100)
2. 3 Strengths
3. 3 Critical Gaps (e.g., missing micro-offer, vague outcome, no DM trigger)
4. 2 Rewritten High-Converting Bio Proposals (optimized for CTR & DM conversions)`;

  return callRealAi({ prompt });
}
