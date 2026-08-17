const express = require('express');
const Testimonial = require('../models/Testimonial');

const router = express.Router();

// GET /api/testimonials
router.get('/', async (_req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(20);
    return res.json({ success: true, data: testimonials });
  } catch (err) {
    console.error('Testimonials fetch error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
