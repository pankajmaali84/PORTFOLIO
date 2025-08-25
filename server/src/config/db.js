const mongoose = require('mongoose');

async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
  // Do not force a dbName; honor the db from URI. Allow optional override via env.
  const options = {};
  if (process.env.MONGO_DB_NAME) options.dbName = process.env.MONGO_DB_NAME;
  // Safe diagnostics (no password)
  try {
    const u = new URL(mongoUri.replace('mongodb+srv://', 'http://').replace('mongodb://', 'http://'));
    const user = u.username || '(none)';
    const host = u.host;
    const dbFromUri = (u.pathname || '/').replace(/^\//, '') || '(none)';
    const dbToUse = options.dbName || dbFromUri || '(none)';
    console.log('[Mongo] Connecting', { user, host, dbFromUri, dbNameOverride: options.dbName || null, dbToUse });
  } catch (_) {
    console.log('[Mongo] Starting connection...');
  }

  await mongoose.connect(mongoUri, options);
  console.log('MongoDB connected');
}

module.exports = { connectDB };
