import Head from "next/head";

export default function Contact() {
  return (
    <main style={pageStyle}>
      <Head><title>Contact - Postman Khagatara</title></Head>
      <h1>Contact Postman Khagatara</h1>
      <p>For order support, upload issues, refund requests, or fulfillment questions, email us with your order ID.</p>

      <section style={cardStyle}>
        <strong>Email</strong>
        <p><a href="mailto:info@khagatara.com">info@khagatara.com</a></p>
      </section>

      <section style={cardStyle}>
        <strong>WhatsApp / Telegram</strong>
        <p>
          {/* TODO: add actual number */}
          A WhatsApp or Telegram contact number is shared directly with you once your order is confirmed and booked.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#6b6558" }}>
          This channel is used only for order-specific communication — approving a design or brochure proof, confirming distribution details, or receiving a live proof/shoot video (for example, Flyer/Leaflet Bulk Distribution). It is not a general support line; for all other queries, please email us.
        </p>
      </section>

      <section style={cardStyle}>
        <strong>Service</strong>
        <p>Document Print & Post, greeting-card preparation, registered/certified mail support, newspaper/media ad assistance, flyer/leaflet distribution, business inspection requests, and bulk/business mail workflows inside India.</p>
      </section>
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

const cardStyle: React.CSSProperties = {
  border: "1px solid #d8d3c6",
  borderRadius: 8,
  padding: 16,
  marginTop: 16,
};
