import fetch from 'node-fetch';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function test() {
  const url = 'https://royaleapi.github.io/cr-api-assets/cards/log.png';
  console.log('Testing fetch to:', url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    console.log('Status:', res.status);
    console.log('OK:', res.ok);
    const text = await res.text();
    console.log('Body snippet:', text.substring(0, 500));
  } catch (e) {
    console.error('Fetch caught error:', e);
  }
}

test();
