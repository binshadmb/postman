// pages/api/razorpay/verify.js
import crypto from "crypto";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment fields" });
    }

    // Recreate the expected signature and compare
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ verified: false, error: "Invalid signature" });
    }

    const existing = await prisma.customerOrder.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!existing) {
      return res.status(404).json({ verified: false, error: "Order not found" });
    }

    const order = await prisma.customerOrder.update({
      where: { id: existing.id },
      data: {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        paidAt: new Date(),
        events: [
          ...((Array.isArray(existing.events) ? existing.events : [])),
          {
            at: new Date().toISOString(),
            status: "PAID",
            note: "Razorpay payment signature verified.",
          },
        ],
      },
    });

    return res.status(200).json({
      verified: true,
      orderId: order.publicId,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Razorpay verify error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
