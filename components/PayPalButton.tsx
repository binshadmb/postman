'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalButtonProps {
  /** The Hosted Button ID from PayPal (e.g. "A9CU5B4AKJT8G") */
  hostedButtonId: string;
  /** Optional override; falls back to NEXT_PUBLIC_PAYPAL_CLIENT_ID, then the shared client-id below */
  clientId?: string;
}

// Same client-id used for both BluePort and Postman buttons (per PAYPAL_PAYMENTS notes).
// Public client IDs are safe to expose client-side — this is normal for the PayPal JS SDK.
const DEFAULT_CLIENT_ID =
  'BAAFrmPlXkIwra22A3pdJp5vc0Z5Ni-79i-DlmVAAPzJfunKWHP-1l_1T1Z85WJji6sGO1UXiuxcay6DYM';

export default function PayPalButton({ hostedButtonId, clientId }: PayPalButtonProps) {
  const [sdkReady, setSdkReady] = useState(false);
  const resolvedClientId =
    clientId || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || DEFAULT_CLIENT_ID;
  const containerId = `paypal-container-${hostedButtonId}`;

  // If another PayPalButton on the same page already loaded the SDK, pick it up immediately.
  useEffect(() => {
    if (window.paypal) setSdkReady(true);
  }, []);

  useEffect(() => {
    if (sdkReady && window.paypal) {
      window.paypal
        .HostedButtons({ hostedButtonId })
        .render(`#${containerId}`);
    }
  }, [sdkReady, hostedButtonId, containerId]);

  return (
    <>
      {/* id="paypal-sdk" lets Next.js dedupe this if multiple buttons appear on one page */}
      <Script
        id="paypal-sdk"
        src={`https://www.paypal.com/sdk/js?client-id=${resolvedClientId}&components=hosted-buttons&disable-funding=venmo&currency=USD`}
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />
      <div id={containerId} />
    </>
  );
}
