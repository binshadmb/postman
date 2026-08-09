// pages/api/bills/proforma.js
import { prisma } from "../../../lib/prisma";
import { renderHtmlToPdf } from "../../../lib/renderPdf";
import { escapeHtml, money, documentShell } from "../../../lib/billsTemplate";
import { getFxRates } from "../../../lib/fxRates";

function makePublicId() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `PF-${stamp}-${suffix}`;
}

export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      customerName, customerEmail, customerAddress,
      serviceDescription, items = [], currency = "INR",
      validUntil, notes,
    } = req.body;

    if (!customerName || !serviceDescription || !items.length) {
      return res.status(400).json({ error: "Customer name, service description, and at least one line item are required." });
    }

    const publicId = makePublicId();
    const dateStr = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

    const fxRates = await getFxRates();
    function convert(amount, fromCur, toCur) {
      const rates = fxRates || {};
      const fromRate = rates[fromCur]?.rate ?? 1;
      const toRate = rates[toCur]?.rate ?? 1;
      const inrAmount = amount / fromRate; // amount → INR base
      return inrAmount * toRate;           // INR base → target currency
    }

    const itemsConverted = items.map(it => {
      const itemCurrency = it.currency || "INR";
      const rate = Number(it.rate) || 0;
      const qty = Number(it.qty) || 1;
      const rowTotalOriginal = rate * qty;
      const rowTotalConverted = convert(rowTotalOriginal, itemCurrency, currency);
      return { ...it, itemCurrency, rate, qty, rowTotalOriginal, rowTotalConverted };
    });

    const subtotal = itemsConverted.reduce((sum, it) => sum + it.rowTotalConverted, 0);

    const bodyHtml = `
      <div class="two-col section">
        <div>
          <div class="section-label">Proposal For</div>
          <strong>${escapeHtml(customerName)}</strong><br>
          ${customerEmail ? `${escapeHtml(customerEmail)}<br>` : ""}
          ${customerAddress ? escapeHtml(customerAddress).replace(/\n/g, "<br>") : ""}
        </div>
        <div>
          <div class="section-label">Valid Until</div>
          ${escapeHtml(validUntil || "—")}
        </div>
      </div>

      <div class="section">
        <div class="section-label">Service Description</div>
        <p>${escapeHtml(serviceDescription).replace(/\n/g, "<br>")}</p>
      </div>

      <table class="items">
        <thead><tr><th>Item</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">Amount</th></tr></thead>
        <tbody>
          ${itemsConverted.map(it => `
            <tr>
              <td>${escapeHtml(it.description)}</td>
              <td class="num">${escapeHtml(it.qty)}</td>
              <td class="num">${money(it.rate, it.itemCurrency)}${it.itemCurrency !== currency ? `<br><span style="font-size:0.72rem;color:#999">= ${money(convert(it.rate, it.itemCurrency, currency), currency)}</span>` : ""}</td>
              <td class="num">${money(it.rowTotalConverted, currency)}</td>
            </tr>`).join("")}
          <tr class="total-row"><td colspan="3">Estimated Total</td><td class="num">${money(subtotal, currency)}</td></tr>
        </tbody>
      </table>
      <p style="font-size:0.72rem;color:#999;margin-top:-6px">Amounts entered in a different currency are converted using live exchange rates at the time this document was generated.</p>

      ${notes ? `<div class="section"><div class="section-label">Notes</div><p>${escapeHtml(notes).replace(/\n/g, "<br>")}</p></div>` : ""}

      <div class="section" style="font-size:0.8rem;color:#666">
        This is a proposal / proforma document only — not a tax invoice. Prices are estimates and subject to confirmation before work begins.
      </div>
    `;

    const html = documentShell({ docTitle: "Proforma / Service Proposal", publicId, dateStr, bodyHtml });
    const pdfBuffer = await renderHtmlToPdf(html);

    const doc = await prisma.generatedDocument.create({
      data: {
        publicId,
        docType: "proforma",
        orderId: null,
        customerName,
        customerEmail: customerEmail || null,
        fields: { customerName, customerEmail, customerAddress, serviceDescription, items, currency, validUntil, notes },
        pdfData: pdfBuffer,
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${publicId}.pdf"`);
    res.setHeader("X-Document-Id", doc.publicId);
    return res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error("Proforma generation error:", err);
    return res.status(500).json({ error: "Failed to generate proforma" });
  }
}
