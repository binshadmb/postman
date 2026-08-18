// client.js — Postman Khagatara full interactive shell
// Tab registry mirrored from lib/tabRegistry.ts (plain JS for browser)

// ── Locale reader ─────────────────────────────────────────────────────────
// Reads the #locale-data JSON injected by [lang]/index.tsx.
// Falls back silently to the key itself if no translation found.
const _loc = (() => {
  try {
    const el = document.getElementById("locale-data");
    return el ? JSON.parse(el.textContent || "{}") : {};
  } catch(e) { return {}; }
})();

function tr(key, fallback) {
  const parts = key.split(".");
  let v = _loc;
  for (const p of parts) { v = v?.[p]; if (v === undefined) break; }
  return (typeof v === "string" && v.trim() !== "") ? v : (fallback || key.split(".").pop());
}

const modules = [
  {
    id: "print-post", title: tr("sidebar.print_post", "Document Print & Post"),
    badge: "High-margin volume line", icon: "🖨️", color: "#b72d32",
    children: [
      { id: "upload",     label: tr("print_post.tab_upload",     "Upload Document") },
      { id: "print-opts", label: tr("print_post.tab_print_opts", "Print Options") },
      { id: "post-opts",  label: tr("print_post.tab_post_opts",  "Post Options") },
      { id: "calculator", label: tr("print_post.tab_calculator", "Price Calculator") },
      { id: "history",    label: tr("print_post.tab_history",    "Order History") },
      { id: "addresses",  label: tr("print_post.tab_addresses",  "Saved Addresses") },
      { id: "reorder",    label: tr("print_post.tab_reorder",    "Reorder / Templates") },
    ]
  },
  {
    id: "cards", title: tr("sidebar.cards", "Greeting Cards"),
    badge: "Personalized card service", icon: "💌", color: "#ae7f2b",
    children: [
      { id: "occasion",   label: tr("cards.tab_occasion",   "Choose Occasion") },
      { id: "format",     label: tr("cards.tab_format",     "Card Format") },
      { id: "personal",   label: tr("cards.tab_personal",   "Personalization") },
      { id: "addons",     label: tr("cards.tab_addons",     "Add-ons") },
      { id: "calculator", label: tr("cards.tab_calculator", "Price Calculator") },
      { id: "history",    label: tr("cards.tab_history",    "Order History") },
      { id: "designs",    label: tr("cards.tab_designs",    "Saved Designs") },
    ]
  },
  {
    id: "registered-mail", title: tr("sidebar.registered_mail", "Registered / Certified Mail"),
    badge: "Receipts and legal-post workflow", icon: "📮", color: "#186b70",
    children: [
      { id: "registered", label: tr("registered_mail.tab_registered", "Registered Post") },
      { id: "speed",      label: tr("registered_mail.tab_speed",      "Speed Post") },
      { id: "legal",      label: tr("registered_mail.tab_legal",      "Legal Notice Format Check") },
      { id: "calculator", label: tr("registered_mail.tab_calculator", "Price Calculator") },
      { id: "history",    label: tr("registered_mail.tab_history",    "Order History") },
      { id: "recipients", label: tr("registered_mail.tab_recipients", "Saved Recipients") },
      { id: "archive",    label: tr("registered_mail.tab_archive",    "Proof / Receipt Archive") },
    ]
  },
  {
    id: "ads", title: tr("sidebar.newspaper_ads", "Newspaper / Media Ad Placement"),
    badge: "Cost-plus convenience line", icon: "📰", color: "#3d7354",
    children: [
      { id: "ad-type",    label: tr("ads.tab_ad_type",    "Ad Type Selection") },
      { id: "paper",      label: tr("ads.tab_paper",      "Select Paper") },
      { id: "size-color", label: tr("ads.tab_size_color", "Size & Color") },
      { id: "proof",      label: tr("ads.tab_proof",      "Proof Delivery") },
      { id: "calculator", label: tr("ads.tab_calculator", "Price Calculator") },
      { id: "history",    label: tr("ads.tab_history",    "Order History") },
      { id: "templates",  label: tr("ads.tab_templates",  "Saved Ad Templates") },
    ]
  },
  {
    id: "bulk", title: tr("sidebar.bulk_mail", "Bulk / Business Mail"),
    badge: "CSV and repeat sender workflow", icon: "📦", color: "#6b5ea8",
    children: [
      { id: "csv",        label: tr("bulk.tab_csv",        "CSV Upload") },
      { id: "template",   label: tr("bulk.tab_template",   "Template Selection") },
      { id: "batch-opts", label: tr("bulk.tab_batch_opts", "Batch Print Options") },
      { id: "calculator", label: tr("bulk.tab_calculator", "Price Calculator") },
      { id: "history",    label: tr("bulk.tab_history",    "Order History") },
      { id: "lists",      label: tr("bulk.tab_lists",      "Saved Recipient Lists") },
      { id: "templates",  label: tr("bulk.tab_templates",  "Saved Templates") },
    ]
  },
  {
    id: "flyer-distribution", title: tr("sidebar.flyer_distribution", "Flyer / Leaflet Distribution"),
    badge: "Print & distribute inside India", icon: "📄", color: "#8a4b2e",
    children: [
      { id: "upload",       label: tr("flyer.tab_upload",       "Upload Artwork") },
      { id: "print-opts",   label: tr("flyer.tab_print_opts",   "Print Options") },
      { id: "distribution", label: tr("flyer.tab_distribution", "Distribution") },
      { id: "calculator",   label: tr("flyer.tab_calculator",   "Price Calculator") },
      { id: "history",      label: tr("flyer.tab_history",      "Order History") },
    ]
  },
  {
    id: "inspection", title: tr("sidebar.inspection", "Business Inspection / Discussion"),
    badge: "Request only — needs approval", icon: "🧭", color: "#4a4a4a",
    children: [
      { id: "details", label: tr("inspection.tab_details", "Request Details") },
      { id: "history", label: tr("inspection.tab_history", "Request History") },
    ]
  },
  {
    id: "bills", title: tr("sidebar.bills", "Bills"),
    badge: "Proposals, invoices & receipts", icon: "🧾", color: "#2e6b4f",
    children: [
      { id: "proforma",   label: tr("bills.tab_proforma",   "Proforma / Service Proposal") },
      { id: "invoice",    label: tr("bills.tab_invoice",    "Invoice") },
      { id: "agreement",  label: tr("bills.tab_agreement",  "Service Agreement / Order Confirmation") },
      { id: "delivery",   label: tr("bills.tab_delivery",   "Service / Delivery Report") },
      { id: "receipt",    label: tr("bills.tab_receipt",    "Payment Receipt") },
    ]
  },
  {
    id: "track", title: tr("sidebar.track_order", "Track Order"),
    badge: "Timeline, proof, and support", icon: "📍", color: "#c05c00",
    children: [
      { id: "timeline",   label: tr("track.tab_timeline",   "Order Status Timeline") },
      { id: "slip",       label: tr("track.tab_slip",       "Payment Slip Download") },
      { id: "awb",        label: tr("track.tab_awb",        "India Post / AWB Tracking") },
      { id: "proof-view", label: tr("track.tab_proof_view", "Proof / Tearsheet Viewer") },
      { id: "confirm",    label: tr("track.tab_confirm",    "Delivery Confirmation") },
      { id: "support",    label: tr("track.tab_support",    "Support / Raise Issue") },
      { id: "rate",       label: tr("track.tab_rate",       "Rate This Order") },
    ]
  },
  {
    id: "account", title: tr("sidebar.account", "Account"),
    badge: "Customer identity and preferences", icon: "👤", color: "#555",
    children: [
      { id: "signup",    label: tr("account.tab_signup",    "Account Creation / Sign-up") },
      { id: "login",     label: tr("account.tab_login",     "Login") },
      { id: "kyc",       label: tr("account.tab_kyc",       "Profile & KYC") },
      { id: "payment",   label: tr("account.tab_payment",   "Payment Methods") },
      { id: "addresses", label: tr("account.tab_addresses", "Address Book") },
      { id: "history",   label: tr("account.tab_history",   "Order History") },
      { id: "prefs",     label: tr("account.tab_prefs",     "Notifications / Preferences") },
    ]
  }
];

const fx = {
  INR: { symbol: "₹", rate: 1 },
  EUR: { symbol: "€", rate: 0.0109 },
  GBP: { symbol: "£", rate: 0.0094 },
  USD: { symbol: "$", rate: 0.012 }
};

// Replaced with live rates shortly after load — see loadLiveFxRates() below.
// The static values above remain as an immediate-render fallback.
async function loadLiveFxRates() {
  try {
    const res = await fetch("/api/fx-rates");
    if (!res.ok) return;
    const live = await res.json();
    Object.keys(live).forEach((cur) => { fx[cur] = live[cur]; });
    if (typeof renderPanel === "function" && panelEl) renderPanel();
  } catch (err) {
    console.warn("Live FX rates unavailable, using built-in fallback:", err);
  }
}
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", loadLiveFxRates);
}

const state = { moduleId: "print-post", childIndex: 3, currency: "INR" };

// ── Hero slider content ──────────────────────────────────────────────────
const heroSlides = [
  {
    badge: '<i class="fa-solid fa-file-lines"></i> Document Service',
    title: "Send documents in India",
    accent: "— Economically",
    subtitle: 'Simple steps to print and send your important documents across India at the most <strong>economical</strong> cost.',
    blobs: ["rgba(37, 99, 235, 0.20)", "rgba(37, 99, 235, 0.10)", "rgba(234, 88, 12, 0.10)", "rgba(124, 58, 237, 0.10)"],
  },
  {
    badge: '<i class="fa-solid fa-location-dot"></i> Quick Local Post',
    title: "Need a quick post inside India?",
    accent: "— We'll drop it today",
    subtitle: "Give us the file and address — we print, pack and post it, tracked door to door.",
    blobs: ["rgba(234, 88, 12, 0.20)", "rgba(234, 88, 12, 0.10)", "rgba(37, 99, 235, 0.10)", "rgba(22, 163, 74, 0.10)"],
  },
  {
    badge: '<i class="fa-solid fa-envelope"></i> Greeting Cards',
    title: "Sending a card to someone in India?",
    accent: "— Printed & delivered for you",
    subtitle: "Pick a design, add your message, we print and hand-deliver it locally.",
    blobs: ["rgba(22, 163, 74, 0.20)", "rgba(22, 163, 74, 0.10)", "rgba(124, 58, 237, 0.10)", "rgba(37, 99, 235, 0.10)"],
  },
  {
    badge: '<i class="fa-solid fa-shield-halved"></i> Registered / Certified Mail',
    title: "Need proof it was delivered?",
    accent: "— Fully trackable",
    subtitle: "Registered and certified mail with receipts, so you know it arrived.",
    blobs: ["rgba(124, 58, 237, 0.20)", "rgba(124, 58, 237, 0.10)", "rgba(22, 163, 74, 0.10)", "rgba(234, 88, 12, 0.10)"],
  },
];
let heroIndex = 0;
let heroTimer = null;

function renderHeroSlide(i) {
  const s = heroSlides[i];
  const badgeEl = $("heroBadge");
  const titleEl = $("heroTitle");
  const accentEl = $("heroAccent");
  const subtitleEl = $("heroSubtitle");
  const heroEl = $("heroSlider");
  if (!badgeEl || !titleEl || !accentEl || !subtitleEl || !heroEl) return;

  badgeEl.innerHTML = s.badge;
  titleEl.firstChild.textContent = s.title;
  accentEl.textContent = s.accent;
  subtitleEl.innerHTML = s.subtitle;

  if (Array.isArray(s.blobs)) {
    s.blobs.forEach((color, idx) => {
      heroEl.style.setProperty(`--blob-${idx + 1}`, color);
    });
  }

  document.querySelectorAll("#heroDots .hero-dot").forEach((d, idx) => {
    d.classList.toggle("active", idx === i);
  });
}

function goToHeroSlide(i) {
  heroIndex = i;
  const heroEl = $("heroSlider");
  if (!heroEl) return;
  heroEl.classList.add("hero-fade");
  setTimeout(() => {
    renderHeroSlide(heroIndex);
    heroEl.classList.remove("hero-fade");
  }, 250);
}

