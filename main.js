/* ============================================================
   RIDGEWAYS FORTE — Main JavaScript
   ============================================================
   HOW TO CHANGE THE WHATSAPP NUMBER:
   Search for "WHATSAPP_NUMBER" below and replace the number.

   HOW TO ADD MORE LISTINGS:
   See the "listings data" array — add a new object following
   the same pattern. Images go in /images/ folder.

   HOW TO ADD FILTER TABS:
   Add a new tab name in the filterTabs array below.
   ============================================================ */

/* ── WHATSAPP NUMBER ──
   Change this to your actual WhatsApp number (include country code, no +) */
const WHATSAPP_NUMBER = "254793035731";
/* ── WHATSAPP MESSAGE (pre-filled when user clicks) ── */
const WHATSAPP_MESSAGE = "Hello Ridgeways Forte, I would like to enquire about a property.";

/* ── LISTINGS DATA ──
   Add, remove, or edit listings here.
   "image" → file path relative to site root, e.g. "images/apt1.jpg"
   "type"  → used for filter tabs: "apartment" | "townhouse" | "villa" | "commercial"
   ── */
const listings = [
  {
    id: 1,
    name: "Ridgeways Gardens",
    location: "Ridgeways Lane, Kiambu Road, Nairobi",
    price: "Kes. 32,000/mo",
    beds: 2,
    baths: 2,
    type: "apartment",
    status: "rent",
    badge: "Featured",
    /* ── Replace with your actual apartment photo ── */
    image: "apa.jpg",
    imageAlt: "Ridgeways Gardens Apartment"
  },
  {
    id: 2,
    name: "Forte Heights",
    location: "Muthaiga North, Nairobi",
    price: "Kes. 55,000/mo",
    beds: 3,
    baths: 3,
    type: "townhouse",
    status: "rent",
    badge: "New Listing",
    /* ── Replace with your actual apartment photo ── */
    image: "apartment 1.jpg",
    imageAlt: "Forte Heights Townhouse"
  },
  {
    id: 3,
    name: "Cedar View Apartments",
    location: "Githurai 44, Nairobi",
    price: "Kes. 22,000/mo",
    beds: 1,
    baths: 1,
    type: "apartment",
    status: "rent",
    badge: "",
    /* ── Replace with your actual apartment photo ── */
    image: "apartment 2.jpg",
    imageAlt: "Cedar View Apartments"
  },
  {
    id: 4,
    name: "Kiambu Crest",
    location: "Kiambu Road, Nairobi",
    price: "Kes. 18,000/mo",
    beds: 1,
    baths: 1,
    type: "apartment",
    status: "rent",
    badge: "New Property",
    /* ── Replace with your actual apartment photo ── */
    image: "apartment 3.jpg",
    imageAlt: "Kiambu Crest Apartment"
  },
  {
    id: 5,
    name: "Westridge Suites",
    location: "Westlands, Nairobi",
    price: "Kes. 75,000/mo",
    beds: 4,
    baths: 4,
    type: "villa",
    status: "rent",
    badge: "",
    /* ── Replace with your actual apartment photo ── */
    image: "apartments 8.jpg",
    imageAlt: "Westridge Suites Villa"
  },
  {
    id: 6,
    name: "Lavington Court",
    location: "Lavington, Nairobi",
    price: "Kes. 45,000/mo",
    beds: 3,
    baths: 2,
    type: "apartment",
    status: "rent",
    badge: "",
    /* ── Replace with your actual apartment photo ── */
    image: "apartment 4.jpg",
    imageAlt: "Lavington Court Apartment"
  },
  {
    id: 7,
    name: "Greenview Office Park",
    location: "Upperhill, Nairobi",
    price: "Kes. 90,000/mo",
    beds: 0,
    baths: 2,
    type: "commercial",
    status: "rent",
    badge: "Featured",
    /* ── Replace with your actual office photo ── */
    image: "apartment 9.jpg",
    imageAlt: "Greenview Office Park"
  },
  {
    id: 8,
    name: "Roysambu Residences",
    location: "Roysambu, Nairobi",
    price: "Kes. 16,000/mo",
    beds: 1,
    baths: 1,
    type: "apartment",
    status: "rent",
    badge: "",
    /* ── Replace with your actual apartment photo ── */
    image: "apartment 5.jpg",
    imageAlt: "Roysambu Residences"
  },
  {
    id: 9,
    name: "Utawala Premium Townhouse",
    location: "Utawala Road, Nairobi",
    price: "Kes. 38,000/mo",
    beds: 3,
    baths: 3,
    type: "townhouse",
    status: "rent",
    badge: "New Listing",
    /* ── Replace with your actual townhouse photo ── */
    image: "apartment 6.jpg",
    imageAlt: "Utawala Premium Townhouse"
  }
];

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const bars = document.querySelectorAll(".hamburger span");
  menu.classList.toggle("open");

  /* Animate hamburger to X */
  if (menu.classList.contains("open")) {
    bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    bars.forEach(b => { b.style.transform = ""; b.style.opacity = ""; });
  }
}

