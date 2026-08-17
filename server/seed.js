require('dotenv').config();
const mongoose = require('mongoose');
const Testimonial = require('./models/Testimonial');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/golden-star-events';

const testimonials = [
  {
    clientName: 'Priya & Rahul Sharma',
    eventType: 'Wedding Management',
    rating: 5,
    message: 'Golden Star Events transformed our wedding into an absolute dream. Every detail — from the mandap floral arrangements to the evening lighting — was breathtaking. Our guests are still talking about it months later!',
  },
  {
    clientName: 'Anjali Deshmukh',
    eventType: 'Birthday Party',
    rating: 5,
    message: 'They decorated my daughter\'s 5th birthday party and it was absolutely magical. The balloon arch, the theme setup, the little touches everywhere — everything was perfect. Will definitely hire them again!',
  },
  {
    clientName: 'Vikram Joshi',
    eventType: 'Corporate Event',
    rating: 5,
    message: 'We hired Golden Star Events for our annual company conference and they delivered beyond expectations. Professional, punctual, and the stage decoration was stunning. Highly recommended for corporate events.',
  },
  {
    clientName: 'Sunita & Manoj Patel',
    eventType: 'Baby Shower',
    rating: 5,
    message: 'The baby shower décor was gorgeous — soft pastels, beautiful balloon arrangements, floral accents everywhere. Golden Star Events made the most special day of our lives even more memorable.',
  },
  {
    clientName: 'Ravi Chandrakar',
    eventType: 'Cultural Program',
    rating: 4,
    message: 'Excellent stage setup and lighting for our Ganesh Utsav cultural event. The team was hardworking, efficient, and completed the entire setup overnight as promised. Great value and beautiful execution.',
  },
  {
    clientName: 'Meera Agrawal',
    eventType: 'Flower Decoration',
    rating: 5,
    message: 'The fresh flower decoration for our engagement ceremony was absolutely stunning. The rose wall backdrop was a showstopper — every photo looks like a magazine shoot! Thank you Golden Star Events.',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅  Connected to MongoDB');

    await Testimonial.deleteMany({});
    console.log('🗑️   Cleared existing testimonials');

    await Testimonial.insertMany(testimonials);
    console.log(`🌱  Seeded ${testimonials.length} testimonials`);

    await mongoose.disconnect();
    console.log('👋  Done!');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seed error:', err);
    process.exit(1);
  }
}

seed();
