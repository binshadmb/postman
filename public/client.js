// client.js — Postman Khagatara full interactive shell
// Tab registry mirrored from lib/tabRegistry.ts (plain JS for browser)

const modules = [
  {
    id: "print-post", title: "Document Print & Post",
    badge: "High-margin volume line", icon: "🖨️", color: "#b72d32",
    children: [
      { id: "upload",     label: "Upload Document" },
      { id: "print-opts", label: "Print Options" },
      { id: "post-opts",  label: "Post Options" },
      { id: "calculator", label: "Price Calculator" },
      { id: "history",    label: "Order History" },
      { id: "addresses",  label: "Saved Addresses" },
      { id: "reorder",    label: "Reorder / Templates" },
    ]
  },
  {
    id: "cards", title: "Greeting Cards",
    badge: "Personalized card service", icon: "💌", color: "#ae7f2b",
    children: [
      { id: "occasion",   label: "Choose Occasion" },
      { id: "format",     label: "Card Format" },
      { id: "personal",   label: "Personalization" },
      { id: "addons",     label: "Add-ons" },
      { id: "calculator", label: "Price Calculator" },
      { id: "history",    label: "Order History" },
      { id: "designs",    label: "Saved Designs" },
    ]
  },
  {
    id: "registered-mail", title: "Registered / Certified Mail",
    badge: "Receipts and legal-post workflow", icon: "📮", color: "#186b70",
    children: [
      { id: "registered", label: "Registered Post" },
      { id: "speed",      label: "Speed Post" },
      { id: "legal",      label: "Legal Notice Format Check" },
      { id: "calculator", label: "Price Calculator" },
      { id: "history",    label: "Order History" },
      { id: "recipients", label: "Saved Recipients" },
      { id: "archive",    label: "Proof / Receipt Archive" },
    ]
  },
  {
    id: "ads", title: "Newspaper / Media Ad Placement",
    badge: "Cost-plus convenience line", icon: "📰", color: "#3d7354",
    children: [
      { id: "ad-type",    label: "Ad Type Selection" },
      { id: "paper",      label: "Select Paper" },
      { id: "size-color", label: "Size & Color" },
      { id: "proof",      label: "Proof Delivery" },
      { id: "calculator", label: "Price Calculator" },
      { id: "history",    label: "Order History" },
      { id: "templates",  label: "Saved Ad Templates" },
    ]
  },
  {
    id: "bulk", title: "Bulk / Business Mail",
    badge: "CSV and repeat sender workflow", icon: "📦", color: "#6b5ea8",
    children: [
      { id: "csv",        label: "CSV Upload" },
      { id: "template",   label: "Template Selection" },
      { id: "batch-opts", label: "Batch Print Options" },
      { id: "calculator", label: "Price Calculator" },
      { id: "history",    label: "Order History" },
      { id: "lists",      label: "Saved Recipient Lists" },
      { id: "templates",  label: "Saved Templates" },
    ]
  },
  {
    id: "track", title: "Track Order",
    badge: "Timeline, proof, and support", icon: "📍", color: "#c05c00",
    children: [
      { id: "timeline",   label: "Order Status Timeline" },
      { id: "slip",       label: "Payment Slip Download" },
      { id: "awb",        label: "India Post / AWB Tracking" },
      { id: "proof-view", label: "Proof / Tearsheet Viewer" },
      { id: "confirm",    label: "Delivery Confirmation" },
      { id: "support",    label: "Support / Raise Issue" },
      { id: "rate",       label: "Rate This Order" },
    ]
  },
  {
    id: "account", title: "Account",
    badge: "Customer identity and preferences", icon: "👤", color: "#555",
    children: [
      { id: "signup",    label: "Account Creation / Sign-up" },
      { id: "login",     label: "Login" },
      { id: "kyc",       label: "Profile & KYC" },
      { id: "payment",   label: "Payment Methods" },
      { id: "addresses", label: "Address Book" },
      { id: "history",   label: "Order History" },
      { id: "prefs",     label: "Notifications / Preferences" },
    ]
  }
];

const fx = {
  INR: { symbol: "₹", rate: 1 },
  EUR: { symbol: "€", rate: 0.0109 },
  GBP: { symbol: "£", rate: 0.0094 },
  USD: { symbol: "$", rate: 0.012 }
};

const state = { moduleId: "print-post", childIndex: 3, currency: "INR" };

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

function opt(name, label, values, selected) {
  return `<label style="display:grid;gap:4px;color:var(--muted)">${label}
    <select name="${name}" style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px">
      ${values.map((v) => `<option${v === selected ? " selected" : ""}>${v}</option>`).join("")}
    </select></label>`;
}

