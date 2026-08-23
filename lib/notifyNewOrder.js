// lib/notifyNewOrder.js
// Sends an admin notification email whenever any order is marked PAID,
// regardless of which payment gateway processed it.

const { sendEmail } = require("./email");

async function notifyNewOrder(order) {
  try {
    await sendEmail({
      to: "info@khagatara.com",
      toName: "Postman Admin",
      subject: `New paid order — ${order.publicId} (${order.paymentProvider || "unknown"})`,
      html: `
        <p>A new order has been paid and is ready for processing.</p>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#666">Order ID</td><td><strong>${order.publicId}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Module</td><td>${order.module || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Amount</td><td>₹${order.amount} ${order.currency || "INR"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Payment method</td><td>${order.paymentProvider || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Customer</td><td>${order.customerName || "—"} (${order.customerEmail || "—"})</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${order.customerPhone || "—"}</td></tr>
        </table>
        <p>View full details in the <a href="https://postman.khagatara.com/admin">admin panel</a>.</p>
      `,
    });
  } catch (err) {
    // Never let a notification failure block the actual order/payment flow.
    console.error("New-order notification email failed (order still saved):", err);
  }
}

module.exports = { notifyNewOrder };
