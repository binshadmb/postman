// pages/api/cashfree/verify.js
import { prisma } from "../../../lib/prisma";
import { getCashfreeOrderStatus } from "../../../lib/cashfree";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "Missing orderId" });
    }

    const existing = await prisma.customerOrder.findUnique({
      where: { cashfreeOrderId: orderId },
    });

    if (!existing) {
      return res.status(404).json({ verified: false, error: "Order not found" });
    }

    // Idempotent — customer's return page may load more than once.
    if (existing.status === "PAID") {
      return res.status(200).json({ verified: true, orderId: existing.publicId });
    }

    const cfOrder = await getCashfreeOrderStatus(orderId);

    if (cfOrder.order_status !== "PAID") {
      return res.status(400).json({
        verified: false,
        error: `Cashfree order status: ${cfOrder.order_status || "unknown"}`,
      });
    }

    const order = await prisma.customerOrder.update({
      where: { id: existing.id },
      data: {
        status: "PAID",
        paidAt: new Date(),
        events: [
          ...(Array.isArray(existing.events) ? existing.events : []),
          {
            at: new Date().toISOString(),
            status: "PAID",
            note: "Cashfree payment captured and verified.",
          },
        ],
      },
    });

    return res.status(200).json({ verified: true, orderId: order.publicId });
  } catch (err) {
    console.error("Cashfree verify error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
