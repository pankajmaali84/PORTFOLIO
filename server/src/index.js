require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

const app = express();
app.use(express.json());

// Robust CORS configuration with preflight support
const corsOptions = {
  // Allow requests from known frontends; fallback to allowing any origin for this portfolio
  origin: function (origin, callback) {
    const allowed = [
      'https://portfolio-cyan-one-63.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    // For public portfolio, allow other origins too (you can tighten later)
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Handle preflight requests globally
app.options('*', cors(corsOptions));

// Root route to avoid "Not Found" on service base URL
app.get('/', (_req, res) => {
  res.type('text').send(
    'Portfolio API is running. Health: /api/health\nFrontend: https://portfolio-cyan-one-63.vercel.app'
  );
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

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
