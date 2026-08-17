const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be under 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+\-\s()]{7,20}$/, 'Please enter a valid phone number'],
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: {
        values: [
          'Birthday Party',
          'Wedding Management',
          'Corporate Event',
          'Tents & Lighting',
          'Flower Decoration',
          'Cultural Program',
          'Baby Shower',
          'Other',
        ],
        message: 'Invalid event type',
      },
    },
    eventDate: {
      type: Date,
      default: null,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message must be under 1000 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
