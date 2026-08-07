import type { AppProps } from 'next/app';
import DonateChip from '../components/DonateChip';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <DonateChip
        label="Pay with PayPal"
        cta="International payments"
        href="/pay"
        bgColor="#003087"
        hoverColor="#001c5c"
      />
    </>
  );
}
