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
                console.error('Edge-TTS exited with error code', code);
                if (!res.headersSent) {
                  res.statusCode = 500;
                  res.end('Edge-TTS failed');
                }
              }
            });

            ttsProcess.on('error', (err) => {
              console.error('Edge-TTS spawn error:', err.message);
              cleanupTemp();
              if (!processClosed && !res.headersSent) {
                processClosed = true;
                res.statusCode = 500;
                res.end(err.message);
              }
            });

            req.on('close', () => {
              cleanupTemp();
              if (!processClosed) {
                ttsProcess.kill();
              }
            });

            // Timeout safety: if edge-tts takes > 15s
            setTimeout(() => {
              if (!processClosed && chunks.length === 0) {
                processClosed = true;
                cleanupTemp();
                try { ttsProcess.kill(); } catch (e) {}
                console.warn('Edge-TTS timeout');
                if (!res.headersSent) {
                  res.statusCode = 504;
                  res.end('TTS Gateway Timeout');
                }
              }
            }, 15000);

          } catch (e) {
            console.error('TTS middleware error:', e);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.end('TTS Error');
            }
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
