// Vercel Serverless Function: /api/tts
// 100% Free Vietnamese Male Art Teacher Voice Engine (Thầy Cọ Nhí)
// Model: Microsoft Edge Neural TTS vi-VN-NamMinhNeural via msedge-tts

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ttsCache = new Map();

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
      .slice(0, 600)
      .trim();

    // Cache hit in RAM
    if (ttsCache.has(cleanText)) {
      const cached = ttsCache.get(cleanText);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', cached.length);
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).send(cached);
    }

    const tts = new MsEdgeTTS();
    await tts.setMetadata('vi-VN-NamMinhNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(cleanText);

    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*'
    });

    const chunks = [];
    audioStream.on('data', (c) => {
      chunks.push(c);
      if (!res.writableEnded) res.write(c);
    });

    audioStream.on('end', () => {
      if (chunks.length > 0) {
        ttsCache.set(cleanText, Buffer.concat(chunks));
      }
      if (!res.writableEnded) res.end();
    });

    audioStream.on('error', (err) => {
      console.error('Vercel Edge-TTS stream error:', err);
      if (!res.writableEnded) res.end();
    });

    req.on('close', () => {
      try { tts.close(); } catch (e) {}
    });

  } catch (err) {
    console.error('Vercel TTS handler error:', err);
    if (!res.headersSent) {
      res.status(500).send('TTS Generation Error');
    }
  }
}
