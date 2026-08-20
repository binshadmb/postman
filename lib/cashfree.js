// lib/cashfree.js
// Server-side helper for Cashfree Payment Gateway (Orders API).
// Uses App ID + Secret Key (server env vars only, never exposed client-side).

const CASHFREE_BASE =
  process.env.CASHFREE_ENV === "sandbox"
    ? "https://sandbox.cashfree.com/pg"
    : "https://api.cashfree.com/pg";

const API_VERSION = "2023-08-01";

function authHeaders() {
  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  if (!appId || !secretKey) {
    throw new Error("CASHFREE_APP_ID / CASHFREE_SECRET_KEY not configured.");
  }
  return {
    "x-client-id": appId,
    "x-client-secret": secretKey,
    "x-api-version": API_VERSION,
    "Content-Type": "application/json",
  };
}

/**
 * Creates a Cashfree order and returns a payment_session_id for checkout.
 * orderId must be unique per Cashfree account — we use our own publicId.
 */
async function createCashfreeOrder({ orderId, amount, currency, customerName, customerEmail, customerPhone, returnUrl }) {
  const res = await fetch(`${CASHFREE_BASE}/orders`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      order_id: orderId,
      order_amount: Number(amount.toFixed(2)),
      order_currency: currency || "INR",
      customer_details: {
        customer_id: orderId,
        customer_name: customerName || "Customer",
        customer_email: customerEmail,
        customer_phone: customerPhone || "9999999999",
      },
      order_meta: {
        return_url: returnUrl,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Cashfree create order failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data; // includes payment_session_id, order_id, order_status
}

/**
 * Fetches the current status of a Cashfree order — used to verify payment
 * after the customer returns from checkout.
 */
async function getCashfreeOrderStatus(orderId) {
  const res = await fetch(`${CASHFREE_BASE}/orders/${orderId}`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Cashfree order status fetch failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data; // includes order_status: "PAID" | "ACTIVE" | "EXPIRED" | etc.
}

module.exports = { createCashfreeOrder, getCashfreeOrderStatus, CASHFREE_BASE };
