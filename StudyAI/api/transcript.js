import { getSubtitles } from 'youtube-captions-scraper';

function extractVideoId(url) {
  const regex = /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { url } = body;
    const videoId = extractVideoId(url);
    if (!videoId) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid YouTube URL' }) };

    let captions;
    try {
      captions = await getSubtitles({ videoID: videoId, lang: 'en' });
    } catch (e) {
      captions = await getSubtitles({ videoID: videoId, lang: 'en-US' });
    }

    if (!captions || !captions.length) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: 'No transcript found for this video. Try another one.' }) };
    }

    const text = captions.map(c => c.text).join(' ');
    return { statusCode: 200, headers, body: JSON.stringify({ text }) };
  } catch (error) {
    console.error('Transcript error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Could not fetch transcript. English captions may not be enabled.' }) };
  }
};
