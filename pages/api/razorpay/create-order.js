// pages/api/razorpay/create-order.js
import Razorpay from "razorpay";
import { prisma } from "../../../lib/prisma";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

function makePublicId() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `PM-${stamp}-${suffix}`;
}

function decodeBase64File(file) {
  if (!file?.base64) return null;
  const clean = String(file.base64).replace(/^data:[^;]+;base64,/, "");
  return Buffer.from(clean, "base64");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      amount,
      currency = "INR",
      notes,
      customer = {},
      recipient = {},
      file,
      instructions = "",
      selections = {},
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const module = notes?.module || selections?.module || "print-post";
    const fileBuffer = decodeBase64File(file);

    if (["print-post", "registered-mail", "bulk"].includes(module) && !fileBuffer) {
      return res.status(400).json({ error: "Please upload the required customer file before checkout." });
    }

    if (module === "ads" && !fileBuffer && !selections?.adText) {
      return res.status(400).json({ error: "Please upload ad matter or paste the ad text before checkout." });
    }

    if (module === "cards" && !fileBuffer && !selections?.cardProductLink && !selections?.message && !selections?.designInstructions) {
      return res.status(400).json({ error: "Please add the card link, message, upload, or design instructions before checkout." });
    }

    if (["print-post", "registered-mail", "ads", "bulk", "cards"].includes(module) && !customer?.email) {
      return res.status(400).json({ error: "Customer email is required before checkout." });
    }

    if (["print-post", "registered-mail", "cards"].includes(module) && (!recipient?.name || !recipient?.address || !recipient?.pin)) {
      return res.status(400).json({ error: "Recipient name, address, and PIN are required before checkout." });
    }

    if (fileBuffer && fileBuffer.length > 20 * 1024 * 1024) {
      return res.status(400).json({ error: "Uploaded file is larger than 20 MB." });
    }

    const publicId = makePublicId();

    const dbOrder = await prisma.customerOrder.create({
      data: {
        publicId,
        module,
        status: "PAYMENT_PENDING",
        amount: Math.round(amount),
        currency,
        customerName: customer.name || null,
        customerEmail: customer.email || null,
        customerPhone: customer.phone || null,
        recipientName: recipient.name || null,
        recipientAddress: recipient.address || null,
        recipientPin: recipient.pin || null,
        recipientCity: recipient.city || null,
        recipientState: recipient.state || null,
        instructions,
        selections,
        events: [{ at: new Date().toISOString(), status: "PAYMENT_PENDING", note: "Order created before payment." }],
        fileName: file?.name || null,
        fileMimeType: file?.type || null,
        fileSize: fileBuffer ? fileBuffer.length : null,
        fileData: fileBuffer,
      },
    });

    // Razorpay expects amount in the smallest currency unit (paise for INR)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: publicId,
      notes: {
        ...(notes || {}),
        internalOrderId: dbOrder.id,
        publicOrderId: publicId,
      },
    });

    await prisma.customerOrder.update({
      where: { id: dbOrder.id },
      data: { razorpayOrderId: order.id },
    });

    return res.status(200).json({
      orderId: order.id,
      internalOrderId: dbOrder.id,
      publicOrderId: publicId,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // safe to expose — this is the public key
    });
  } catch (err) {
    console.error("Razorpay create-order error:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}
