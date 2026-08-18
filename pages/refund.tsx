import Head from "next/head";

export default function Refund() {
  return (
    <main style={pageStyle}>
      <Head><title>Refund and Cancellation Policy - Postman Khagatara</title></Head>
      <h1>Refund and Cancellation Policy</h1>
      <h2>Before printing or posting</h2>
      <p>You may request cancellation before we begin printing or purchase postage/courier service. If approved, the refundable amount is returned through the original payment method.</p>
      <p>If we have already reviewed your order and provided a real-time reply (e.g. confirming feasibility, pricing, or scheduling) before cancellation, a 12% service charge on the total order amount will be deducted to cover that work. The remaining amount will be refunded through the original payment method.</p>
      <h2>After printing or posting</h2>
      <p>Once printing, card preparation, postage purchase, or courier booking has started, cancellation may not be possible because costs have already been incurred.</p>
      <h2>Incorrect customer details</h2>
      <p>Refunds are not guaranteed if the customer submitted an incorrect file, wrong recipient address, invalid PIN code, or incomplete instruction.</p>
      <h2>Service failure</h2>
      <p>If we cannot fulfill the order due to an internal issue, we will offer correction, re-processing, or refund depending on the situation.</p>
      <h2>Proof of distribution and live updates</h2>
      <p>For services that include a WhatsApp video of printed stock or a live distribution video (such as Flyer/Leaflet Bulk Distribution), a WhatsApp or Telegram contact number will be shared with you once your order is confirmed and booked, so proof and updates can be sent directly.</p>
      <h2>Sample service requests</h2>
      <p>Before committing to a large print run, you may request a sample — for example, a single letter printed and posted, or a proof copy sent for your approval — before we proceed with the full order. Contact us with your order details to arrange a sample.</p>
      <h2>Support</h2>
      <p>Email postman@khagatara.com with your order ID for cancellation or refund requests.</p>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  padding: "40px 20px",
  fontFamily: "Inter, system-ui, sans-serif",
  lineHeight: 1.7,
};
