// Standalone Production Server for ART AI
// Runs in Docker, Render, Railway, VPS, or local production

import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import https from 'https';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { detectInstalledOffice, openOfficeDocument } from './officeHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STUDIO_DIST = path.resolve(__dirname, '../../app cọ nhí đã bán/co-nhi-studio/dist');
const DIST_DIR = fs.existsSync(STUDIO_DIST) ? STUDIO_DIST : path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

const ttsCache = new Map();

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // 1. API: Text-to-Speech
  if (pathname === '/api/tts') {
    await handleTts(req, res, parsedUrl);
    return;
  }

  // 2. API: Trạng thái các bộ phần mềm Office trên máy tính
  if (pathname === '/api/office-status') {
    handleOfficeStatus(req, res);
    return;
  }

  // 3. API: Mở Trực Tiếp Tệp Office (.pptx, .docx, .xlsx) trên máy tính
  if (pathname === '/api/open-office' || pathname === '/api/open-powerpoint') {
    handleOpenOffice(req, res, pathname);
    return;
  }

  // 4. Static Assets from dist/
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);

  if (!fs.existsSync(filePath)) {
    // SPA Fallback to index.html
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error loading file');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
    });
    res.end(content);
  });
});

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
}

function handleOfficeStatus(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  try {
    const info = detectInstalledOffice();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(info));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
}

function handleOpenOffice(req, res, pathname) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  try {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      try {
        let buffer = null;
        let type = pathname === '/api/open-powerpoint' ? 'pptx' : 'pptx';
        let fileName = 'BaiGiang_MiThuat_GDPT2018';

        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
          const bodyStr = Buffer.concat(chunks).toString('utf8');
          const body = JSON.parse(bodyStr || '{}');
          type = body.type || type;
          fileName = body.fileName || fileName;
          if (body.base64) {
            buffer = Buffer.from(body.base64, 'base64');
          }
        } else if (chunks.length > 0) {
          buffer = Buffer.concat(chunks);
        }

        const result = await openOfficeDocument({ type, fileName, buffer });
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error('Lỗi khi mở Office:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } catch (e) {
    console.error('Lỗi middleware open-office:', e);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: e.message }));
  }
}

let ttsQueue = Promise.resolve();

async function synthesizeEdgeTtsWithRetry(cleanText, voiceName) {
  const task = ttsQueue.then(async () => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      let tts = null;
      try {
        tts = new MsEdgeTTS();
        await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        const { audioStream } = tts.toStream(cleanText);
        const chunks = [];

        await new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            if (chunks.length > 0) resolve();
            else reject(new Error('Timeout Edge TTS'));
          }, 8000);

          audioStream.on('data', chunk => chunks.push(chunk));
          audioStream.on('end', () => {
            clearTimeout(timer);
            resolve();
          });
          audioStream.on('error', error => {
            clearTimeout(timer);
            if (chunks.length > 0) resolve();
            else reject(error);
          });
        });

        const audioBuffer = Buffer.concat(chunks);
        if (audioBuffer.length > 0) return audioBuffer;
        throw new Error('Edge TTS trả về âm thanh rỗng');
      } catch (error) {
        if (attempt === 3) throw error;
        await new Promise(resolve => setTimeout(resolve, 200));
      } finally {
        if (tts) {
          try { tts.close(); } catch (_) {}
          tts = null;
        }
      }
    }
    throw new Error('Không thể tổng hợp âm thanh qua Edge TTS');
  });

  ttsQueue = task.catch(() => undefined);
  return task;
}

function fetchGoogleTtsChunk(text) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&client=tw-ob`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Google TTS status: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function synthesizeGoogleTts(cleanText) {
  const words = cleanText.split(/\s+/);
  const segments = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length <= 150) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) segments.push(current);
      current = word;
    }
  }
  if (current) segments.push(current);

  const buffers = [];
  for (const seg of segments) {
    const buf = await fetchGoogleTtsChunk(seg);
    if (buf && buf.length > 0) buffers.push(buf);
  }
  return Buffer.concat(buffers);
}

async function handleTts(req, res, url) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const text = url.searchParams.get('text');
  if (!text || !text.trim()) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing text' }));
    return;
  }

  const cleanText = text
    .replace(/\s*&\s*/g, ' và ')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ' ')
    .replace(/[#*_`~<>{}[\]\\-]/g, ' ')
    .replace(/\n+/g, '. ')
    .replace(/https?:\/\/\S+/g, '')
    .slice(0, 1000)
    .trim();

  const voiceParam = url.searchParams.get('voice') || 'male';
  const isFemale = voiceParam === 'female' || voiceParam === 'vi-VN-HoaiMyNeural' || String(voiceParam).toLowerCase().includes('nu');
  const voiceName = isFemale ? 'vi-VN-HoaiMyNeural' : 'vi-VN-NamMinhNeural';
  const cacheKey = `${voiceName}_${cleanText}`;

  if (ttsCache.has(cacheKey)) {
    const buf = ttsCache.get(cacheKey);
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': buf.length,
      'X-TTS-Voice': voiceName,
      'Cache-Control': 'public, max-age=86400'
    });
    res.end(buf);
    return;
  }

  // Ưu tiên 1: Edge TTS Neural
  try {
    const audioBuf = await synthesizeEdgeTtsWithRetry(cleanText, voiceName);
    if (audioBuf && audioBuf.length > 0) {
      ttsCache.set(cacheKey, audioBuf);
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuf.length,
        'X-TTS-Voice': voiceName,
        'Cache-Control': 'public, max-age=86400'
      });
      res.end(audioBuf);
      return;
    }
  } catch (edgeErr) {
    console.warn(`[Server TTS] MsEdgeTTS (${voiceName}) failed:`, edgeErr.message);
  }

  // Ưu tiên 2: Google Vietnamese TTS Fallback (100% tiếng Việt chuẩn, không bao giờ mất tiếng)
  try {
    const googleBuf = await synthesizeGoogleTts(cleanText);
    if (googleBuf && googleBuf.length > 0) {
      ttsCache.set(cacheKey, googleBuf);
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': googleBuf.length,
        'X-TTS-Voice': isFemale ? 'Google-Vietnamese-Female' : 'Google-Vietnamese',
        'Cache-Control': 'public, max-age=86400'
      });
      res.end(googleBuf);
      return;
    }
  } catch (gErr) {
    console.warn('[Server TTS] Google TTS fallback failed:', gErr.message);
  }

  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Không thể tổng hợp giọng đọc' }));
}

server.listen(PORT, () => {
  console.log(`🎨 ART AI Production Server running on http://localhost:${PORT}`);
});
