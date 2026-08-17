# Golden Star Events Nagpur

<div align="center">

![Golden Star Events](https://img.shields.io/badge/Golden%20Star%20Events-Premium%20Event%20Decoration-D4AF37?style=for-the-badge&labelColor=141414)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232a)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a2e)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0f172a)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-FF0055?style=flat-square&logo=framer&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=flat-square&logo=mongodb&logoColor=white)

**Nagpur's premier event decoration and management website — built with the MERN stack.**

[+91 99229 10141](tel:+919922910141) · [+91 93592 26146](tel:+919359226146)

</div>

---

## ✨ Features

- **Luxury Dark-and-Gold Aesthetic** — deep charcoal backgrounds with rich `#D4AF37` gold accents throughout
- **Signature Cursor Glow** — lerp-eased golden orb follows the cursor on desktop with hover-reactive expansion; automatically disabled on touch devices and `prefers-reduced-motion`
- **7 Service Sections** — Birthday Party, Wedding Management, Corporate Events, Tents & Lighting, Flower Decoration, Cultural Programs, Baby Shower
- **Filterable Gallery** — category tabs + Framer Motion animated grid + lightbox with keyboard navigation
- **Scroll-Reveal Animations** — Framer Motion `whileInView` on every section, staggered card entries
- **Count-Up Stats** — animated numbers on scroll using `requestAnimationFrame` with cubic ease-out
- **Testimonials Carousel** — auto-playing slider with directional slide animation, star ratings, dot indicators
- **Enquiry Form** — full validation, loading/success/error states, MongoDB persistence, optional Nodemailer email notification
- **Floating WhatsApp Button** — pulse animation, tooltip, deep link with pre-filled message
- **Sticky Navbar** — transparent-over-hero → solid dark with gold border on scroll; hamburger slide-in mobile menu
- **Fully Responsive** — 1-column mobile, 2-column tablet, 3-4 column desktop with `clamp()` font sizing
- **SEO Ready** — title, meta description, OG tags, semantic HTML, custom SVG favicon

---

## 🗂️ Project Structure

```
golden-star-events/
├── client/                    # React + Vite frontend
│   ├── public/
│   │   └── favicon.svg        # Gold star SVG favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ServicesGrid.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── GalleryLightbox.jsx
│   │   │   ├── About.jsx
│   │   │   ├── StatsCounter.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CursorGlow.jsx
│   │   │   ├── FloatingWhatsApp.jsx
│   │   │   └── BackToTop.jsx
│   │   ├── hooks/
│   │   │   ├── useCursorGlow.js
│   │   │   └── useScrollReveal.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── data/
│   │   │   └── services.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                    # Node.js + Express + MongoDB backend
    ├── models/
    │   ├── Enquiry.js
    │   └── Testimonial.js
    ├── routes/
    │   ├── enquiries.js
    │   ├── testimonials.js
    │   └── gallery.js
    ├── utils/
    │   └── mailer.js
    ├── index.js
    ├── seed.js
    ├── .env
    ├── .env.example
    └── package.json
```

---

## 🚀 Setup & Running Locally

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org))
- **MongoDB** running locally on port `27017`, OR a MongoDB Atlas URI
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/your-org/golden-star-events.git
cd golden-star-events
```

### 2. Set up the server

```bash
cd server
npm install
```

Copy the example env file and fill in your values:

```bash
copy .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/golden-star-events

# Optional — leave commented out to skip email notifications
# EMAIL_USER=your_gmail@gmail.com
# EMAIL_PASS=your_app_password_here
# EMAIL_TO=business@example.com
```

> **Note:** For `EMAIL_PASS`, use a [Gmail App Password](https://myaccount.google.com/apppasswords) (not your regular Gmail password).

### 3. Seed the database (optional but recommended)

```bash
# From the server/ directory:
node seed.js
```

This populates the MongoDB with sample testimonials so the carousel shows real content immediately.

### 4. Set up the client

```bash
cd ../client
npm install
```

Create `client/.env.local` (optional — defaults to localhost):

```env
VITE_API_URL=http://localhost:5000
```

### 5. Run both servers

Open **two terminal windows**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# App running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Documentation

### Base URL

```
http://localhost:5000/api
```

### `POST /api/enquiries`

Submit a new event enquiry.

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "phone": "+91 99229 10141",
  "eventType": "Wedding Management",
  "eventDate": "2025-02-14",
  "message": "Looking for full wedding decoration and management for 500 guests."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully. We will contact you shortly!",
  "enquiryId": "65f1a2b3c4d5e6f7g8h9i0j1"
}
```

**Validation Error (422):**
```json
{
  "success": false,
  "errors": [
    { "field": "phone", "message": "Invalid phone number" }
  ]
}
```

**Event type enum values:**
`Birthday Party`, `Wedding Management`, `Corporate Event`, `Tents & Lighting`, `Flower Decoration`, `Cultural Program`, `Baby Shower`, `Other`

---

### `GET /api/testimonials`

Fetch all testimonials for the carousel.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "clientName": "Priya & Rahul Sharma",
      "eventType": "Wedding Management",
      "rating": 5,
      "message": "Golden Star Events transformed our wedding...",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### `GET /api/gallery`

Fetch gallery images, optionally filtered by category.

**Query Parameters:**
- `category` (optional) — e.g., `Wedding Management`, `Birthday Party`

**Example:** `GET /api/gallery?category=Wedding%20Management`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "category": "Wedding Management",
      "src": "https://images.unsplash.com/...",
      "alt": "Grand wedding mandap decoration"
    }
  ]
}
```

---

### `GET /api/health`

Health check endpoint.

**Response:** `{ "status": "ok", "message": "Golden Star Events API is running." }`

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `gold-500` | `#D4AF37` | Primary accent, borders |
| `gold-300` | `#F5D67A` | Highlights, gradient text |
| `gold-700` | `#8A6D1F` | Deep shadows, gradients |
| `charcoal-950` | `#0B0B0D` | Page background |
| `charcoal-900` | `#141414` | Section backgrounds |
| Font Display | Playfair Display | Headings, logo |
| Font Body | Poppins | Body text, UI |

---

## 📧 Email Notifications (Nodemailer)

If `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_TO` are set in `server/.env`, every enquiry form submission will also send a formatted HTML email to the business. The app works perfectly without these — email is fire-and-forget and never blocks the API response.

---

## 🌐 Deployment

### Frontend (Vercel / Netlify)

```bash
cd client
npm run build
# Deploy the `dist/` folder
```

Set environment variable: `VITE_API_URL=https://your-backend-url.com`

### Backend (Railway / Render / Fly.io)

```bash
cd server
# Set environment variables on the platform:
# MONGO_URI=mongodb+srv://...  (Atlas connection string)
# PORT=5000
# CLIENT_ORIGIN=https://your-frontend-url.com
npm start
```

---

## 📞 Business Contact

**Golden Star Events Nagpur**
- 📞 [+91 99229 10141](tel:+919922910141)
- 📞 [+91 93592 26146](tel:+919359226146)
- 📍 Nagpur, Maharashtra, India
- 🕐 Monday–Sunday: 9:00 AM – 8:00 PM

---

<div align="center">
  <sub>Built with ✨ for Golden Star Events Nagpur</sub>
</div>
