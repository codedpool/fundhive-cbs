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

app.use(cors({ origin: getFrontendOrigin() }));



// Routes
app.use('/api', projectRoutes);

// MongoDB Connection (only connect if not already connected)
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Export the app for Vercel
module.exports = app;