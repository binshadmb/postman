import Head from "next/head";

export default function Contact() {
  return (
    <main style={pageStyle}>
      <Head>
        <title>Contact - Postman Khagatara</title>
        <meta name="description" content="Contact Postman Khagatara for order support, upload issues, refund requests, or fulfillment questions. Reach us by email or WhatsApp for order-specific communication." />
        <meta name="keywords" content="contact postman khagatara, print and post India support, NRI printing service contact, document printing India customer support, khagatara WhatsApp support, order support India print service, send documents to India help, registered mail India contact" />
        <meta property="og:title" content="Contact - Postman Khagatara" />
        <meta property="og:description" content="Contact Postman Khagatara for order support, upload issues, refund requests, or fulfillment questions." />
        <meta property="og:url" content="https://postman.khagatara.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://postman.khagatara.com/contact" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Postman Khagatara",
              "url": "https://postman.khagatara.com/contact",
              "mainEntity": {
                "@type": "Organization",
                "name": "Postman — Khagatara",
                "email": "info@khagatara.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "info@khagatara.com",
                  "telephone": "+91-70341-01134",
                  "contactType": "customer service",
                  "areaServed": "IN",
                }
              }
            })
          }}
        />
      </Head>
      <h1>Contact Postman Khagatara</h1>
      <p>For order support, upload issues, refund requests, or fulfillment questions, email us with your order ID. We handle every order individually, so having your order ID ready helps us find the right details quickly and get back to you with an accurate answer.</p>

      <section style={cardStyle}>
        <strong>Email</strong>
        <p><a href="mailto:info@khagatara.com">info@khagatara.com</a></p>
      </section>

      <section style={cardStyle}>
        <strong>WhatsApp / Telegram</strong>
        <p><a href="https://wa.me/917034101134" target="_blank" rel="noopener noreferrer">+91 70341 01134</a></p>
        <p style={{ fontSize: "0.9rem", color: "#6b6558" }}>
          This channel is used only for order-specific communication — approving a design or brochure proof, confirming distribution details, or receiving a live proof/shoot video (for example, Flyer/Leaflet Bulk Distribution). It is not a general support line; for all other queries, please email us.
        </p>
      </section>

      <section style={cardStyle}>
        <strong>Service</strong>
        <p>Document Print & Post, greeting-card preparation, registered/certified mail support, newspaper/media ad assistance, flyer/leaflet distribution, business inspection requests, and bulk/business mail workflows inside India.</p>
      </section>

      <section style={cardStyle}>
        <strong>Response Time</strong>
        <p>We typically respond to emails within one business day. WhatsApp messages related to an active order are usually answered faster, since that channel is reserved for order-specific proofs and confirmations.</p>
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