function numField(name, label, value, min) {
  return `<label style="display:grid;gap:4px;color:var(--muted)">${label}
    <input name="${name}" type="number" min="${min || 1}" value="${value}"
      style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px"></label>`;
}

function textField(name, label, placeholder) {
  return `<label style="display:grid;gap:4px;color:var(--muted)">${label}
    <input name="${name}" type="text" placeholder="${placeholder}"
      style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px"></label>`;
}

function currencyField() {
  return opt("currency", "Customer Currency", Object.keys(fx), state.currency);
}

function calcShell(title, fields, total, rows) {
  return `<div style="display:grid;grid-template-columns:minmax(260px,1fr) minmax(240px,0.8fr);gap:18px">
    <form id="calcForm" style="display:grid;grid-template-columns:repeat(2,minmax(160px,1fr));gap:14px">
      ${fields}
    </form>
    <aside style="align-self:start;display:grid;gap:14px;padding:18px;border-radius:8px;background:var(--surface-2);border:1px solid var(--line)">
      <span style="color:var(--muted);font-size:0.85rem">${title}</span>
      <strong style="font-size:2.6rem;font-weight:800">${money(total)}</strong>
      ${rows.map(([k, v]) => `<div style="display:flex;justify-content:space-between;padding-top:10px;border-top:1px solid var(--line)"><span>${k}</span><strong>${v}</strong></div>`).join("")}
      <button type="button" onclick="proceedToCheckout()" style="margin-top:8px;background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-size:0.95rem;font-weight:600">Proceed to checkout →</button>
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
  const d = { pages: 1, size: "A4", color: "B&W", paper: "Standard", sides: "Single-sided", post: "Speed Post", ...currentFormData() };
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
    ["India cost floor", money(Math.ceil(total * 0.25))],
    ["Sender reference (EU)", money(total * 1.05)],
    ["Best volume line", "A4 B&W + Speed Post"],
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
    ["UK price anchor", "~£3.50 per delivered card"],
    ["India cost estimate", money(45)],
    ["Best occasion", "Festivals / Family"],
  ]);
}

function registeredCalc() {
  const d = { pages: 2, service: "Registered", legal: "No", ...currentFormData() };
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
    ["Receipt/tracking", "Included"],
    ["Proof of posting", "Booking slip PDF"],
    ["Legal disclaimer", "Posting service only"],
  ]);
}

function adsCalc() {
  const d = { area: 10, color: "B&W", paper: "Malayala Manorama", proof: "E-paper", ...currentFormData() };
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
    ["Paper rate (base)", money(cost)],
    ["Service margin", "20%"],
    ["Pricing model", "Cost-plus convenience"],
  ]);
}

function bulkCalc() {
  const d = { qty: 50, unit: "A4 B&W Letter", data: "CSV Upload", ...currentFormData() };
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
    ["Unit reference price", money(unit)],
    ["Volume discount applied", `${Math.round(discount * 100)}%`],
    ["CSV processing", "Included in price"],
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
  return `<h3 style="margin-top:0">Upload Your Document</h3>
    <div style="display:grid;gap:18px;max-width:640px">
      <label style="display:grid;gap:6px;color:var(--muted)">Select file (PDF, DOCX, JPG, PNG — max 20 MB)
        <input type="file" accept=".pdf,.docx,.jpg,.jpeg,.png"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
      <label style="display:grid;gap:6px;color:var(--muted)">Number of copies
        <input type="number" min="1" value="1"
          style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);max-width:120px;min-height:36px">
      </label>
      <label style="display:grid;gap:6px;color:var(--muted)">Special instructions (optional)
        <textarea rows="3" placeholder="e.g. Print pages 1-3 only, use A4 landscape…"
          style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);resize:vertical"></textarea>
      </label>
      <button type="button" onclick="openModule('print-post',1)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        Continue to Print Options →
      </button>
    </div>`;
}

function printOptsPanel() {
  return `<h3 style="margin-top:0">Print Options</h3>
    <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:14px;max-width:640px">
      ${opt("color",   "Print Color",    ["B&W", "Color"],                         "B&W")}
      ${opt("sides",   "Sides",          ["Single-sided", "Double-sided"],          "Single-sided")}
      ${opt("size",    "Paper Size",     ["A5", "A4", "A3", "Legal"],              "A4")}
      ${opt("paper",   "Paper Quality",  ["Standard 70 GSM", "Bond 80 GSM", "Premium 100 GSM", "Photo Paper"], "Standard 70 GSM")}
      ${opt("binding", "Binding",        ["None", "Stapled", "Spiral Bound"],       "None")}
      ${opt("copies",  "Copies",         ["1", "2", "3", "5", "10", "Custom"],      "1")}
    </div>
    <button type="button" onclick="openModule('print-post',2)"
      style="margin-top:16px;background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600">
      Continue to Post Options →
    </button>`;
}

function postOptsPanel() {
  return `<h3 style="margin-top:0">Post Options</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("post", "Post Type", ["Regular Post", "Speed Post (tracked)", "Registered Post", "Courier"], "Speed Post (tracked)")}
        ${opt("zone", "Delivery Zone", ["Within Kerala", "Rest of India", "Metro city"], "Within Kerala")}
      </div>
      <div style="border:1px solid var(--line);border-radius:8px;padding:16px;background:var(--surface-2);display:grid;gap:10px">
        <strong>Delivery Address</strong>
        ${textField("name",    "Recipient Name",    "Full name")}
        ${textField("address", "Street Address",    "House/flat, street")}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${textField("city", "City", "City")}
          ${textField("pin",  "PIN Code", "6-digit PIN")}
        </div>
        ${opt("state", "State", ["Kerala", "Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "West Bengal", "Gujarat", "Other"], "Kerala")}
      </div>
      <button type="button" onclick="openModule('print-post',3)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        See Price Estimate →
      </button>
    </div>`;
}

function occasionPanel() {
  const occasions = [
    ["🎂","Birthday"],["💍","Anniversary"],["💒","Wedding"],["🪔","Diwali"],
    ["🌺","Onam"],["☪️","Eid"],["🎄","Christmas"],["🎉","New Year"],
    ["🙏","Thank-you"],["💐","Get-well"],["🕊️","Condolence"],["👶","New Baby"],
    ["🏖️","Retirement"],["🎓","Graduation"],["✏️","Custom Upload"]
  ];
  return `<h3 style="margin-top:0">Choose Occasion</h3>
    <div style="display:grid;grid-template-columns:repeat(5,minmax(100px,1fr));gap:12px;max-width:700px">
      ${occasions.map(([icon, label]) => `
        <button type="button" onclick="openModule('cards',1)"
          style="display:grid;gap:6px;align-items:center;justify-items:center;padding:14px 8px;border:1px solid var(--line);border-radius:8px;background:var(--surface);cursor:pointer;color:var(--ink);transition:background 0.15s">
          <span style="font-size:1.8rem">${icon}</span>
          <small>${label}</small>
        </button>`).join("")}
    </div>`;
}

function cardFormatPanel() {
  return `<h3 style="margin-top:0">Card Format</h3>
    <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:14px;max-width:640px">
      ${opt("size",  "Card Size",   ["Standard 5×7", "Large A5", "Square"],                     "Standard 5×7")}
      ${opt("fold",  "Fold Style",  ["Single fold", "Tri-fold", "No fold (flat)"],               "Single fold")}
      ${opt("stock", "Card Stock",  ["Matte", "Glossy", "Textured (cotton-feel)", "Embossed"],   "Matte")}
      ${opt("color", "Print Color", ["Full color", "B&W sketch style"],                          "Full color")}
    </div>
    <button type="button" onclick="openModule('cards',2)"
      style="margin-top:16px;background:var(--gold);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600">
      Add Personalization →
    </button>`;
}

function personalizationPanel() {
  return `<h3 style="margin-top:0">Personalization</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      ${textField("name", "Recipient Name (for merge)", "e.g. Dear Amma,")}
      <label style="display:grid;gap:6px;color:var(--muted)">Your message
        <textarea name="message" rows="5" placeholder="Write your message here…"
          style="border:1px solid var(--line);border-radius:6px;padding:8px 10px;background:var(--surface);color:var(--ink);resize:vertical"></textarea>
      </label>
      ${opt("font", "Font Style", ["Classic Serif", "Handwritten Script", "Modern Sans", "Elegant Italic"], "Handwritten Script")}
      <label style="display:grid;gap:6px;color:var(--muted)">Photo insert (optional — JPG/PNG, max 5 MB)
        <input type="file" accept=".jpg,.jpeg,.png"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
      <button type="button" onclick="openModule('cards',3)"
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
    <div style="display:grid;gap:12px;max-width:560px">
      ${addons.map(([name, price, desc]) => `
        <label style="display:flex;align-items:flex-start;gap:12px;padding:14px;border:1px solid var(--line);border-radius:8px;cursor:pointer;background:var(--surface)">
          <input type="checkbox" style="margin-top:3px;width:16px;height:16px">
          <span style="display:grid;gap:2px">
            <strong>${name} <span style="color:var(--muted);font-weight:400">+${price}</span></strong>
            <small style="color:var(--muted)">${desc}</small>
          </span>
        </label>`).join("")}
      <button type="button" onclick="openModule('cards',4)"
        style="margin-top:4px;background:var(--gold);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        See Price Estimate →
      </button>
    </div>`;
}

function registeredPanel() {
  return `<h3 style="margin-top:0">Registered Post</h3>
    <div style="display:grid;gap:14px;max-width:640px">
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
        ${numField("pages", "Number of pages", 2)}
        ${opt("weight", "Estimated weight", ["Up to 50g", "51–100g", "101–250g", "251–500g"], "Up to 50g")}
      </div>
      <button type="button" onclick="openModule('registered-mail',3)"
        style="background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        See Price →
      </button>
    </div>`;
}

function speedPostPanel() {
  return `<h3 style="margin-top:0">Speed Post</h3>
    <div style="display:grid;gap:14px;max-width:640px">
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
        ${numField("pages", "Number of pages", 2)}
        ${opt("zone", "Delivery Zone", ["Local", "State", "National"], "National")}
      </div>
      <button type="button" onclick="openModule('registered-mail',3)"
        style="background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        See Price →
      </button>
    </div>`;
}

function legalCheckPanel() {
  return `<h3 style="margin-top:0">Legal Notice Format Check</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      <p style="color:var(--muted);line-height:1.7;margin:0">
        Before posting, we can do a basic format review to ensure the notice includes required elements: sender/recipient details, date, subject line, and demand/cause of action.
        This is a document formatting check only — we are not legal advisors.
      </p>
      <label style="display:grid;gap:6px;color:var(--muted)">Upload your draft notice (PDF or DOCX)
        <input type="file" accept=".pdf,.docx"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
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
      <button type="button"
        style="background:var(--teal);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        Submit for Format Check — ₹180
      </button>
    </div>`;
}

function adTypePanel() {
  const types = [
    ["Obituary / Death Notice", "📰", "Posted within 24–48h of receiving details"],
    ["Matrimonial",             "💒", "Classified or display format available"],
    ["Legal Notice",            "⚖️", "Statutory publication, gazette if required"],
    ["Classified",              "📋", "Text-based, per-word / per-line pricing"],
    ["Display Ad",              "🖼️", "Banner ad, custom size, full-color option"],
    ["Tender / Public Notice",  "📢", "Gazette and vernacular papers"],
  ];
  return `<h3 style="margin-top:0">Select Ad Type</h3>
    <div style="display:grid;grid-template-columns:repeat(3,minmax(160px,1fr));gap:12px;max-width:680px">
      ${types.map(([name, icon, note]) => `
        <button type="button" onclick="openModule('ads',1)"
          style="display:grid;gap:6px;padding:16px;border:1px solid var(--line);border-radius:8px;background:var(--surface);cursor:pointer;text-align:left;color:var(--ink)">
          <span style="font-size:1.6rem">${icon}</span>
          <strong style="font-size:0.9rem">${name}</strong>
          <small style="color:var(--muted)">${note}</small>
        </button>`).join("")}
    </div>`;
}

function selectPaperPanel() {
  return `<h3 style="margin-top:0">Select Publication</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("language", "Language", ["Malayalam", "English", "Hindi", "Tamil", "Kannada"], "Malayalam")}
        ${opt("paper",    "Publication", ["Malayala Manorama", "Mathrubhumi", "Mangalam", "Deepika", "The Hindu", "Times of India", "Deccan Herald"], "Malayala Manorama")}
        ${opt("edition",  "Edition",   ["State", "Kochi", "Trivandrum", "Kozhikode", "Thrissur", "National"], "State")}
      </div>
      <label style="display:grid;gap:6px;color:var(--muted)">Preferred publish date
        <input type="date" style="border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:var(--surface);color:var(--ink);min-height:36px;max-width:220px">
      </label>
      <button type="button" onclick="openModule('ads',2)"
        style="background:var(--green);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:200px">
        Set Size & Color →
      </button>
    </div>`;
}

function csvUploadPanel() {
  return `<h3 style="margin-top:0">CSV Upload — Bulk Recipient List</h3>
    <div style="display:grid;gap:14px;max-width:640px">
      <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:14px">
        <strong>Required CSV columns:</strong>
        <code style="display:block;margin-top:8px;font-size:0.85rem;color:var(--teal)">name, address_line1, address_line2, city, state, pincode</code>
        <p style="margin:8px 0 0;color:var(--muted);font-size:0.85rem">Optional: <code>custom_message</code>, <code>phone</code></p>
      </div>
      <label style="display:grid;gap:6px;color:var(--muted)">Upload CSV file (max 1000 rows)
        <input type="file" accept=".csv"
          style="border:1px solid var(--line);border-radius:6px;padding:8px;background:var(--surface);color:var(--ink)">
      </label>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(180px,1fr));gap:12px">
        ${opt("merge", "Data Merge Field", ["Name only", "Name + custom message", "Full variable merge"], "Name only")}
        ${opt("validate", "Validate PINs", ["Yes — check against India Post database", "No — proceed as-is"], "Yes — check against India Post database")}
      </div>
      <button type="button" onclick="openModule('bulk',1)"
        style="background:var(--red);color:#fff;border:none;border-radius:7px;padding:10px 18px;cursor:pointer;font-weight:600;max-width:220px">
        Continue to Template →
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
    if (cid === "size-color") { panelEl.innerHTML = emptyPanel("Size & Color", "Set column-cm dimensions and choose B&W or color for your ad."); return; }
    if (cid === "proof")      { panelEl.innerHTML = emptyPanel("Proof Delivery", "Receive an e-paper clipping or physical tearsheet after publication."); return; }
    if (cid === "templates")  { panelEl.innerHTML = emptyPanel("Saved Ad Templates", "Reuse previous ad copy for recurring notices like annual obituaries."); return; }
  }

  if (mid === "bulk") {
    if (cid === "csv")        { panelEl.innerHTML = csvUploadPanel(); return; }
    if (cid === "template")   { panelEl.innerHTML = emptyPanel("Template Selection", "Choose a document template — or upload your own — for the batch."); return; }
    if (cid === "batch-opts") { panelEl.innerHTML = printOptsPanel(); return; }
    if (cid === "lists")      { panelEl.innerHTML = emptyPanel("Saved Recipient Lists", "Reuse uploaded CSV lists for recurring batch sends."); return; }
    if (cid === "templates")  { panelEl.innerHTML = emptyPanel("Saved Templates", "Saved document templates for bulk use, e.g. annual festival greetings."); return; }
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

// ── Render mother/child tabs ───────────────────────────────────────────────

function renderMotherTabs() {
  motherTabsEl.innerHTML = modules.map((m, i) => {
    const isActive = m.id === state.moduleId && !homeView.hidden;
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
  renderPanel();
}

function openModule(moduleId, childIndex) {
  state.moduleId = moduleId;
  state.childIndex = typeof childIndex === "number" ? childIndex : 0;
  homeView.hidden = true;
  moduleView.hidden = false;
  render();
}

function proceedToCheckout() {
  alert("Checkout integration (Razorpay) comes in Phase 2. For now, email postman@khagatara.com with your order details.");
}

// ── Event listeners ────────────────────────────────────────────────────────

document.addEventListener("click", (e) => {
  const modBtn   = e.target.closest("[data-module]");
  const childBtn = e.target.closest("[data-child]");
  const openBtn  = e.target.closest("[data-open]");
  const homeBtn  = e.target.closest("[href='#home'], [href='#home'] *");
  const accBtn   = e.target.closest("#accountBtn");

  if (modBtn)   openModule(modBtn.dataset.module, 0);
  if (childBtn) { state.childIndex = Number(childBtn.dataset.child); render(); }
  if (openBtn)  openModule(openBtn.dataset.open, openBtn.dataset.open === "track" ? 0 : 3);
  if (homeBtn)  { homeView.hidden = false; moduleView.hidden = true; renderMotherTabs(); }
  if (accBtn)   openModule("account", 0);
});

document.addEventListener("input", (e) => {
  if (e.target.closest("#calcForm")) renderPanel();
  if (e.target.id === "fontSize") {
    document.documentElement.style.setProperty("--base-font-size", `${e.target.value}px`);
    localStorage.setItem("postmanFontSize", e.target.value);
  }
});

$("themeSelect").addEventListener("change", (e) => {
  const t = e.target.value;
  document.documentElement.dataset.theme = t === "system" ? "" : t;
  localStorage.setItem("postmanTheme", t);
});

// ── Init ───────────────────────────────────────────────────────────────────

const savedTheme = localStorage.getItem("postmanTheme") || "system";
const savedFont  = localStorage.getItem("postmanFontSize") || "15";
$("themeSelect").value = savedTheme;
$("fontSize").value    = savedFont;
document.documentElement.dataset.theme = savedTheme === "system" ? "" : savedTheme;
document.documentElement.style.setProperty("--base-font-size", `${savedFont}px`);

renderMotherTabs();
renderModuleCards();
