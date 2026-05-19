# 🍛 Restaurant Website Blueprint
### *Landing Page Development Guide — Bengali & Multi-Cuisine Restaurant, Lanka, Varanasi*

---

## 📌 Project Overview

| Field | Details |
|---|---|
| **Restaurant Type** | Bengali (Primary) · North Indian · Chinese |
| **Location** | Lanka, Varanasi, Uttar Pradesh |
| **Established** | 2025 |
| **Website Type** | Multi-section landing page + Menu management |
| **Stack (Recommended)** | HTML5 / CSS3 / Vanilla JS (or React + Tailwind) |
| **Hosting (Suggested)** | Vercel / Netlify (free tier) |

---

## 🎨 Design Direction

### Aesthetic: *Warm Heritage Maximalism*
- **Palette**: Deep saffron (`#E07B39`), turmeric yellow (`#F2B33D`), terracotta (`#C15A3E`), off-white parchment (`#FAF3E0`), and charcoal ink (`#1A1A1A`)
- **Typography**:
  - Display / Headings → `Yatra One` or `Tiro Devanagari Bengali` (Google Fonts) — evokes Bengali script elegance
  - Body → `Lora` or `Crimson Pro` — warm serif for readability
  - Accent labels → `Space Mono` — sharp contrast for tags and prices
- **Motif**: Kantha stitch-inspired borders, alpona (rangoli) geometric dividers, lotus iconography
- **Mood**: Warm candlelight, clay diyas, the ghats of Varanasi woven into texture overlays

---

## 🗂️ Page Sections (In Order)

### 1. `<HERO>` — Full-Screen Welcome Banner
```html
<!-- Structure -->
<section id="hero">
  <video autoplay muted loop>  <!-- OR a static hero image -->
    <source src="assets/hero-ambience.mp4" type="video/mp4">
  </video>
  <div class="hero-overlay">
    <h1>Restaurant Name</h1>
    <p>Bengali Soul · North Indian Heart · Chinese Twist</p>
    <p class="location">📍 Lanka, Varanasi · Est. 2025</p>
    <div class="cta-buttons">
      <a href="#reservations" class="btn-primary">Book a Table</a>
      <a href="#menu" class="btn-secondary">View Menu</a>
    </div>
    <!-- Delivery Links -->
    <div class="delivery-badges">
      <a href="YOUR_ZOMATO_URL" target="_blank" rel="noopener">
        <img src="assets/zomato-badge.svg" alt="Order on Zomato">
      </a>
      <a href="YOUR_SWIGGY_URL" target="_blank" rel="noopener">
        <img src="assets/swiggy-badge.svg" alt="Order on Swiggy">
      </a>
    </div>
  </div>
</section>
```

> **📝 Developer Note**: Replace `YOUR_ZOMATO_URL` and `YOUR_SWIGGY_URL` with the direct restaurant listing URLs from Zomato and Swiggy once the restaurant is listed on those platforms.

---

### 2. `<ABOUT>` — Story & Ambience Section
```html
<section id="about">
  <div class="about-text">
    <h2>Our Story</h2>
    <p>Born in the spiritual heart of Varanasi, our kitchen carries the warmth of a Bengali
    household — mustard oil, posto, and hilsa — alongside the rich gravies of the North
    and the wok-tossed magic of the East.</p>
  </div>
  <div class="about-stats">
    <div class="stat"><span>3</span><label>Cuisines</label></div>
    <div class="stat"><span>50+</span><label>Dishes</label></div>
    <div class="stat"><span>2025</span><label>Established</label></div>
  </div>
</section>
```

---

### 3. `<CAROUSEL>` — Ambience Photo Gallery

**Implementation: Pure CSS + JS Carousel (No library needed)**

```html
<section id="gallery">
  <h2>Experience the Ambience</h2>
  <div class="carousel-wrapper">
    <div class="carousel-track" id="carouselTrack">
      <!-- Slides -->
      <div class="slide"><img src="assets/gallery/ambience-1.jpg" alt="Interior seating"></div>
      <div class="slide"><img src="assets/gallery/ambience-2.jpg" alt="Open kitchen view"></div>
      <div class="slide"><img src="assets/gallery/ambience-3.jpg" alt="Rooftop dining"></div>
      <div class="slide"><img src="assets/gallery/ambience-4.jpg" alt="Diya-lit tables"></div>
      <div class="slide"><img src="assets/gallery/ambience-5.jpg" alt="Food plating close-up"></div>
      <!-- Add more slides as needed -->
    </div>
    <button class="carousel-btn prev" onclick="moveCarousel(-1)">&#8592;</button>
    <button class="carousel-btn next" onclick="moveCarousel(1)">&#8594;</button>
    <div class="carousel-dots" id="carouselDots"></div>
  </div>
</section>
```

```css
/* Carousel CSS */
.carousel-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  max-width: 1100px;
  margin: 0 auto;
}
.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.slide {
  min-width: 100%;
  height: 520px;
  object-fit: cover;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(224, 123, 57, 0.85);
  color: white;
  border: none;
  padding: 14px 20px;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 50%;
}
.prev { left: 16px; }
.next { right: 16px; }
```

```javascript
// Carousel JS
let current = 0;
const track = document.getElementById('carouselTrack');
const slides = track.querySelectorAll('.slide');

function moveCarousel(direction) {
  current = (current + direction + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
}

// Auto-play
setInterval(() => moveCarousel(1), 4000);

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
}

// Generate dots
const dotsContainer = document.getElementById('carouselDots');
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.onclick = () => { current = i; track.style.transform = `translateX(-${i * 100}%)`; updateDots(); };
  dotsContainer.appendChild(dot);
});
```

> **📸 Photo Checklist**: Add 8–12 images to `assets/gallery/` covering: seating area, entrance, food close-ups, kitchen window, event setup, outdoor/rooftop (if any).

---

### 4. `<MENU>` — Interactive Menu Page

#### Layout
```
Menu
├── Category Tabs: Bengali | North Indian | Chinese | Beverages | Desserts
└── Grid: Item Card (Name · Description · Price · Veg/Non-Veg badge)
```

```html
<section id="menu">
  <h2>Our Menu</h2>
  <div class="menu-tabs">
    <button class="tab active" data-cat="bengali">Bengali</button>
    <button class="tab" data-cat="north-indian">North Indian</button>
    <button class="tab" data-cat="chinese">Chinese</button>
    <button class="tab" data-cat="beverages">Beverages</button>
    <button class="tab" data-cat="desserts">Desserts</button>
  </div>
  <div class="menu-grid" id="menuGrid">
    <!-- Items rendered by JS from menuData -->
  </div>

  <!-- DEVELOPER PANEL (hidden by default) -->
  <div id="devPanel" class="dev-panel hidden">
    <h3>🔧 Menu Manager <span class="dev-badge">DEVELOPER</span></h3>
    <div class="dev-form">
      <input type="text" id="itemName" placeholder="Item Name">
      <input type="text" id="itemDesc" placeholder="Description">
      <input type="number" id="itemPrice" placeholder="Price (₹)">
      <select id="itemCat">
        <option value="bengali">Bengali</option>
        <option value="north-indian">North Indian</option>
        <option value="chinese">Chinese</option>
        <option value="beverages">Beverages</option>
        <option value="desserts">Desserts</option>
      </select>
      <select id="itemType">
        <option value="veg">🟢 Veg</option>
        <option value="nonveg">🔴 Non-Veg</option>
      </select>
      <input type="text" id="itemImg" placeholder="Image path (optional)">
      <button onclick="addMenuItem()">+ Add Item</button>
    </div>
  </div>
</section>
```