function initHeroSlider() {
  const dotsEl = $("heroDots");
  const heroEl = $("heroSlider");
  if (!dotsEl || !heroEl) return;

  dotsEl.innerHTML = "";
  heroSlides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "hero-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => {
      clearInterval(heroTimer);
      goToHeroSlide(i);
      heroTimer = setInterval(() => goToHeroSlide((heroIndex + 1) % heroSlides.length), 4500);
    });
    dotsEl.appendChild(dot);
  });

  heroTimer = setInterval(() => goToHeroSlide((heroIndex + 1) % heroSlides.length), 4500);
  heroEl.addEventListener("mouseenter", () => clearInterval(heroTimer));
  heroEl.addEventListener("mouseleave", () => {
    heroTimer = setInterval(() => goToHeroSlide((heroIndex + 1) % heroSlides.length), 4500);
  });
}

// Live stock/config from the admin panel (Neon-backed). Starts null;
// printOptsPanel() falls back to sensible defaults until this loads.
let liveConfig = null;
const orderDraft = {
  "print-post": {},
  cards: {},
  "registered-mail": {},
  ads: {},
  bulk: {},
};

function activeDraft() {
  if (!orderDraft[state.moduleId]) orderDraft[state.moduleId] = {};
  return orderDraft[state.moduleId];
}

async function loadLiveConfig() {
  try {
    const res = await fetch("/api/config");
    if (!res.ok) return;
    liveConfig = await res.json();
    // If the customer is already looking at Print Options when this
    // resolves, re-render so it reflects live stock instead of defaults.
    const mod = activeModule();
    if (mod.id === "print-post" && mod.children[state.childIndex]?.id === "print-opts") {
      renderPanel();
    }
  } catch (err) {
    console.error("Failed to load live config:", err);
  }
}

const $ = (id) => document.getElementById(id);
const motherTabsEl = $("motherTabs");
const childTabsEl  = $("childTabs");
const panelEl      = $("panel");
const moduleView   = $("moduleView");
const homeView     = $("homeView");
const moduleCards  = $("moduleCards");

// ── Helpers ────────────────────────────────────────────────────────────────

function money(value, currency) {
  const cur = currency || state.currency;
  const c = fx[cur] || fx.INR;
  const converted = value * c.rate;
  const digits = cur === "INR" ? 0 : 2;
  return `${c.symbol}${converted.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits })}`;
}

function activeModule() {
  return modules.find((m) => m.id === state.moduleId) || modules[0];
}

function currentFormData() {
  const form = document.querySelector("#calcForm");
  return form ? Object.fromEntries(new FormData(form).entries()) : {};
}

function captureCurrentPanelData() {
  const draft = activeDraft();
  document.querySelectorAll("#panel input[name], #panel select[name], #panel textarea[name]").forEach((field) => {
    if (field.type === "file") {
      if (field.files && field.files[0]) draft[field.name] = field.files[0];
      return;
    }
    if (field.type === "checkbox") {
      draft[field.name] = field.checked;
      return;
    }
    draft[field.name] = field.value;
  });
}

function draftValue(name, fallback = "") {
  const value = activeDraft()[name];
  return value === undefined || value === null ? fallback : value;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Cache of the last pincode lookup — persists across renderPanel() re-renders,
// since those fully rebuild the form's HTML on every keystroke.
let pincodeLookup = { pin: null, status: "idle", cities: [], state: null };

async function lookupPincode(pin) {
  pincodeLookup = { pin, status: "loading", cities: [], state: null };
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();
    const record = data && data[0];
    if (record && record.Status === "Success" && record.PostOffice?.length) {
      const cities = [...new Set(record.PostOffice.map((po) => po.Name))];
      pincodeLookup = { pin, status: "success", cities, state: record.PostOffice[0].State };
    } else {
      pincodeLookup = { pin, status: "notfound", cities: [], state: null };
    }
  } catch (err) {
    console.error("Pincode lookup failed:", err);
    pincodeLookup = { pin, status: "error", cities: [], state: null };
  }
  renderPanel();
}

// Reusable address block: PIN Code drives a live City dropdown + auto-filled State.
// Drop this into any panel that collects a delivery/recipient address.
function pinCityStateBlock(d) {
  // Prefer the live DOM value (persists across renderPanel re-renders triggered by lookup)
  const livePinEl = document.querySelector("[data-pin-lookup]");
  const pin = (livePinEl ? livePinEl.value.trim() : null) || d.pin || "";
  const haveLookup = pincodeLookup.pin === pin && pin.length === 6;

  const cityField = haveLookup && pincodeLookup.status === "success"
    ? opt("city", "City", pincodeLookup.cities, d.city || pincodeLookup.cities[0])
    : `<label style="display:grid;gap:4px;color:var(--muted)">City
        <select disabled style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface-2);color:var(--muted);min-height:36px">
          <option>${
            haveLookup && pincodeLookup.status === "loading"  ? "Looking up…" :
            haveLookup && pincodeLookup.status === "notfound" ? "PIN not found — check it" :
            haveLookup && pincodeLookup.status === "error"    ? "Lookup failed — try again" :
            "Enter 6-digit PIN first"
          }</option>
        </select>
      </label>`;

  const stateValue = haveLookup && pincodeLookup.status === "success" ? pincodeLookup.state : "";

  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <label style="display:grid;gap:4px;color:var(--muted)">PIN Code
        <input name="pin" type="text" inputmode="numeric" maxlength="6" pattern="[0-9]{6}"
          placeholder="6-digit PIN" value="${pin}" data-pin-lookup
          style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px">
      </label>
      ${cityField}
    </div>
    <label style="display:grid;gap:4px;color:var(--muted)">State
      <input name="state" type="text" value="${stateValue}" readonly
        placeholder="Auto-filled from PIN"
        style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface-2);color:var(--ink);min-height:36px">
    </label>`;
}

function opt(name, label, values, selected) {
  return `<label style="display:grid;gap:4px;color:var(--muted)">${label}
    <select name="${name}" style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px">
      ${values.map((v) => `<option${v === selected ? " selected" : ""}>${esc(v)}</option>`).join("")}
    </select></label>`;
}

function numField(name, label, value, min, placeholder) {
  return `<label style="display:grid;gap:4px;color:var(--muted)">${label}
    <input name="${name}" type="number" min="${min || 1}" value="${esc(value)}" placeholder="${esc(placeholder || "")}"
      style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px"></label>`;
}

function textField(name, label, placeholder) {
  return `<label style="display:grid;gap:4px;color:var(--muted)">${label}
    <input name="${name}" type="text" dir="auto" placeholder="${esc(placeholder)}" value="${esc(draftValue(name, ""))}"
      style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px"></label>`;
}

function textAreaField(name, label, placeholder, rows = 3) {
  return `<label style="display:grid;gap:4px;color:var(--muted)">${label}
    <textarea name="${name}" rows="${rows}" dir="auto" placeholder="${esc(placeholder)}"
      style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);resize:vertical">${esc(draftValue(name, ""))}</textarea></label>`;
}

function contactBlock() {
  return `<div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
    <strong>Your Contact Details</strong>
    ${textField("customerName", "Your Name", "Full name")}
    ${textField("customerEmail", "Email", "name@example.com")}
    ${textField("customerPhone", "Phone / WhatsApp", "+91 / +44")}
  </div>`;
}

function uploadBlock(label, accept, note) {
  const draft = activeDraft();
  return `<label style="display:grid;gap:6px;color:var(--muted)">${label}
      <input name="uploadFile" type="file" accept="${accept}"
        style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
    </label>
    ${draft.uploadFile ? `<p style="margin:0;color:var(--green);font-size:0.9rem">Selected: ${esc(draft.uploadFile.name)}</p>` : ""}
    ${note ? `<p style="margin:0;color:var(--muted);font-size:0.85rem">${note}</p>` : ""}`;
}

function currencyField() {
  return opt("currency", "Customer Currency", Object.keys(fx), state.currency);
}

