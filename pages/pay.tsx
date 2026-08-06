import Head from "next/head";
import Script from "next/script";

export default function PayPage() {
  return (
    <>
      <Head>
        <title>Pay — Postman Khagatara</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        {/* PayPal SDK — Part 1 */}
        <script
          src="https://www.paypal.com/sdk/js?client-id=BAAFrmPlXkIwra22A3pdJp5vc0Z5Ni-79i-DlmVAAPzJfunKWHP-1l_1T1Z85WJji6sGO1UXiuxcay6DYM&components=hosted-buttons&disable-funding=venmo&currency=USD"
          data-paypal-sdk
        />
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
          maxWidth: "480px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #d8d3c6",
          boxShadow: "0 18px 45px rgba(49,45,36,0.12)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "#b72d32",
            padding: "24px 28px",
            color: "#fff",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "8px",
                background: "rgba(255,255,255,0.2)",
                display: "grid", placeItems: "center",
                fontWeight: 800, fontSize: "0.85rem",
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
              background: "#fff9e5",
              border: "1px solid #f0d87a",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "24px",
              fontSize: "0.875rem",
              color: "#5a4500",
              lineHeight: 1.6,
            }}>
              📋 <strong>Enter the amount from your quotation.</strong><br />
              Use the amount exactly as shown in your invoice or quote from Postman Khagatara.
            </div>

            {/* PayPal Button — Part 2 */}
            <div id="paypal-container-A9CU5B4AKJT8G" />
            <Script
              id="paypal-postman-button"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  function renderPostmanPayPal() {
                    if (typeof paypal !== 'undefined' && paypal.HostedButtons) {
                      paypal.HostedButtons({ hostedButtonId: "A9CU5B4AKJT8G" })
                        .render("#paypal-container-A9CU5B4AKJT8G");
                    } else {
                      setTimeout(renderPostmanPayPal, 500);
                    }
                  }
                  renderPostmanPayPal();
                `,
              }}
            />

            <p style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "0.78rem",
              color: "#66706a",
              lineHeight: 1.6,
            }}>
              Payments accepted via PayPal, Apple Pay, and Debit/Credit cards.<br />
              All transactions are secured by PayPal.
            </p>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: "1px solid #d8d3c6",
            padding: "14px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.78rem",
            color: "#66706a",
          }}>
            <a href="/" style={{ color: "#66706a", textDecoration: "none" }}>← Back to Postman</a>
            <span>postman.khagatara.com</span>
          </div>
        </div>
      </div>
    </>
  );
}
