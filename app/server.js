// Standalone Production Server for ART AI
// Runs in Docker, Render, Railway, VPS, or local production

import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import https from 'https';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
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

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // 1. API: Text-to-Speech
  if (pathname === '/api/tts') {
    handleTts(parsedUrl, res);
    return;
  }

  // 2. Static Assets from dist/
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

function handleTts(url, res) {
  const text = url.searchParams.get('text');
  if (!text) {
    res.writeHead(400);
    res.end('Missing text');
    return;
  }

  const cleanText = text
    .replace(/[#*_`~-]/g, '')
    .replace(/\n+/g, '. ')
    .replace(/https?:\/\/\S+/g, '')
    .slice(0, 600)
    .trim();

  if (ttsCache.has(cleanText)) {
    const buf = ttsCache.get(cleanText);
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': buf.length,
      'Cache-Control': 'public, max-age=86400'
    });
    res.end(buf);
    return;
  }

  // Try Edge-TTS via UTF-8 temp file if uvx is available
  const tempFile = path.join(os.tmpdir(), `tts_${Date.now()}_${Math.random().toString(36).slice(2)}.txt`);
  fs.writeFileSync(tempFile, cleanText, 'utf8');

  let processClosed = false;
  const chunks = [];

  const cleanup = () => {
    try { if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile); } catch (e) {}
  };

  const p = spawn('uvx', [
    'edge-tts',
    '--voice', 'vi-VN-NamMinhNeural',
    '--file', tempFile,
    '--write-media', '-'
  ], { windowsHide: true });

  p.stdout.on('data', c => chunks.push(c));

  p.on('close', code => {
    processClosed = true;
    cleanup();
    if (code === 0 && chunks.length > 0) {
      const audioBuffer = Buffer.concat(chunks);
      ttsCache.set(cleanText, audioBuffer);
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
        'Cache-Control': 'public, max-age=86400'
      });
      res.end(audioBuffer);
    } else {
      fallbackToGoogle(cleanText, res);
    }
  });

  p.on('error', () => {
    cleanup();
    if (!processClosed) {
      processClosed = true;
      fallbackToGoogle(cleanText, res);
    }
  });

  setTimeout(() => {
    if (!processClosed && chunks.length === 0) {
      processClosed = true;
      cleanup();
      try { p.kill(); } catch (e) {}
      fallbackToGoogle(cleanText, res);
    }
  }, 12000);
}

function fallbackToGoogle(cleanText, res) {
  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(cleanText.slice(0, 200))}`;
  https.get(googleUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  }, (gRes) => {
    const gChunks = [];
    gRes.on('data', c => gChunks.push(c));
    gRes.on('end', () => {
      const gBuf = Buffer.concat(gChunks);
      if (!res.headersSent) {
        res.writeHead(200, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': gBuf.length,
          'Cache-Control': 'public, max-age=86400'
        });
        res.end(gBuf);
      }
    });
  }).on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('TTS failed');
    }
  });
}

server.listen(PORT, () => {
  console.log(`🎨 ART AI Production Server running on http://localhost:${PORT}`);
});
