const modules = [
  {
    id: "print-post",
    title: "Document Print & Post",
    badge: "High-margin volume line",
    children: ["Upload Document", "Print Options", "Post Options", "Price Calculator", "Order History", "Saved Addresses", "Reorder/Templates"]
  },
  {
    id: "cards",
    title: "Greeting Cards",
    badge: "Personalized card service",
    children: ["Choose Occasion", "Card Format", "Personalization", "Add-ons", "Price Calculator", "Order History", "Saved Designs"]
  },
  {
    id: "registered-mail",
    title: "Registered/Certified Mail",
    badge: "Receipts and legal-post workflow",
    children: ["Registered Post", "Speed Post", "Legal Notice Format Check", "Price Calculator", "Order History", "Saved Recipients", "Proof/Receipt Archive"]
  },
  {
    id: "ads",
    title: "Newspaper/Media Ad Placement",
    badge: "Cost-plus convenience line",
    children: ["Ad Type Selection", "Select Paper", "Size & Color", "Proof Delivery", "Price Calculator", "Order History", "Saved Ad Templates"]
  },
  {
    id: "bulk",
    title: "Bulk/Business Mail",
    badge: "CSV and repeat sender workflow",
    children: ["CSV Upload", "Template Selection", "Batch Print Options", "Price Calculator", "Order History", "Saved Recipient Lists", "Saved Templates"]
  },
  {
    id: "track",
    title: "Track Order",
    badge: "Timeline, proof, and support",
    children: ["Order Status Timeline", "Payment Slip Download", "India Post/AWB Tracking", "Proof/Tearsheet Viewer", "Delivery Confirmation", "Support/Raise Issue", "Rate This Order"]
  },
  {
    id: "account",
    title: "Account",
    badge: "Customer identity and preferences",
    children: ["Account Creation/Sign-up", "Login", "Profile & KYC", "Payment Methods", "Address Book", "Order History", "Notifications/Preferences"]
  }
];

const fx = {
  INR: { symbol: "₹", rate: 1 },
  EUR: { symbol: "€", rate: 0.0109 },
  GBP: { symbol: "£", rate: 0.0094 }
};

const state = {
  moduleId: "print-post",
  childIndex: 3,
  currency: "INR"
};

const motherTabs = document.querySelector("#motherTabs");
const childTabs = document.querySelector("#childTabs");
const panel = document.querySelector("#panel");
const moduleView = document.querySelector("#moduleView");
const homeView = document.querySelector("#homeView");

function money(value, currency = state.currency) {
  const converted = value * fx[currency].rate;
  const digits = currency === "INR" ? 0 : 2;
  return `${fx[currency].symbol}${converted.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits })}`;
}

function activeModule() {
  return modules.find((item) => item.id === state.moduleId) || modules[0];
}

function renderMotherTabs() {
  motherTabs.innerHTML = modules.map((item, index) => `
    <button class="tab-button ${item.id === state.moduleId && !homeView.hidden ? "" : item.id === state.moduleId ? "active" : ""}" type="button" data-module="${item.id}">
      <span>${index + 1}. ${item.title}</span>
      <small>7</small>
    </button>
  `).join("");
}

function renderChildTabs() {
  const current = activeModule();
  childTabs.innerHTML = current.children.map((child, index) => `
    <button class="tab-button ${index === state.childIndex ? "active" : ""}" type="button" data-child="${index}">
      <span>${child}</span>
    </button>
  `).join("");
}

function openModule(moduleId, childIndex = 0) {
  state.moduleId = moduleId;
  state.childIndex = childIndex;
  homeView.hidden = true;
  moduleView.hidden = false;
  render();
}

function render() {
  const current = activeModule();
  document.querySelector("#moduleTitle").textContent = current.title;
  document.querySelector("#moduleBadge").textContent = current.badge;
  document.querySelector("#breadcrumb").textContent = `Home / ${current.title} / ${current.children[state.childIndex]}`;
  renderMotherTabs();
  renderChildTabs();
  renderPanel();
}

function calcPrintPost(data) {
  const paper = { A5: 0.85, A4: 1, A3: 2 }[data.size];
  const color = data.color === "Color" ? 38 : 16;
  const stock = { Standard: 0, Bond: 20, Premium: 38 }[data.paper];
  const post = { Regular: 42, "Speed Post": 84, Registered: 350, Courier: 240 }[data.post];
  const sideFactor = data.sides === "Double-sided" ? 0.82 : 1;
  const print = Math.ceil(data.pages * color * paper * sideFactor) + stock;
  return print + post;
}

function calculatorShell(title, fields, total, rows) {
  return `
    <div class="calculator">
      <form class="field-grid" id="calcForm">
        ${fields}
      </form>
      <aside class="result-card">
        <span>${title}</span>
        <strong class="price">${money(total)}</strong>
        ${rows.map((row) => `<div class="result-row"><span>${row[0]}</span><strong>${row[1]}</strong></div>`).join("")}
      </aside>
    </div>
  `;
}

