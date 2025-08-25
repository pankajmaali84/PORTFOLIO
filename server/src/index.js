require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(express.json());

// Diagnostics
try {
  const nodeVer = process.versions?.node;
  const expressVer = require('express/package.json').version;
  const p2rVer = (() => { try { return require('path-to-regexp/package.json').version; } catch { return '(not found)'; } })();
  console.log('[Diag] Node', nodeVer, 'Express', expressVer, 'path-to-regexp', p2rVer);
} catch {}

// CORS (permissive for now)
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'] }));

// Minimal routes only (routers temporarily disabled to isolate error)
app.get('/', (_req, res) => {
  res.type('text').send('Portfolio API is running. Health: /api/health');
});
app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}
start();

