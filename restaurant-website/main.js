/* ═══════════════════════════════════════════════
   main.js  —  Carousel · Menu · Reservations · i18n
   ═══════════════════════════════════════════════ */

// ── i18n ──────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });

  document.documentElement.lang = lang;
  updateFontForScript(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const active = document.getElementById(`lang-${lang}`);
  if (active) active.classList.add('active');
}

function updateFontForScript(lang) {
  const root = document.documentElement;
  if (lang === 'hi') {
    root.style.setProperty('--font-body',    '"Hind", sans-serif');
    root.style.setProperty('--font-display', '"Rozha One", serif');
  } else if (lang === 'bn') {
    root.style.setProperty('--font-body',    '"Hind Siliguri", sans-serif');
    root.style.setProperty('--font-display', '"Tiro Devanagari Bengali", serif');
  } else {
    root.style.setProperty('--font-body',    '"Lora", serif');
    root.style.setProperty('--font-display', '"Yatra One", cursive');
  }
}

// ── Carousel ──────────────────────────────────
let carouselCurrent = 0;
let carouselTimer;

function initCarousel() {
  const track  = document.getElementById('carouselTrack');
  if (!track) return;
  const slides = track.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('carouselDots');

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  startAutoplay();

  // Touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveCarousel(diff > 0 ? 1 : -1);
  });
}

function moveCarousel(direction) {
  const track  = document.getElementById('carouselTrack');
  const slides = track.querySelectorAll('.slide');
  carouselCurrent = (carouselCurrent + direction + slides.length) % slides.length;
  track.style.transform = `translateX(-${carouselCurrent * 100}%)`;
  updateDots();
  resetAutoplay();
}

function goToSlide(index) {
  const track = document.getElementById('carouselTrack');
  carouselCurrent = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
  resetAutoplay();
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselCurrent);
  });
}

function startAutoplay() {
  carouselTimer = setInterval(() => moveCarousel(1), 4000);
}

function resetAutoplay() {
  clearInterval(carouselTimer);
  startAutoplay();
}

// ── Menu ──────────────────────────────────────
let activeCategory = 'bengali';
let DEV_MODE = false;
const DEV_PASSWORD = 'dakar2025dev'; // Change before going live

function renderMenu(category) {
  activeCategory = category || activeCategory;
  const grid = document.getElementById('menuGrid');
  const t    = translations[currentLang];
  const filtered = menuData.filter(i => i.category === activeCategory && i.available);

  if (!filtered.length) {
    grid.innerHTML = `<p style="text-align:center;color:#888;grid-column:1/-1;font-family:var(--font-mono);padding:32px 0;">${t['menu.coming_soon'] || 'Coming soon!'}</p>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card" data-id="${item.id}">
      ${item.image
        ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
        : '<div class="no-img">🍽️</div>'}
      <div class="menu-card-body">
        <span class="badge ${item.type}">${item.type === 'veg'
          ? `🟢 ${t['menu.badge.veg'] || 'Veg'}`
          : `🔴 ${t['menu.badge.nonveg'] || 'Non-Veg'}`}</span>
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <span class="price">₹${item.price}</span>
        ${DEV_MODE ? `
          <div class="dev-actions">
            <button onclick="editDevItem('${item.id}')">Edit</button>
            <button onclick="deleteDevItem('${item.id}')">Delete</button>
            <button onclick="toggleDevAvailability('${item.id}')">${item.available ? 'Hide' : 'Show'}</button>
          </div>` : ''}
      </div>
    </div>
  `).join('');
}

function switchTab(cat) {
  activeCategory = cat;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.tab[data-cat="${cat}"]`);
  if (activeTab) activeTab.classList.add('active');
  renderMenu(cat);
}

// Dev Mode
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'D') {
    const pass = prompt('Enter developer password:');
    if (pass === DEV_PASSWORD) {
      DEV_MODE = true;
      const panel = document.getElementById('devPanel');
      if (panel) panel.classList.remove('hidden');
      renderMenu();
      alert('✅ Developer mode enabled');
    } else {
      alert('❌ Incorrect password');
    }
  }
});

// Dev CRUD
function addMenuItem() {
  const name  = document.getElementById('itemName').value.trim();
  const desc  = document.getElementById('itemDesc').value.trim();
  const price = parseFloat(document.getElementById('itemPrice').value);
  const cat   = document.getElementById('itemCat').value;
  const type  = document.getElementById('itemType').value;
  const img   = document.getElementById('itemImg').value.trim();

  if (!name || !price) { alert('Name and price are required.'); return; }

  const id = cat.charAt(0) + Date.now();
  menuData.push({ id, name, description: desc, price, category: cat, type, image: img, available: true });
  saveToStorage();
  renderMenu(cat);
  ['itemName','itemDesc','itemPrice','itemImg'].forEach(fid => document.getElementById(fid).value = '');
}

function deleteDevItem(id) {
  if (!confirm('Delete this item permanently?')) return;
  const idx = menuData.findIndex(i => i.id === id);
  if (idx > -1) menuData.splice(idx, 1);
  saveToStorage();
  renderMenu();
}

function toggleDevAvailability(id) {
  const item = menuData.find(i => i.id === id);
  if (item) item.available = !item.available;
  saveToStorage();
  renderMenu();
}

function editDevItem(id) {
  const item = menuData.find(i => i.id === id);
  if (!item) return;
  const newName  = prompt('Item name:', item.name);
  if (newName === null) return;
  const newPrice = prompt('Price (₹):', item.price);
  if (newPrice === null) return;
  const newDesc  = prompt('Description:', item.description);
  item.name        = newName.trim() || item.name;
  item.price       = parseFloat(newPrice) || item.price;
  item.description = (newDesc !== null ? newDesc.trim() : item.description);
  saveToStorage();
  renderMenu();
}

function saveToStorage() {
  localStorage.setItem('menuData', JSON.stringify(menuData));
}

// Load persisted menu edits from localStorage
(function loadStoredMenu() {
  const stored = localStorage.getItem('menuData');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      menuData.length = 0;
      parsed.forEach(i => menuData.push(i));
    } catch (_) { /* ignore corrupt data */ }
  }
})();

// ── WhatsApp Reservation ──────────────────────
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

  // Replace with actual restaurant WhatsApp number (country code + number, digits only)
  const RESTAURANT_WA_NUMBER = '91XXXXXXXXXX';

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const message = [
    '🍽️ *New Reservation Request*',
    '',
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    `📅 *Date:* ${formattedDate}`,
    `⏰ *Time:* ${time}`,
    `🎉 *Occasion:* ${occasion || 'Not specified'}`,
    `👥 *Guests:* ${guests}`,
    `📝 *Special Requests:* ${note || 'None'}`,
    '',
    '_Sent from website reservation form_'
  ].join('\n');

  const waURL = `https://wa.me/${RESTAURANT_WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waURL, '_blank');

  const success = document.getElementById('resSuccess');
  if (success) {
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 6000);
  }
}

