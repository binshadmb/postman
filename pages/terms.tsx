import Head from "next/head";

export default function Terms() {
  return (
    <main style={pageStyle}>
      <Head><title>Terms of Service - Postman Khagatara</title></Head>
      <h1>Terms of Service</h1>
      <p>Postman Khagatara helps customers submit documents, greeting-card instructions, and postal details so we can print, prepare, and post items inside India.</p>
      <h2>Customer responsibility</h2>
      <p>You must upload only documents you are legally allowed to print and post. You are responsible for checking the recipient address, PIN code, print options, and special instructions before payment.</p>
      <h2>Service responsibility</h2>
      <p>After payment is verified, we prepare the order according to the details submitted and hand it to the selected postal or courier service. Delivery timelines depend on the carrier.</p>
      <h2>Restricted content</h2>
      <p>Do not upload illegal, harmful, fraudulent, copyrighted without permission, or prohibited postal content. We may cancel orders that cannot legally or safely be fulfilled.</p>
      <h2>Contact</h2>
      <p>For support, email postman@khagatara.com with your order ID.</p>
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