#### Menu Data Structure (JSON)
Store in `menu-data.json` or inline in JS:
```javascript
const menuData = [
  {
    id: "b001",
    name: "Shorshe Ilish",
    description: "Hilsa fish in mustard gravy, Bengali-style",
    price: 380,
    category: "bengali",
    type: "nonveg",
    image: "assets/menu/ilish.jpg",
    available: true
  },
  {
    id: "b002",
    name: "Aloo Posto",
    description: "Potatoes in poppy seed paste",
    price: 180,
    category: "bengali",
    type: "veg",
    image: "assets/menu/aluposto.jpg",
    available: true
  },
  {
    id: "ni001",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils with butter and cream",
    price: 220,
    category: "north-indian",
    type: "veg",
    available: true
  },
  // ... more items
];
```

#### Menu JS Renderer
```javascript
function renderMenu(category = 'bengali') {
  const grid = document.getElementById('menuGrid');
  const filtered = menuData.filter(i => i.category === category && i.available);
  grid.innerHTML = filtered.map(item => `
    <div class="menu-card" data-id="${item.id}">
      ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<div class="no-img">🍽️</div>'}
      <div class="menu-card-body">
        <span class="badge ${item.type}">${item.type === 'veg' ? '🟢' : '🔴'}</span>
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <span class="price">₹${item.price}</span>
        ${DEV_MODE ? `
          <div class="dev-actions">
            <button onclick="editItem('${item.id}')">Edit</button>
            <button onclick="deleteItem('${item.id}')">Delete</button>
            <button onclick="toggleAvailability('${item.id}')">${item.available ? 'Mark Unavailable' : 'Mark Available'}</button>
          </div>` : ''}
      </div>
    </div>
  `).join('');
}
```

#### Developer Access Lock
```javascript
// Developer Mode Toggle — Enter password via URL hash or keyboard shortcut
// Access: Navigate to yourdomain.com#devmode or press Ctrl+Shift+D

let DEV_MODE = false;
const DEV_PASSWORD = 'YOUR_SECRET_PASSWORD'; // Change before going live

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'D') {
    const pass = prompt('Enter developer password:');
    if (pass === DEV_PASSWORD) {
      DEV_MODE = true;
      document.getElementById('devPanel').classList.remove('hidden');
      renderMenu(activeCategory);
      alert('✅ Developer mode enabled');
    } else {
      alert('❌ Incorrect password');
    }
  }
});

// Dev CRUD Functions
function addMenuItem() { /* Read form → push to menuData → re-render → saveToStorage() */ }
function editItem(id) { /* Populate form with item data → on save, update menuData */ }
function deleteItem(id) { /* Confirm dialog → splice from menuData → re-render → saveToStorage() */ }
function toggleAvailability(id) { /* Flip available boolean → re-render */ }

// Persist to localStorage (for demo) OR replace with backend API call
function saveToStorage() {
  localStorage.setItem('menuData', JSON.stringify(menuData));
}
```

> **⚠️ Security Note for Developer Panel**: For production, move the password check to a proper backend authentication (e.g., Firebase Auth, Supabase Auth, or a simple Express.js session). Never store the developer password in plain JS that ships to the browser. A lightweight solution is using Supabase (free tier) with row-level security for menu CRUD.

---

### 5. `<REVIEWS>` — Google Reviews (Real-Time)

Google does **not** provide a free public API for business reviews directly. Below are the **three practical options**, ranked by ease:

#### ✅ Option A — Google Places API (Recommended)
```javascript
// Backend (Node.js / serverless function — never expose API key in frontend)
// File: api/reviews.js (Vercel serverless function)

export default async function handler(req, res) {
  const PLACE_ID = 'YOUR_GOOGLE_PLACE_ID'; // Get from Google Maps
  const API_KEY  = process.env.GOOGLE_PLACES_API_KEY; // Store in .env

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json({
    rating: data.result.rating,
    total:  data.result.user_ratings_total,
    reviews: data.result.reviews.slice(0, 6) // Top 6 reviews
  });
}
```

```javascript
// Frontend fetch
async function loadReviews() {
  const data = await fetch('/api/reviews').then(r => r.json());
  document.getElementById('overallRating').textContent = data.rating;
  document.getElementById('totalReviews').textContent = `${data.total} reviews`;

  const container = document.getElementById('reviewsGrid');
  container.innerHTML = data.reviews.map(r => `
    <div class="review-card">
      <div class="reviewer">
        <img src="${r.profile_photo_url}" alt="${r.author_name}">
        <div>
          <strong>${r.author_name}</strong>
          <span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
        </div>
      </div>
      <p>${r.text}</p>
      <small>${new Date(r.time * 1000).toLocaleDateString('en-IN')}</small>
    </div>
  `).join('');
}
loadReviews();
```