function option(name, label, values, selected) {
  return `
    <label>${label}
      <select name="${name}">
        ${values.map((value) => `<option ${value === selected ? "selected" : ""}>${value}</option>`).join("")}
      </select>
    </label>
  `;
}

function numberField(name, label, value, min = 1) {
  return `<label>${label}<input name="${name}" type="number" min="${min}" value="${value}"></label>`;
}

function currencyField() {
  return option("currency", "Customer Currency", Object.keys(fx), state.currency);
}

function currentFormData() {
  const form = document.querySelector("#calcForm");
  return form ? Object.fromEntries(new FormData(form).entries()) : {};
}

function printPostCalculator() {
  const data = currentFormData();
  const model = {
    pages: Number(data.pages || 1),
    size: data.size || "A4",
    color: data.color || "B&W",
    paper: data.paper || "Standard",
    sides: data.sides || "Single-sided",
    post: data.post || "Speed Post"
  };
  state.currency = data.currency || state.currency;
  const total = calcPrintPost(model);
  return calculatorShell("Estimated Print & Post Price", [
    numberField("pages", "Pages", model.pages),
    option("size", "Paper Size", ["A5", "A4", "A3"], model.size),
    option("color", "Print Color", ["B&W", "Color"], model.color),
    option("paper", "Paper", ["Standard", "Bond", "Premium"], model.paper),
    option("sides", "Sides", ["Single-sided", "Double-sided"], model.sides),
    option("post", "Post Type", ["Regular", "Speed Post", "Registered", "Courier"], model.post),
    currencyField()
  ].join(""), total, [
    ["India-side floor", money(Math.ceil(total * 0.25))],
    ["Reference margin", "10-20% buffer"],
    ["Best line", "A4 B&W + Speed Post"]
  ]);
}

function cardsCalculator() {
  const data = currentFormData();
  state.currency = data.currency || state.currency;
  const qty = Number(data.qty || 1);
  const base = { Standard: 320, Large: 390, Square: 360 }[data.size || "Standard"];
  const stock = { Matte: 0, Glossy: 30, Textured: 55, Embossed: 85 }[data.stock || "Matte"];
  const custom = (data.custom || "Template") === "Custom Photo" ? 95 : 0;
  const addon = (data.addon || "None") === "Note Card" ? 30 : (data.addon || "None") === "Ribbon/Seal" ? 45 : 0;
  const total = qty * (base + stock + custom + addon);
  return calculatorShell("Estimated Card Price", [
    numberField("qty", "Quantity", qty),
    option("size", "Card Size", ["Standard", "Large", "Square"], data.size || "Standard"),
    option("stock", "Stock", ["Matte", "Glossy", "Textured", "Embossed"], data.stock || "Matte"),
    option("custom", "Design", ["Template", "Custom Photo"], data.custom || "Template"),
    option("addon", "Add-on", ["None", "Note Card", "Ribbon/Seal"], data.addon || "None"),
    currencyField()
  ].join(""), total, [
    ["UK-style anchor", money(370)],
    ["India cost estimate", money(45)],
    ["Volume use", "Festivals and family events"]
  ]);
}

function registeredCalculator() {
  const data = currentFormData();
  state.currency = data.currency || state.currency;
  const pages = Number(data.pages || 2);
  const service = { Registered: 350, "Speed Post": 120, Courier: 260 }[data.service || "Registered"];
  const legal = (data.legal || "No") === "Yes" ? 180 : 0;
  const total = service + legal + Math.max(0, pages - 2) * 15;
  return calculatorShell("Estimated Registered Mail Price", [
    numberField("pages", "Pages", pages),
    option("service", "Service", ["Registered", "Speed Post", "Courier"], data.service || "Registered"),
    option("legal", "Legal Format Check", ["No", "Yes"], data.legal || "No"),
    currencyField()
  ].join(""), total, [
    ["Receipt archive", "Included"],
    ["Tracking", "Included"],
    ["Disclaimer", "Posting service"]
  ]);
}

function adsCalculator() {
  const data = currentFormData();
  state.currency = data.currency || state.currency;
  const area = Number(data.area || 10);
  const rate = (data.color || "B&W") === "Color" ? 830 : 460;
  const paperFee = (data.paper || "Malayala Manorama") === "Premium Edition" ? 1200 : 0;
  const cost = area * rate + paperFee;
  const total = Math.ceil(cost * 1.2);
  return calculatorShell("Estimated Ad Booking Price", [
    numberField("area", "Column sq cm", area),
    option("color", "Color", ["B&W", "Color"], data.color || "B&W"),
    option("paper", "Edition", ["Malayala Manorama", "Premium Edition"], data.paper || "Malayala Manorama"),
    option("proof", "Proof", ["E-paper", "Physical Tearsheet"], data.proof || "E-paper"),
    currencyField()
  ].join(""), total, [
    ["Paper-rate base", money(cost)],
    ["Service margin", "20%"],
    ["Pricing model", "Cost-plus"]
  ]);
}

