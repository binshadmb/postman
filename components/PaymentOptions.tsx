'use client';

import { useState } from 'react';
import PayPalButton from './PayPalButton';
import RazorpayButton from './RazorpayButton';

interface PaymentOptionsProps {
  /** PayPal Hosted Button ID for this site (BluePort or Postman) */
  hostedButtonId: string;
  /** Amount in rupees to charge via Razorpay */
  razorpayAmount: number;
  description?: string;
  /** Which tab opens first — pick based on your typical customer base */
  defaultMethod?: 'paypal' | 'razorpay';
}

export default function PaymentOptions({
  hostedButtonId,
  razorpayAmount,
  description,
  defaultMethod = 'razorpay',
}: PaymentOptionsProps) {
  const [method, setMethod] = useState<'paypal' | 'razorpay'>(defaultMethod);

  return (
    <div className="payment-options">
      <div className="payment-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={method === 'razorpay'}
          className={method === 'razorpay' ? 'active' : ''}
          onClick={() => setMethod('razorpay')}
        >
          Razorpay (India)
        </button>
        <button
          role="tab"
          aria-selected={method === 'paypal'}
          className={method === 'paypal' ? 'active' : ''}
          onClick={() => setMethod('paypal')}
        >
          PayPal (International)
        </button>
      </div>

      <div className="payment-panel">
        {method === 'razorpay' ? (
          <RazorpayButton amount={razorpayAmount} description={description} />
        ) : (
          <PayPalButton hostedButtonId={hostedButtonId} />
        )}
      </div>
    </div>
  );
}
