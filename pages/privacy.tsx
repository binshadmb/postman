import Head from "next/head";

export default function Privacy() {
  return (
    <main style={pageStyle}>
      <Head><title>Privacy Policy - Postman Khagatara</title></Head>
      <h1>Privacy Policy and Service Conditions</h1>

      <p>We collect only the information reasonably required to process, print, prepare, post, and support print-and-post orders placed through our service.</p>

      <h2>1. Information We Collect</h2>
      <p>Depending on the order, we may collect:</p>
      <ul>
        <li>Customer name, email address, and phone number</li>
        <li>Uploaded documents or files submitted for printing</li>
        <li>Recipient name and postal address</li>
        <li>Printing specifications and paper/envelope requirements</li>
        <li>Posting and delivery instructions</li>
        <li>Payment and transaction references</li>
        <li>Special instructions provided by the customer</li>
        <li>Information required to communicate with the customer regarding the order</li>
      </ul>
      <p>We do not intentionally collect information that is unnecessary for fulfilling the requested service.</p>

      <h2>2. Use of Information</h2>
      <p>Order information may be used to:</p>
      <ul>
        <li>Verify and process payments</li>
        <li>Review files for printing and service eligibility</li>
        <li>Print the submitted material</li>
        <li>Prepare envelopes or packages</li>
        <li>Arrange postal or courier delivery</li>
        <li>Calculate printing, preparation, delivery, and related charges</li>
        <li>Communicate with the customer</li>
        <li>Provide order-status updates</li>
        <li>Handle customer support, disputes, refunds, and delivery-related matters</li>
        <li>Maintain appropriate business and transaction records</li>
      </ul>

      <h2>3. Language Support</h2>
      <p>Our service may support documents and customer instructions in English and Indian languages, subject to the availability and technical compatibility of the required fonts, characters, formatting, and printing method.</p>
      <p>Supported Indian languages may include the 22 languages listed in the Eighth Schedule of the Constitution of India: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri (Meitei), Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, and Urdu. English is also supported.</p>
      <p>Actual printing availability may depend on the document format, fonts, character encoding, layout, and technical requirements. Customers may be requested to provide a suitable PDF or other print-ready format where necessary.</p>

      <h2>4. Postal and Courier Services</h2>
      <p>Recipient and posting information may be shared with postal operators, courier companies, delivery partners, or other service providers only to the extent reasonably necessary to complete the requested service.</p>
      <p>After an item is handed over to a postal or courier service, delivery time, delivery attempts, loss, delay, damage, return-to-sender, and other delivery events may be subject to the policies and procedures of that service provider.</p>
      <p>Available tracking information may be provided to the customer where applicable.</p>

      <h2>5. Payment Methods</h2>
      <p>Depending on availability and the nature of the transaction, payments may be accepted through:</p>
      <ul>
        <li>Razorpay</li>
        <li>PayPal</li>
        <li>Cashfree — currently being onboarded and not yet live; will be enabled once activation is complete</li>
        <li>Other payment methods expressly made available through the service</li>
      </ul>
      <p>Payment processors may process transaction information according to their respective terms and privacy policies.</p>
      <p>We do not intentionally store complete card numbers, CVV numbers, UPI PINs, passwords, or other payment credentials that are not required by us for order processing.</p>

      <h2>6. Uploaded Document Storage</h2>
      <p>Uploaded documents are stored only as reasonably necessary for order fulfillment, customer support, dispute resolution, accounting, security, or applicable legal requirements.</p>
      <p>Access to uploaded documents is restricted to authorized personnel or systems involved in providing the service.</p>
      <p>Customers should not upload information that is unnecessary for the requested printing and posting service.</p>

      <h2>7. Data Security</h2>
      <p>We take reasonable administrative and technical measures to protect customer information against unauthorized access, alteration, disclosure, or misuse. However, no internet-based storage, transmission, or electronic system can be guaranteed to be completely secure.</p>

      <h2>8. Data Retention and Deletion</h2>
      <p>Information and uploaded documents may be retained for a reasonable period for order fulfillment, customer support, accounting and financial records, dispute resolution, security and fraud prevention, and legal or regulatory requirements.</p>
      <p>When information is no longer reasonably required, it may be deleted or securely disposed of, subject to applicable legal and record-keeping requirements. Customers may contact us regarding deletion or correction of information where applicable.</p>

      <h2>9. Cookies and Local Storage</h2>
      <p>Our website may use browser local storage to remember display preferences such as theme (light/dark) and font size. This information stays on your device and is not used for tracking or advertising.</p>

      <h2>10. Privacy Requests</h2>
      <p>For privacy-related questions, correction requests, deletion requests, or other privacy concerns, contact <a href="mailto:info@khagatara.com">info@khagatara.com</a>. We may request reasonable verification before processing a privacy request.</p>

      <h2>11. Policy Updates</h2>
      <p>This Privacy Policy and Service Conditions may be updated from time to time to reflect changes in our services, technology, payment methods, postal arrangements, or applicable requirements. The latest version published through our service will apply to future orders.</p>

      <h2>12. Business Details</h2>
      <p>Postman is operated under Khagatara, a sole proprietorship registered in Thiruvananthapuram, Kerala, India (GSTIN: 32AGKPB7783P2ZT).</p>

      <h2>13. Contact</h2>
      <p>For privacy, order, or service-related questions, email <a href="mailto:info@khagatara.com">info@khagatara.com</a>.</p>
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