function calcShell(title, fields, total, rows) {
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:18px;width:100%;max-width:calc(100vw - 80px);overflow-x:auto;box-sizing:border-box">
    <form id="calcForm" style="display:grid;grid-template-columns:repeat(2,minmax(120px,1fr));gap:14px;min-width:0">
      ${fields}
    </form>
    <aside style="align-self:start;display:grid;gap:14px;padding:18px;padding-bottom:80px;border-radius:8px;background:var(--surface-2);border:1px solid var(--line);min-width:0;max-width:100%;box-sizing:border-box;overflow-wrap:break-word">
      <span style="color:var(--muted);font-size:0.85rem">${title}</span>
      <strong style="font-size:clamp(1.6rem,6vw,2.6rem);font-weight:800">${money(total)}</strong>
      ${(rows || []).map(([k, v]) => `<div style="display:flex;justify-content:space-between;gap:10px;padding-top:10px;border-top:1px solid var(--line)"><span style="min-width:0">${k}</span><strong style="text-align:right;min-width:0;word-break:break-word">${v}</strong></div>`).join("")}
      <button type="button" onclick="proceedToCheckout(${total}, { module: state.moduleId })" style="margin-top:8px;width:100%;background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-size:0.95rem;font-weight:600">Proceed to checkout →</button>
    </aside>
  </div>`;
}

// ── Calculators ────────────────────────────────────────────────────────────

function calcPrintPost(d) {
  const paper = { A5: 0.85, A4: 1, A3: 2 }[d.size] || 1;
  const color = d.color === "Color" ? 38 : 16;
  const stock = { Standard: 0, Bond: 20, Premium: 38 }[d.paper] || 0;
  const post = { Regular: 42, "Speed Post": 84, Registered: 350, Courier: 240 }[d.post] || 84;
  const side = d.sides === "Double-sided" ? 0.82 : 1;
  return Math.ceil(Number(d.pages) * color * paper * side) + stock + post;
}

function printPostCalc() {
  const d = { pages: 1, size: "A4", color: "B&W", paper: "Standard", sides: "Single-sided", post: "Speed Post", ...activeDraft(), ...currentFormData() };
  state.currency = d.currency || state.currency;
  const total = calcPrintPost(d);
  return calcShell("Estimated Print & Post Price", [
    numField("pages", "Pages", d.pages),
    opt("size", "Paper Size", ["A5", "A4", "A3", "Legal"], d.size),
    opt("color", "Print Color", ["B&W", "Color"], d.color),
    opt("paper", "Paper Quality", ["Standard (70 GSM)", "Bond (80 GSM)", "Premium (100 GSM)"], d.paper),
    opt("sides", "Sides", ["Single-sided", "Double-sided"], d.sides),
    opt("post", "Post Type", ["Regular", "Speed Post", "Registered", "Courier"], d.post),
    currencyField()
  ].join(""), total, [
    ["Includes", "GST, materials & handling"],
    ["Preparation", "Print setup and service labor"],
    ["Dispatch", "Packing and postal processing"],
  ]);
}

function cardsCalc() {
  const d = { qty: 1, size: "Standard", stock: "Matte", design: "Template", addon: "None", ...currentFormData() };
  state.currency = d.currency || state.currency;
  const base = { Standard: 320, Large: 390, Square: 360 }[d.size] || 320;
  const stockFee = { Matte: 0, Glossy: 30, Textured: 55, Embossed: 85 }[d.stock] || 0;
  const custom = d.design === "Custom Photo" ? 95 : 0;
  const addon = d.addon === "Note Card" ? 30 : d.addon === "Ribbon/Seal" ? 45 : d.addon === "Gift Voucher" ? 60 : 0;
  const total = Number(d.qty) * (base + stockFee + custom + addon);
  return calcShell("Estimated Card Price", [
    numField("qty", "Quantity", d.qty),
    opt("size", "Card Size", ["Standard (5×7)", "Large (A5)", "Square"], d.size),
    opt("stock", "Card Stock", ["Matte", "Glossy", "Textured", "Embossed"], d.stock),
    opt("design", "Design Type", ["Template", "Custom Photo"], d.design),
    opt("addon", "Add-on", ["None", "Note Card", "Ribbon/Seal", "Gift Voucher"], d.addon),
    currencyField()
  ].join(""), total, [
    ["Includes", "GST, card handling & materials"],
    ["Personalization", "Message setup and service labor"],
    ["Dispatch", "Packing and postal processing"],
  ]);
}

function registeredCalc() {
  const d = { pages: 2, service: "Registered", legal: "No", ...activeDraft(), ...currentFormData() };
  state.currency = d.currency || state.currency;
  const base = { Registered: 350, "Speed Post": 120, Courier: 260 }[d.service] || 350;
  const legalFee = d.legal === "Yes" ? 180 : 0;
  const extraPages = Math.max(0, Number(d.pages) - 2) * 15;
  const total = base + legalFee + extraPages;
  return calcShell("Estimated Registered Mail Price", [
    numField("pages", "Pages", d.pages),
    opt("service", "Service Type", ["Registered", "Speed Post", "Courier"], d.service),
    opt("legal", "Legal Format Check", ["No", "Yes"], d.legal),
    currencyField()
  ].join(""), total, [
    ["Includes", "GST, materials & handling"],
    ["Preparation", "Document setup and service labor"],
    ["Dispatch", "Booking and postal processing"],
  ]);
}

function adsCalc() {
  const d = { area: 10, color: "B&W", paper: "Malayala Manorama", proof: "E-paper", ...activeDraft(), ...currentFormData() };
  state.currency = d.currency || state.currency;
  const rate = d.color === "Color" ? 830 : 460;
  const paperFee = d.paper === "The Hindu" ? 800 : d.paper === "Times of India" ? 1200 : 0;
  const proofFee = d.proof === "Physical Tearsheet" ? 350 : 0;
  const cost = Number(d.area) * rate + paperFee + proofFee;
  const total = Math.ceil(cost * 1.2);
  return calcShell("Estimated Ad Booking Price", [
    numField("area", "Column sq cm", d.area),
    opt("color", "Ad Color", ["B&W", "Color"], d.color),
    opt("paper", "Publication", ["Malayala Manorama", "Mathrubhumi", "The Hindu", "Times of India", "Deccan Herald"], d.paper),
    opt("adtype", "Ad Type", ["Obituary", "Matrimonial", "Legal Notice", "Classified", "Display"], d.adtype || "Obituary"),
    opt("proof", "Proof Delivery", ["E-paper clipping", "Physical Tearsheet"], d.proof),
    currencyField()
  ].join(""), total, [
    ["Includes", "GST, coordination & handling"],
    ["Preparation", "Ad setup and service labor"],
    ["Proof", "Submission and follow-up support"],
  ]);
}

function bulkCalc() {
  const d = { qty: 50, unit: "A4 B&W Letter", data: "CSV Upload", ...activeDraft(), ...currentFormData() };
  state.currency = d.currency || state.currency;
  const unit = { "A4 B&W Letter": 100, "A4 Color Letter": 170, "Greeting Card": 300, "A5 B&W": 90, "A5 Color": 140 }[d.unit] || 100;
  const qty = Number(d.qty);
  const discount = qty >= 500 ? 0.12 : qty >= 100 ? 0.08 : qty >= 50 ? 0.04 : 0;
  const total = Math.ceil(qty * unit * (1 - discount));
  return calcShell("Estimated Bulk Mail Price", [
    numField("qty", "Recipients", qty),
    opt("unit", "Per-unit Type", ["A4 B&W Letter", "A4 Color Letter", "A5 B&W", "A5 Color", "Greeting Card"], d.unit),
    opt("data", "Data Source", ["CSV Upload", "Saved Recipient List"], d.data),
    currencyField()
  ].join(""), total, [
    ["Includes", "GST, materials & handling"],
    ["Preparation", "Batch setup and service labor"],
    ["Dispatch", "Packing and postal processing"],
  ]);
}

// ── Panel content for every child tab ─────────────────────────────────────

function infoBox(title, items) {
  return `<div style="display:grid;gap:10px;max-width:720px">
    <h3 style="margin:0">${title}</h3>
    <ul style="margin:0;padding-left:20px;line-height:1.9;color:var(--muted)">
      ${items.map((i) => `<li>${i}</li>`).join("")}
    </ul>
  </div>`;
}

function uploadPanel() {
  const draft = activeDraft();
  return `<h3 style="margin-top:0">${tr("print_post.upload_heading","Upload Your Document")}</h3>
    <div style="display:grid;gap:18px;max-width:640px">
      <label style="display:grid;gap:6px;color:var(--muted)">${tr("print_post.upload_file_label","Select file (PDF, DOCX, JPG, PNG — max 20 MB)")}
        <input name="uploadFile" type="file" accept=".pdf,.docx,.jpg,.jpeg,.png"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
      ${draft.uploadFile ? `<p style="margin:0;color:var(--green);font-size:0.9rem">Selected: ${esc(draft.uploadFile.name)}</p>` : ""}
      <label style="display:grid;gap:6px;color:var(--muted)">${tr("print_post.upload_copies_label","Number of copies")}
        <input name="uploadCopies" type="number" min="1" value="${esc(draftValue("uploadCopies", "1"))}"
          style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);max-width:120px;min-height:36px">
      </label>
      <label style="display:grid;gap:6px;color:var(--muted)">${tr("print_post.upload_instructions_label","Special instructions (optional)")}
        <textarea name="instructions" rows="3" placeholder="${tr("print_post.upload_instructions_placeholder","e.g. Print pages 1-3 only, use A4 landscape…")}"
          style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);resize:vertical">${esc(draftValue("instructions", ""))}</textarea>
      </label>
      <button type="button" onclick="captureCurrentPanelData(); openModule('print-post',1)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        ${tr("print_post.upload_next_btn","Continue to Print Options →")}
      </button>
    </div>`;
}

function printOptsPanel() {
  const draft = activeDraft();
  const cfg = liveConfig || {
    bondPaperAvailable: true, premiumPaperAvailable: true, standardPaperAvailable: true,
    envelopeSizes: ["C4", "C5", "C6"],
    foldingAvailable: true, foldTypes: ["No fold", "Single fold", "Tri-fold"],
  };

  const paperOptions = [
    cfg.standardPaperAvailable && "Standard 70 GSM",
    cfg.bondPaperAvailable && "Bond 80 GSM",
    cfg.premiumPaperAvailable && "Premium 100 GSM",
    "Photo Paper",
  ].filter(Boolean);

  const paperField = paperOptions.length
    ? opt("paper", "Paper Quality", paperOptions, draft.paper || paperOptions[0])
    : `<label style="display:grid;gap:4px;color:var(--muted)">Paper Quality
        <span style="color:var(--red);font-size:0.9rem">Currently unavailable — check back soon</span>
      </label>`;

  const envelopeField = cfg.envelopeSizes.length
    ? opt("envelope", "Envelope Size", cfg.envelopeSizes, draft.envelope || cfg.envelopeSizes[0])
    : `<label style="display:grid;gap:4px;color:var(--muted)">Envelope Size
        <span style="color:var(--red);font-size:0.9rem">No sizes currently available</span>
      </label>`;

  const foldField = cfg.foldingAvailable && cfg.foldTypes.length
    ? opt("fold", "Folding", cfg.foldTypes, draft.fold || cfg.foldTypes[0])
    : opt("fold", "Folding", ["No fold"], "No fold");

  return `<h3 style="margin-top:0">${tr("print_post.print_opts_heading","Print Options")}</h3>
    ${backBtn("print-post", 0, tr("print_post.tab_upload","Upload Document"))}
    <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:14px;max-width:640px">
      ${opt("color",   tr("print_post.print_color_label","Print Color"),    ["B&W", "Color"],                         draft.color || "B&W")}
      ${opt("sides",   tr("print_post.print_sides_label","Sides"),          ["Single-sided", "Double-sided"],          draft.sides || "Single-sided")}
      ${opt("size",    tr("print_post.print_size_label","Paper Size"),     ["A5", "A4", "A3", "Legal"],              draft.size || "A4")}
      ${paperField}
      ${opt("binding", tr("print_post.print_binding_label","Binding"),        ["None", "Stapled", "Spiral Bound"],       draft.binding || "None")}
      ${opt("copies",  tr("print_post.print_copies_label","Copies"),         ["1", "2", "3", "5", "10", "Custom"],      draft.copies || "1")}
      ${envelopeField}
      ${foldField}
    </div>
    <button type="button" onclick="captureCurrentPanelData(); openModule('print-post',2)"
      style="margin-top:16px;background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600">
      ${tr("print_post.print_next_btn","Continue to Post Options →")}
    </button>`;
}

function postOptsPanel() {
  const d = { post: "Speed Post (tracked)", zone: "Within Kerala", pin: "", city: "", ...activeDraft(), ...currentFormData() };
  return `<h3 style="margin-top:0">${tr("print_post.post_opts_heading","Post Options")}</h3>
    ${backBtn("print-post", 1, tr("print_post.tab_print_opts","Print Options"))}
    <div style="display:grid;gap:14px;max-width:640px">
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>${tr("account.signup_heading","Your Contact Details")}</strong>
        ${textField("customerName", tr("account.signup_first_name","Your Name"), "Full name")}
        ${textField("customerEmail", tr("account.signup_email","Email"), "name@example.com")}
        ${textField("customerPhone", tr("account.signup_phone","Phone / WhatsApp"), "+91 / +44")}
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("post", tr("print_post.post_type_label","Post Type"), ["Regular Post", "Speed Post (tracked)", "Registered Post", "Courier"], d.post)}
        ${opt("zone", tr("print_post.post_zone_label","Delivery Zone"), ["Within Kerala", "Rest of India", "Metro city"], d.zone)}
      </div>
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>${tr("print_post.post_address_heading","Delivery Address")}</strong>
        ${textField("name",    tr("common.recipient_name","Recipient Name"),    "Full name")}
        ${textField("address", tr("common.street_address","Street Address"),    "House/flat, street")}
        ${pinCityStateBlock(d)}
      </div>
      <button type="button" onclick="captureCurrentPanelData(); openModule('print-post',3)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        ${tr("print_post.post_next_btn","See Price Estimate →")}
      </button>
    </div>`;
}

function occasionPanel() {
  const draft = activeDraft();
  const occasions = [
    ["🎂","Birthday"],["💍","Anniversary"],["💒","Wedding"],["🪔","Diwali"],
    ["🌺","Onam"],["☪️","Eid"],["🎄","Christmas"],["🎉","New Year"],
    ["🙏","Thank-you"],["💐","Get-well"],["🕊️","Condolence"],["👶","New Baby"],
    ["🏖️","Retirement"],["🎓","Graduation"],["✏️","Custom Upload"]
  ];
  return `<h3 style="margin-top:0">Choose Occasion</h3>
    <div style="display:grid;gap:14px;max-width:700px;margin-bottom:14px">
      ${contactBlock()}
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>How should we get the greeting card?</strong>
        ${opt("cardSource", "Card source", [
          "Customer will order from Amazon / other platform and ship to Postman",
          "Customer will share product link and Postman will buy it",
          "Postman should design and print a new card",
          "Customer will upload card/photo/design file",
          "Postman should choose a suitable card"
        ], draft.cardSource || "Customer will order from Amazon / other platform and ship to Postman")}
        ${textField("cardProductLink", "Amazon / platform product link or order reference", "Paste product link, order ID, or tracking number")}
        ${uploadBlock("Upload reference image/design/message file (optional)", ".pdf,.docx,.jpg,.jpeg,.png", "Optional. Use this for reference artwork, existing card image, or message draft.")}
      </div>
      ${textAreaField("instructions", "Overall card instructions", "Tell us whether to rewrite, redesign, buy, print, paste an insert page, or create a new design", 4)}
    </div>
    <div style="display:grid;grid-template-columns:repeat(5,minmax(100px,1fr));gap:12px;max-width:700px">
      ${occasions.map(([icon, label]) => `
        <button type="button" onclick="activeDraft().occasion='${esc(label)}'; captureCurrentPanelData(); openModule('cards',1)"
          style="display:grid;gap:6px;align-items:center;justify-items:center;padding:14px 8px;border:1px solid var(--line);border-radius:8px;background:var(--surface);cursor:pointer;color:var(--ink);transition:background 0.15s">
          <span style="font-size:1.8rem">${icon}</span>
          <small>${label}</small>
        </button>`).join("")}
    </div>`;
}

function cardFormatPanel() {
  const draft = activeDraft();
  return `<h3 style="margin-top:0">Card Format</h3>
    ${backBtn("cards", 0, "Choose Occasion")}
    <div style="display:grid;gap:14px;max-width:640px">
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:14px">
        ${opt("cardWorkType", "Work needed", [
          "Print custom text on supplied card",
          "Paste extra message page inside card",
          "Rewrite message and print it",
          "Redesign / improve card before printing",
          "Buy and customize a card",
          "Design a new card from scratch"
        ], draft.cardWorkType || "Print custom text on supplied card")}
        ${opt("messagePlacement", "Message placement", [
          "Inside card",
          "Front of card",
          "Back of card",
          "Separate insert page",
          "Envelope insert"
        ], draft.messagePlacement || "Inside card")}
        ${opt("size",  "Card Size",   ["As supplied", "Standard 5×7", "Large A5", "Square", "Custom"], draft.size || "As supplied")}
        ${opt("stock", "If we print/design",  ["Use supplied card", "Matte", "Glossy", "Textured", "Premium"], draft.stock || "Use supplied card")}
      </div>
      ${textAreaField("designInstructions", "Design / rewrite instructions", "Describe exact edits, colors, wording tone, placement, or redesign request", 4)}
    </div>
    <button type="button" onclick="captureCurrentPanelData(); openModule('cards',2)"
      style="margin-top:16px;background:var(--gold);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600">
      Add Personalization →
    </button>`;
}

function personalizationPanel() {
  const d = { pin: "", city: "", ...activeDraft(), ...currentFormData() };
  return `<h3 style="margin-top:0">Personalization</h3>
    ${backBtn("cards", 1, "Card Format")}
    <div style="display:grid;gap:14px;max-width:640px">
      ${textField("name", "Recipient Name", "Full name")}
      <label style="display:grid;gap:6px;color:var(--muted)">Your message
        <textarea name="message" rows="5" placeholder="Write your message here…"
          style="border:1px solid var(--line);border-radius:6px;padding:8px 10px;background:var(--surface);color:var(--ink);resize:vertical">${esc(draftValue("message", ""))}</textarea>
      </label>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("font", "Font Style", ["Classic Serif", "Handwritten Script", "Modern Sans", "Elegant Italic", "Bold Display", "Simple Malayalam/English"], d.font || "Handwritten Script")}
        ${opt("fontSize", "Font Size", ["Small", "Medium", "Large", "Extra large", "Admin decide"], d.fontSize || "Medium")}
        ${opt("rewriteNeeded", "Rewrite/polish message?", ["No, print exactly as typed", "Yes, lightly polish", "Yes, rewrite beautifully", "Translate / bilingual support"], d.rewriteNeeded || "No, print exactly as typed")}
        ${opt("printMethod", "Print method", ["Print directly on card", "Paste extra page inside card", "Print insert page", "Admin decide after seeing card"], d.printMethod || "Admin decide after seeing card")}
      </div>
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>Delivery Address</strong>
        ${textField("address", "Street Address", "House/flat, street")}
        ${pinCityStateBlock(d)}
      </div>
      <button type="button" onclick="captureCurrentPanelData(); openModule('cards',3)"
        style="background:var(--gold);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        Add-ons →
      </button>
    </div>`;
}

function addonsPanel() {
  const addons = [
    ["Gift Voucher Insert", "₹60", "A pre-printed gift voucher enclosed with the card"],
    ["Small Note Card",     "₹30", "A blank note card for a handwritten addition on delivery"],
    ["Ribbon / Wax Seal",  "₹45", "Decorative ribbon tie or personalised wax seal on envelope"],
  ];
  return `<h3 style="margin-top:0">Add-ons</h3>
    ${backBtn("cards", 2, "Personalization")}
    <div style="display:grid;gap:12px;max-width:560px">
      ${addons.map(([name, price, desc]) => `
        <label style="display:flex;align-items:flex-start;gap:12px;padding:14px;border:1px solid var(--line);border-radius:8px;cursor:pointer;background:var(--surface)">
          <input name="addons" type="checkbox" value="${esc(name)}" style="margin-top:3px;width:16px;height:16px">
          <span style="display:grid;gap:2px">
            <strong>${name} <span style="color:var(--muted);font-weight:400">+${price}</span></strong>
            <small style="color:var(--muted)">${desc}</small>
          </span>
        </label>`).join("")}
      <button type="button" onclick="captureCurrentPanelData(); openModule('cards',4)"
        style="margin-top:4px;background:var(--gold);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        See Price Estimate →
      </button>
    </div>`;
}

function registeredPanel() {
  const d = { pin: "", city: "", ...activeDraft(), ...currentFormData() };
  return `<h3 style="margin-top:0">Registered Post</h3>
    <button class="back-btn" type="button" onclick="homeView.hidden=false; moduleView.hidden=true; renderMotherTabs();">← Back to Home</button>
    <div style="display:grid;gap:14px;max-width:640px">
      ${contactBlock()}
      ${uploadBlock("Upload document to print and send (PDF, DOCX, JPG, PNG)", ".pdf,.docx,.jpg,.jpeg,.png", "This file is saved to the admin order queue after checkout.")}
      <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:14px;display:grid;gap:8px">
        <strong>What is included</strong>
        <ul style="margin:0;padding-left:18px;line-height:1.9;color:var(--muted)">
          <li>India Post Registered Post (RL number assigned)</li>
          <li>Printed booking slip PDF sent to your email</li>
          <li>Delivery status trackable at indiapost.gov.in</li>
          <li>Proof of delivery retained for 30 days</li>
        </ul>
        <p style="color:var(--red);font-size:0.85rem;margin:0">⚠ Disclaimer: We provide a posting service. This is not legal service or e-stamping.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${numField("pages", "Number of pages", d.pages || 2)}
        ${opt("service", "Service Type", ["Registered", "Speed Post", "Courier"], d.service || "Registered")}
        ${opt("weight", "Estimated weight", ["Up to 50g", "51–100g", "101–250g", "251–500g"], d.weight || "Up to 50g")}
        ${opt("legal", "Legal Format Check", ["No", "Yes"], d.legal || "No")}
      </div>
      ${textAreaField("instructions", "Special instructions", "Anything the admin must know before printing/posting")}
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>Recipient Address</strong>
        ${textField("name",    "Recipient Name",    "Full name")}
        ${textField("address", "Street Address",    "House/flat, street")}
        ${pinCityStateBlock(d)}
      </div>
      <button type="button" onclick="captureCurrentPanelData(); openModule('registered-mail',3)"
        style="background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        See Price →
      </button>
    </div>`;
}

function speedPostPanel() {
  const d = { zone: "National", pin: "", city: "", service: "Speed Post", ...activeDraft(), ...currentFormData() };
  return `<h3 style="margin-top:0">Speed Post</h3>
    ${backBtn("registered-mail", 0, "Registered Post")}
    <div style="display:grid;gap:14px;max-width:640px">
      ${contactBlock()}
      ${uploadBlock("Upload document to print and send (PDF, DOCX, JPG, PNG)", ".pdf,.docx,.jpg,.jpeg,.png", "This file is saved to the admin order queue after checkout.")}
      <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:14px">
        <strong>Speed Post — fastest India Post tracked service</strong>
        <ul style="margin:8px 0 0;padding-left:18px;line-height:1.9;color:var(--muted)">
          <li>Delivery: 1–7 working days (varies by destination)</li>
          <li>EMS tracking number assigned at booking</li>
          <li>Track at ecommerce.indiapost.gov.in</li>
          <li>Booking slip PDF issued immediately</li>
        </ul>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${numField("pages", "Number of pages", d.pages || 2)}
        ${opt("service", "Service Type", ["Speed Post", "Registered", "Courier"], d.service || "Speed Post")}
        ${opt("zone", "Delivery Zone", ["Local", "State", "National"], d.zone)}
      </div>
      ${textAreaField("instructions", "Special instructions", "Anything the admin must know before printing/posting")}
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>Recipient Address</strong>
        ${textField("name",    "Recipient Name",    "Full name")}
        ${textField("address", "Street Address",    "House/flat, street")}
        ${pinCityStateBlock(d)}
      </div>
      <button type="button" onclick="captureCurrentPanelData(); openModule('registered-mail',3)"
        style="background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        See Price →
      </button>
    </div>`;
}

function legalCheckPanel() {
  return `<h3 style="margin-top:0">Legal Notice Format Check</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      ${contactBlock()}
      <p style="color:var(--muted);line-height:1.7;margin:0">
        Before posting, we can do a basic format review to ensure the notice includes required elements: sender/recipient details, date, subject line, and demand/cause of action.
        This is a document formatting check only — we are not legal advisors.
      </p>
      <label style="display:grid;gap:6px;color:var(--muted)">Upload your draft notice (PDF or DOCX)
        <input name="uploadFile" type="file" accept=".pdf,.docx"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
      ${activeDraft().uploadFile ? `<p style="margin:0;color:var(--green);font-size:0.9rem">Selected: ${esc(activeDraft().uploadFile.name)}</p>` : ""}
      ${textAreaField("instructions", "Format-check instructions", "Tell us what needs to be checked or posted after review")}
      <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:14px">
        <strong>Format check includes:</strong>
        <ul style="margin:6px 0 0;padding-left:18px;line-height:1.9;color:var(--muted)">
          <li>Sender name, address, and contact details present</li>
          <li>Recipient name and address complete</li>
          <li>Date and subject line included</li>
          <li>Clear demand / cause of action stated</li>
          <li>Signature block present</li>
        </ul>
      </div>
      <button type="button" onclick="captureCurrentPanelData(); openModule('registered-mail',3)"
        style="background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        Submit for Format Check — ₹180
      </button>
    </div>`;
}

function adTypePanel() {
  const draft = activeDraft();
  const types = [
    ["Obituary / Death Notice", "📰", "Posted within 24–48h of receiving details"],
    ["Matrimonial",             "💒", "Classified or display format available"],
    ["Legal Notice",            "⚖️", "Statutory publication, gazette if required"],
    ["Classified",              "📋", "Text-based, per-word / per-line pricing"],
    ["Display Ad",              "🖼️", "Banner ad, custom size, full-color option"],
    ["Tender / Public Notice",  "📢", "Gazette and vernacular papers"],
  ];
  return `<h3 style="margin-top:0">Select Ad Type</h3>
    <div style="display:grid;gap:14px;max-width:680px;margin-bottom:14px">
      ${contactBlock()}
      ${uploadBlock("Upload ad matter / notice draft (PDF, DOCX, JPG, PNG)", ".pdf,.docx,.jpg,.jpeg,.png", "You can also paste the ad text below if there is no file.")}
      ${textAreaField("adText", "Ad text / notice content", "Paste obituary, legal notice, classified text, or publication instruction", 5)}
      ${textAreaField("instructions", "Special instructions", "Preferred deadline, wording notes, proof requirements, billing notes")}
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,minmax(160px,1fr));gap:12px;max-width:680px">
      ${types.map(([name, icon, note]) => `
        <button type="button" onclick="activeDraft().adtype='${esc(name)}'; captureCurrentPanelData(); openModule('ads',1)"
          style="display:grid;gap:6px;padding:16px;border:1px solid var(--line);border-radius:8px;background:var(--surface);cursor:pointer;text-align:left;color:var(--ink)">
          <span style="font-size:1.6rem">${icon}</span>
          <strong style="font-size:0.9rem">${name}</strong>
          <small style="color:var(--muted)">${note}</small>
        </button>`).join("")}
    </div>`;
}

function selectPaperPanel() {
  const draft = activeDraft();
  return `<h3 style="margin-top:0">Select Publication</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("language", "Language", ["Malayalam", "English", "Hindi", "Tamil", "Kannada"], draft.language || "Malayalam")}
        ${opt("paper",    "Publication", ["Malayala Manorama", "Mathrubhumi", "Mangalam", "Deepika", "The Hindu", "Times of India", "Deccan Herald"], draft.paper || "Malayala Manorama")}
        ${opt("edition",  "Edition",   ["State", "Kochi", "Trivandrum", "Kozhikode", "Thrissur", "National"], draft.edition || "State")}
      </div>
      <label style="display:grid;gap:6px;color:var(--muted)">Preferred publish date
        <input name="publishDate" type="date" value="${esc(draftValue("publishDate", ""))}" style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px;max-width:220px">
      </label>
      <button type="button" onclick="captureCurrentPanelData(); openModule('ads',2)"
        style="background:var(--green);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        Set Size & Color →
      </button>
    </div>`;
}

function adSizeColorPanel() {
  const draft = activeDraft();
  return `<h3 style="margin-top:0">Size & Color</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${numField("area", "Column sq cm", draft.area || 10)}
        ${opt("color", "Ad Color", ["B&W", "Color"], draft.color || "B&W")}
        ${opt("proof", "Proof Delivery", ["E-paper clipping", "Physical Tearsheet"], draft.proof || "E-paper clipping")}
      </div>
      ${textAreaField("instructions", "Final ad instructions", "Any size, placement, date, proof, or language notes", 4)}
      <button type="button" onclick="captureCurrentPanelData(); openModule('ads',4)"
        style="background:var(--green);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        See Price Estimate →
      </button>
    </div>`;
}

// ── Flyer / Leaflet Distribution ────────────────────────────────────────────

const FLYER_DISCLAIMER = "Printed and distributed by Postman — Khagatara as a paid printing & distribution service only. Postman has no ownership, affiliation, or endorsement relationship with the content, claims, or any third party represented in this material.";

function flyerDisclaimerNote() {
  return `<p style="margin:0;padding:10px 12px;border:1px solid var(--line);border-radius:6px;background:var(--surface-2);color:var(--muted);font-size:0.78rem;line-height:1.5">${esc(FLYER_DISCLAIMER)}</p>`;
}

function flyerUploadPanel() {
  const draft = activeDraft();
  return `<h3 style="margin-top:0">Upload Flyer / Leaflet Artwork</h3>
    <div style="display:grid;gap:18px;max-width:640px">
      ${flyerDisclaimerNote()}
      <label style="display:grid;gap:6px;color:var(--muted)">Select artwork file (PDF, JPG, PNG — max 20 MB)
        <input name="uploadFile" type="file" accept=".pdf,.jpg,.jpeg,.png"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
      ${draft.uploadFile ? `<p style="margin:0;color:var(--green);font-size:0.9rem">Selected: ${esc(draft.uploadFile.name)}</p>` : ""}
      <label style="display:grid;gap:6px;color:var(--muted)">What is this material for? (required — website launch, product launch, event, education, business notice, etc.)
        <textarea name="purposeStatement" rows="2" placeholder="Briefly state the purpose of this flyer"
          style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);resize:vertical">${esc(draftValue("purposeStatement", ""))}</textarea>
      </label>
      <button type="button" onclick="captureCurrentPanelData(); openModule('flyer-distribution',1)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        Continue to Print Options →
      </button>
    </div>`;
}

function flyerPrintOptsPanel() {
  const d = { size: "A4", color: "B&W", sides: "Single-sided", ...activeDraft(), ...currentFormData() };
  return `<h3 style="margin-top:0">Print Options</h3>
    ${backBtn("flyer-distribution", 0, "Upload Artwork")}
    <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:14px;max-width:640px">
      ${opt("size",  "Paper Size", ["A4", "A5"], d.size)}
      ${opt("color", "Print Color", ["B&W", "Color"], d.color)}
      ${opt("sides", "Sides", ["Single-sided", "Double-sided"], d.sides)}
    </div>
    <button type="button" onclick="captureCurrentPanelData(); openModule('flyer-distribution',2)"
      style="margin-top:16px;background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600">
      Continue to Distribution →
    </button>`;
}

function flyerDistributionPanel() {
  const d = { distType: "Given Address", mailType: "Registered", envelopes: 1, qty: 1000, area: "", ...activeDraft(), ...currentFormData() };
  const isGiven = d.distType === "Given Address";
  return `<h3 style="margin-top:0">Distribution</h3>
    ${backBtn("flyer-distribution", 1, "Print Options")}
    <div style="display:grid;gap:16px;max-width:640px">
      ${contactBlock()}
      ${opt("distType", "Distribution Type", ["Given Address", "No Address — Bulk / Random"], d.distType)}
      ${isGiven ? `
        <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:12px">
          <strong>Given Address — mailed 4–5 sheets per envelope, one address per envelope</strong>
          ${opt("mailType", "Mailing Type", ["Registered ($3 / envelope)", "Non-registered ($1.5 / envelope, not trackable)"], d.mailType)}
          ${numField("envelopes", "Number of envelopes / addresses", d.envelopes)}
          ${textAreaField("addressList", "Recipient addresses (one per line)", "Name, address, city, PIN — one recipient per line", 5)}
        </div>
      ` : `
        <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:12px">
          <strong>No Address — Bulk / Random Distribution</strong>
          <p style="margin:0;color:var(--muted);font-size:0.85rem">Distributed to public spots — apartment/flat entrances, IT park entrances, college gates, bus stops, etc. Minimum order: 1,000 copies.</p>
          ${numField("qty", "Quantity (minimum 1,000)", d.qty, 1000)}
          ${textField("area", "City / Area for distribution", "e.g. Kochi, Trivandrum")}
          ${opt("audienceType", "Target Audience / Distribution Spot", ["Mixed / General Public", "Schools", "Colleges", "IT Parks / Firms", "Apartments / Flats", "Bus Stops", "Markets / Commercial Areas"], d.audienceType || "Mixed / General Public")}
          <p style="margin:0;color:var(--muted);font-size:0.8rem">Distribution continues in that area until the ordered quantity is exhausted.</p>
          <p style="margin:0;color:var(--muted);font-size:0.8rem"><strong>Proof provided:</strong> a WhatsApp video of the printed stock, and a short site video during distribution. No individual delivery tracking is available for this option.</p>
        </div>
      `}
      ${flyerDisclaimerNote()}
    </div>
    <button type="button" onclick="captureCurrentPanelData(); openModule('flyer-distribution',3)"
      style="margin-top:16px;background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600">
      See Price Estimate →
    </button>`;
}

// Bundled, all-inclusive USD customer prices (setup + printing + distribution).
const FLYER_BULK_PRICES = {
  "A5-B&W":   { setup: 79,  side1: 0.49, side2: 0.69 },
  "A4-B&W":   { setup: 89,  side1: 0.59, side2: 0.89 },
  "A5-Color": { setup: 99,  side1: 0.49, side2: 0.89 },
  "A4-Color": { setup: 109, side1: 0.69, side2: 1.09 },
};

function flyerCalc() {
  const d = { size: "A4", color: "B&W", sides: "Single-sided", distType: "Given Address", mailType: "Registered", envelopes: 1, qty: 1000, currency: "USD", ...activeDraft(), ...currentFormData() };
  const isGiven = d.distType === "Given Address";
  const isDouble = d.sides === "Double-sided";

  // This module is priced in USD natively — default the display currency to
  // USD on first open (site-wide default is INR), while still letting the
  // customer switch it via the dropdown below.
  state.currency = d.currency || "USD";

  let totalUSD, breakdownRows;

  if (isGiven) {
    const perEnvelope = d.mailType.startsWith("Registered") ? 3 : 1.5;
    const envelopes = Math.max(1, Number(d.envelopes) || 1);
    totalUSD = perEnvelope * envelopes;
    breakdownRows = [
      ["Mailing type", d.mailType.startsWith("Registered") ? "Registered (trackable)" : "Non-registered (not trackable)"],
      ["Per envelope", `$${perEnvelope.toFixed(2)} (4–5 sheets, one address)`],
      ["Envelopes", String(envelopes)],
    ];
  } else {
    const key = `${d.size}-${d.color}`;
    const price = FLYER_BULK_PRICES[key] || FLYER_BULK_PRICES["A4-B&W"];
    const qty = Math.max(1000, Number(d.qty) || 1000);
    const perCopy = isDouble ? price.side2 : price.side1;
    totalUSD = price.setup + perCopy * qty;
    breakdownRows = [
      ["Setup fee (once)", `$${price.setup}`],
      ["Per copy", `$${perCopy.toFixed(2)} × ${qty}`],
      ["Target audience", d.audienceType || "Mixed / General Public"],
      ["Proof", "WhatsApp + site video, no individual tracking"],
    ];
  }

  breakdownRows = [["Exact price (USD)", `$${totalUSD.toFixed(2)}`], ...breakdownRows];

  // Reverse-converted to the site's INR base so money()/checkout stay in
  // sync with fx.USD.rate — displays and charges exactly totalUSD when the
  // customer's currency is USD.
  const totalINR = Math.round(totalUSD / fx.USD.rate);

  const currencyField = `<label style="display:grid;gap:4px;color:var(--muted);grid-column:1 / -1;max-width:220px">Display Currency
    <select name="currency" onchange="captureCurrentPanelData(); renderPanel()"
      style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px">
      ${Object.keys(fx).map(c => `<option${c === state.currency ? " selected" : ""}>${esc(c)}</option>`).join("")}
    </select></label>`;

  return calcShell("Estimated Flyer Distribution Price", [
    currencyField,
    `<p style="grid-column:1 / -1;margin:0;color:var(--muted);font-size:0.85rem">${esc(FLYER_DISCLAIMER)}</p>`,
  ].join(""), totalINR, breakdownRows);
}

function inspectionRequestPanel() {
  const d = { location: "", purpose: "", preferredDates: "", ...activeDraft(), ...currentFormData() };
  return `<h3 style="margin-top:0">Business Inspection / Discussion Request</h3>
    <p style="margin:0 0 12px;color:var(--muted);font-size:0.85rem">A representative physically visits a location to inspect, discuss, or raise queries on your behalf. Flat fee $150–$500 (scope-dependent) + actual travel ticket cost, billed in USD. <strong>Requires prior approval — this is a request, not instant checkout.</strong> We'll review and send you a quote before anything is charged.</p>
    <div style="display:grid;gap:14px;max-width:640px">
      ${contactBlock()}
      ${textField("location", "Location to be inspected", "City, address, or landmark")}
      ${textAreaField("purpose", "What should we inspect / discuss / ask?", "Describe the query or scope of the visit", 4)}
      ${textField("preferredDates", "Preferred dates (optional)", "e.g. any time next 2 weeks")}
      <button type="button" onclick="submitInspectionRequest()"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        Submit Request →
      </button>
    </div>`;
}

async function submitInspectionRequest() {
  captureCurrentPanelData();
  const d = activeDraft();
  if (!d.location || !d.purpose || !d.customerEmail) {
    alert("Please fill in the location, query details, and your email before submitting.");
    return;
  }
  try {
    const res = await fetch("/api/inspection-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: { name: d.customerName || "", email: d.customerEmail || "", phone: d.customerPhone || "" },
        location: d.location, purpose: d.purpose, preferredDates: d.preferredDates || "",
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to submit request");
    panelEl.innerHTML = `
      <div style="display:grid;gap:16px;max-width:560px;text-align:center;padding:32px 0">
        <div style="font-size:2.5rem">📩</div>
        <h3 style="margin:0">Request Submitted</h3>
        <p style="color:var(--muted);margin:0">Your Request ID: <strong>${esc(data.publicOrderId)}</strong></p>
        <p style="color:var(--muted);margin:0;font-size:0.9rem">We'll review your request and send a quote to your email before any charge is made.</p>
      </div>`;
  } catch (err) {
    console.error("Inspection request error:", err);
    alert("Something went wrong submitting your request. Please try again or email postman@khagatara.com.");
  }
}

// ── Bills — Proforma / Service Proposal ─────────────────────────────────────

// Common service items — quick-select presets for Proforma line items.
// value format: "label|rate|currency" (rate is in that item's own currency).
const PROFORMA_ITEM_PRESETS = [
  ["— Select a common item, or type your own below —", "", "INR"],
  ["Print & Post — A4 B&W, Speed Post", "180", "INR"],
  ["Print & Post — A4 Color, Speed Post", "220", "INR"],
  ["Registered Mail — up to 2 pages", "350", "INR"],
  ["Greeting Card — Standard, with delivery", "420", "INR"],
  ["Newspaper Ad — Obituary, B&W (per booking)", "2500", "INR"],
  ["Bulk Mail — per recipient (CSV batch)", "60", "INR"],
  ["Flyer Distribution — Given Address, Registered (per envelope)", "3", "USD"],
  ["Flyer Distribution — Given Address, Non-registered (per envelope)", "1.5", "USD"],
  ["Flyer Distribution — Bulk/Random, 1000 copies B&W A4 (setup)", "89", "USD"],
  ["Business Inspection / Discussion — flat fee (from)", "150", "USD"],
];

function proformaItemPreset(i) {
  return `<select onchange="applyProformaPreset(${i}, this)"
      style="border:1px solid var(--line);border-radius:6px;padding:6px 8px;background:var(--surface);color:var(--muted);font-size:0.78rem;min-height:32px">
      ${PROFORMA_ITEM_PRESETS.map(([label, rate, cur]) => `<option value="${esc(rate)}" data-label="${esc(label)}" data-currency="${esc(cur)}">${esc(label)}</option>`).join("")}
    </select>`;
}

function proformaCurrencyMini(name, selected = "INR") {
  return `<select name="${name}"
      style="border:1px solid var(--line);border-radius:6px;padding:7px 6px;background:var(--surface);color:var(--ink);min-height:36px;font-size:0.8rem">
      ${Object.keys(fx).map(c => `<option${c === selected ? " selected" : ""}>${esc(c)}</option>`).join("")}
    </select>`;
}

function proformaPanel() {
  const d = { currency: "INR", ...activeDraft(), ...currentFormData() };
  return `<h3 style="margin-top:0">Proforma / Service Proposal</h3>
    <p style="margin:0 0 14px;color:var(--muted);font-size:0.85rem">Generated before payment — a proposal only, not a tax invoice.</p>
    <div style="display:grid;gap:16px;max-width:720px">
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>Customer Details</strong>
        ${textField("customerName", "Customer Name", "Full name or business name")}
        ${textField("customerEmail", "Email", "name@example.com")}
        ${textAreaField("customerAddress", "Address (optional)", "Street, city, country", 2)}
      </div>

      ${textAreaField("serviceDescription", "Service Description", "What is this proposal for?", 3)}

      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>Line Items</strong>
        <p style="margin:0;color:var(--muted);font-size:0.8rem">Fill as many rows as needed, leave the rest blank.</p>
        <div style="display:grid;grid-template-columns:2fr 0.5fr 0.6fr 0.5fr;gap:8px;color:var(--muted);font-size:0.72rem">
          <span>What is this for</span><span>How many</span><span>Price each</span><span>Currency</span>
        </div>
        ${[1, 2, 3, 4, 5].map(i => `
          <div style="display:grid;gap:6px;padding-bottom:10px;border-bottom:1px dashed var(--line)">
            <span style="color:var(--muted);font-size:0.72rem">Quick-select — fills the row below, still editable</span>
            ${proformaItemPreset(i)}
            <div style="display:grid;grid-template-columns:2fr 0.5fr 0.6fr 0.5fr;gap:8px">
              ${textField(`item${i}_desc`, "", "Item / service description")}
              ${numField(`item${i}_qty`, "", draftValue(`item${i}_qty`, ""), 0, "1")}
              ${numField(`item${i}_rate`, "", draftValue(`item${i}_rate`, ""), 0, "0.00")}
              ${proformaCurrencyMini(`item${i}_currency`, draftValue(`item${i}_currency`, "INR"))}
            </div>
          </div>`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("currency", "Currency", Object.keys(fx), d.currency)}
        ${textField("validUntil", "Valid Until", "e.g. 15 days from issue")}
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px;margin-top:-6px">
        <span style="color:var(--muted);font-size:0.72rem">Final total is converted to this currency using live exchange rates — line items can each be in a different currency above</span>
        <span style="color:var(--muted);font-size:0.72rem">How long this proposal remains valid — free text, e.g. "15 days" or a date</span>
      </div>

      ${textAreaField("notes", "Notes (optional)", "Payment terms, delivery timeline, etc.", 3)}
      <p style="margin:-6px 0 0;color:var(--muted);font-size:0.72rem">Anything extra to print at the bottom — e.g. advance payment terms, delivery timeline, or special conditions</p>

      <button type="button" onclick="generateProforma()"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:11px 20px;cursor:pointer;font-weight:600;max-width:240px">
        Generate Proforma PDF →
      </button>
    </div>`;
}

function applyProformaPreset(i, selectEl) {
  const opt = selectEl.selectedOptions[0];
  const label = opt?.dataset.label || "";
  const rate = selectEl.value;
  const currency = opt?.dataset.currency || "INR";
  if (!label) return;
  const form = selectEl.closest("form") || document;
  const descField = form.querySelector(`[name="item${i}_desc"]`);
  const rateField = form.querySelector(`[name="item${i}_rate"]`);
  const currencyField = form.querySelector(`[name="item${i}_currency"]`);
  if (descField) descField.value = label;
  if (rateField && rate) rateField.value = rate;
  if (currencyField) currencyField.value = currency;
}

async function generateProforma() {
  captureCurrentPanelData();
  const d = activeDraft();

  if (!d.customerName || !d.serviceDescription) {
    alert("Please fill in the customer name and service description before generating.");
    return;
  }

  const items = [1, 2, 3, 4, 5]
    .map(i => ({ description: d[`item${i}_desc`], qty: d[`item${i}_qty`], rate: d[`item${i}_rate`], currency: d[`item${i}_currency`] || "INR" }))
    .filter(it => it.description && it.description.trim());

  if (!items.length) {
    alert("Please add at least one line item.");
    return;
  }

  try {
    const res = await fetch("/api/bills/proforma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: d.customerName,
        customerEmail: d.customerEmail || "",
        customerAddress: d.customerAddress || "",
        serviceDescription: d.serviceDescription,
        items,
        currency: d.currency || "INR",
        validUntil: d.validUntil || "",
        notes: d.notes || "",
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      alert(errData.error || "Failed to generate proforma.");
      return;
    }

    const docId = res.headers.get("X-Document-Id");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    panelEl.innerHTML = `
      <h3 style="margin-top:0">Proforma Generated</h3>
      <p style="color:var(--muted);margin:0 0 14px">Reference: <strong>${esc(docId || "")}</strong> — saved and ready to print or send.</p>
      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
        <a href="${url}" download="${esc(docId || "proforma")}.pdf"
          style="background:var(--red);color:#fff;text-decoration:none;border-radius:7px;padding:10px 18px;font-weight:600">Download PDF</a>
        <a href="${url}" target="_blank"
          style="background:var(--teal);color:#fff;text-decoration:none;border-radius:7px;padding:10px 18px;font-weight:600">Open / Print</a>
        <button type="button" onclick="openModule('bills',0)"
          style="background:var(--surface-2);border:1px solid var(--line);color:var(--ink);border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600">New Proforma</button>
      </div>
      <iframe src="${url}" style="width:100%;height:70vh;border:1px solid var(--line);border-radius:8px"></iframe>`;
  } catch (err) {
    console.error("Proforma generation error:", err);
    alert("Something went wrong generating the proforma. Please try again.");
  }
}

function billsComingSoonPanel(title) {
  return emptyPanel(title, "This Bills document type is coming soon.");
}

function csvUploadPanel() {
  return `<h3 style="margin-top:0">CSV Upload — Bulk Recipient List</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      ${contactBlock()}
      <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:14px">
        <strong>Required CSV columns:</strong>
        <code style="display:block;margin-top:8px;font-size:0.85rem;color:var(--teal)">name, address_line1, address_line2, city, state, pincode</code>
        <p style="margin:8px 0 0;color:var(--muted);font-size:0.85rem">Optional: <code>custom_message</code>, <code>phone</code></p>
      </div>
      <label style="display:grid;gap:6px;color:var(--muted)">Upload CSV file (max 1000 rows)
        <input name="uploadFile" type="file" accept=".csv"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
      ${activeDraft().uploadFile ? `<p style="margin:0;color:var(--green);font-size:0.9rem">Selected: ${esc(activeDraft().uploadFile.name)}</p>` : ""}
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("merge", "Data Merge Field", ["Name only", "Name + custom message", "Full variable merge"], activeDraft().merge || "Name only")}
        ${opt("validate", "Validate PINs", ["Yes — check against India Post database", "No — proceed as-is"], activeDraft().validate || "Yes — check against India Post database")}
      </div>
      ${textAreaField("instructions", "Bulk mail instructions", "Template notes, sender details, postal method, or handling notes")}
      <button type="button" onclick="captureCurrentPanelData(); openModule('bulk',1)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        Continue to Template →
      </button>
    </div>`;
}

function bulkTemplatePanel() {
  const draft = activeDraft();
  return `<h3 style="margin-top:0">Template Selection</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      ${uploadBlock("Upload document/template to print for each recipient (PDF, DOCX, JPG, PNG)", ".pdf,.docx,.jpg,.jpeg,.png", "If this is different from the CSV, upload the print template here; the latest selected file is saved with the order.")}
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("unit", "Per-unit Type", ["A4 B&W Letter", "A4 Color Letter", "A5 B&W", "A5 Color", "Greeting Card"], draft.unit || "A4 B&W Letter")}
        ${numField("qty", "Recipients", draft.qty || 50)}
      </div>
      ${textAreaField("instructions", "Template / merge instructions", "Describe which fields to merge and any printing/posting instructions", 4)}
      <button type="button" onclick="captureCurrentPanelData(); openModule('bulk',2)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        Continue to Batch Options →
      </button>
    </div>`;
}

function trackTimelinePanel() {
  return `<h3 style="margin-top:0">Order Status Timeline</h3>
    <div style="display:grid;gap:12px;max-width:640px">
      <label style="display:grid;gap:6px;color:var(--muted)">Enter your Order ID
        <div style="display:flex;gap:10px">
          <input type="text" placeholder="e.g. PM-2026-001234"
            style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px;flex:1">
          <button type="button"
            style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:8px 16px;cursor:pointer;font-weight:600">Track</button>
        </div>
      </label>
      <div style="display:grid;gap:8px;padding:16px;background:var(--surface-2);border:1px solid var(--line);border-radius:8px">
        <p style="margin:0;color:var(--muted);font-size:0.85rem">Sample timeline — your real status appears after entering Order ID</p>
        ${[
          ["Order received", "Done", "#3d7354"],
          ["Payment confirmed", "Done", "#3d7354"],
          ["Printed / Booked", "Done", "#3d7354"],
          ["Posted / Dispatched", "In progress", "#ae7f2b"],
          ["Tracking assigned", "Pending", "var(--muted)"],
          ["Delivered", "Pending", "var(--muted)"],
        ].map(([step, status, color]) => `
          <div style="display:flex;justify-content:space-between;padding-top:8px;border-top:1px solid var(--line)">
            <span>${step}</span>
            <strong style="color:${color}">${status}</strong>
          </div>`).join("")}
      </div>
    </div>`;
}

function awbTrackingPanel() {
  return `<h3 style="margin-top:0">India Post / AWB Tracking</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      <label style="display:grid;gap:6px;color:var(--muted)">Enter AWB / Consignment Number
        <div style="display:flex;gap:10px">
          <input type="text" placeholder="e.g. EE123456789IN"
            style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px;flex:1">
          <button type="button"
            style="background:var(--teal);color:#fff;border:none;border-radius:7px;padding:8px 16px;cursor:pointer;font-weight:600">Track</button>
        </div>
      </label>
      <a href="https://ecommerce.indiapost.gov.in/Track/Trackconsignment.aspx" target="_blank" rel="noopener"
        style="display:inline-block;padding:9px 16px;border:1px solid var(--teal);border-radius:7px;color:var(--teal);text-decoration:none;font-size:0.9rem">
        Open India Post tracking site ↗
      </a>
      <p style="color:var(--muted);font-size:0.85rem;margin:0">AWB number is included in your booking slip email. Speed Post and Registered items are trackable within 24h of posting.</p>
    </div>`;
}

function signupPanel() {
  return `<h3 style="margin-top:0">Create Account</h3>
    <div style="display:grid;gap:14px;max-width:480px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${textField("first", "First Name", "First name")}
        ${textField("last",  "Last Name",  "Last name")}
      </div>
      ${textField("email", "Email address", "your@email.com")}
      ${textField("phone", "Phone (WhatsApp preferred)", "+44 / +353 / +91")}
      ${opt("country", "Country of residence",
        ["United Kingdom","Ireland","Germany","UAE","USA","Canada","Australia","Singapore","New Zealand","Other"],
        "United Kingdom")}
      <label style="display:grid;gap:6px;color:var(--muted)">Password
        <input type="password" placeholder="Min 8 characters"
          style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px">
      </label>
      <label style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:0.85rem">
        <input type="checkbox"> I agree to the Terms of Service and Privacy Policy
      </label>
      <button type="button"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:11px 18px;cursor:pointer;font-weight:600">
        Create Account
      </button>
    </div>`;
}

function loginPanel() {
  return `<h3 style="margin-top:0">Sign In</h3>
    <div style="display:grid;gap:14px;max-width:380px">
      ${textField("email", "Email address", "your@email.com")}
      <label style="display:grid;gap:6px;color:var(--muted)">Password
        <input type="password" style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px">
      </label>
      <button type="button"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:11px 18px;cursor:pointer;font-weight:600">
        Sign In
      </button>
      <div style="display:flex;gap:14px;align-items:center">
        <hr style="flex:1;border:none;border-top:1px solid var(--line)">
        <span style="color:var(--muted);font-size:0.85rem">or</span>
        <hr style="flex:1;border:none;border-top:1px solid var(--line)">
      </div>
      <button type="button"
        style="border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:7px;padding:11px 18px;cursor:pointer;font-weight:600">
        Continue with Google
      </button>
      <button type="button" onclick="openModule('account',0)"
        style="background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:0.9rem;text-decoration:underline;padding:0">
        Don't have an account? Sign up
      </button>
    </div>`;
}

function orderHistoryPanel(moduleTitle) {
  return `<h3 style="margin-top:0">Order History${moduleTitle ? ` — ${moduleTitle}` : ""}</h3>
    <div style="display:grid;gap:10px;max-width:720px">
      <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:20px;text-align:center;color:var(--muted)">
        <p style="font-size:1.1rem;margin:0">No orders yet</p>
        <p style="font-size:0.85rem;margin:8px 0 0">Your past orders will appear here once you place your first order.</p>
      </div>
    </div>`;
}

function emptyPanel(title, desc) {
  return `<h3 style="margin-top:0">${title}</h3>
    <div style="display:grid;gap:14px;max-width:620px">
      <p style="color:var(--muted);line-height:1.7;margin:0">${desc}</p>
      <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:16px;color:var(--muted);font-size:0.9rem">
        This panel is ready to receive content. Phase 2 build will wire this to the live order database.
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button type="button" style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:9px 16px;cursor:pointer;font-weight:600">Save draft</button>
        <button type="button" style="border:1px solid var(--teal);color:var(--teal);background:transparent;border-radius:7px;padding:9px 16px;cursor:pointer;font-weight:600">Continue</button>
      </div>
    </div>`;
}

// ── renderPanel — routes every child tab to the right content ──────────────

function renderPanel() {
  const mod = activeModule();
  const child = mod.children[state.childIndex];
  const cid = child.id;
  const mid = mod.id;

  // Calculators
  if (cid === "calculator") {
    const calcs = {
      "print-post": printPostCalc,
      "cards": cardsCalc,
      "registered-mail": registeredCalc,
      "ads": adsCalc,
      "bulk": bulkCalc,
      "flyer-distribution": flyerCalc,
    };
    panelEl.innerHTML = `<h3 style="margin-top:0">Price Calculator</h3>${(calcs[mid] || (() => `<p style="color:var(--muted)">Calculator not yet available for this module.</p>`))()}`;
    return;
  }

  // Order history
  if (cid === "history") { panelEl.innerHTML = orderHistoryPanel(mid === "account" ? "" : mod.title); return; }

  // Module-specific panels
  if (mid === "print-post") {
    if (cid === "upload")     { panelEl.innerHTML = uploadPanel(); return; }
    if (cid === "print-opts") { panelEl.innerHTML = printOptsPanel(); return; }
    if (cid === "post-opts")  { panelEl.innerHTML = postOptsPanel(); return; }
    if (cid === "addresses")  { panelEl.innerHTML = emptyPanel("Saved Addresses", "Save and manage your Indian delivery addresses for faster checkout."); return; }
    if (cid === "reorder")    { panelEl.innerHTML = emptyPanel("Reorder / Templates", "Reuse a previous order's print and post settings in one click."); return; }
  }

  if (mid === "cards") {
    if (cid === "occasion") { panelEl.innerHTML = occasionPanel(); return; }
    if (cid === "format")   { panelEl.innerHTML = cardFormatPanel(); return; }
    if (cid === "personal") { panelEl.innerHTML = personalizationPanel(); return; }
    if (cid === "addons")   { panelEl.innerHTML = addonsPanel(); return; }
    if (cid === "designs")  { panelEl.innerHTML = emptyPanel("Saved Designs", "Your saved card designs will appear here for easy re-ordering."); return; }
  }

  if (mid === "registered-mail") {
    if (cid === "registered") { panelEl.innerHTML = registeredPanel(); return; }
    if (cid === "speed")      { panelEl.innerHTML = speedPostPanel(); return; }
    if (cid === "legal")      { panelEl.innerHTML = legalCheckPanel(); return; }
    if (cid === "recipients") { panelEl.innerHTML = emptyPanel("Saved Recipients", "Save recipient names and addresses for repeat registered mail."); return; }
    if (cid === "archive")    { panelEl.innerHTML = emptyPanel("Proof / Receipt Archive", "Booking slips and delivery confirmation PDFs are stored here for 90 days."); return; }
  }

  if (mid === "ads") {
    if (cid === "ad-type")    { panelEl.innerHTML = adTypePanel(); return; }
    if (cid === "paper")      { panelEl.innerHTML = selectPaperPanel(); return; }
    if (cid === "size-color") { panelEl.innerHTML = adSizeColorPanel(); return; }
    if (cid === "proof")      { panelEl.innerHTML = emptyPanel("Proof Delivery", "Receive an e-paper clipping or physical tearsheet after publication."); return; }
    if (cid === "templates")  { panelEl.innerHTML = emptyPanel("Saved Ad Templates", "Reuse previous ad copy for recurring notices like annual obituaries."); return; }
  }

  if (mid === "bulk") {
    if (cid === "csv")        { panelEl.innerHTML = csvUploadPanel(); return; }
    if (cid === "template")   { panelEl.innerHTML = bulkTemplatePanel(); return; }
    if (cid === "batch-opts") { panelEl.innerHTML = printOptsPanel(); return; }
    if (cid === "lists")      { panelEl.innerHTML = emptyPanel("Saved Recipient Lists", "Reuse uploaded CSV lists for recurring batch sends."); return; }
    if (cid === "templates")  { panelEl.innerHTML = emptyPanel("Saved Templates", "Saved document templates for bulk use, e.g. annual festival greetings."); return; }
  }

  if (mid === "bills") {
    if (cid === "proforma")  { panelEl.innerHTML = proformaPanel(); return; }
    if (cid === "invoice")   { panelEl.innerHTML = billsComingSoonPanel("Invoice"); return; }
    if (cid === "agreement") { panelEl.innerHTML = billsComingSoonPanel("Service Agreement / Order Confirmation"); return; }
    if (cid === "delivery")  { panelEl.innerHTML = billsComingSoonPanel("Service / Delivery Report"); return; }
    if (cid === "receipt")   { panelEl.innerHTML = billsComingSoonPanel("Payment Receipt"); return; }
  }

  if (mid === "flyer-distribution") {
    if (cid === "upload")       { panelEl.innerHTML = flyerUploadPanel(); return; }
    if (cid === "print-opts")   { panelEl.innerHTML = flyerPrintOptsPanel(); return; }
    if (cid === "distribution") { panelEl.innerHTML = flyerDistributionPanel(); return; }
  }

  if (mid === "inspection") {
    if (cid === "details") { panelEl.innerHTML = inspectionRequestPanel(); return; }
  }

  if (mid === "track") {
    if (cid === "timeline")   { panelEl.innerHTML = trackTimelinePanel(); return; }
    if (cid === "awb")        { panelEl.innerHTML = awbTrackingPanel(); return; }
    if (cid === "slip")       { panelEl.innerHTML = emptyPanel("Payment Slip Download", "Download your GST invoice and booking slip as PDF."); return; }
    if (cid === "proof-view") { panelEl.innerHTML = emptyPanel("Proof / Tearsheet Viewer", "View published ad tear-sheets or delivery confirmation photos here."); return; }
    if (cid === "confirm")    { panelEl.innerHTML = emptyPanel("Delivery Confirmation", "Mark your order as received or flag a delivery issue."); return; }
    if (cid === "support")    { panelEl.innerHTML = emptyPanel("Support / Raise Issue", "Contact our team about a specific order. Quote your Order ID."); return; }
    if (cid === "rate")       { panelEl.innerHTML = emptyPanel("Rate This Order", "Leave a star rating and feedback after your order is delivered."); return; }
  }

  if (mid === "account") {
    if (cid === "signup")    { panelEl.innerHTML = signupPanel(); return; }
    if (cid === "login")     { panelEl.innerHTML = loginPanel(); return; }
    if (cid === "kyc")       { panelEl.innerHTML = emptyPanel("Profile & KYC", "Update your name, address, and identity verification details."); return; }
    if (cid === "payment")   { panelEl.innerHTML = emptyPanel("Payment Methods", "Save Razorpay-linked cards or UPI for faster checkout."); return; }
    if (cid === "addresses") { panelEl.innerHTML = emptyPanel("Address Book", "Saved Indian delivery addresses across all your orders."); return; }
    if (cid === "prefs")     { panelEl.innerHTML = emptyPanel("Notifications / Preferences", "Set email alert preferences, display language, and default currency."); return; }
  }

  // Fallback
  panelEl.innerHTML = emptyPanel(child.label, `${mod.title} — ${child.label}: Coming in Phase 2 build.`);
}

// ── Step progress bar ─────────────────────────────────────────────────────

function renderStepProgress() {
  const el = $("stepProgress");
  if (!el) return;
  const mod = activeModule();
  el.style.setProperty("--accent-color", mod.color);
  el.innerHTML = mod.children.map((c, i) => {
    const isDone   = i < state.childIndex;
    const isActive = i === state.childIndex;
    const cls = isDone ? "done" : isActive ? "active" : "";
    const connector = i < mod.children.length - 1
      ? `<div class="step-connector${isDone ? " done" : ""}"></div>`
      : "";
    return `
      <div class="step-progress-item">
        <div class="step-dot ${cls}" data-child="${i}" title="${c.label}">
          <div class="step-dot-circle">${isDone ? "✓" : i + 1}</div>
          <span class="step-dot-label">${c.label}</span>
        </div>
        ${connector}
      </div>`;
  }).join("");
}

// ── Back button helper ────────────────────────────────────────────────────

function backBtn(moduleId, childIndex, label) {
  return `<button class="back-btn" type="button" onclick="openModule('${moduleId}',${childIndex})">← ${label || "Back"}</button>`;
}

// ── Render mother/child tabs ───────────────────────────────────────────────

function renderMotherTabs() {
  motherTabsEl.innerHTML = modules.map((m, i) => {
    const isActive = m.id === state.moduleId;
    return `
    <button class="tab-button${isActive ? " active" : ""}"
      type="button" data-module="${m.id}"
      style="border-left:3px solid ${isActive ? m.color : "transparent"};${isActive ? `background:var(--ink);color:var(--surface);` : ""}"
      onmouseover="if(!this.classList.contains('active')){this.style.background='var(--surface-2)';this.style.color='${m.color}';this.style.borderLeftColor='${m.color}';}"
      onmouseout="if(!this.classList.contains('active')){this.style.background='transparent';this.style.color='var(--ink)';this.style.borderLeftColor='transparent';}">
      <span>${m.icon} ${i + 1}. ${m.title}</span>
      <small>${m.children.length}</small>
    </button>`;
  }).join("");
}

function renderChildTabs() {
  const mod = activeModule();
  childTabsEl.innerHTML = mod.children.map((c, i) => `
    <button class="tab-button child-tab${i === state.childIndex ? " active" : ""}"
      type="button" data-child="${i}"
      style="${i === state.childIndex ? `background:${mod.color};color:#fff;border-color:${mod.color};` : ""}">
      <span>${c.label}</span>
    </button>`).join("");
}

function renderModuleCards() {
  if (!moduleCards) return;
  moduleCards.innerHTML = modules.map((m) => `
    <button type="button" data-module="${m.id}"
      style="display:grid;gap:10px;padding:20px;border:1px solid var(--line);border-top:3px solid ${m.color};border-radius:8px;background:var(--surface);cursor:pointer;text-align:left;color:var(--ink);transition:box-shadow 0.15s"
      onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='none'">
      <span style="font-size:1.8rem">${m.icon}</span>
      <strong style="font-size:1rem">${m.title}</strong>
      <small style="color:var(--muted)">${m.badge}</small>
    </button>`).join("");
}

function render() {
  const mod = activeModule();
  $("moduleTitle").textContent = mod.title;
  $("moduleBadge").textContent = mod.badge;
  $("breadcrumb").textContent = `Home / ${mod.title} / ${mod.children[state.childIndex].label}`;
  renderMotherTabs();
  renderChildTabs();
  renderStepProgress();
  renderPanel();
  initChildTabsArrows();
}

function openModule(moduleId, childIndex) {
  state.moduleId = moduleId;
  state.childIndex = typeof childIndex === "number" ? childIndex : 0;
  homeView.hidden = true;
  moduleView.hidden = false;
  render();
}

async function buildOrderPayload(amountInInr, orderNotes) {
  captureCurrentPanelData();
  const draft = activeDraft();
  const uploadFile = draft.uploadFile;

  const fileRequiredModules = ["print-post", "registered-mail", "bulk"];
  if (fileRequiredModules.includes(state.moduleId) && !uploadFile) {
    alert("Please upload the customer file first. This is needed so the admin can fulfill the order.");
    openModule(state.moduleId, 0);
    return null;
  }

  if (state.moduleId === "ads" && !uploadFile && !draft.adText) {
    alert("Please upload the ad matter or paste the ad text before checkout.");
    openModule("ads", 0);
    return null;
  }

  if (state.moduleId === "cards" && !uploadFile && !draft.cardProductLink && !draft.message && !draft.designInstructions) {
    alert("Please add the card link/reference, message, upload, or design instructions before checkout.");
    openModule("cards", 0);
    return null;
  }

  if (uploadFile && uploadFile.size > 20 * 1024 * 1024) {
    alert("The uploaded file is larger than 20 MB. Please upload a smaller PDF, DOCX, JPG, or PNG.");
    return null;
  }

  const operationalModules = ["print-post", "registered-mail", "ads", "bulk", "cards", "flyer-distribution"];
  if (operationalModules.includes(state.moduleId) && !draft.customerEmail) {
    alert("Please enter the customer email before checkout.");
    openModule(state.moduleId, state.moduleId === "print-post" ? 2 : state.moduleId === "flyer-distribution" ? 2 : 0);
    return null;
  }

  if (["print-post", "registered-mail", "cards"].includes(state.moduleId) && (!draft.name || !draft.address || !draft.pin)) {
    alert("Please complete the recipient address before checkout.");
    openModule(state.moduleId, state.moduleId === "print-post" ? 2 : 0);
    return null;
  }

  const fileBase64 = await fileToBase64(uploadFile);

  return {
    amount: amountInInr,
    currency: "INR",
    notes: orderNotes || {},
    customer: {
      name: draft.customerName || "",
      email: draft.customerEmail || "",
      phone: draft.customerPhone || "",
    },
    recipient: {
      name: draft.name || "",
      address: draft.address || "",
      pin: draft.pin || "",
      city: draft.city || "",
      state: draft.state || "",
    },
    instructions: draft.instructions || "",
    selections: {
      ...draft,
      uploadFile: uploadFile ? {
        name: uploadFile.name,
        size: uploadFile.size,
        type: uploadFile.type,
      } : null,
      module: state.moduleId,
    },
    file: uploadFile ? {
      name: uploadFile.name,
      type: uploadFile.type || "application/octet-stream",
      base64: fileBase64,
    } : null,
  };
}

function showPaymentSuccess(orderId, note) {
  const draft = activeDraft();
  const isFlyerBulk = state.moduleId === "flyer-distribution" && draft.distType === "No Address — Bulk / Random";
  panelEl.innerHTML = `
    <div style="display:grid;gap:16px;max-width:560px;text-align:center;padding:32px 0">
      <div style="font-size:2.5rem">✅</div>
      <h3 style="margin:0;color:var(--green)">Payment Successful</h3>
      <p style="color:var(--muted);margin:0">Your Order ID: <strong>${orderId}</strong></p>
      <p style="color:var(--muted);margin:0;font-size:0.9rem">${note || "We will print and post your document. A confirmation email will be sent shortly."}</p>
      ${isFlyerBulk ? `
        <div style="border:1px solid var(--line);border-radius:8px;padding:14px;background:var(--surface-2);text-align:left">
          <strong>Proof &amp; updates via WhatsApp</strong>
          <p style="margin:6px 0 0;color:var(--muted);font-size:0.85rem">Message us on WhatsApp at <a href="https://wa.me/917034101134" target="_blank" style="color:var(--teal);font-weight:600">+91 70341 01134</a> — we'll send the printed-stock video and distribution proof there.</p>
        </div>
      ` : ""}
      <button type="button" onclick="openModule('track',0)"
        style="margin:8px auto 0;background:var(--red);color:#fff;border:none;border-radius:7px;padding:11px 24px;cursor:pointer;font-weight:600">
        Track Your Order →
      </button>
    </div>`;
}

async function payWithRazorpay(payload) {
  try {
    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Could not start payment. Please try again or email postman@khagatara.com.");
      console.error("create-order failed:", data);
      return;
    }

    const rzp = new Razorpay({
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      name: "Postman — Khagatara",
      description: "Order payment",
      order_id: data.orderId,
      handler: async function (response) {
        try {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.verified) {
            showPaymentSuccess(verifyData.orderId);
          } else {
            alert("Payment received but verification failed. Please email postman@khagatara.com with payment ID: " + response.razorpay_payment_id);
            console.error("Verify response:", verifyData);
          }
        } catch (verifyErr) {
          console.error("Verify fetch error:", verifyErr);
          alert("Payment received but we could not confirm. Please email postman@khagatara.com with payment ID: " + response.razorpay_payment_id);
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Checkout closed without completing payment.");
        },
      },
      theme: { color: "#b72d32" },
    });

    rzp.open();
  } catch (err) {
    console.error("Razorpay checkout error:", err);
    alert("Something went wrong starting payment. Please try again.");
  }
}

let paypalSdkPromise = null;
function loadPaypalSdk(clientId) {
  if (window.paypal) return Promise.resolve();
  if (paypalSdkPromise) return paypalSdkPromise;
  paypalSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&components=buttons&disable-funding=venmo`;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
    document.head.appendChild(script);
  });
  return paypalSdkPromise;
}

