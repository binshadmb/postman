import Head from "next/head";

export default function Refund() {
  return (
    <main style={pageStyle}>
      <Head><title>Refund and Cancellation Policy - Postman Khagatara</title></Head>
      <h1>Refund and Cancellation Policy</h1>
      <h2>Before printing or posting</h2>
      <p>You may request cancellation before we begin printing or purchase postage/courier service. If approved, the refundable amount is returned through the original payment method.</p>
      <h2>After printing or posting</h2>
      <p>Once printing, card preparation, postage purchase, or courier booking has started, cancellation may not be possible because costs have already been incurred.</p>
      <h2>Incorrect customer details</h2>
      <p>Refunds are not guaranteed if the customer submitted an incorrect file, wrong recipient address, invalid PIN code, or incomplete instruction.</p>
      <h2>Service failure</h2>
      <p>If we cannot fulfill the order due to an internal issue, we will offer correction, re-processing, or refund depending on the situation.</p>
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