**Steps to get your Place ID:**
1. Go to [Google Maps](https://maps.google.com) → find your restaurant
2. The URL will contain something like: `...place/Restaurant+Name/.../1s0x...` — that encoded ID is your Place ID
3. Or use: [https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)

**Cost**: Google Places API is free for **up to 2,500 requests/day**. Enable billing but you won't be charged under this limit.

#### Option B — Elfsight Widget (Zero-code, Free tier)
Embed a Elfsight Google Reviews widget — no API key needed.
```html
<!-- After signing up at elfsight.com (free plan available) -->
<div class="elfsight-app-XXXXXXXX"></div>
<script src="https://static.elfsight.com/platform/platform.js" defer></script>
```

#### Option C — Static / Manual Reviews (Fallback)
Hard-code 5–6 curated reviews from Google for launch, refresh manually monthly.

---

### 6. `<RESERVATIONS>` — WhatsApp Party/Event Booking Form

```html
<section id="reservations">
  <h2>Book for Special Occasions</h2>
  <p>Birthdays · Anniversary Dinners · Corporate Lunches · Private Parties</p>

  <div class="reservation-form">
    <input type="text"   id="resName"    placeholder="Your Name *" required>
    <input type="tel"    id="resPhone"   placeholder="Phone Number *" required>
    <input type="date"   id="resDate"    placeholder="Date of Event *" required>
    <input type="time"   id="resTime"    placeholder="Time *" required>
    <select id="resOccasion">
      <option value="">Select Occasion</option>
      <option value="birthday">🎂 Birthday Party</option>
      <option value="anniversary">💍 Anniversary Dinner</option>
      <option value="corporate">💼 Corporate Event</option>
      <option value="kitty">👯 Kitty Party</option>
      <option value="other">🎉 Other</option>
    </select>
    <input type="number" id="resGuests"  placeholder="Number of Guests *" min="2" max="200" required>
    <textarea id="resNote" placeholder="Special requests (cake, decor, dietary needs...)"></textarea>
    <button onclick="sendWhatsAppReservation()" class="btn-whatsapp">
      📲 Send Reservation via WhatsApp
    </button>
  </div>
</section>
```

```javascript
function sendWhatsAppReservation() {
  const name     = document.getElementById('resName').value.trim();
  const phone    = document.getElementById('resPhone').value.trim();
  const date     = document.getElementById('resDate').value;
  const time     = document.getElementById('resTime').value;
  const occasion = document.getElementById('resOccasion').value;
  const guests   = document.getElementById('resGuests').value;
  const note     = document.getElementById('resNote').value.trim();

  if (!name || !phone || !date || !time || !guests) {
    alert('Please fill in all required fields.');
    return;
  }

  // Your restaurant's WhatsApp number (with country code, no + or spaces)
  const RESTAURANT_WA_NUMBER = '91XXXXXXXXXX'; // Replace with actual number

  const message = `
🍽️ *New Reservation Request*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📅 *Date:* ${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏰ *Time:* ${time}
🎉 *Occasion:* ${occasion || 'Not specified'}
👥 *Guests:* ${guests}
📝 *Special Requests:* ${note || 'None'}

_Sent from website reservation form_
  `.trim();

  const encoded = encodeURIComponent(message);
  const waURL = `https://wa.me/${RESTAURANT_WA_NUMBER}?text=${encoded}`;
  window.open(waURL, '_blank');
}
```

> **How it works**: Clicking the button opens WhatsApp (mobile app or web) with a **pre-filled message** containing all reservation details, sent directly to your restaurant's number. No backend or API key required.

> **Optional Enhancement**: Add a WhatsApp Business API integration (via Meta Developer account) to send **automated confirmation replies** back to customers.

---

### 7. `<FOOTER>` — Contact, Map, Social

```html
<footer>
  <div class="footer-grid">
    <div class="footer-col">
      <h4>Find Us</h4>
      <p>Lanka, Varanasi<br>Uttar Pradesh – 221005</p>
      <p>📞 +91 XXXXXXXXXX</p>
      <p>✉️ hello@restaurantname.com</p>
    </div>
    <div class="footer-col">
      <h4>Order Online</h4>
      <a href="YOUR_ZOMATO_URL" target="_blank">🔴 Zomato</a>
      <a href="YOUR_SWIGGY_URL" target="_blank">🟠 Swiggy</a>
    </div>
    <div class="footer-col">
      <h4>Hours</h4>
      <p>Mon–Sun: 11:00 AM – 11:00 PM</p>
      <p>Last order: 10:30 PM</p>
    </div>
    <div class="footer-col map-embed">
      <iframe
        src="https://maps.google.com/maps?q=Lanka,Varanasi&output=embed"
        width="100%" height="200" style="border:0;" allowfullscreen loading="lazy">
      </iframe>
    </div>
  </div>
  <p class="footer-bottom">© 2025 Restaurant Name · Lanka, Varanasi · Made with ❤️ & Mustard Oil</p>
</footer>
```

---

## 🗃️ File & Folder Structure

```
restaurant-website/
│
├── index.html                  ← Main landing page
├── menu.html                   ← Standalone menu page (optional)
├── style.css                   ← Global styles
├── main.js                     ← Carousel, menu renderer, WA form
├── menu-data.js                ← Menu JSON data
├── .env                        ← API keys (NEVER commit to GitHub)
│
├── assets/
│   ├── logo.svg
│   ├── hero-bg.jpg
│   ├── zomato-badge.svg
│   ├── swiggy-badge.svg
│   ├── gallery/
│   │   ├── ambience-1.jpg
│   │   ├── ambience-2.jpg
│   │   └── ... (8–12 images)
│   └── menu/
│       ├── ilish.jpg
│       ├── aluposto.jpg
│       └── ... (one per dish, optional)
│
└── api/
    └── reviews.js              ← Serverless function for Google Reviews
```

---

## ⚙️ Tech Stack Choices

| Feature | Recommended Tool | Why |
|---|---|---|
| Frontend | HTML + CSS + Vanilla JS | Zero dependencies, fast load |
| Hosting | Vercel (free) | Supports serverless functions for reviews API |
| Google Reviews | Google Places API | Official, real-time |
| Photo Carousel | Custom CSS/JS | Lightweight, no jQuery needed |
| Menu Storage (Dev) | `localStorage` → migrate to Supabase | Easy start, scalable |
| Reservations | WhatsApp `wa.me` deep link | No backend, instant setup |
| Fonts | Google Fonts (Yatra One + Lora) | Free, Bengali-flavored |
| Analytics | Google Analytics 4 (free) | Track page visits, clicks |

---

## 🚀 Deployment Checklist

- [ ] Replace all `YOUR_ZOMATO_URL` / `YOUR_SWIGGY_URL` placeholder links
- [ ] Replace `91XXXXXXXXXX` with actual restaurant WhatsApp number
- [ ] Add actual `GOOGLE_PLACE_ID` once restaurant is listed on Google Maps
- [ ] Add `GOOGLE_PLACES_API_KEY` to `.env` — never hardcode in JS
- [ ] Upload ambience photos to `assets/gallery/`
- [ ] Test carousel on mobile (touch swipe events)
- [ ] Set `DEV_PASSWORD` to a strong password before going live
- [ ] Enable HTTPS on hosting (auto on Vercel/Netlify)
- [ ] Test WhatsApp reservation link on both mobile and desktop
- [ ] Add Google Analytics 4 tracking tag to `<head>`
- [ ] Submit sitemap to Google Search Console for SEO

---

## 📱 Mobile Responsiveness Notes

```css
/* Breakpoints to implement */
@media (max-width: 768px) {
  .menu-grid    { grid-template-columns: 1fr; }
  .footer-grid  { grid-template-columns: 1fr; }
  .slide        { height: 260px; }
  .hero h1      { font-size: 2.2rem; }
  .dev-panel    { display: none !important; } /* Always hide on mobile */
}
```

> Developer panel should be **desktop-only**. Menu editing on mobile increases accidental changes risk.

---

## 🔐 Developer Access — Summary

| Action | How |
|---|---|
| Enable Dev Mode | Press `Ctrl + Shift + D` on desktop → enter password |
| Add Menu Item | Fill the dev panel form → click "+ Add Item" |
| Edit Item | Click "Edit" on any card → modify in form → Save |
| Delete Item | Click "Delete" → confirm dialog → removed instantly |
| Toggle Availability | Click "Mark Unavailable" — item hidden from public, not deleted |
| Disable Dev Mode | Refresh the page |

---

## 💡 Other Future Enhancements

- **Online ordering** — Integrate Razorpay/PhonePe for pre-orders with table booking
- **Loyalty card** — QR code stamp card system

---

## 8. `<INSTAGRAM FEED>` — Live Posts via Instagram Basic Display API

### How It Works
Instagram's **Basic Display API** lets you fetch the latest posts from your own Instagram account and display them on the website. Requires a Meta Developer account and a long-lived access token.

### Step-by-Step Setup

**Step 1 — Create a Meta App**
1. Go to [developers.facebook.com](https://developers.facebook.com) → "My Apps" → "Create App"
2. Select **"Consumer"** as app type
3. Add **"Instagram Basic Display"** product to your app
4. Under Instagram Basic Display → Add your Instagram account as a Test User

**Step 2 — Get Your Long-Lived Access Token**
```bash
# Short-lived token (valid 1 hour) — exchange it immediately
GET https://api.instagram.com/oauth/authorize
  ?client_id={APP_ID}
  &redirect_uri={REDIRECT_URI}
  &scope=user_profile,user_media
  &response_type=code

# Exchange for long-lived token (valid 60 days)
GET https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={APP_SECRET}
  &access_token={SHORT_LIVED_TOKEN}
```

> **⚠️ Token Refresh**: Long-lived tokens expire in 60 days. Set up a cron job (Vercel Cron or GitHub Actions) to auto-refresh weekly using the `/refresh_access_token` endpoint.

**Step 3 — Serverless Proxy (keeps token secret)**
```javascript
// api/instagram.js — Vercel serverless function
export default async function handler(req, res) {
  const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const USER_ID = process.env.INSTAGRAM_USER_ID;

  // Fetch latest 9 posts (images + videos)
  const mediaRes = await fetch(
    `https://graph.instagram.com/${USER_ID}/media` +
    `?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp` +
    `&limit=9&access_token=${TOKEN}`
  );
  const data = await mediaRes.json();

  res.setHeader('Cache-Control', 's-maxage=3600'); // Cache for 1 hour
  res.status(200).json(data);
}
```

**Step 4 — Frontend HTML**
```html
<section id="instagram-feed">
  <h2>We're on Instagram</h2>
  <p class="ig-handle">
    <a href="https://instagram.com/YOUR_HANDLE" target="_blank">@YourRestaurantHandle</a>
  </p>
  <div class="ig-grid" id="igGrid">
    <!-- Skeleton loaders shown while fetching -->
    <div class="ig-skeleton"></div>
    <div class="ig-skeleton"></div>
    <div class="ig-skeleton"></div>
  </div>
  <a href="https://instagram.com/YOUR_HANDLE" target="_blank" class="btn-ig">
    Follow us on Instagram
  </a>
</section>
```

**Step 5 — Frontend JS**
```javascript
async function loadInstagramFeed() {
  const grid = document.getElementById('igGrid');

  try {
    const data = await fetch('/api/instagram').then(r => r.json());

    grid.innerHTML = data.data.map(post => {
      const imgSrc = post.media_type === 'VIDEO'
        ? post.thumbnail_url   // use thumbnail for videos
        : post.media_url;

      const caption = post.caption
        ? post.caption.substring(0, 80) + (post.caption.length > 80 ? '...' : '')
        : '';

      return `
        <a href="${post.permalink}" target="_blank" class="ig-post" rel="noopener">
          <img src="${imgSrc}" alt="${caption}" loading="lazy">
          <div class="ig-overlay">
            ${post.media_type === 'VIDEO' ? '<span class="ig-video-badge">▶</span>' : ''}
            <p>${caption}</p>
          </div>
        </a>
      `;
    }).join('');

  } catch (err) {
    // Graceful fallback — hide section or show static placeholder
    grid.innerHTML = `<p class="ig-error">Feed unavailable. 
      <a href="https://instagram.com/YOUR_HANDLE" target="_blank">Visit us on Instagram →</a></p>`;
  }
}

loadInstagramFeed();
```

**Step 6 — CSS Grid**
```css
.ig-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-width: 900px;
  margin: 0 auto;
}
.ig-post {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
}
.ig-post img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.ig-post:hover img { transform: scale(1.06); }
.ig-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: flex-end;
  padding: 12px;
  opacity: 0; transition: opacity 0.3s;
  color: white; font-size: 0.82rem;
}
.ig-post:hover .ig-overlay { opacity: 1; }
.ig-skeleton {
  aspect-ratio: 1;
  background: linear-gradient(90deg, #f0e6d3 25%, #faf3e0 50%, #f0e6d3 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

@media (max-width: 600px) {
  .ig-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### `.env` additions
```
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
INSTAGRAM_USER_ID=your_instagram_numeric_user_id
```

---

## 9. `<WHATSAPP CHATBOT>` — Automated Reservation Replies via Wati

### Wati vs Twilio — Which to Use?

| | Wati | Twilio |
|---|---|---|
| **Best for** | Small businesses, zero-code flows | Developers, custom logic |
| **Setup difficulty** | Low (visual flow builder) | High (code required) |
| **Pricing** | ₹2,499/mo (Starter) | Pay-per-message (~₹0.5–1/msg) |
| **WhatsApp Business API** | Included | You manage it via Meta |
| **Recommendation** | ✅ Use Wati for this project | Only if you want full custom code |

> **Recommended: Wati** — Simpler to set up, has a visual no-code flow builder, and supports keyword-triggered auto-replies perfect for reservations.

---

### Implementation: Wati Setup

**Step 1 — Account & WhatsApp Business API**
1. Sign up at [wati.io](https://wati.io) (14-day free trial available)
2. Connect your WhatsApp Business number through the onboarding wizard
3. Submit your number to Meta for WhatsApp Business API approval (Wati handles this)

**Step 2 — Create Message Templates (for outbound)**
In Wati dashboard → Templates → New Template:

```
Template name: reservation_confirmation
Category: UTILITY
Language: English

Body:
Hello {{1}}! 🙏

We've received your reservation request:
📅 Date: {{2}}
⏰ Time: {{3}}
👥 Guests: {{4}}
🎉 Occasion: {{5}}

Our team will confirm within 30 minutes.
For urgent queries, call: +91-XXXXXXXXXX

Thank you for choosing [Restaurant Name]! 🍛
```

**Step 3 — Keyword Auto-Reply Flow (Wati Visual Builder)**
```
Trigger keyword: "reservation" OR "book" OR "table"
    ↓
Reply: "Hi! 👋 Welcome to [Restaurant Name].
        To book a table, please share:
        1️⃣ Your name
        2️⃣ Date & time
        3️⃣ Number of guests
        4️⃣ Occasion (optional)
        Or visit our website: [URL]"
    ↓
After customer replies → assign to human agent (or collect via flow)
```

**Step 4 — Wati API Integration (from your website)**
Instead of the plain `wa.me` link, send the reservation data directly to Wati, which then triggers a template message:

```javascript
// api/send-reservation.js — Vercel serverless function
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, date, time, guests, occasion } = req.body;

  // Validate inputs
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const WATI_API_URL   = process.env.WATI_API_URL;   // e.g. https://live-mt-server.wati.io/XXXXX
  const WATI_API_TOKEN = process.env.WATI_API_TOKEN;

  // Send template message via Wati
  const response = await fetch(`${WATI_API_URL}/api/v1/sendTemplateMessage`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WATI_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      template_name: 'reservation_confirmation',
      broadcast_name: 'website_reservation',
      receivers: [{
        whatsappNumber: phone.replace(/\D/g, ''), // digits only
        customParams: [
          { name: '1', value: name },
          { name: '2', value: date },
          { name: '3', value: time },
          { name: '4', value: guests },
          { name: '5', value: occasion || 'General' }
        ]
      }]
    })
  });

  const result = await response.json();

  if (result.result) {
    // Also notify restaurant's own number
    await notifyRestaurant({ name, phone, date, time, guests, occasion });
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to send message', detail: result });
  }
}

// Internal notification to restaurant owner
async function notifyRestaurant(data) {
  const WATI_API_URL   = process.env.WATI_API_URL;
  const WATI_API_TOKEN = process.env.WATI_API_TOKEN;
  const OWNER_NUMBER   = process.env.OWNER_WHATSAPP; // Restaurant owner's number

  await fetch(`${WATI_API_URL}/api/v1/sendSessionMessage/${OWNER_NUMBER}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${WATI_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messageText: `🔔 New Reservation!\n👤 ${data.name}\n📞 ${data.phone}\n📅 ${data.date} at ${data.time}\n👥 ${data.guests} guests\n🎉 ${data.occasion || 'N/A'}`
    })
  });
}
```

**Updated Frontend — Submit to API instead of `wa.me`**
```javascript
async function sendReservation() {
  const payload = {
    name:     document.getElementById('resName').value.trim(),
    phone:    document.getElementById('resPhone').value.trim(),
    date:     document.getElementById('resDate').value,
    time:     document.getElementById('resTime').value,
    occasion: document.getElementById('resOccasion').value,
    guests:   document.getElementById('resGuests').value,
    note:     document.getElementById('resNote').value.trim()
  };

  const btn = document.querySelector('.btn-reserve');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/send-reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showSuccessMessage(); // Show "✅ Reservation sent! Check your WhatsApp."
    } else {
      throw new Error('API error');
    }
  } catch {
    // Fallback to wa.me link if API fails
    const msg = encodeURIComponent(`New reservation from ${payload.name}...`);
    window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank');
  } finally {
    btn.textContent = 'Send Reservation';
    btn.disabled = false;
  }
}
```

### `.env` additions
```
WATI_API_URL=https://live-mt-server.wati.io/YOUR_ACCOUNT_ID
WATI_API_TOKEN=your_wati_bearer_token
OWNER_WHATSAPP=91XXXXXXXXXX
```

### Chatbot Flow Summary
```
Customer visits website
        ↓
