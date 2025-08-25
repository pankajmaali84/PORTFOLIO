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

// Routes
app.get('/', (_req, res) => {
  res.type('text').send('Portfolio API is running. Health: /api/health');
});
app.get('/api/health', (_req, res) => res.json({ ok: true }));
// Mount API routers
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5000;

// Start HTTP server immediately so Render detects the open port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Connect to MongoDB in the background; do NOT exit on failure
connectDB(process.env.MONGODB_URI)
  .then(() => console.log('[Mongo] Connected'))
  .catch((err) => {
    console.error('[Mongo] Connection failed (non-fatal for boot):', err?.message || err);
    console.error('[Mongo] Tip: In Atlas, add Render egress IPs or temporarily allow 0.0.0.0/0 in Network Access.');
  });