/* ============================================================
   RENDER LISTINGS
   ============================================================ */
function getBadgeHTML(badge, status) {
  let html = "";
  html += `<span class="badge badge-${status === "rent" ? "rent" : "sale"}">${status === "rent" ? "For Rent" : "For Sale"}</span>`;
  if (badge) html += ` <span class="badge badge-new">${badge}</span>`;
  return html;
}

function getMetaHTML(beds, baths, type) {
  let items = [];
  if (beds > 0) items.push(`<span><span class="meta-icon">🛏</span> ${beds} Bed${beds > 1 ? "s" : ""}</span>`);
  items.push(`<span><span class="meta-icon">🚿</span> ${baths} Bath${baths > 1 ? "s" : ""}</span>`);
  items.push(`<span><span class="meta-icon">🏢</span> ${type.charAt(0).toUpperCase() + type.slice(1)}</span>`);
  return items.join("");
}

function renderListings(filter) {
  const grid = document.getElementById("listingsGrid");
  if (!grid) return;

  const filtered = filter === "all"
    ? listings
    : listings.filter(l => l.type === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:48px 0; font-size:15px;">No listings found in this category.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(l => `
    <div class="listing-card reveal" data-id="${l.id}">
      <div class="listing-img-wrap">
        <!-- ── APARTMENT IMAGE ──
             Replace src with your actual photo path, e.g. "images/apt1.jpg"
             Keep the class="listing-img" so hover zoom works. ── -->
        <img
          class="listing-img"
          src="${l.image}"
          alt="${l.imageAlt}"
          onerror="this.parentElement.innerHTML=getImgPlaceholder('${l.imageAlt}')"
        >
        <div class="listing-badges">${getBadgeHTML(l.badge, l.status)}</div>
        <div class="listing-price-tag">${l.price}</div>
      </div>
      <div class="listing-body">
        <h3>${l.name}</h3>
        <div class="listing-loc"><span class="loc-icon">📍</span>${l.location}</div>
        <div class="listing-meta">${getMetaHTML(l.beds, l.baths, l.type)}</div>
      </div>
      <button class="listing-view-btn" onclick="viewListing(${l.id})">View Details →</button>
    </div>
  `).join("");

  /* Re-observe new cards for scroll animations */
  observeReveal();
}

/* Fallback placeholder for missing images */
function getImgPlaceholder(label) {
  return `<div class="img-placeholder" style="height:100%;min-height:220px;">
    <span>🏠</span>
    <div style="font-size:12px; color:var(--text-muted); text-align:center; padding:0 16px;">
      Add your photo here<br><em>${label}</em>
    </div>
  </div>`;
}

/* View listing — replace this with navigation to a detail page */
function viewListing(id) {
  const listing = listings.find(l => l.id === id);
  if (listing) {
    /* Option A: open WhatsApp with property name pre-filled */
    const msg = `Hello Ridgeways Forte, I am interested in "${listing.name}" at ${listing.location}. Please share more details.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    /* Option B: navigate to a detail page
       window.location.href = `pages/listing-detail.html?id=${id}`;
    */
  }
}

/* ============================================================
   FILTER TABS
   ============================================================ */
function setupFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      renderListings(this.dataset.filter);
    });
  });
}