Fills reservation form → clicks "Send"
        ↓
Website POSTs to /api/send-reservation
        ↓
Wati sends WhatsApp template message to customer ← confirmation
        ↓
Wati sends session message to restaurant owner ← notification
        ↓
Owner reviews in Wati inbox → confirms/declines manually
        ↓
Owner replies from Wati → customer receives WhatsApp reply
```

---

## 10. `<MULTILINGUAL>` — Hindi & Bengali Language Toggle

### Strategy: JSON-based i18n (No library needed)

Store all UI text in a `translations.js` file. A `data-i18n` attribute on every text element acts as the key. A single `setLanguage(lang)` function swaps all text at once.

**File: `translations.js`**
```javascript
const translations = {
  en: {
    // Hero
    "hero.tagline":       "Bengali Soul · North Indian Heart · Chinese Twist",
    "hero.location":      "Lanka, Varanasi · Est. 2025",
    "hero.cta.book":      "Book a Table",
    "hero.cta.menu":      "View Menu",
    // Navigation
    "nav.home":           "Home",
    "nav.menu":           "Menu",
    "nav.gallery":        "Gallery",
    "nav.reviews":        "Reviews",
    "nav.contact":        "Contact",
    "nav.reserve":        "Reserve",
    // About
    "about.title":        "Our Story",
    "about.body":         "Born in the spiritual heart of Varanasi...",
    // Menu
    "menu.title":         "Our Menu",
    "menu.tab.bengali":   "Bengali",
    "menu.tab.northindian": "North Indian",
    "menu.tab.chinese":   "Chinese",
    "menu.tab.beverages": "Beverages",
    "menu.tab.desserts":  "Desserts",
    "menu.badge.veg":     "Veg",
    "menu.badge.nonveg":  "Non-Veg",
    // Reviews
    "reviews.title":      "What Our Guests Say",
    // Reservations
    "res.title":          "Book Your Occasion",
    "res.label.name":     "Your Name",
    "res.label.phone":    "Phone Number",
    "res.label.date":     "Date",
    "res.label.time":     "Time",
    "res.label.guests":   "Number of Guests",
    "res.label.occasion": "Occasion",
    "res.label.note":     "Special Requests",
    "res.btn":            "Send via WhatsApp",
    // Footer
    "footer.findus":      "Find Us",
    "footer.order":       "Order Online",
    "footer.hours":       "Hours",
    "footer.hours.val":   "Mon–Sun: 11:00 AM – 11:00 PM"
  },

  hi: {
    "hero.tagline":       "बंगाली आत्मा · उत्तर भारतीय दिल · चाइनीज़ स्वाद",
    "hero.location":      "लंका, वाराणसी · स्थापना 2025",
    "hero.cta.book":      "टेबल बुक करें",
    "hero.cta.menu":      "मेनू देखें",
    "nav.home":           "होम",
    "nav.menu":           "मेनू",
    "nav.gallery":        "गैलरी",
    "nav.reviews":        "समीक्षाएं",
    "nav.contact":        "संपर्क",
    "nav.reserve":        "आरक्षण",
    "about.title":        "हमारी कहानी",
    "about.body":         "वाराणसी के आध्यात्मिक हृदय में जन्मी हमारी रसोई...",
    "menu.title":         "हमारा मेनू",
    "menu.tab.bengali":   "बंगाली",
    "menu.tab.northindian": "उत्तर भारतीय",
    "menu.tab.chinese":   "चाइनीज़",
    "menu.tab.beverages": "पेय",
    "menu.tab.desserts":  "मिठाई",
    "menu.badge.veg":     "शाकाहारी",
    "menu.badge.nonveg":  "मांसाहारी",
    "reviews.title":      "हमारे मेहमान क्या कहते हैं",
    "res.title":          "अपना अवसर बुक करें",
    "res.label.name":     "आपका नाम",
    "res.label.phone":    "फ़ोन नंबर",
    "res.label.date":     "तारीख",
    "res.label.time":     "समय",
    "res.label.guests":   "मेहमानों की संख्या",
    "res.label.occasion": "अवसर",
    "res.label.note":     "विशेष अनुरोध",
    "res.btn":            "व्हाट्सएप पर भेजें",
    "footer.findus":      "हमें खोजें",
    "footer.order":       "ऑनलाइन ऑर्डर",
    "footer.hours":       "समय",
    "footer.hours.val":   "सोम–रवि: सुबह 11 – रात 11"
  },

  bn: {
    "hero.tagline":       "বাংলার আত্মা · উত্তর ভারতের হৃদয় · চাইনিজ স্বাদ",
    "hero.location":      "লংকা, বারাণসী · প্রতিষ্ঠা ২০২৫",
    "hero.cta.book":      "টেবিল বুক করুন",
    "hero.cta.menu":      "মেনু দেখুন",
    "nav.home":           "হোম",
    "nav.menu":           "মেনু",
    "nav.gallery":        "গ্যালারি",
    "nav.reviews":        "পর্যালোচনা",
    "nav.contact":        "যোগাযোগ",
    "nav.reserve":        "আসন সংরক্ষণ",
    "about.title":        "আমাদের গল্প",
    "about.body":         "বারাণসীর আধ্যাত্মিক কেন্দ্রে জন্ম নেওয়া আমাদের রান্নাঘর...",
    "menu.title":         "আমাদের মেনু",
    "menu.tab.bengali":   "বাংলা",
    "menu.tab.northindian": "উত্তর ভারতীয়",
    "menu.tab.chinese":   "চাইনিজ",
    "menu.tab.beverages": "পানীয়",
    "menu.tab.desserts":  "মিষ্টি",
    "menu.badge.veg":     "নিরামিষ",
    "menu.badge.nonveg":  "আমিষ",
    "reviews.title":      "আমাদের অতিথিরা কী বলছেন",
    "res.title":          "আপনার অনুষ্ঠান বুক করুন",
    "res.label.name":     "আপনার নাম",
    "res.label.phone":    "ফোন নম্বর",
    "res.label.date":     "তারিখ",
    "res.label.time":     "সময়",
    "res.label.guests":   "অতিথির সংখ্যা",
    "res.label.occasion": "অনুষ্ঠান",
    "res.label.note":     "বিশেষ অনুরোধ",
    "res.btn":            "হোয়াটসঅ্যাপে পাঠান",
    "footer.findus":      "আমাদের খুঁজুন",
    "footer.order":       "অনলাইনে অর্ডার",
    "footer.hours":       "সময়সূচি",
    "footer.hours.val":   "সোম–রবি: সকাল ১১টা – রাত ১১টা"
  }
};
```

**Language Switcher UI (add to navbar)**
```html
<nav>
  <!-- ... existing nav links ... -->
  <div class="lang-switcher">
    <button onclick="setLanguage('en')"  class="lang-btn active" id="lang-en">EN</button>
    <button onclick="setLanguage('hi')"  class="lang-btn"        id="lang-hi">हि</button>
    <button onclick="setLanguage('bn')"  class="lang-btn"        id="lang-bn">বাং</button>
  </div>
