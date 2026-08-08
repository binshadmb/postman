import type { AppProps } from 'next/app';
import DonateChip from '../components/DonateChip';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <DonateChip
        label="Support Postman"
        cta="Powered by PayPal"
        href="/pay"
        hostedButtonId={process.env.NEXT_PUBLIC_PAYPAL_DONATE_BUTTON_ID}
        bgColor="#003087"
        hoverColor="#001c5c"
      />
    </>
  );
}
