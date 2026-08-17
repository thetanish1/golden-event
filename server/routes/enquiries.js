const express = require('express');
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const { sendEnquiryEmail } = require('../utils/mailer');

const router = express.Router();

// Validation rules
const enquiryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone').trim().notEmpty().withMessage('Phone is required')
    .matches(/^[0-9+\-\s()]{7,20}$/).withMessage('Invalid phone number'),
  body('eventType').isIn([
    'Birthday Party', 'Wedding Management', 'Corporate Event',
    'Tents & Lighting', 'Flower Decoration', 'Cultural Program',
    'Baby Shower', 'Other',
  ]).withMessage('Invalid event type'),
  body('message').optional().trim().isLength({ max: 1000 }).withMessage('Message too long'),
];

// POST /api/enquiries
router.post('/', enquiryValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, phone, eventType, eventDate, message } = req.body;

    const enquiry = new Enquiry({ name, phone, eventType, eventDate: eventDate || null, message });
    await enquiry.save();

    // Fire-and-forget email (doesn't block response)
    sendEnquiryEmail({ name, phone, eventType, eventDate, message }).catch((err) =>
      console.warn('Email notification failed (non-fatal):', err.message)
    );

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you shortly!',
      enquiryId: enquiry._id,
    });
  } catch (err) {
    console.error('Enquiry save error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