</nav>
```

**i18n Engine (JS)**
```javascript
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update all text nodes with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update html lang attribute for accessibility
  document.documentElement.lang = lang;

  // Swap font for Devanagari / Bengali scripts
  updateFontForScript(lang);

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`lang-${lang}`)?.classList.add('active');
}

function updateFontForScript(lang) {
  const root = document.documentElement;
  if (lang === 'hi') {
    root.style.setProperty('--font-body', '"Hind", sans-serif');
    root.style.setProperty('--font-display', '"Rozha One", serif');
  } else if (lang === 'bn') {
    root.style.setProperty('--font-body', '"Hind Siliguri", sans-serif');
    root.style.setProperty('--font-display', '"Tiro Devanagari Bengali", serif');
  } else {
    root.style.setProperty('--font-body', '"Lora", serif');
    root.style.setProperty('--font-display', '"Yatra One", cursive');
  }
}

// Apply on page load
setLanguage(currentLang);
```

**Example HTML with data-i18n attributes**
```html
<!-- Every translatable element gets a data-i18n key -->
<h1 data-i18n="hero.tagline">Bengali Soul · North Indian Heart · Chinese Twist</h1>
<a href="#reservations" data-i18n="hero.cta.book">Book a Table</a>
<input type="text" data-i18n-placeholder="res.label.name" placeholder="Your Name">
<button data-i18n="res.btn">Send via WhatsApp</button>
```

**Google Fonts to add for all 3 scripts**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?
  family=Yatra+One&
  family=Lora:ital,wght@0,400;0,600;1,400&
  family=Rozha+One&
  family=Hind:wght@400;600&
  family=Hind+Siliguri:wght@400;600&
  family=Tiro+Devanagari+Bengali&
  display=swap" rel="stylesheet">
```