// ── Instagram Feed ────────────────────────────
async function loadInstagramFeed() {
  const grid = document.getElementById('igGrid');
  if (!grid) return;

  try {
    const data = await fetch('/api/instagram').then(r => {
      if (!r.ok) throw new Error('API unavailable');
      return r.json();
    });

    grid.innerHTML = data.data.map(post => {
      const imgSrc  = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
      const caption = post.caption
        ? post.caption.substring(0, 80) + (post.caption.length > 80 ? '…' : '')
        : '';
      return `
        <a href="${post.permalink}" target="_blank" class="ig-post" rel="noopener noreferrer">
          <img src="${imgSrc}" alt="${caption}" loading="lazy">
          <div class="ig-overlay">
            ${post.media_type === 'VIDEO' ? '<span class="ig-video-badge">▶</span>' : ''}
            <p>${caption}</p>
          </div>
        </a>`;
    }).join('');
  } catch (_) {
    grid.innerHTML = `<p class="ig-error">Feed unavailable.
      <a href="https://instagram.com/YOUR_HANDLE" target="_blank">Visit us on Instagram →</a></p>`;
  }
}

// ── Google Reviews ────────────────────────────
async function loadReviews() {
  try {
    const data = await fetch('/api/reviews').then(r => {
      if (!r.ok) throw new Error('API unavailable');
      return r.json();
    });

    const ratingEl = document.getElementById('overallRating');
    const totalEl  = document.getElementById('totalReviews');
    if (ratingEl) ratingEl.textContent = data.rating;
    if (totalEl)  totalEl.textContent  = `${data.total} reviews`;

    const container = document.getElementById('reviewsGrid');
    if (!container) return;

    container.innerHTML = data.reviews.map(r => `
      <div class="review-card">
        <div class="reviewer">
          <div class="reviewer-avatar">
            ${r.profile_photo_url
              ? `<img src="${r.profile_photo_url}" alt="${r.author_name}">`
              : r.author_name.charAt(0)}
          </div>
          <div>
            <strong>${r.author_name}</strong>
            <span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
          </div>
        </div>
        <p>${r.text}</p>
        <small>${new Date(r.time * 1000).toLocaleDateString('en-IN')}</small>
      </div>`
    ).join('');
  } catch (_) {
    // Show static fallback reviews when API is unavailable
    renderStaticReviews();
  }
}

function renderStaticReviews() {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;
  const staticReviews = [
    { name:"Ria Banerjee",  rating:5, text:"The Shorshe Ilish took me straight back to Kolkata. Authentic Bengali flavours in the heart of Varanasi. A rare gem!" },
    { name:"Arjun Sharma",  rating:5, text:"Absolutely loved the Kosha Mangsho and Garlic Naan combo. The ambience is warm, staff is friendly. Will definitely return." },
    { name:"Priya Gupta",   rating:4, text:"Chingri Malaikari was outstanding. The restaurant has a beautiful diya-lit atmosphere. Great for family dinners." },
    { name:"Souvik Das",    rating:5, text:"Dal Makhani paired with Chicken Biryani — perfection. The Bengali + North Indian fusion works beautifully." },
    { name:"Neha Singh",    rating:4, text:"The Chinese section surprised me! Chilli Paneer was crispy and perfectly spiced. Overall a wonderful experience." },
    { name:"Rahul Verma",   rating:5, text:"Mishti Doi to end the meal — exactly like my dida used to make. Brilliant find in Lanka!" }
  ];
  container.innerHTML = staticReviews.map(r => `
    <div class="review-card">
      <div class="reviewer">
        <div class="reviewer-avatar">${r.name.charAt(0)}</div>
        <div>
          <strong>${r.name}</strong>
          <span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
        </div>
      </div>
      <p>${r.text}</p>
    </div>`
  ).join('');
}

// ── Navbar scroll shadow ──────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(26,10,2,0.97)'
      : 'rgba(26,10,2,0.85)';
  });
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
  });
}

// ── DOMContentLoaded ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  initCarousel();
  renderMenu('bengali');
  initNavbar();
  loadReviews();
  loadInstagramFeed();
});

// Expose globally (onclick handlers in HTML)
window.setLanguage            = setLanguage;
window.moveCarousel           = moveCarousel;
window.switchTab              = switchTab;
window.addMenuItem            = addMenuItem;
window.deleteDevItem          = deleteDevItem;
window.toggleDevAvailability  = toggleDevAvailability;
window.editDevItem            = editDevItem;
window.sendWhatsAppReservation = sendWhatsAppReservation;
