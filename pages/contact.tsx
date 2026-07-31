import Head from "next/head";

export default function Contact() {
  return (
    <main style={pageStyle}>
      <Head><title>Contact - Postman Khagatara</title></Head>
      <h1>Contact Postman Khagatara</h1>
      <p>For order support, upload issues, refund requests, or fulfillment questions, email us with your order ID.</p>
      <section style={cardStyle}>
        <strong>Email</strong>
        <p><a href="mailto:postman@khagatara.com">postman@khagatara.com</a></p>
      </section>
      <section style={cardStyle}>
        <strong>Service</strong>
        <p>Document Print & Post, greeting-card preparation, registered/certified mail support, newspaper/media ad assistance, and bulk/business mail workflows inside India.</p>
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