**Language Switcher CSS**
```css
.lang-switcher {
  display: flex;
  gap: 4px;
  background: rgba(255,255,255,0.12);
  border-radius: 20px;
  padding: 4px;
}
.lang-btn {
  background: transparent;
  border: none;
  color: inherit;
  padding: 4px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: background 0.2s;
}
.lang-btn.active {
  background: var(--accent);        /* saffron */
  color: white;
}
.lang-btn:hover:not(.active) {
  background: rgba(255,255,255,0.2);
}
```

---

## 11. `<ADMIN DASHBOARD>` — `/admin` Route with Firebase Auth

### Architecture Overview
```
yourdomain.com/
├── index.html          ← Public landing page
├── admin/
│   └── index.html      ← Admin dashboard (Firebase Auth protected)
└── api/
    ├── reviews.js
    ├── instagram.js
    └── send-reservation.js
```

### Firebase Setup

**Step 1 — Create Firebase Project**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. New Project → "RestaurantAdmin" → Enable Google Analytics (optional)
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Add one authorized user (the restaurant admin email) from Authentication → Users → Add User
5. Enable **Firestore Database** → Start in Production mode

**Step 2 — Firestore Data Structure**
```
Firestore/
├── menu/                         (collection)
│   ├── b001 {                    (document per menu item)
│   │     name, description,
│   │     price, category,
│   │     type, image, available
│   │   }
│   └── ...
│
├── reservations/                 (collection)
│   ├── res_1234567890 {
│   │     name, phone, date, time,
│   │     guests, occasion, note,
│   │     status: "pending" | "confirmed" | "declined",
│   │     createdAt: Timestamp
│   │   }
│   └── ...
│
└── settings/ {                   (single document)
      restaurantName,
      openingHours,
      zomatoUrl,
      swiggyUrl,
      announcement         ← banner message shown on site
    }
```

**Step 3 — Admin Page (`admin/index.html`)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin — Restaurant Name</title>
  <link rel="stylesheet" href="../style.css">
  <link rel="stylesheet" href="admin.css">
</head>
<body class="admin-body">

  <!-- LOGIN SCREEN -->
  <div id="loginScreen" class="login-screen">
    <div class="login-card">
      <h2>🔐 Admin Login</h2>
      <p>Restaurant Management Portal</p>
      <input type="email"    id="adminEmail"    placeholder="Admin Email">
      <input type="password" id="adminPassword" placeholder="Password">
      <button onclick="adminLogin()">Login</button>
      <p id="loginError" class="error-msg"></p>
    </div>
  </div>

  <!-- DASHBOARD (hidden until authenticated) -->
  <div id="dashboard" class="dashboard hidden">

    <aside class="admin-sidebar">
      <h3>🍛 Admin Panel</h3>
      <nav>
        <a onclick="showTab('menu')"         class="active">📋 Menu</a>
        <a onclick="showTab('reservations')"         >📅 Reservations</a>
        <a onclick="showTab('settings')"             >⚙️ Settings</a>
      </nav>
      <button onclick="adminLogout()" class="btn-logout">Logout</button>
    </aside>

    <main class="admin-main">

      <!-- TAB: MENU MANAGER -->
      <div id="tab-menu" class="admin-tab active">
        <div class="tab-header">
          <h2>Menu Manager</h2>
          <button onclick="openItemModal()" class="btn-add">+ Add Item</button>
        </div>
        <div class="filter-bar">
          <select id="menuFilterCat" onchange="loadMenuItems()">
            <option value="all">All Categories</option>
            <option value="bengali">Bengali</option>
            <option value="north-indian">North Indian</option>
            <option value="chinese">Chinese</option>
            <option value="beverages">Beverages</option>
            <option value="desserts">Desserts</option>
          </select>
          <input type="text" id="menuSearch" placeholder="Search items..." oninput="loadMenuItems()">
        </div>
        <table class="admin-table" id="menuTable">
          <thead>
            <tr>
              <th>Name</th><th>Category</th><th>Price</th>
              <th>Type</th><th>Available</th><th>Actions</th>
            </tr>
          </thead>
          <tbody id="menuTableBody"></tbody>
        </table>
      </div>

      <!-- TAB: RESERVATIONS -->
      <div id="tab-reservations" class="admin-tab hidden">
        <div class="tab-header">
          <h2>Reservations</h2>
          <div class="res-filter-group">
            <select id="resStatusFilter" onchange="loadReservations()">
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="declined">Declined</option>
            </select>
            <input type="date" id="resDateFilter" onchange="loadReservations()">
          </div>
        </div>
        <div id="reservationsList"></div>
      </div>

      <!-- TAB: SETTINGS -->
      <div id="tab-settings" class="admin-tab hidden">
        <h2>Site Settings</h2>
        <div class="settings-form">
          <label>Restaurant Name
            <input type="text" id="set-name">
          </label>
          <label>Opening Hours
            <input type="text" id="set-hours">
          </label>
          <label>Zomato URL
            <input type="url" id="set-zomato">
          </label>
          <label>Swiggy URL
            <input type="url" id="set-swiggy">
          </label>
          <label>Announcement Banner (leave blank to hide)
            <textarea id="set-announcement"></textarea>
          </label>
          <button onclick="saveSettings()">💾 Save Settings</button>
        </div>
      </div>

    </main>
  </div>

  <!-- ITEM MODAL -->
  <div id="itemModal" class="modal hidden">
    <div class="modal-card">
      <h3 id="modalTitle">Add Menu Item</h3>
      <input  type="hidden"  id="editItemId">
      <input  type="text"    id="mName"     placeholder="Item Name *">
      <textarea              id="mDesc"     placeholder="Description"></textarea>
      <input  type="number"  id="mPrice"    placeholder="Price (₹) *" min="0">
      <select id="mCat">
        <option value="bengali">Bengali</option>
        <option value="north-indian">North Indian</option>
        <option value="chinese">Chinese</option>
        <option value="beverages">Beverages</option>
        <option value="desserts">Desserts</option>
      </select>
      <select id="mType">
        <option value="veg">🟢 Veg</option>
        <option value="nonveg">🔴 Non-Veg</option>
      </select>
      <input  type="url"     id="mImage"   placeholder="Image URL (optional)">
      <label class="toggle-row">
        <span>Available on menu</span>
        <input type="checkbox" id="mAvailable" checked>
      </label>
      <div class="modal-actions">
        <button onclick="saveMenuItem()">Save</button>
        <button onclick="closeItemModal()" class="btn-cancel">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Firebase SDK -->
  <script type="module" src="admin.js"></script>
