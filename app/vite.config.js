import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import https from 'https';
import fs from 'fs';
import path from 'path';
import os from 'os';

// In-memory cache for ultra-fast instant voice responses
const ttsCache = new Map();

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'edge-tts-server',
      configureServer(server) {
        server.middlewares.use('/api/tts', (req, res) => {
          try {
            const url = new URL(req.url, 'http://localhost');
            const text = url.searchParams.get('text');

            if (!text) {
              res.statusCode = 400;
              res.end('Missing text parameter');
              return;
            }

            const cleanText = text
              .replace(/[#*_`~-]/g, '')
              .replace(/\n+/g, '. ')
              .replace(/https?:\/\/\S+/g, '')
              .slice(0, 600)
              .trim();

            // 100% Thầy giáo Mĩ thuật (vi-VN-NamMinhNeural)
            const voice = 'vi-VN-NamMinhNeural';
            const cacheKey = cleanText;

            // Check cache for instant playback
            if (ttsCache.has(cacheKey)) {
              const cachedBuffer = ttsCache.get(cacheKey);
              res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': cachedBuffer.length,
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=86400'
              });
              res.end(cachedBuffer);
              return;
            }

            // Ghi nội dung tiếng Việt vào file UTF-8 tạm thời để tránh lỗi Windows ANSI argument mangling
            const tempFile = path.join(os.tmpdir(), `tts_${Date.now()}_${Math.random().toString(36).slice(2)}.txt`);
            fs.writeFileSync(tempFile, cleanText, 'utf8');

            const chunks = [];
            let processClosed = false;

            const cleanupTemp = () => {
              try {
                if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
              } catch (e) {}
            };

            // Spawn Edge-TTS process with UTF-8 file
            const ttsProcess = spawn('uvx', [
              'edge-tts',
              '--voice', voice,
              '--file', tempFile,
              '--write-media', '-'
            ], { windowsHide: true });

            ttsProcess.stdout.on('data', (chunk) => {
              chunks.push(chunk);
            });

            ttsProcess.stderr.on('data', (chunk) => {
              console.error('Edge-TTS stderr:', chunk.toString());
            });

            ttsProcess.on('close', (code) => {
              processClosed = true;
              cleanupTemp();

              if (code === 0 && chunks.length > 0) {
                const audioBuffer = Buffer.concat(chunks);
                ttsCache.set(cacheKey, audioBuffer);

                if (!res.headersSent) {
                  res.writeHead(200, {
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': audioBuffer.length,
                    'Accept-Ranges': 'bytes',
                    'Cache-Control': 'public, max-age=86400'
                  });
                  res.end(audioBuffer);
                }
              } else {
                console.warn('Edge-TTS exited with code', code, '- Falling back to Google Vietnamese TTS');
                fallbackToGoogle(cleanText, res, cacheKey);
              }
            });

            ttsProcess.on('error', (err) => {
              console.warn('Edge-TTS spawn error:', err.message, '- Falling back to Google Vietnamese TTS');
              cleanupTemp();
              if (!processClosed) {
                processClosed = true;
                fallbackToGoogle(cleanText, res, cacheKey);
              }
            });

            req.on('close', () => {
              cleanupTemp();
              if (!processClosed) {
                ttsProcess.kill();
              }
            });

            // Timeout safety: if edge-tts takes > 12s, fallback to Google TTS
            setTimeout(() => {
              if (!processClosed && chunks.length === 0) {
                processClosed = true;
                cleanupTemp();
                try { ttsProcess.kill(); } catch (e) {}
                console.warn('Edge-TTS timeout, switching to Google Vietnamese TTS fallback');
                fallbackToGoogle(cleanText, res, cacheKey);
              }
            }, 12000);

          } catch (e) {
            console.error('TTS middleware error:', e);
            fallbackToGoogle(text || '', res);
          }
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});

function fallbackToGoogle(cleanText, res, cacheKey) {
  try {
    const textSlice = cleanText.slice(0, 200);
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(textSlice)}`;
    
    https.get(googleUrl, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' 
      } 
    }, (gRes) => {
      const gChunks = [];
      gRes.on('data', c => gChunks.push(c));
      gRes.on('end', () => {
        if (gChunks.length > 0) {
          const gBuf = Buffer.concat(gChunks);
          // Do NOT cache Google fallback to prevent poisoning cache with female voice!
          if (!res.headersSent) {
            res.writeHead(200, {
              'Content-Type': 'audio/mpeg',
              'Content-Length': gBuf.length,
              'Cache-Control': 'public, max-age=86400'
            });
            res.end(gBuf);
          }
        } else {
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end('Empty TTS audio');
          }
        }
      });
    }).on('error', (err) => {
      console.error('Google TTS fallback error:', err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('TTS unavailable');
      }
    });
  } catch (err) {
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('TTS failed');
    }
  }
}