async function payWithPayPal(payload) {
  try {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Could not start PayPal payment. Please try again or email postman@khagatara.com.");
      console.error("PayPal create-order failed:", data);
      return;
    }

    panelEl.innerHTML = `
      <div style="display:grid;gap:16px;max-width:420px;margin:0 auto;padding:24px 0;text-align:center">
        <p style="color:var(--muted);margin:0">Approximate charge: <strong>$${data.usdAmount} USD</strong></p>
        <div id="paypal-checkout-container"></div>
        <button type="button" onclick="proceedToCheckout(${payload.amount}, ${JSON.stringify(payload.notes)})"
          style="background:none;border:none;color:var(--muted);text-decoration:underline;cursor:pointer;font-size:0.85rem">
          ← Choose a different payment method
        </button>
      </div>`;

    await loadPaypalSdk(data.clientId);

    window.paypal.Buttons({
      createOrder: () => Promise.resolve(data.paypalOrderId),
      onApprove: async () => {
        try {
          const captureRes = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paypalOrderId: data.paypalOrderId }),
          });
          const captureData = await captureRes.json();

          if (captureRes.ok && captureData.verified) {
            showPaymentSuccess(captureData.orderId);
          } else {
            alert("Payment received but verification failed. Please email postman@khagatara.com with order ID: " + data.publicOrderId);
            console.error("Capture response:", captureData);
          }
        } catch (captureErr) {
          console.error("Capture fetch error:", captureErr);
          alert("Payment received but we could not confirm. Please email postman@khagatara.com with order ID: " + data.publicOrderId);
        }
      },
      onError: (err) => {
        console.error("PayPal button error:", err);
        alert("Something went wrong with PayPal. Please try again or use Razorpay instead.");
      },
    }).render("#paypal-checkout-container");
  } catch (err) {
    console.error("PayPal checkout error:", err);
    alert("Something went wrong starting PayPal payment. Please try again.");
  }
}