/* ============================================================
   SCROLL REVEAL ANIMATION
   ============================================================ */
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80); /* stagger delay */
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ============================================================
   FORM SUBMISSION
   ============================================================ */
function setupForm() {
  const form = document.getElementById("inquiryForm");
  const btn  = document.getElementById("formSubmit");
  if (!form || !btn) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* Basic validation */
    const name  = form.querySelector("[name='fullname']").value.trim();
    const phone = form.querySelector("[name='phone']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();

    if (!name || !phone || !email) {
      showFormMsg("Please fill in Name, Phone, and Email.", "error");
      return;
    }

    btn.textContent = "Sending...";
    btn.disabled = true;

    /* Simulate sending — replace with real fetch/emailjs call */
    setTimeout(() => {
      btn.textContent = "✓ Inquiry Sent!";
      btn.classList.add("sent");
      showFormMsg("Thank you! We'll be in touch within 24 hours.", "success");
      form.reset();

      /* Reset button after 4 seconds */
      setTimeout(() => {
        btn.textContent = "Submit Inquiry";
        btn.classList.remove("sent");
        btn.disabled = false;
        hideFormMsg();
      }, 4000);
    }, 1400);
  });
}

function showFormMsg(msg, type) {
  let el = document.getElementById("formMessage");
  if (!el) {
    el = document.createElement("div");
    el.id = "formMessage";
    document.getElementById("inquiryForm").prepend(el);
  }
  el.textContent = msg;
  el.style.cssText = `
    padding: 12px 16px; border-radius: 4px; font-size: 13px;
    margin-bottom: 16px; font-weight: bold;
    background: ${type === "success" ? "#E8F5EE" : "#FEE2E2"};
    color: ${type === "success" ? "#1E7A4A" : "#B91C1C"};
    border: 1px solid ${type === "success" ? "#1E7A4A" : "#B91C1C"};
  `;
}
function hideFormMsg() {
  const el = document.getElementById("formMessage");
  if (el) el.remove();
}

/* ============================================================
   WHATSAPP FLOATING BUTTON
   ============================================================ */
function setupWhatsApp() {
  const btn = document.getElementById("whatsappFloat");
  if (!btn) return;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  btn.href = url;
}

/* ============================================================
   SEARCH FORM
   ============================================================ */
function setupSearch() {
  const searchBtn = document.getElementById("searchBtn");
  if (!searchBtn) return;

  searchBtn.addEventListener("click", function () {
    const status = document.getElementById("searchStatus")?.value || "rent";
    const type = document.getElementById("searchType")?.value || "all";
    const location = document.getElementById("searchLocation")?.value?.toLowerCase();
    const beds = document.getElementById("searchBeds")?.value;
    const price = document.getElementById("searchPrice")?.value;

    /* Filter listings */
    const filtered = listings.filter(l => {
      // Status filter (rent/sale)
      if (status && l.status !== status) return false;

      // Type filter
      if (type !== "all") {
        if (l.type !== type) return false;
      }

      // Bedrooms filter
      if (beds) {
        const bedsNum = parseInt(beds);
        if (bedsNum === 4) {
          if (l.beds < 4) return false;
        } else {
          if (l.beds !== bedsNum) return false;
        }
      }

      // Price filter
      if (price) {
        const maxPrice = parseInt(price.replace(/,/g, ""));
        const listingPrice = parseInt(l.price.replace(/[^0-9]/g, ""));
        if (!Number.isNaN(maxPrice) && listingPrice > maxPrice) return false;
      }

      // Location filter
      if (location) {
        if (!l.location.toLowerCase().includes(location)) return false;
      }

      return true;
    });

    /* Render filtered results */
    // index.html uses #listingsGrid; listings.html uses #listingsPageGrid
    const indexGrid = document.getElementById("listingsGrid");
    const listingsPageGrid = document.getElementById("listingsPageGrid");

    if (listingsPageGrid) {
      listingsPageGrid.innerHTML = filtered.map(l => `
        <div class="listing-card reveal" data-id="${l.id}">
          <div class="listing-img-wrap">
            <img class="listing-img" src="../${l.image}" alt="${l.imageAlt}"
              onerror="this.parentElement.innerHTML=getImgPlaceholder('${l.imageAlt}')">
            <div class="listing-badges">${getBadgeHTML(l.badge, l.status)}</div>
            <div class="listing-price-tag">${l.price}</div>
          </div>
          <div class="listing-body">
            <h3>${l.name}</h3>
            <div class="listing-loc"><span class="loc-icon">📍</span>${l.location}</div>
            <div class="listing-meta">${getMetaHTML(l.beds, l.baths, l.type)}</div>
          </div>
          <button class="listing-view-btn" onclick="viewListing(${l.id})">View Details / Enquire →</button>
        </div>
      `).join("");
      observeReveal();
      document.getElementById("resultsCount") && (document.getElementById("resultsCount").textContent = filtered.length);
    } else {
      // Default to original renderer (index.html)
      renderFilteredListings(filtered);
    }

    // Update active tab
    document.querySelectorAll(".filter-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.filter === type);
    });

    // Scroll to listings
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("listingsPageGrid")?.scrollIntoView({ behavior: "smooth" });
  });
}


