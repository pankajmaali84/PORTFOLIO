// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { connectDB } = require('./config/db');

// const app = express();
// app.use(express.json());

// // Manual CORS headers (belt-and-suspenders before cors())
// const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
// const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
//   .split(',')
//   .map(s => s.trim())
//   .filter(Boolean);
// const WILDCARD_SUFFIXES = (process.env.CORS_WILDCARD_SUFFIXES || '.vercel.app')
//   .split(',')
//   .map(s => s.trim())
//   .filter(Boolean);
// app.use((req, res, next) => {
//   // Decide which origin to allow
//   let originToAllow = '*';
//   const reqOrigin = req.headers.origin;
//   if (reqOrigin) {
//     // Exact allowlist
//     if (ALLOWED_ORIGINS.length > 0 && ALLOWED_ORIGINS.includes(reqOrigin)) {
//       originToAllow = reqOrigin;
//     }
//     // Suffix wildcards (e.g., any *.vercel.app)
//     else if (WILDCARD_SUFFIXES.some(sfx => reqOrigin.endsWith(sfx))) {
//       originToAllow = reqOrigin;
//     }
//     // Single fixed origin from env
//     else if (ALLOWED_ORIGIN && ALLOWED_ORIGIN !== '*') {
//       originToAllow = ALLOWED_ORIGIN;
//     }
//   } else if (ALLOWED_ORIGIN && ALLOWED_ORIGIN !== '*') {
//     originToAllow = ALLOWED_ORIGIN;
//   }

//   res.header('Access-Control-Allow-Origin', originToAllow);
//   res.header('Vary', 'Origin');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
//   const reqAclReqHeaders = req.headers['access-control-request-headers'];
//   if (reqAclReqHeaders) {
//     res.header('Access-Control-Allow-Headers', reqAclReqHeaders);
//   } else {
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   }
//   res.header('Access-Control-Max-Age', '86400');
//   if (req.method === 'OPTIONS') return res.sendStatus(204);
//   next();
// });

// // Diagnostics
// try {
//   const nodeVer = process.versions?.node;
//   const expressVer = require('express/package.json').version;
//   const p2rVer = (() => { try { return require('path-to-regexp/package.json').version; } catch { return '(not found)'; } })();
//   console.log('[Diag] Node', nodeVer, 'Express', expressVer, 'path-to-regexp', p2rVer);
// } catch {}

// // CORS (permissive; ensure preflight handled explicitly)
// app.use(cors({
//   origin: '*',
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   maxAge: 86400,
// }));
// // Explicitly respond to preflight for all routes
// app.options('*', cors());

// // Routes
// app.get('/', (_req, res) => {
//   res.type('text').send('Portfolio API is running. Health: /api/health');
// });
// app.get('/api/health', (_req, res) => res.json({ ok: true }));
// // Mount API routers
// app.use('/api/projects', require('./routes/projects'));
// app.use('/api/contact', require('./routes/contact'));

// const PORT = process.env.PORT || 5000;

// // Start HTTP server immediately so Render detects the open port
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// // Connect to MongoDB in the background; do NOT exit on failure
// connectDB(process.env.MONGODB_URI)
//   .then(() => console.log('[Mongo] Connected'))
//   .catch((err) => {
//     console.error('[Mongo] Connection failed (non-fatal for boot):', err?.message || err);
//     console.error('[Mongo] Tip: In Atlas, add Render egress IPs or temporarily allow 0.0.0.0/0 in Network Access.');
//   });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(express.json());

// Manual CORS headers (belt-and-suspenders before cors())
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const WILDCARD_SUFFIXES = (process.env.CORS_WILDCARD_SUFFIXES || '.vercel.app')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  // Decide which origin to allow
  let originToAllow = '*';
  const reqOrigin = req.headers.origin;
  if (reqOrigin) {
    // Exact allowlist
    if (ALLOWED_ORIGINS.length > 0 && ALLOWED_ORIGINS.includes(reqOrigin)) {
      originToAllow = reqOrigin;
    }
    // Suffix wildcards (e.g., any *.vercel.app)
    else if (WILDCARD_SUFFIXES.some(sfx => reqOrigin.endsWith(sfx))) {
      originToAllow = reqOrigin;
    }
    // Single fixed origin from env
    else if (ALLOWED_ORIGIN && ALLOWED_ORIGIN !== '*') {
      originToAllow = ALLOWED_ORIGIN;
    }
  } else if (ALLOWED_ORIGIN && ALLOWED_ORIGIN !== '*') {
    originToAllow = ALLOWED_ORIGIN;
  }

  res.header('Access-Control-Allow-Origin', originToAllow);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  const reqAclReqHeaders = req.headers['access-control-request-headers'];
  if (reqAclReqHeaders) {
    res.header('Access-Control-Allow-Headers', reqAclReqHeaders);
  } else {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  res.header('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Diagnostics
try {
  const nodeVer = process.versions?.node;
  const expressVer = require('express/package.json').version;
  const p2rVer = (() => { try { return require('path-to-regexp/package.json').version; } catch { return '(not found)'; } })();
  console.log('[Diag] Node', nodeVer, 'Express', expressVer, 'path-to-regexp', p2rVer);
} catch {}

// ❌ Ye line hata di gayi (origin: '*') wali
// app.use(cors({
//   origin: '*',
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   maxAge: 86400,
// }));

// Explicitly respond to preflight for all routes
app.options('*', cors());

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
