// Vercel Serverless Function: /api/tts
// 100% Free Vietnamese Speech Engine for Cloud Production

import https from 'https';

export default async function handler(req, res) {
  try {
    const text = req.query.text || '';
    if (!text) {
      return res.status(400).send('Missing text parameter');
    }

    const cleanText = text
      .replace(/[#*_`~-]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/https?:\/\/\S+/g, '')
      .slice(0, 300)
      .trim();

    // High performance Vietnamese Neural/Standard TTS stream
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(cleanText)}`;

    https.get(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (upstreamRes) => {
      const chunks = [];
      upstreamRes.on('data', chunk => chunks.push(chunk));
      upstreamRes.on('end', () => {
        const audioBuffer = Buffer.concat(chunks);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', audioBuffer.length);
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(audioBuffer);
      });
    }).on('error', (err) => {
      console.error('TTS upstream error:', err);
      res.status(500).send('TTS upstream failed');
    });

  } catch (err) {
    console.error('Vercel TTS handler error:', err);
    res.status(500).send(err.message);
  }
}
