import Head from "next/head";
import dynamic from "next/dynamic";

const PaymentOptions = dynamic(() => import("../components/PaymentOptions"), { ssr: false });

export default function PayPage() {
  return (
    <>
      <Head>
        <title>Pay — Postman Khagatara</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{
        minHeight: "100vh",
        background: "#f6f5f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        padding: "24px",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "520px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #d8d3c6",
          boxShadow: "0 18px 45px rgba(49,45,36,0.12)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ background: "#b72d32", padding: "24px 28px", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "8px",
                background: "rgba(255,255,255,0.2)",
                display: "grid", placeItems: "center", fontWeight: 800, fontSize: "0.85rem",
              }}>PK</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>Postman</div>
                <div style={{ opacity: 0.8, fontSize: "0.82rem" }}>Khagatara</div>
              </div>
            </div>
            <h1 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700 }}>Secure Payment</h1>
            <p style={{ margin: "6px 0 0", opacity: 0.85, fontSize: "0.88rem", lineHeight: 1.5 }}>
              Courier, parcel, document &amp; logistics services
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: "28px" }}>
            <div style={{
              background: "#fff9e5", border: "1px solid #f0d87a",
              borderRadius: "8px", padding: "12px 16px", marginBottom: "24px",
              fontSize: "0.875rem", color: "#5a4500", lineHeight: 1.6,
            }}>
              📋 <strong>Enter the amount from your quotation.</strong><br />
              Use the exact amount shown on your invoice or quote from Postman Khagatara.
            </div>

            <style>{`
              .payment-options { display: grid; gap: 16px; }
              .payment-tabs { display: flex; gap: 8px; }
              .payment-tabs button {
                flex: 1; padding: 9px 14px; border: 1px solid #d8d3c6;
                border-radius: 7px; background: #f6f5f1; cursor: pointer;
                font-size: 0.85rem; font-weight: 600; color: #66706a;
                transition: all 0.15s;
              }
              .payment-tabs button.active {
                background: #b72d32; border-color: #b72d32; color: #fff;
              }
              .payment-panel { padding-top: 8px; }
              .razorpay-btn {
                width: 100%; padding: 12px; border: none; border-radius: 7px;
                background: #b72d32; color: #fff; font-size: 1rem;
                font-weight: 700; cursor: pointer; transition: opacity 0.15s;
              }
              .razorpay-btn:disabled { opacity: 0.6; cursor: not-allowed; }
              .razorpay-btn:hover:not(:disabled) { opacity: 0.9; }
            `}</style>

            <PaymentOptions
              hostedButtonId="A9CU5B4AKJT8G"
              razorpayAmount={100}
              description="Postman Khagatara — invoice payment"
              defaultMethod="paypal"
            />

            <p style={{
              marginTop: "20px", textAlign: "center",
              fontSize: "0.78rem", color: "#66706a", lineHeight: 1.6,
            }}>
              PayPal for international · Razorpay for India (UPI, cards, netbanking)<br />
              All transactions are secured.
            </p>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: "1px solid #d8d3c6", padding: "14px 28px",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", fontSize: "0.78rem", color: "#66706a",
          }}>
            <a href="/" style={{ color: "#66706a", textDecoration: "none" }}>← Back to Postman</a>
            <span>postman.khagatara.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