function bulkCalculator() {
  const data = currentFormData();
  state.currency = data.currency || state.currency;
  const qty = Number(data.qty || 50);
  const unitType = data.unit || "A4 B&W Letter";
  const unit = unitType === "Greeting Card" ? 300 : unitType === "A4 Color Letter" ? 170 : 100;
  const discount = qty >= 500 ? 0.12 : qty >= 100 ? 0.08 : 0.04;
  const total = Math.ceil(qty * unit * (1 - discount));
  return calculatorShell("Estimated Bulk Price", [
    numberField("qty", "Recipients", qty),
    option("unit", "Unit Type", ["A4 B&W Letter", "A4 Color Letter", "Greeting Card"], unitType),
    option("data", "Data Source", ["CSV Upload", "Saved List"], data.data || "CSV Upload"),
    currencyField()
  ].join(""), total, [
    ["Unit reference", money(unit)],
    ["Volume discount", `${Math.round(discount * 100)}%`],
    ["CSV processing", "Included"]
  ]);
}

function placeholderPanel(current, child) {
  if (current.id === "track") {
    return `
      <h3>${child}</h3>
      <div class="timeline">
        <div class="timeline-row"><span>Order received</span><strong>Done</strong></div>
        <div class="timeline-row"><span>Printed / booked</span><strong>Next</strong></div>
        <div class="timeline-row"><span>Tracking assigned</span><strong>Pending</strong></div>
        <div class="timeline-row"><span>Proof uploaded</span><strong>Pending</strong></div>
      </div>
    `;
  }

  if (current.id === "account") {
    return `
      <h3>${child}</h3>
      <div class="field-grid">
        <label>Name<input placeholder="Customer name"></label>
        <label>Email<input placeholder="sender@example.com"></label>
        <label>Phone<input placeholder="+44 / +353 / +91"></label>
        <label>Country<select><option>United Kingdom</option><option>Ireland</option><option>Germany</option><option>India</option></select></label>
      </div>
    `;
  }

  return `
    <h3>${child}</h3>
    <div class="empty-state">
      <p>${current.title} / ${child}</p>
      <div class="option-row">
        <button class="primary-action" type="button">Save draft</button>
        <button class="secondary-action" type="button">Continue</button>
      </div>
    </div>
  `;
}

function renderPanel() {
  const current = activeModule();
  const child = current.children[state.childIndex];
  if (child === "Price Calculator") {
    const calculators = {
      "print-post": printPostCalculator,
      cards: cardsCalculator,
      "registered-mail": registeredCalculator,
      ads: adsCalculator,
      bulk: bulkCalculator
    };
    panel.innerHTML = `<h3>${child}</h3>${calculators[current.id]()}`;
  } else {
    panel.innerHTML = placeholderPanel(current, child);
  }
}

document.addEventListener("click", (event) => {
  const moduleButton = event.target.closest("[data-module]");
  const childButton = event.target.closest("[data-child]");
  const quickOpen = event.target.closest("[data-open]");

  if (moduleButton) openModule(moduleButton.dataset.module, modules.find((item) => item.id === moduleButton.dataset.module).children.indexOf("Price Calculator"));
  if (childButton) {
    state.childIndex = Number(childButton.dataset.child);
    render();
  }
  if (quickOpen) openModule(quickOpen.dataset.open, quickOpen.dataset.open === "track" ? 0 : 3);
});

document.addEventListener("input", (event) => {
  if (event.target.closest("#calcForm")) renderPanel();
  if (event.target.id === "fontSize") {
    document.documentElement.style.setProperty("--base-font-size", `${event.target.value}px`);
    localStorage.setItem("postmanFontSize", event.target.value);
  }
});

document.querySelector("#themeSelect").addEventListener("change", (event) => {
  const theme = event.target.value;
  document.documentElement.dataset.theme = theme === "system" ? "" : theme;
  localStorage.setItem("postmanTheme", theme);
});

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openModule(button.dataset.open, button.dataset.open === "track" ? 0 : 3));
});

const savedTheme = localStorage.getItem("postmanTheme") || "system";
const savedFont = localStorage.getItem("postmanFontSize") || "15";
document.querySelector("#themeSelect").value = savedTheme;
document.querySelector("#fontSize").value = savedFont;
document.documentElement.dataset.theme = savedTheme === "system" ? "" : savedTheme;
document.documentElement.style.setProperty("--base-font-size", `${savedFont}px`);
renderMotherTabs();
