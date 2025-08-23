const mongoose = require('mongoose');

async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
  await mongoose.connect(mongoUri, { dbName: 'portfolio' });
  console.log('MongoDB connected');
}

module.exports = { connectDB };
