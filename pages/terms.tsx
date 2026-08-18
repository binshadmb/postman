import Head from "next/head";

export default function Terms() {
  return (
    <main style={pageStyle}>
      <Head><title>Terms of Service - Postman Khagatara</title></Head>
      <h1>Terms of Service</h1>

      <p>Postman — Khagatara helps customers submit documents, greeting-card instructions, and postal details so we can print, prepare, and post items inside India.</p>

      <h2>1. Document Review and Prohibited Material</h2>
      <p>All submitted material must comply with applicable laws and our prohibited-content requirements.</p>
      <p>We reserve the right to refuse an order where there is reasonable and properly supported evidence that the submitted material contains unlawful, fraudulent, threatening, abusive, defamatory, or otherwise prohibited content.</p>

      <h3>Defamatory Material</h3>
      <p>If material is found to be defamatory based on reasonable and properly available evidence and falls within our prohibited-content requirements, we may refuse to process, print, or post the material.</p>
      <p>We are a printing and posting service and are <strong>not an authorized business promoter, advertising agency, public-relations agency, or representative of any customer or third-party client</strong>.</p>
      <p>We do not endorse, verify, recommend, authenticate, or adopt the opinions, claims, statements, allegations, advertisements, or other content contained in customer-submitted material.</p>
      <p>The customer remains solely responsible for the legality, accuracy, ownership, and consequences of the material submitted for printing and posting.</p>

      <h2>2. Customer Responsibility</h2>
      <p>The customer is responsible for ensuring that:</p>
      <ul>
        <li>They have the right and authority to submit the material for printing.</li>
        <li>The recipient's name and address are correct.</li>
        <li>The submitted material complies with applicable law.</li>
        <li>The material does not infringe copyright, trademark, privacy, publicity, or other rights.</li>
        <li>Any statements, allegations, claims, advertisements, or representations contained in the material are the customer's responsibility.</li>
        <li>The customer has obtained any permissions or approvals required for the material.</li>
      </ul>
      <p>We do not independently verify the factual accuracy of customer-submitted content.</p>

      <h2>3. Advance Payment and Order Processing</h2>
      <p>For an order requiring printing, sampling, preparation, delivery selection, site visiting, special handling, or other related work, <strong>25% of the estimated total cost is payable in advance</strong> before further processing begins.</p>
      <p>The estimated total cost may include, where applicable: printing; paper and stationery; sampling or proof preparation; envelope/package preparation; postal or courier charges; delivery arrangements; site visits, where specifically requested or required; special handling; and other services agreed with the customer.</p>
      <p>The remaining amount will be calculated based on the actual services and expenses applicable to the order.</p>
      <p>An advance payment does not automatically guarantee acceptance of material that subsequently fails our prohibited-content or service requirements.</p>

      <h2>4. Final Print and Posting</h2>
      <p>The customer is responsible for providing the final and correct content, instructions, recipient details, and specifications before printing.</p>
      <p>Once the material has been <strong>finally printed and handed over for posting, dispatch, or delivery</strong>, the transaction for that print-and-post order will be treated as completed and closed.</p>
      <p>After completion, complaints based solely on subjective dissatisfaction with the content, wording, design, appearance, presentation, partiality, perceived quality, or suitability of the customer-approved material will not ordinarily create a right to a refund or reprinting.</p>
      <p>Examples include statements such as:</p>
      <ul>
        <li>"The print does not look good."</li>
        <li>"The result is not what I expected."</li>
        <li>"The presentation is partial."</li>
        <li>"I don't like the appearance after printing."</li>
        <li>"The wording should have looked different."</li>
        <li>"The printed result was not satisfactory."</li>
      </ul>
      <p>This does not prevent the customer from reporting a genuine <strong>service error attributable to us</strong>, such as a clear printing error, incorrect document being printed, material damage caused during our handling, or another objectively verifiable processing error.</p>
      <p>We are not responsible for dissatisfaction arising from content supplied or approved by the customer.</p>

      <h2>5. No Promotional or Endorsement Relationship</h2>
      <p>Our service is limited to the services expressly ordered by the customer, such as printing, preparation, and posting.</p>
      <p>We are <strong>not an authorized promoter, advertiser, representative, agent, public-relations service, or business-development representative for customers or third parties</strong>, unless a separate written agreement expressly states otherwise.</p>
      <p>Printing or posting a document does not constitute our endorsement, approval, verification, recommendation, or acceptance of any statement or claim contained in that document.</p>

      <h2>6. Restricted Content</h2>
      <p>Do not upload illegal, harmful, fraudulent, copyrighted-without-permission, or prohibited postal content. We may cancel orders that cannot legally or safely be fulfilled.</p>

      <h2>7. Contact</h2>
      <p>For support, email <a href="mailto:info@khagatara.com">info@khagatara.com</a> with your order ID.</p>
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
