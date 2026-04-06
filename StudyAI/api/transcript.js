import { getSubtitles } from 'youtube-captions-scraper';

function extractVideoId(url) {
  const regex = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { url } = req.body;
    const videoId = extractVideoId(url);
    if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });

    let captions;
    try {
      captions = await getSubtitles({ videoID: videoId, lang: 'en' });
    } catch (e) {
      captions = await getSubtitles({ videoID: videoId, lang: 'en-US' });
    }

    if (!captions || !captions.length) {
      return res.status(404).json({ error: 'No transcript found for this video. Try another one.' });
    }

    const text = captions.map(c => c.text).join(' ');
    return res.status(200).json({ text });
  } catch (error) {
    console.error('Transcript error:', error.message);
    return res.status(500).json({ error: 'Could not fetch transcript. English captions may not be enabled.' });
  }
}
