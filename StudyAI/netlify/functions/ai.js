const { OpenAI } = require('openai');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { messages, userKey, responseFormat, systemPrompt } = req.body;
    
    const key = userKey || process.env.OPENAI_API_KEY;
    if (!key || key === 'your_api_key_here') {
      return res.status(401).json({ error: 'No API key provided.' });
    }

    const isGroq = key.startsWith('gsk_');
    const client = new OpenAI({
      apiKey: key,
      baseURL: isGroq ? 'https://api.groq.com/openai/v1' : undefined,
    });

    const model = isGroq ? 'llama-3.3-70b-versatile' : 'gpt-3.5-turbo';

    const completion = await client.chat.completions.create({
      model: model,
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
};
