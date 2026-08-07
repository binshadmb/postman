'use client';

import Script from 'next/script';
import { useState } from 'react';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface RazorpayButtonProps {
  /** Amount in rupees (e.g. 1500 for ₹1500). Converted to paise before hitting Razorpay. */
  amount: number;
  label?: string;
  description?: string;
  companyName?: string;
  onSuccess?: (paymentId: string) => void;
}

export default function RazorpayButton({
  amount,
  label = 'Pay Now',
  description = '',
  companyName = 'Khagatara',
  onSuccess,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  const handlePay = async () => {
    if (!sdkReady || !window.Razorpay) return;
    setLoading(true);

    try {
      // Server creates the order so the amount can't be tampered with client-side.
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error('Failed to create order');
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: companyName,
        description,
        order_id: order.id,
        handler: function (response: any) {
          onSuccess?.(response.razorpay_payment_id);
          window.location.href = `/payment-success?ref=${response.razorpay_payment_id}`;
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        window.location.href = '/payment-cancel';
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay error:', err);
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />
      <button onClick={handlePay} disabled={loading || !sdkReady} className="razorpay-btn">
        {loading ? 'Loading…' : label}
      </button>
    </>
  );
}
