// pages/api/paypal/create-order.js
import { prisma } from "../../../lib/prisma";
import { createOrder as createPaypalOrder } from "../../../lib/paypal";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

// NOTE: PayPal settlement for an India-based business account is USD-only —
// INR cross-border settlement isn't supported. This is a fixed fallback
// conversion rate; swap for a live FX API (e.g. exchangerate.host) if precise
// pricing matters. Update this constant periodically in the meantime.
const INR_TO_USD_RATE = 0.0115; // ~ ₹87 = $1, adjust as needed

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
      amount, // in INR, same as the Razorpay flow — converted to USD below
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

    // Same validation rules as the Razorpay route — kept identical on purpose.
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
    const usdAmount = Math.max(amount * INR_TO_USD_RATE, 0.5); // PayPal minimum is ~$0.01, keep a sane floor

    const dbOrder = await prisma.customerOrder.create({
      data: {
        publicId,
        module,
        status: "PAYMENT_PENDING",
        amount: Math.round(amount), // stored in INR for consistency with Razorpay orders
        currency: "INR",
        paymentProvider: "paypal",
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
        events: [{
          at: new Date().toISOString(),
          status: "PAYMENT_PENDING",
          note: `Order created before payment (PayPal, ~$${usdAmount.toFixed(2)} USD).`,
        }],
        fileName: file?.name || null,
        fileMimeType: file?.type || null,
        fileSize: fileBuffer ? fileBuffer.length : null,
        fileData: fileBuffer,
      },
    });

    const paypalOrder = await createPaypalOrder({
      usdAmount,
      publicId,
      description: `Postman Khagatara — ${module} order`,
    });

    await prisma.customerOrder.update({
      where: { id: dbOrder.id },
      data: { paypalOrderId: paypalOrder.id },
    });

    return res.status(200).json({
      paypalOrderId: paypalOrder.id,
      internalOrderId: dbOrder.id,
      publicOrderId: publicId,
      usdAmount: usdAmount.toFixed(2),
      clientId: process.env.PAYPAL_CLIENT_ID, // safe to expose — this is the public client id
    });
  } catch (err) {
    console.error("PayPal create-order error:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}
