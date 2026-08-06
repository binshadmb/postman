import Head from "next/head";

export default function PaymentSuccess() {
  return (
    <>
      <Head>
        <title>Payment Successful — Postman Khagatara</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{
        minHeight: "100vh", background: "#f6f5f1",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", padding: "24px",
      }}>
        <div style={{
          width: "100%", maxWidth: "480px", background: "#fff",
          borderRadius: "12px", border: "1px solid #d8d3c6",
          boxShadow: "0 18px 45px rgba(49,45,36,0.12)",
          padding: "40px 28px", textAlign: "center",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
          <h1 style={{ margin: "0 0 10px", color: "#3d7354", fontSize: "1.5rem" }}>Payment Successful</h1>
          <p style={{ color: "#66706a", lineHeight: 1.7, margin: "0 0 24px" }}>
            Thank you for your payment. Your order has been received by Postman Khagatara.
            A confirmation will be sent to your email shortly.
          </p>
          <a href="/" style={{
            display: "inline-block", background: "#b72d32", color: "#fff",
            borderRadius: "7px", padding: "11px 24px",
            textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
          }}>
            Back to Postman →
          </a>
        </div>
      </div>
    </>
  );
}
