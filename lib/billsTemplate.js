// lib/billsTemplate.js
// Shared visual shell for all Bills documents — Proforma, Invoice,
// Agreement, Delivery Report, Receipt all wrap this same layout.

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function money(amount, currency = "INR") {
  const symbols = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
  const sym = symbols[currency] || currency + " ";
  return `${sym}${Number(amount).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function documentShell({ docTitle, publicId, dateStr, bodyHtml }) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 0; font-size: 13px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #b72d32; padding-bottom: 16px; margin-bottom: 24px; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-mark { width: 44px; height: 44px; border-radius: 8px; background: #b72d32; color: #fff; display: grid; place-items: center; font-weight: 800; font-size: 1.1rem; }
  .brand-name { font-weight: 800; font-size: 1.15rem; }
  .brand-sub { color: #666; font-size: 0.8rem; }
  .doc-meta { text-align: right; }
  .doc-title { font-size: 1.3rem; font-weight: 800; color: #b72d32; margin: 0; }
  .doc-id { color: #666; font-size: 0.82rem; margin-top: 4px; }
  .section { margin-bottom: 20px; }
  .section-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: #999; font-weight: 700; margin-bottom: 6px; }
  table.items { width: 100%; border-collapse: collapse; margin: 12px 0; }
  table.items th { background: #f6f5f1; text-align: left; padding: 8px 10px; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.03em; color: #555; border-bottom: 2px solid #ddd; }
  table.items td { padding: 9px 10px; border-bottom: 1px solid #eee; font-size: 0.85rem; }
  table.items .num { text-align: right; }
  .total-row td { font-weight: 800; font-size: 1rem; border-top: 2px solid #333; }
  .two-col { display: flex; justify-content: space-between; gap: 24px; }
  .two-col > div { flex: 1; }
  .footer { margin-top: 40px; padding-top: 14px; border-top: 1px solid #ddd; font-size: 0.72rem; color: #888; line-height: 1.6; }
  .signature-block { margin-top: 48px; display: flex; justify-content: space-between; }
  .signature-line { border-top: 1px solid #333; width: 220px; padding-top: 6px; font-size: 0.78rem; color: #555; }
</style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-mark">P</div>
      <div>
        <div class="brand-name">Postman — Khagatara</div>
        <div class="brand-sub">postman.khagatara.com</div>
      </div>
    </div>
    <div class="doc-meta">
      <p class="doc-title">${escapeHtml(docTitle)}</p>
      <div class="doc-id">Ref: ${escapeHtml(publicId)}</div>
      <div class="doc-id">${escapeHtml(dateStr)}</div>
    </div>
  </div>
  ${bodyHtml}
  <div class="footer">
    Printed and distributed by Postman — Khagatara as a paid printing &amp; distribution service only. Postman has no ownership, affiliation, or endorsement relationship with the content, claims, or any third party represented in this material.
  </div>
</body>
</html>`;
}

module.exports = { escapeHtml, money, documentShell };