async function proceedToCheckout(amountInInr, orderNotes) {
  const payload = await buildOrderPayload(amountInInr, orderNotes);
  if (!payload) return;

  panelEl.innerHTML = `
    <div style="display:grid;gap:16px;max-width:420px;margin:0 auto;padding:32px 0;text-align:center">
      <h3 style="margin:0">Choose payment method</h3>
      <p style="color:var(--muted);margin:0;font-size:0.9rem">Amount: ₹${amountInInr}</p>
      <div style="display:grid;gap:10px">
        <button type="button" id="payWithRazorpayBtn"
          style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:12px 18px;cursor:pointer;font-size:0.95rem;font-weight:600">
          Pay with Razorpay (India — UPI, cards, netbanking)
        </button>
        <button type="button" id="payWithPaypalBtn"
          style="background:#003087;color:#fff;border:none;border-radius:7px;padding:12px 18px;cursor:pointer;font-size:0.95rem;font-weight:600">
          Pay with PayPal (International)
        </button>
      </div>
    </div>`;

  document.getElementById("payWithRazorpayBtn").addEventListener("click", () => payWithRazorpay(payload));
  document.getElementById("payWithPaypalBtn").addEventListener("click", () => payWithPayPal(payload));
}

// ── Event listeners ────────────────────────────────────────────────────────

