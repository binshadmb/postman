// lib/email.js
// Simple Brevo transactional email sender (REST API, no SDK needed).
// Requires BREVO_API_KEY in env. Silently no-ops if not configured, so
// missing email setup never breaks the actual request/order flow.

async function sendEmail({ to, toName, subject, html, fromEmail = "postman@khagatara.com", fromName = "Postman — Khagatara" }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("BREVO_API_KEY not set — skipping email send.");
    return { skipped: true };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: [{ email: to, name: toName || to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Brevo send failed:", res.status, text);
    return { error: true, status: res.status };
  }

  return { sent: true };
}

module.exports = { sendEmail };
