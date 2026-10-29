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

  const localEdgeExe = path.join(os.homedir(), '.local', 'bin', 'edge-tts.exe');
  const useDirectExe = fs.existsSync(localEdgeExe);
  const exeCmd = useDirectExe ? localEdgeExe : 'uvx';
  const exeArgs = useDirectExe
    ? ['--voice', 'vi-VN-NamMinhNeural', '--file', tempFile, '--write-media', '-']
    : ['edge-tts', '--voice', 'vi-VN-NamMinhNeural', '--file', tempFile, '--write-media', '-'];

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=86400'
  });

  const p = spawn(exeCmd, exeArgs, { windowsHide: true });

  p.stdout.on('data', c => {
    chunks.push(c);
    if (!res.writableEnded) {
      res.write(c);
    }
  });

  p.on('close', code => {
    processClosed = true;
    cleanup();
    if (code === 0 && chunks.length > 0) {
      const audioBuffer = Buffer.concat(chunks);
      ttsCache.set(cleanText, audioBuffer);
      if (!res.writableEnded) {
        res.end();
      }
    } else {
      if (!res.writableEnded) {
        res.end();
      }
    }
  });

  p.on('error', (err) => {
    cleanup();
    if (!processClosed && !res.writableEnded) {
      processClosed = true;
      res.end();
    }
  });

  setTimeout(() => {
    if (!processClosed) {
      processClosed = true;
      cleanup();
      try { p.kill(); } catch (e) {}
      if (!res.writableEnded) {
        res.end();
      }
    }
  }, 12000);
}

server.listen(PORT, () => {
  console.log(`🎨 ART AI Production Server running on http://localhost:${PORT}`);
});
});
