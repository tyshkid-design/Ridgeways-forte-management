================================================================
RIDGEWAYS FORTE — Website Package
================================================================
FOLDER STRUCTURE:
  index.html              ← Homepage (open this first)
  css/
    style.css             ← ALL colours, fonts, spacing
  js/
    main.js               ← ALL listings data, WhatsApp number, logic
  pages/
    about.html            ← About Us + Team
    listings.html         ← Full listings page with filters
    management.html       ← Property Management service
    marketing.html        ← Property Marketing service
    cleaning.html         ← Cleaning Services
    contact.html          ← Contact form + map
  images/                 ← PUT ALL YOUR PHOTOS HERE

================================================================
QUICK CHANGES
================================================================

1. WHATSAPP NUMBER
   Open: js/main.js
   Find: const WHATSAPP_NUMBER = "254793035731";
   Replace 254793035731 with your number (no + sign)
   Also update in footer of each HTML file: href="https://wa.me/254793035731"

2. PHONE / EMAIL / ADDRESS
   Open: index.html (and each page in pages/ folder)
   Search for "254793035731" or "ridgewaysforte@gmail.com"
   Replace with your real contact details
   Also check the topbar at the top of every page.

3. LOGO
   Option A — Keep text logo:
     Open any HTML file, find class="logo-icon" and change "RF"
     Find class="logo-text" and change "Ridgeways Forte"
   Option B — Use image logo:
     Save your logo as images/logo.png
     In every HTML file, replace the <div class="logo"> block with:
       <a href="index.html" class="logo">
         <img src="images/logo.png" alt="Ridgeways Forte" style="height:52px;">
       </a>
     (For pages/ files use: src="../images/logo.png")

4. COLORS
   Open: css/style.css
   Find the :root block at the very top
   --blue:       #1A4B8C   ← change main blue
   --green:      #1E7A4A   ← change main green
   Everything updates automatically.

5. FONTS
   Open: css/style.css
   Find: --font-heading and --font-body in the :root block
   Change to any font name, e.g. "Verdana" or "Trebuchet MS"

================================================================
ADDING IMAGES
================================================================

STEP 1: Copy all your photos into the /images/ folder.

STEP 2: Name your files clearly, e.g.:
  hero-bg.jpg             ← Homepage background (1920×1080)
  about-office.jpg        ← About page (700×520)
  service-management.jpg  ← Management page (600×280)
  service-marketing.jpg   ← Marketing page (600×280)
  service-cleaning.jpg    ← Cleaning page (600×280)
  apt1.jpg, apt2.jpg...   ← Apartment photos (600×380)
  team-1.jpg, team-2.jpg  ← Team headshots (400×400)

STEP 3 — HERO IMAGE:
  Open index.html
  Find: <div class="hero-bg-img">
  The CSS already looks for images/hero-bg.jpg automatically.
  Just drop your photo into the images/ folder with that name.

STEP 4 — APARTMENT / LISTING PHOTOS:
  Open js/main.js
  Find the "listings" array (near the top)
  Each listing has:
    image: "images/apt-placeholder.jpg",
  Change to your actual file, e.g.:
    image: "images/apt1.jpg",
  Do this for each listing.

STEP 5 — SERVICE PAGE IMAGES:
  Open pages/management.html, marketing.html, cleaning.html
  Find the <img> tags with onerror placeholders
  Change the src to your file, e.g.:
    src="../images/service-management.jpg"

STEP 6 — TEAM PHOTOS:
  Open pages/about.html
  Find the <img class="team-img"> tags
  Change src="../images/team-1.jpg" etc.

STEP 7 — WHY-US IMAGE:
  Open index.html
  Find <img class="why-img"
  Change src to "images/about-office.jpg"

================================================================
ADDING / EDITING LISTINGS
================================================================

Open: js/main.js
Find the "const listings = [" array

Each listing looks like this:
  {
    id: 1,
    name: "Ridgeways Gardens",       ← Property name
    location: "Ridgeways Lane...",   ← Address
    price: "Kes. 32,000/mo",         ← Price
    beds: 2,                          ← Bedrooms (0 for commercial)
    baths: 2,                         ← Bathrooms
    type: "apartment",               ← apartment/townhouse/villa/commercial
    status: "rent",                  ← rent or sale
    badge: "Featured",               ← badge text (or "" for none)
    image: "images/apt1.jpg",        ← YOUR PHOTO PATH
    imageAlt: "Property description"
  },

To add a new listing:
  Copy one block (from { to },)
  Paste it at the end before the ]
  Fill in the new property details
  Give it the next id number

================================================================
ADDING GOOGLE MAPS TO CONTACT PAGE
================================================================

1. Go to maps.google.com
2. Search your address
3. Click Share → Embed a map → Copy HTML
4. Open pages/contact.html
5. Find the .map-embed div
6. Replace the entire div with the <iframe> code from Google

================================================================
PAGES INCLUDED
================================================================
  index.html        Homepage with hero, search, services, listings, form, areas
  about.html        Company story + team cards
  listings.html     Full listings with sidebar filters (type, price, beds)
  management.html   Property Management service page
  marketing.html    Property Marketing service page
  cleaning.html     Cleaning Services page
  contact.html      Contact form + contact cards + map area

================================================================
