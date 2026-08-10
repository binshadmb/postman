// pages/api/inspection-request.js
import { prisma } from "../../lib/prisma";
import { sendEmail } from "../../lib/email";

function makePublicId() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INS-${stamp}-${suffix}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customer = {}, location, purpose, preferredDates = "" } = req.body;

    if (!location || !purpose || !customer?.email) {
      return res.status(400).json({ error: "Location, purpose, and email are required." });
    }

    const publicId = makePublicId();

    // No price yet — this is a request for manual review and a quote before
    // any charge is made. amount is a placeholder (0) until approved.
    const record = await prisma.customerOrder.create({
      data: {
        publicId,
        module: "inspection",
        status: "PENDING_REVIEW",
        amount: 0,
        currency: "USD",
        customerName: customer.name || null,
        customerEmail: customer.email || null,
        customerPhone: customer.phone || null,
        recipientAddress: location,
        instructions: purpose,
        selections: { location, purpose, preferredDates },
        events: [{
          at: new Date().toISOString(),
          status: "PENDING_REVIEW",
          note: "Business inspection/discussion request submitted — awaiting manual review and quote.",
        }],
      },
    });

    try {
      await notify(record, customer, location, purpose, preferredDates);
    } catch (emailErr) {
      console.error("Inspection notification email failed (request still saved):", emailErr);
    }

    return res.status(200).json({ publicOrderId: record.publicId });
  } catch (err) {
    console.error("Inspection request error:", err);
    return res.status(500).json({ error: "Failed to submit request" });
  }
}

async function notify(record, customer, location, purpose, preferredDates) {
  await sendEmail({
    to: customer.email,
    toName: customer.name || customer.email,
    subject: `We received your inspection request — ${record.publicId}`,
    html: `
      <p>Hi ${customer.name || "there"},</p>
      <p>We've received your Business Inspection / Discussion request. Here's what you submitted:</p>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Request ID</td><td><strong>${record.publicId}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Location</td><td>${location}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Query / Scope</td><td>${purpose}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Preferred Dates</td><td>${preferredDates || "—"}</td></tr>
      </table>
      <p>We'll review this and send you a quote (flat fee $150–$500 + actual travel cost) before anything is charged. Nothing has been charged yet.</p>
      <p>— Postman, Khagatara</p>
    `,
  });

  await sendEmail({
    to: "info@khagatara.com",
    toName: "Postman Admin",
    subject: `New inspection request — ${record.publicId}`,
    html: `
      <p>New Business Inspection / Discussion request needs review and a quote.</p>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Request ID</td><td><strong>${record.publicId}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Customer</td><td>${customer.name || "—"} (${customer.email})</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${customer.phone || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Location</td><td>${location}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Query / Scope</td><td>${purpose}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Preferred Dates</td><td>${preferredDates || "—"}</td></tr>
      </table>
    `,
  });
}
