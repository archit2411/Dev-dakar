import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── Firebase config — replace with values from Firebase Console ──
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

// ── Auth ─────────────────────────────────────
// onAuthStateChanged(auth, user => {
  //if (user) {
    //document.getElementById('loginScreen').classList.add('hidden');
    //document.getElementById('dashboard').classList.remove('hidden');
    //loadMenuItems();
  //} else {
    //document.getElementById('loginScreen').classList.remove('hidden');
    //document.getElementById('dashboard').classList.add('hidden');
  //}
//});//

/*async function adminLogin() {
  const email    = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;
  const errEl    = document.getElementById('loginError');
  errEl.textContent = '';
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (_) {
    errEl.textContent = 'Invalid credentials. Please try again.';
  }
}*/

// ✅ TEMPORARY LOCAL LOGIN (use this for now)
function adminLogin() {
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;
  const errEl = document.getElementById('loginError');

  errEl.textContent = '';

  // ✅ Hardcoded credentials
  const ADMIN_EMAIL = "admin@test.com";
  const ADMIN_PASSWORD = "1234";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    // save session
    localStorage.setItem("isAdminLoggedIn", "true");

    loadMenuItems(); // ✅ keep existing functionality
  } else {
    errEl.textContent = "Invalid credentials. Please try again.";
  }
}


/*async function adminLogout() {
  await signOut(auth);
}*/
function adminLogout() {
  localStorage.removeItem("isAdminLoggedIn");

  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
}

// ✅ Auto login if already logged in
window.onload = function () {
  if (localStorage.getItem("isAdminLoggedIn") === "true") {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadMenuItems();
  }
};

``

// ── Tab Navigation ────────────────────────────
function showTab(name) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-sidebar nav a').forEach(a => a.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  document.getElementById(`nav-${name}`)?.classList.add('active');
  if (name === 'reservations') loadReservations();
  if (name === 'settings')     loadSettings();
}

