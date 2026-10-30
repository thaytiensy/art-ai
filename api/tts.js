// Vercel Serverless Function: /api/tts
// 100% Free Vietnamese Male Art Teacher Voice Engine (Thầy Cọ Nhí)
// Model: Microsoft Edge Neural TTS vi-VN-NamMinhNeural via msedge-tts

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

// In-memory cache for serverless execution reuse
const ttsCache = new Map();

export default async function handler(req, res) {
  // Enable CORS for all clients (including GitHub Pages and localhost)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const text = (req.query && req.query.text) || '';
  if (!text) {
    return res.status(400).send('Missing text parameter');
  }

  const cleanText = text
    .replace(/[#*_`~-]/g, '')
    .replace(/\n+/g, '. ')
    .replace(/https?:\/\/\S+/g, '')
    .slice(0, 600)
    .trim();

  if (!cleanText) {
    return res.status(400).send('Empty text');
  }

  // Cache hit in RAM
  if (ttsCache.has(cleanText)) {
    const cached = ttsCache.get(cleanText);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', cached.length);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).send(cached);
  }

  return new Promise(async (resolve) => {
    let finished = false;
    const finish = (statusCode, body, headers = {}) => {
      if (finished) return;
      finished = true;
      Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
      if (!res.headersSent) {
        res.status(statusCode).send(body);
      }
      resolve();
    };

    // Timeout safety: 9s (Vercel free tier limit is 10s)
    const timer = setTimeout(() => {
      finish(504, 'TTS Timeout');
    }, 9000);

    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata('vi-VN-NamMinhNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(cleanText);
      const chunks = [];

      audioStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      audioStream.on('end', () => {
        clearTimeout(timer);
        const buffer = Buffer.concat(chunks);
        if (buffer.length > 0) {
          ttsCache.set(cleanText, buffer);
          finish(200, buffer, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': buffer.length,
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
          });
        } else {
          finish(500, 'Empty audio stream');
        }
      });

      audioStream.on('error', (err) => {
        clearTimeout(timer);
        console.error('Edge-TTS stream error:', err);
        finish(500, 'TTS Stream Error: ' + err.message);
      });

      if (req && typeof req.on === 'function') {
        req.on('close', () => {
          clearTimeout(timer);
          try { tts.close(); } catch (e) {}
        });
      }

    } catch (err) {
      clearTimeout(timer);
      console.error('Edge-TTS initialization error:', err);
      finish(500, 'TTS Init Error: ' + err.message);
    }
  });
}
