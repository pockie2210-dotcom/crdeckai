const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');
const { getSubtitles } = require('youtube-captions-scraper');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Utility to create a client with either the provided key or the server's .env key
 */
function createClient(providedKey) {
  const key = providedKey || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  if (!key || key === 'your_api_key_here' || key === 'your_groq_key_here') return null;

  const isGroq = key.startsWith('gsk_');
  return new OpenAI({
    apiKey: key,
    baseURL: isGroq ? 'https://api.groq.com/openai/v1' : undefined,
  });
}

function getModel(key) {
  return key?.startsWith('gsk_') ? 'llama-3.3-70b-versatile' : 'gpt-3.5-turbo';
}

function extractVideoId(url) {
  const regex = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Endpoint: Fetch YouTube Transcript (CORS Bridge)
app.post('/api/transcript', async (req, res) => {
  try {
    const { url } = req.body;
    const videoId = extractVideoId(url);
    if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

    let captions;
    try {
      captions = await getSubtitles({ videoID: videoId, lang: 'en' });
    } catch (e) {
      console.log('Retrying with en-US...');
      captions = await getSubtitles({ videoID: videoId, lang: 'en-US' });
    }

    if (!captions || !captions.length) {
      return res.status(404).json({ error: 'No transcript found for this video. Try another one.' });
    }

    const text = captions.map(c => c.text).join(' ');
    res.json({ text });
  } catch (error) {
    console.error('Transcript error:', error.message);
    res.status(500).json({ error: 'Could not fetch transcript. English captions may not be enabled.' });
  }
});

// Endpoint: Chat/Analyze using the provided key (BYOK Bridge)
app.post('/api/ai', async (req, res) => {
  try {
    const { messages, userKey, responseFormat, systemPrompt } = req.body;
    const client = createClient(userKey);
    
    if (!client) {
      return res.status(401).json({ error: 'No API key provided. Set it in Settings or server/.env' });
    }

    const completion = await client.chat.completions.create({
      model: getModel(userKey || process.env.OPENAI_API_KEY),
      messages: [
        { role: "system", content: systemPrompt || "You are StudyAI, a helpful AI tutor." },
        ...messages
      ],
      response_format: responseFormat ? { type: responseFormat } : undefined
    });
    
    res.json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error('AI error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ StudyAI Bridge running on http://localhost:${PORT}`);
});
