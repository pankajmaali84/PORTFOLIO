const express = require('express');
const cors = require('cors');

const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

// Build and configure express app
function createServer() {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: '*' }));

  // Health
  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  // Routes
  app.use('/api/projects', projectsRouter);
  app.use('/api/contact', contactRouter);

  return app;
}

module.exports = { createServer };
