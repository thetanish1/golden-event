require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const enquiriesRouter = require('./routes/enquiries');
const testimonialsRouter = require('./routes/testimonials');
const galleryRouter = require('./routes/gallery');

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/enquiries',    enquiriesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/gallery',      galleryRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', message: 'Golden Star Events API is running.' }));

// ── MongoDB ─────────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/golden-star-events';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅  MongoDB connected:', MONGO_URI))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message);
    console.warn('⚠️   Running without database — enquiry submissions will fail.');
  });

// ── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