/* Render listings with custom filtered array (used by search) */
function renderFilteredListings(listingsArray) {
  const grid = document.getElementById("listingsGrid");
  if (!grid) return;

  if (listingsArray.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:48px 0; font-size:15px;">No properties match your search criteria.</div>`;
    return;
  }

  grid.innerHTML = listingsArray.map(l => `
    <div class="listing-card reveal" data-id="${l.id}">
      <div class="listing-img-wrap">
        <img class="listing-img" src="${l.image}" alt="${l.imageAlt}"
          onerror="this.parentElement.innerHTML=getImgPlaceholder('${l.imageAlt}')">
        <div class="listing-badges">${getBadgeHTML(l.badge, l.status)}</div>
        <div class="listing-price-tag">${l.price}</div>
      </div>
      <div class="listing-body">
        <h3>${l.name}</h3>
        <div class="listing-loc"><span class="loc-icon">📍</span>${l.location}</div>
        <div class="listing-meta">${getMetaHTML(l.beds, l.baths, l.type)}</div>
      </div>
      <button class="listing-view-btn" onclick="viewListing(${l.id})">View Details →</button>
    </div>
  `).join("");

  observeReveal();
}

/* ============================================================
   STICKY NAV SHADOW
   ============================================================ */
function setupNavScroll() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 40
      ? "0 4px 20px rgba(26,75,140,0.15)"
      : "0 2px 12px rgba(26,75,140,0.08)";
  });
}

/* ============================================================
   ACTIVE NAV LINK (highlight current page)
   ============================================================ */
function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(link => {
    const href = link.getAttribute("href")?.split("/").pop();
    if (href === path) link.classList.add("active-page");
  });
}

/* ============================================================
   ANIMATE HERO STATS (count up)
   ============================================================ */
function animateStats() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const target = parseInt(el.dataset.target || el.textContent);
    const suffix = el.dataset.suffix || (el.textContent.includes("+") ? "+" : "");
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

/* ============================================================
   CHAT POP-UP
   ============================================================ */
function setupChatPopup() {
  const float = document.getElementById("chatFloat");
  const openBtn = document.getElementById("chatFab");
  const closeBtn = document.getElementById("chatClose");
  const popup = document.getElementById("chatPopup");
  if (!float || !openBtn || !closeBtn || !popup) return;

  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.toggle("open");
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.remove("open");
  });

  document.addEventListener("click", (e) => {
    if (!popup  .classList.contains("open")) return;
    const clickedInside = popup.contains(e.target) || openBtn.contains(e.target);
    if (!clickedInside) popup.classList.remove("open");
  });
}
                                             

/* ============================================================
   INITIALISE EVERYTHING
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  renderListings("all");
  setupFilterTabs();
  observeReveal();
  setupForm();
  setupSearch();
  /* setupWhatsApp(); removed (replaced by chat pop-up) */
  setupNavScroll();
  setActiveNav();
  setupChatPopup();

  /* Trigger stat animation when hero stats come into view */
  const statsSection = document.querySelector(".hero-stats");
  if (statsSection) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animateStats(); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(statsSection);
  }
});




