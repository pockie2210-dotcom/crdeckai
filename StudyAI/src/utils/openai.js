// Central utility for making AI API calls from the browser.
// Supports both OpenAI keys (sk-...) and Groq keys (gsk_...) - auto-detected from the key prefix.
// Uses a local server bridge for YouTube transcripts to ensure reliability.

export const KEY_STORAGE = 'studyai_openai_key';
// Put your free Groq key or OpenAI key here so friends don't have to enter one!
export const FALLBACK_KEY = ''; // Enter a key in the app Settings to enable AI features

export function getApiKey() {
  return localStorage.getItem(KEY_STORAGE) || FALLBACK_KEY;
}

export function saveApiKey(key) {
  localStorage.setItem(KEY_STORAGE, key.trim());
}

export function clearApiKey() {
  localStorage.removeItem(KEY_STORAGE);
}

export function detectProvider(key) {
  if (!key) return null;
  if (key.startsWith('gsk_')) return 'groq';
  if (key.startsWith('sk-')) return 'openai';
  return 'unknown';
}

export function getProviderLabel(key) {
  const p = detectProvider(key);
  if (p === 'groq') return 'Groq (Free)';
  if (p === 'openai') return 'OpenAI';
  return null;
}

/**
 * Core AI call utility that calls Groq or OpenAI DIRECTLY from the browser.
 * This completely bypasses the backend proxy so it works perfectly on Netlify!
 */
export async function callAI(messages, responseFormat = null, systemPrompt = null) {
  const key = getApiKey();
  if (!key || key.includes('put_your')) throw new Error('NO_KEY');

  const isGroq = key.startsWith('gsk_');
  const url = isGroq 
    ? 'https://api.groq.com/openai/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';

  const finalMessages = systemPrompt 
    ? [{ role: 'system', content: systemPrompt }, ...messages]
    : messages;

  const body = {
    model: isGroq ? 'llama-3.3-70b-versatile' : 'gpt-3.5-turbo',
    messages: finalMessages,
  };

  if (responseFormat === 'json_object') {
    body.response_format = { type: 'json_object' };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'AI API Error');
  
  // Return the content directly to emulate the old backend behavior
  return data.choices[0].message.content;
}

/**
 * Chat with the AI tutor.
 */
export async function chatWithAI(messages) {
  return callAI(messages, null, "You are StudyAI, an expert, encouraging, and clear AI tutor. Explain concepts simply and step by step. If unsure, say so.");
}

/**
 * Generate flashcards from raw text.
 * Returns an array of { front: string, back: string } objects.
 */
export async function generateFlashcards(text) {
  const system = `You are a flashcard-generation expert. Given study notes, extract the 8 to 12 most important concepts and produce flashcards. Return ONLY a valid JSON object with a single key "cards" whose value is an array of objects, each with "front" (a concise question or term, max 12 words) and "back" (a clear, complete answer or definition, max 60 words). Do not include any text outside the JSON.`;
  const resultText = await callAI(
    [{ role: 'user', content: text.substring(0, 12000) }],
    'json_object',
    system
  );
  const parsed = JSON.parse(resultText);
  return parsed.cards || [];
}

/**
 * Analyze text content and return structured results.
 */
export async function analyzeText(text, length) {
  const detailInstruction = length < 33
    ? 'Provide a concise 2-3 sentence summary only.'
    : length < 66
      ? 'Provide a medium-length summary with the 3-5 most important key points.'
      : 'Provide a comprehensive, deep-dive analysis. Extract all key ideas, facts, and important definitions.';

  const system = `Analyze the following content and return a JSON object with exactly these fields: "summary" (string), "keyPoints" (array of strings), "definitions" (array of objects with "term" and "definition" keys). Analysis style: ${detailInstruction}`;

  const resultText = await callAI([{ role: 'user', content: text.substring(0, 15000) }], 'json_object', system);
  return JSON.parse(resultText);
}

/**
 * Fetch a website's content via r.jina.ai (client-side) and analyze it.
 */
export async function analyzeWebLink(url, length) {
  // Use Jina Reader to get a clean text/markdown version of any URL
  const response = await fetch(`https://r.jina.ai/${url}`, {
    headers: { 'Accept': 'text/plain' }
  });
  
  const text = await response.text();
  if (!response.ok) throw new Error('Could not extract content from this link. Make sure it is a public website.');
  
  return analyzeText(text, length);
}

/**
 * Perform a linguistic analysis on text to detect AI generation.
 */
export async function checkAIContent(text) {
  const systemPrompt = `You are a world-class linguistic forensics expert specializing in Large Language Model (LLM) detection. 
Your goal is to analyze the provided text for "Perplexity" (complexity of word choice) and "Burstiness" (variation in sentence structure). 
Common LLM traits include: 
- Highly uniform sentence lengths.
- Predictable word sequences.
- Lack of personal anecdotes/unique voice.

You MUST respond strictly with a JSON object in this format:
{
  "aiProbability": number (0-100),
  "humanProbability": number (0-100),
  "explanation": "Brief paragraph explaining the reasoning.",
  "flaggedSentences": ["Sentence 1", "Sentence 2"]
}`;

  return callAI([{ role: 'user', content: text }], 'json_object', systemPrompt);
}