document.addEventListener("click", (e) => {
  const modBtn   = e.target.closest("[data-module]");
  const childBtn = e.target.closest("[data-child]");
  const openBtn  = e.target.closest("[data-open]");
  const homeBtn  = e.target.closest("[href='#home'], [href='#home'] *");
  const accBtn   = e.target.closest("#accountBtn");

  if (!(modBtn || childBtn || openBtn || homeBtn || accBtn)) return;

  captureCurrentPanelData();

  // Re-rendering below replaces the clicked button's DOM node, which drops
  // focus back to <body> and makes the browser reset scroll to the top.
  // Snapshot the scroll position and restore it right after the DOM update.
  const scrollY = window.scrollY;

  if (modBtn)   openModule(modBtn.dataset.module, 0);
  if (childBtn) { state.childIndex = Number(childBtn.dataset.child); render(); }
  if (openBtn)  openModule(openBtn.dataset.open, openBtn.dataset.open === "track" ? 0 : 3);
  if (homeBtn)  { homeView.hidden = false; moduleView.hidden = true; renderMotherTabs(); }
  if (accBtn)   openModule("account", 0);

  requestAnimationFrame(() => window.scrollTo(0, scrollY));
});

document.addEventListener("input", (e) => {
  if (e.target.matches("input[type='file'][name]")) {
    captureCurrentPanelData();
    renderPanel();
    return;
  }
  if (e.target.matches("[data-pin-lookup]")) {
    const pin = e.target.value.trim();
    if (/^\d{6}$/.test(pin) && pincodeLookup.pin !== pin) {
      lookupPincode(pin);
    }
    // Don't fall through to renderPanel() for PIN input —
    // rebuilding the DOM mid-type destroys the focused element.
    return;
  }
  if (e.target.closest("#calcForm")) {
    captureCurrentPanelData();
    renderPanel();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.matches("#panel input[name], #panel select[name], #panel textarea[name]")) {
    captureCurrentPanelData();
    if (e.target.matches("input[type='file'][name]")) renderPanel();
  }
});

