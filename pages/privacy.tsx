import Head from "next/head";

export default function Privacy() {
  return (
    <main style={pageStyle}>
      <Head><title>Privacy Policy - Postman Khagatara</title></Head>
      <h1>Privacy Policy</h1>
      <p>We collect only the information needed to process and fulfill print-and-post orders.</p>
      <h2>Information we collect</h2>
      <p>This may include your name, email, phone number, uploaded document, recipient name and address, print/post options, payment reference, and special instructions.</p>
      <h2>How we use it</h2>
      <p>We use order information to verify payment, print the uploaded document, prepare the envelope/package, post the item, update order status, and provide support.</p>
      <h2>Document handling</h2>
      <p>Uploaded documents are stored for order fulfillment and support. Access is limited to the admin area. Customers should not upload documents containing information that is unnecessary for printing and posting.</p>
      <h2>Sharing</h2>
      <p>We share recipient and posting details only as needed with postal or courier services. Payment processing is handled by Razorpay.</p>
      <h2>Contact</h2>
      <p>For privacy requests, email postman@khagatara.com.</p>
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
