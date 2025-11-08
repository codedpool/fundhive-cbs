const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const projectRoutes = require('../src/routes/projects');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Safely read and validate FRONTEND_URL to avoid stray characters (e.g. trailing 's')
const getFrontendOrigin = () => {
  const raw = (process.env.FRONTEND_URL || '').trim();
  if (!raw) return undefined;
  // Remove accidental whitespace
  let url = raw.replace(/\s+/g, '');
  
  url = url.replace(/(:\d+)[A-Za-z]+$/, '$1');
  try {
    // Validate URL format
    new URL(url);
    return url;
  } catch (err) {
    console.warn('Invalid FRONTEND_URL in env:', process.env.FRONTEND_URL);
    return undefined;
  }
};

app.use(cors({ 
  origin: getFrontendOrigin() || 'http://localhost:5173',
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
app.use('/api', projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB Connection (only connect if not already connected)
if (!mongoose.connection.readyState) {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fundhive';
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB:', mongoUri))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Export the app for Vercel
module.exports = app;

// Start server if running locally (not on Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}