</body>
</html>
```

**Step 4 — Admin JS (`admin/admin.js`)**
```javascript
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore, collection, doc, getDocs, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── Firebase config (from Firebase console → Project Settings → Your Apps)
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── Auth
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadMenuItems();
  } else {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
  }
});

async function adminLogin() {
  const email    = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    document.getElementById('loginError').textContent =
      'Invalid credentials. Please try again.';
  }
}

async function adminLogout() {
  await signOut(auth);
}

// ── Tab Navigation
function showTab(name) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.add('hidden'));
  document.getElementById(`tab-${name}`).classList.remove('hidden');
  if (name === 'reservations') loadReservations();
  if (name === 'settings')     loadSettings();
}

// ── MENU CRUD
async function loadMenuItems() {
  const cat    = document.getElementById('menuFilterCat').value;
  const search = document.getElementById('menuSearch').value.toLowerCase();
  const colRef = collection(db, 'menu');

  let q = cat === 'all' ? query(colRef, orderBy('name')) :
          query(colRef, where('category', '==', cat), orderBy('name'));

  const snap = await getDocs(q);
  const tbody = document.getElementById('menuTableBody');

  tbody.innerHTML = snap.docs
    .filter(d => d.data().name.toLowerCase().includes(search))
    .map(d => {
      const item = d.data();
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>₹${item.price}</td>
          <td>${item.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}</td>
          <td>
            <label class="toggle">
              <input type="checkbox" ${item.available ? 'checked' : ''}
                onchange="toggleAvailability('${d.id}', this.checked)">
              <span class="slider"></span>
            </label>
          </td>
          <td class="action-cell">
            <button onclick="openItemModal('${d.id}')">Edit</button>
            <button onclick="deleteMenuItem('${d.id}')" class="btn-danger">Delete</button>
          </td>
        </tr>
      `;
    }).join('');
}

async function saveMenuItem() {
  const id = document.getElementById('editItemId').value;
  const data = {
    name:      document.getElementById('mName').value.trim(),
    description: document.getElementById('mDesc').value.trim(),
    price:     Number(document.getElementById('mPrice').value),
    category:  document.getElementById('mCat').value,
    type:      document.getElementById('mType').value,
    image:     document.getElementById('mImage').value.trim(),
    available: document.getElementById('mAvailable').checked,
    updatedAt: serverTimestamp()
  };

  if (!data.name || !data.price) { alert('Name and price are required.'); return; }

  if (id) {
    await updateDoc(doc(db, 'menu', id), data);
  } else {
    await addDoc(collection(db, 'menu'), { ...data, createdAt: serverTimestamp() });
  }

  closeItemModal();
  loadMenuItems();
}

async function deleteMenuItem(id) {
  if (!confirm('Permanently delete this item?')) return;
  await deleteDoc(doc(db, 'menu', id));
  loadMenuItems();
}

async function toggleAvailability(id, available) {
  await updateDoc(doc(db, 'menu', id), { available, updatedAt: serverTimestamp() });
}

async function openItemModal(id = null) {
  document.getElementById('itemModal').classList.remove('hidden');
  document.getElementById('editItemId').value = id || '';
  document.getElementById('modalTitle').textContent = id ? 'Edit Menu Item' : 'Add Menu Item';

  if (id) {
    const snap = await getDocs(query(collection(db, 'menu'), where('__name__', '==', id)));
    // Simpler: use getDoc
    const { getDoc } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    const docSnap = await getDoc(doc(db, 'menu', id));
    const d = docSnap.data();
    document.getElementById('mName').value      = d.name;
    document.getElementById('mDesc').value      = d.description;
    document.getElementById('mPrice').value     = d.price;
    document.getElementById('mCat').value       = d.category;
    document.getElementById('mType').value      = d.type;
    document.getElementById('mImage').value     = d.image || '';
    document.getElementById('mAvailable').checked = d.available;
  } else {
    ['mName','mDesc','mPrice','mImage'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('mAvailable').checked = true;
  }
}

function closeItemModal() {
  document.getElementById('itemModal').classList.add('hidden');
}

// ── RESERVATIONS
async function loadReservations() {
  const status = document.getElementById('resStatusFilter').value;
  const date   = document.getElementById('resDateFilter').value;

  let q = status === 'all'
    ? query(collection(db, 'reservations'), orderBy('createdAt', 'desc'))
    : query(collection(db, 'reservations'), where('status', '==', status), orderBy('createdAt', 'desc'));

  const snap = await getDocs(q);
  const list = document.getElementById('reservationsList');

  list.innerHTML = snap.docs
    .filter(d => !date || d.data().date === date)
    .map(d => {
      const r = d.data();
      const statusColor = { pending: '#f59e0b', confirmed: '#22c55e', declined: '#ef4444' };
      return `
        <div class="res-card">
          <div class="res-header">
            <strong>${r.name}</strong>
            <span class="res-status" style="color:${statusColor[r.status]}">${r.status.toUpperCase()}</span>
          </div>
          <div class="res-details">
            <span>📞 ${r.phone}</span>
            <span>📅 ${r.date} at ${r.time}</span>
            <span>👥 ${r.guests} guests</span>
            <span>🎉 ${r.occasion || 'General'}</span>
          </div>
          ${r.note ? `<p class="res-note">📝 ${r.note}</p>` : ''}
          <div class="res-actions">
            <button onclick="updateResStatus('${d.id}','confirmed')" class="btn-confirm">✅ Confirm</button>
            <button onclick="updateResStatus('${d.id}','declined')"  class="btn-decline">❌ Decline</button>
            <a href="https://wa.me/${r.phone.replace(/\D/g,'')}" target="_blank" class="btn-wa">
              💬 WhatsApp
            </a>
          </div>
        </div>
      `;
    }).join('') || '<p class="empty-state">No reservations found.</p>';
}

async function updateResStatus(id, status) {
  await updateDoc(doc(db, 'reservations', id), { status, updatedAt: serverTimestamp() });
  loadReservations();
}

// ── SETTINGS
async function loadSettings() {
  const snap = await getDocs(collection(db, 'settings'));
  if (!snap.empty) {
    const s = snap.docs[0].data();
    document.getElementById('set-name').value         = s.restaurantName || '';
    document.getElementById('set-hours').value        = s.openingHours || '';
    document.getElementById('set-zomato').value       = s.zomatoUrl || '';
    document.getElementById('set-swiggy').value       = s.swiggyUrl || '';
    document.getElementById('set-announcement').value = s.announcement || '';
  }
}

async function saveSettings() {
  const data = {
    restaurantName: document.getElementById('set-name').value,
    openingHours:   document.getElementById('set-hours').value,
    zomatoUrl:      document.getElementById('set-zomato').value,
    swiggyUrl:      document.getElementById('set-swiggy').value,
    announcement:   document.getElementById('set-announcement').value,
    updatedAt:      serverTimestamp()
  };
  const snap = await getDocs(collection(db, 'settings'));
  if (!snap.empty) {
    await updateDoc(doc(db, 'settings', snap.docs[0].id), data);
  } else {
    await addDoc(collection(db, 'settings'), data);
  }
  alert('✅ Settings saved!');
}

// Expose to onclick handlers
window.adminLogin        = adminLogin;
window.adminLogout       = adminLogout;
window.showTab           = showTab;
window.openItemModal     = openItemModal;
window.closeItemModal    = closeItemModal;
window.saveMenuItem      = saveMenuItem;
window.deleteMenuItem    = deleteMenuItem;
window.toggleAvailability = toggleAvailability;
window.loadMenuItems     = loadMenuItems;
window.loadReservations  = loadReservations;
window.updateResStatus   = updateResStatus;
window.saveSettings      = saveSettings;
```

**Step 5 — Firestore Security Rules**
```javascript
// In Firebase Console → Firestore → Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Menu: public can READ, only authenticated admin can WRITE
    match /menu/{itemId} {
      allow read:  if true;
      allow write: if request.auth != null;
    }

    // Reservations: anyone can CREATE (from website form), only admin can READ/UPDATE
    match /reservations/{resId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // Settings: public can READ, only admin can WRITE
    match /settings/{docId} {
      allow read:  if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Step 6 — Update main site to read menu from Firestore**
```javascript
// Replace local menuData array in main.js with Firestore fetch
import { initializeApp }    from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, query, where, getDocs, orderBy }
                            from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig); // same config as admin
const db  = getFirestore(app);

async function renderMenu(category = 'bengali') {
  const q    = query(collection(db, 'menu'),
                 where('category', '==', category),
                 where('available', '==', true),
                 orderBy('name'));
  const snap = await getDocs(q);
  const grid = document.getElementById('menuGrid');

  grid.innerHTML = snap.docs.map(d => {
    const item = d.data();
    return `
      <div class="menu-card">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : '<div class="no-img">🍽️</div>'}
        <div class="menu-card-body">
          <span class="badge ${item.type}">${item.type === 'veg' ? '🟢' : '🔴'}</span>
          <h4>${item.name}</h4>
          <p>${item.description || ''}</p>
          <span class="price">₹${item.price}</span>
        </div>
      </div>
    `;
  }).join('') || '<p class="empty-cat">Coming soon!</p>';
}
```

### Admin Dashboard Feature Summary

| Feature | What it does |
|---|---|
| 🔐 Firebase Auth login | Only the registered admin email can access `/admin` |
| 📋 Menu Manager | Add / Edit / Delete items, toggle availability live |
| 📅 Reservations | View all requests, filter by status or date, confirm/decline, open WhatsApp |
| ⚙️ Settings | Edit restaurant name, hours, delivery links, announcement banner |
| 🌐 Live sync | Changes in admin immediately reflect on the public site via Firestore |

### Updated `.env` Summary (all integrations)
```
# Google
GOOGLE_PLACES_API_KEY=your_key
GOOGLE_PLACE_ID=your_place_id

# Instagram
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
INSTAGRAM_USER_ID=your_numeric_id

# Wati (WhatsApp chatbot)
WATI_API_URL=https://live-mt-server.wati.io/YOUR_ACCOUNT_ID
WATI_API_TOKEN=your_wati_bearer_token
OWNER_WHATSAPP=91XXXXXXXXXX

# Firebase (public config — safe to include in frontend)
FIREBASE_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project_id
```

> **Note**: Firebase config values (apiKey, projectId etc.) are safe to include in frontend code — they identify your project but don't grant access. Actual security is enforced by Firestore Security Rules defined in the Firebase console.

---

## 🗃️ Updated File & Folder Structure

```
restaurant-website/
│
├── index.html                    ← Public landing page
├── style.css                     ← Global styles
├── main.js                       ← Carousel, menu (Firestore), WA form, i18n
├── translations.js               ← EN / HI / BN strings
├── .env                          ← All API keys (never commit)
│
├── admin/
│   ├── index.html                ← Admin dashboard (Firebase Auth gated)
│   ├── admin.js                  ← Full Firestore CRUD
│   └── admin.css                 ← Dashboard-only styles
│
├── assets/
│   ├── logo.svg
│   ├── hero-bg.jpg
│   ├── zomato-badge.svg
│   ├── swiggy-badge.svg
│   ├── gallery/                  ← 8–12 ambience photos
│   └── menu/                     ← Dish photos (or use Firestore image URLs)
│
└── api/                          ← Vercel serverless functions
    ├── reviews.js                ← Google Places
    ├── instagram.js              ← Instagram Basic Display API
    └── send-reservation.js       ← Wati WhatsApp chatbot trigger
```

---

## 🚀 Updated Deployment Checklist

- [ ] All original items from v1.0 checklist
- [ ] Create Firebase project, enable Auth + Firestore
- [ ] Add admin user email in Firebase Authentication
- [ ] Set Firestore Security Rules as specified above
- [ ] Seed initial menu data into Firestore (or use admin panel)
- [ ] Connect Instagram account to Meta Developer app, generate long-lived token
- [ ] Set up Wati account, connect WhatsApp Business number, create reservation template
- [ ] Add all `.env` variables to Vercel dashboard (Settings → Environment Variables)
- [ ] Test `/admin` login, menu CRUD, reservation confirm/decline flows
- [ ] Test language switcher in EN, HI, BN on mobile and desktop
- [ ] Set up weekly cron job for Instagram token refresh (Vercel Cron or GitHub Actions)
- [ ] Block `/admin` from search engine indexing via `robots.txt`

```
# robots.txt
User-agent: *
Disallow: /admin/
```

---

*Blueprint version 2.0 · Prepared for Lanka, Varanasi Restaurant · 2025*
