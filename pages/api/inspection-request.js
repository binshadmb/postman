// pages/api/inspection-request.js
import { prisma } from "../../lib/prisma";

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

    return res.status(200).json({ publicOrderId: record.publicId });
  } catch (err) {
    console.error("Inspection request error:", err);
    return res.status(500).json({ error: "Failed to submit request" });
  }
}
