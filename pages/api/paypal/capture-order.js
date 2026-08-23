// pages/api/paypal/capture-order.js
import { prisma } from "../../../lib/prisma";
import { captureOrder as capturePaypalOrder } from "../../../lib/paypal";
import { notifyNewOrder } from "../../../lib/notifyNewOrder";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { paypalOrderId } = req.body;

    if (!paypalOrderId) {
      return res.status(400).json({ error: "Missing paypalOrderId" });
    }

    const existing = await prisma.customerOrder.findUnique({
      where: { paypalOrderId },
    });

    if (!existing) {
      return res.status(404).json({ verified: false, error: "Order not found" });
    }

    const capture = await capturePaypalOrder(paypalOrderId);

    const captureStatus = capture?.status;
    const captureId =
      capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;

    if (captureStatus !== "COMPLETED") {
      return res.status(400).json({
        verified: false,
        error: `PayPal capture status: ${captureStatus || "unknown"}`,
      });
    }

    const order = await prisma.customerOrder.update({
      where: { id: existing.id },
      data: {
        status: "PAID",
        paypalCaptureId: captureId,
        paidAt: new Date(),
        events: [
          ...(Array.isArray(existing.events) ? existing.events : []),
          {
            at: new Date().toISOString(),
            status: "PAID",
            note: "PayPal payment captured and verified.",
          },
        ],
      },
    });

    await notifyNewOrder(order);

    return res.status(200).json({
      verified: true,
      orderId: order.publicId,
      captureId,
    });
  } catch (err) {
    console.error("PayPal capture-order error:", err);
    return res.status(500).json({ error: "Capture failed" });
  }
}
