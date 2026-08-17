const express = require('express');
const router = express.Router();

// Static gallery data — swap Unsplash URLs for real photos later
const galleryItems = [
  { id: 1, category: 'Birthday Party',    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', alt: 'Birthday decoration with balloons' },
  { id: 2, category: 'Birthday Party',    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Elegant birthday table setup' },
  { id: 3, category: 'Wedding Management', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', alt: 'Grand wedding mandap decoration' },
  { id: 4, category: 'Wedding Management', src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80', alt: 'Bridal floral arch' },
  { id: 5, category: 'Wedding Management', src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', alt: 'Wedding reception hall' },
  { id: 6, category: 'Corporate Event',   src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Corporate event setup' },
  { id: 7, category: 'Corporate Event',   src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', alt: 'Conference decoration' },
  { id: 8, category: 'Tents & Lighting',  src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80', alt: 'Outdoor tent with fairy lights' },
  { id: 9, category: 'Tents & Lighting',  src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Golden light canopy' },
  { id: 10, category: 'Flower Decoration', src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc79?w=800&q=80', alt: 'Rose wall backdrop' },
  { id: 11, category: 'Flower Decoration', src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', alt: 'Floral centerpiece arrangement' },
  { id: 12, category: 'Cultural Program',  src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', alt: 'Cultural stage decoration' },
  { id: 13, category: 'Cultural Program',  src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', alt: 'Festival performance setup' },
  { id: 14, category: 'Baby Shower',       src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&q=80', alt: 'Baby shower decoration' },
  { id: 15, category: 'Baby Shower',       src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', alt: 'Pastel baby shower setup' },
];

// GET /api/gallery
router.get('/', (_req, res) => {
  const { category } = req.query;
  const data = category && category !== 'All'
    ? galleryItems.filter((item) => item.category === category)
    : galleryItems;
  res.json({ success: true, data });
});

module.exports = router;