$("themeSelect").addEventListener("change", (e) => {
  const t = e.target.value;
  document.documentElement.dataset.theme = t === "system" ? "" : t;
  localStorage.setItem("postmanTheme", t);
});

// ── Child tabs scroll arrows ───────────────────────────────────────────────

function initChildTabsArrows() {
  const tabs  = $("childTabs");
  const left  = $("childTabsLeft");
  const right = $("childTabsRight");
  if (!tabs || !left || !right) return;

  function updateArrows() {
    left.disabled  = tabs.scrollLeft <= 4;
    right.disabled = tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 4;
  }

  left.addEventListener("click",  () => { tabs.scrollLeft -= 220; });
  right.addEventListener("click", () => { tabs.scrollLeft += 220; });
  tabs.addEventListener("scroll", updateArrows);
  updateArrows();
}

// ── Init ───────────────────────────────────────────────────────────────────

const FONT_MIN = 12.5, FONT_MAX = 18, FONT_STEP = 0.5;

const savedTheme = localStorage.getItem("postmanTheme") || "system";
const savedFont  = parseFloat(localStorage.getItem("postmanFontSize")) || 15;
$("themeSelect").value = savedTheme;
document.documentElement.dataset.theme = savedTheme === "system" ? "" : savedTheme;
document.documentElement.style.setProperty("--base-font-size", `${savedFont}px`);

function adjustFont(delta) {
  const current = parseFloat(document.documentElement.style.getPropertyValue("--base-font-size")) || 15;
  const next = Math.min(FONT_MAX, Math.max(FONT_MIN, current + delta));
  document.documentElement.style.setProperty("--base-font-size", `${next}px`);
  localStorage.setItem("postmanFontSize", String(next));
}
$("fontDecrease").addEventListener("click", () => adjustFont(-FONT_STEP));
$("fontIncrease").addEventListener("click", () => adjustFont(FONT_STEP));

const landingViewEl = $("landingView");
const appShellEl = $("appShell");
function revealApp() {
  landingViewEl.hidden = true;
  appShellEl.style.display = "grid";
  homeView.hidden = false;
  moduleView.hidden = true;
}
$("getStartedBtn").addEventListener("click", revealApp);
const getStartedBtnTop = document.getElementById("getStartedBtnTop");
if (getStartedBtnTop) getStartedBtnTop.addEventListener("click", revealApp);

renderMotherTabs();
loadLiveConfig();
initHeroSlider();
