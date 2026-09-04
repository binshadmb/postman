import Head from "next/head";

export default function Refund() {
  return (
    <main style={pageStyle}>
      <Head>
        <title>Refund and Cancellation Policy - Postman Khagatara</title>
        <meta name="description" content="Refund and Cancellation Policy for Postman Khagatara — cancellation charges, refund eligibility, and processing details for print, post, and delivery orders inside India." />
        <meta name="keywords" content="postman khagatara refund policy, print and post India cancellation, document printing refund India, NRI printing service refund, khagatara order cancellation, print and post India refund terms" />
        <meta property="og:title" content="Refund and Cancellation Policy - Postman Khagatara" />
        <meta property="og:description" content="Cancellation charges, refund eligibility, and processing details for print, post, and delivery orders with Postman Khagatara." />
        <meta property="og:url" content="https://postman.khagatara.com/refund" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://postman.khagatara.com/refund" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Refund and Cancellation Policy - Postman Khagatara",
              "url": "https://postman.khagatara.com/refund",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Postman — Khagatara",
                "url": "https://postman.khagatara.com"
              }
            })
          }}
        />
      </Head>
      <h1>Refund and Cancellation Policy</h1>

      <h2>1. Cancellation Before Work Begins (Enquiry / Review Stage)</h2>
      <p>You may request cancellation before we begin printing, purchase postage/courier service, or otherwise commence work on your order.</p>
      <p>If we have already reviewed your order and provided a real-time reply at the enquiry stage — for example, confirming feasibility, pricing, or scheduling — before you cancel, a <strong>12% service charge</strong> on the total order amount will be deducted to cover that work. The remaining amount will be refunded through the original payment method.</p>

      <h2>2. Cancellation After Work Has Begun</h2>
      <p>If an order is cancelled, refused, or cannot be processed after work has commenced — such as printing, sampling, preparation, postal booking, delivery arrangements, site visits, or other chargeable work — the amount refundable to the customer may be reduced by <strong>25% of the estimated total cost, or the advance amount actually paid, whichever is lower</strong>, together with any actual third-party or service expenses already incurred where applicable.</p>
      <p>Where printing, preparation, postal booking, delivery arrangements, site visits, or other chargeable work has already been completed, the corresponding actual costs may also be deducted before calculating any refund.</p>
      <p>Any refund therefore depends on the stage at which the order is cancelled or refused, and the costs already incurred at that stage.</p>

      <h2>3. Refusal Due to Prohibited or Defamatory Content</h2>
      <p>If, on review, submitted material is found to be defamatory, unlawful, fraudulent, or otherwise prohibited (see our Terms of Service), we may refuse to process, print, or post it. The same stage-based deduction described above applies: <strong>12%</strong> if this is identified at the enquiry/review stage before work begins, or <strong>25%</strong> (or the advance paid, whichever is lower) if identified after work has already begun.</p>
      <p>An advance payment does not guarantee acceptance of material that is subsequently found to be defamatory or otherwise prohibited.</p>

      <h2>4. After Printing or Posting</h2>
      <p>Once printing, card preparation, postage purchase, or courier booking has started, cancellation may not be possible because costs have already been incurred.</p>

      <h2>5. Incorrect Customer Details</h2>
      <p>Refunds are not guaranteed if the customer submitted an incorrect file, wrong recipient address, invalid PIN code, or incomplete instruction.</p>

      <h2>6. Service Failure</h2>
      <p>If we cannot fulfill the order due to an internal issue, we will offer correction, re-processing, or refund depending on the situation.</p>

      <h2>7. Proof of Distribution and Live Updates</h2>
      <p>For services that include a WhatsApp video of printed stock or a live distribution video (such as Flyer/Leaflet Bulk Distribution), a WhatsApp or Telegram contact number will be shared with you once your order is confirmed and booked, so proof and updates can be sent directly.</p>

      <h2>8. Sample Service Requests</h2>
      <p>Before committing to a large print run, you may request a sample — for example, a single letter printed and posted, or a proof copy sent for your approval — before we proceed with the full order. Contact us with your order details to arrange a sample.</p>

      <h2>9. Support</h2>
      <p>Email <a href="mailto:info@khagatara.com">info@khagatara.com</a> with your order ID for cancellation or refund requests.</p>
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