// ── Menu CRUD ─────────────────────────────────
async function loadMenuItems() {
  const cat    = document.getElementById('menuFilterCat').value;
  const search = document.getElementById('menuSearch').value.toLowerCase();
  const colRef = collection(db, 'menu');

  const q = cat === 'all'
    ? query(colRef, orderBy('name'))
    : query(colRef, where('category', '==', cat), orderBy('name'));

  const snap  = await getDocs(q);
  const tbody = document.getElementById('menuTableBody');

  const rows = snap.docs.filter(d => d.data().name.toLowerCase().includes(search));

  tbody.innerHTML = rows.length ? rows.map(d => {
    const item = d.data();
    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td style="font-family:var(--font-mono);font-size:0.82rem;color:var(--text-soft)">${item.category}</td>
        <td style="font-family:var(--font-mono);color:#F2B33D">₹${item.price}</td>
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
      </tr>`;
  }).join('') : `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-soft);font-family:var(--font-mono)">No items found.</td></tr>`;
}

async function openItemModal(id = null) {
  document.getElementById('itemModal').classList.remove('hidden');
  document.getElementById('editItemId').value = id || '';
  document.getElementById('modalTitle').textContent = id ? 'Edit Menu Item' : 'Add Menu Item';

  if (id) {
    const docSnap = await getDoc(doc(db, 'menu', id));
    if (!docSnap.exists()) return;
    const d = docSnap.data();
    document.getElementById('mName').value         = d.name || '';
    document.getElementById('mDesc').value         = d.description || '';
    document.getElementById('mPrice').value        = d.price || '';
    document.getElementById('mCat').value          = d.category || 'bengali';
    document.getElementById('mType').value         = d.type || 'veg';
    document.getElementById('mImage').value        = d.image || '';
    document.getElementById('mAvailable').checked  = d.available !== false;
  } else {
    ['mName','mDesc','mPrice','mImage'].forEach(fid => document.getElementById(fid).value = '');
    document.getElementById('mCat').value         = 'bengali';
    document.getElementById('mType').value        = 'veg';
    document.getElementById('mAvailable').checked = true;
  }
}

function closeItemModal() {
  document.getElementById('itemModal').classList.add('hidden');
}

async function saveMenuItem() {
  const id = document.getElementById('editItemId').value;
  const data = {
    name:        document.getElementById('mName').value.trim(),
    description: document.getElementById('mDesc').value.trim(),
    price:       Number(document.getElementById('mPrice').value),
    category:    document.getElementById('mCat').value,
    type:        document.getElementById('mType').value,
    image:       document.getElementById('mImage').value.trim(),
    available:   document.getElementById('mAvailable').checked,
    updatedAt:   serverTimestamp()
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
  if (!confirm('Permanently delete this item? This cannot be undone.')) return;
  await deleteDoc(doc(db, 'menu', id));
  loadMenuItems();
}

async function toggleAvailability(id, available) {
  await updateDoc(doc(db, 'menu', id), { available, updatedAt: serverTimestamp() });
}

// ── Reservations ──────────────────────────────
async function loadReservations() {
  const status = document.getElementById('resStatusFilter').value;
  const date   = document.getElementById('resDateFilter').value;

  const q = status === 'all'
    ? query(collection(db, 'reservations'), orderBy('createdAt', 'desc'))
    : query(collection(db, 'reservations'), where('status', '==', status), orderBy('createdAt', 'desc'));

  const snap = await getDocs(q);
  const list = document.getElementById('reservationsList');

  const statusColor = { pending: '#f59e0b', confirmed: '#22c55e', declined: '#ef4444' };

  const cards = snap.docs
    .filter(d => !date || d.data().date === date)
    .map(d => {
      const r = d.data();
      const sc = statusColor[r.status] || '#999';
      return `
        <div class="res-card">
          <div class="res-header">
            <strong>${r.name}</strong>
            <span class="res-status" style="color:${sc}">${(r.status || 'pending').toUpperCase()}</span>
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
            <a href="https://wa.me/${(r.phone || '').replace(/\D/g,'')}" target="_blank" class="btn-wa">💬 WhatsApp</a>
          </div>
        </div>`;
    });

  list.innerHTML = cards.length
    ? cards.join('')
    : '<p class="empty-state">No reservations found.</p>';
}

async function updateResStatus(id, status) {
  await updateDoc(doc(db, 'reservations', id), { status, updatedAt: serverTimestamp() });
  loadReservations();
}

// ── Settings ──────────────────────────────────
async function loadSettings() {
  const snap = await getDocs(collection(db, 'settings'));
  if (!snap.empty) {
    const s = snap.docs[0].data();
    document.getElementById('set-name').value         = s.restaurantName || '';
    document.getElementById('set-hours').value        = s.openingHours   || '';
    document.getElementById('set-zomato').value       = s.zomatoUrl      || '';
    document.getElementById('set-swiggy').value       = s.swiggyUrl      || '';
    document.getElementById('set-announcement').value = s.announcement   || '';
  }
}

async function saveSettings() {
  const data = {
    restaurantName: document.getElementById('set-name').value.trim(),
    openingHours:   document.getElementById('set-hours').value.trim(),
    zomatoUrl:      document.getElementById('set-zomato').value.trim(),
    swiggyUrl:      document.getElementById('set-swiggy').value.trim(),
    announcement:   document.getElementById('set-announcement').value.trim(),
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

// ── Expose to onclick handlers ────────────────
window.adminLogin         = adminLogin;
window.adminLogout        = adminLogout;
window.showTab            = showTab;
window.openItemModal      = openItemModal;
window.closeItemModal     = closeItemModal;
window.saveMenuItem       = saveMenuItem;
window.deleteMenuItem     = deleteMenuItem;
window.toggleAvailability = toggleAvailability;
window.loadMenuItems      = loadMenuItems;
window.loadReservations   = loadReservations;
window.updateResStatus    = updateResStatus;
window.saveSettings       = saveSettings;
