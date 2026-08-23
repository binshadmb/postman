"use client";
import Head from "next/head";
import Script from "next/script";
import { hreflangTags } from "../lib/i18n";

export default function Home() {
  return (
    <>
      <Head>
        <title>Postman — Khagatara</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Print, post, track and prove delivery inside India. Document printing, greeting cards, registered mail, newspaper ads, flyer distribution, bulk mail, and business inspection — handled locally for overseas senders." />
        <meta name="keywords" content="print and post India, document printing India, document printing Kerala, print and post Kerala, send documents to India, print documents from abroad, NRI printing service, NRI courier service India, send post to India from abroad, registered mail India, certified mail India, speed post India, courier service India, greeting cards India, send greeting card to India, birthday card delivery India, newspaper ad placement India, obituary ad booking India, classified ad India newspaper, flyer distribution India, leaflet distribution India, flyer printing and distribution, pamphlet distribution service India, bulk mail India, business mail service India, bulk business mail Kerala, business inspection service India, site visit service India, proforma invoice generator, invoice generator India, print and mail service Thiruvananthapuram, print and post Trivandrum, document delivery service India, send parcel to India, postman khagatara, khagatara print and post" />
        <meta property="og:title" content="Postman — Khagatara" />
        <meta property="og:description" content="Print, post, track and prove delivery inside India. For overseas senders." />
        <meta property="og:url" content="https://postman.khagatara.com/" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://postman.khagatara.com/" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {hreflangTags("/").map((h) => (
          <link key={h.hreflang} rel={h.rel} hrefLang={h.hreflang} href={h.href} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Postman — Khagatara",
              "url": "https://postman.khagatara.com",
              "description": "Print, post, track and prove delivery inside India. Document printing, greeting cards, registered mail, newspaper ads, flyer distribution, bulk mail, and business inspection handled locally for overseas senders.",
              "areaServed": "IN",
              "serviceType": [
                "Document Print & Post",
                "Greeting Cards",
                "Registered Mail",
                "Newspaper Ad Placement",
                "Flyer / Leaflet Distribution",
                "Bulk Business Mail",
                "Business Inspection / Discussion",
                "Order Tracking"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@khagatara.com",
                "contactType": "customer service"
              }
            })
          }}
        />
      </Head>

      {/* ── Landing (static, separate from the functional app) ──────────── */}
      <section id="landingView" className="landing-view">
        <section className="hero-new" id="heroSlider">
          <div className="hero-badge" id="heroBadge"><i className="fa-solid fa-file-lines"></i> Document Service</div>
          <h1 id="heroTitle">Send Documents in India<br /><span className="hero-accent" id="heroAccent">— Economically</span></h1>
          <p className="hero-subtitle" id="heroSubtitle">Simple steps to print and send your important documents across India at the most <strong>economical</strong> cost.</p>
          <div className="hero-dots" id="heroDots" aria-hidden="true" />
          <button className="primary-action hero-cta-right" type="button" id="getStartedBtnTop">Get Started →</button>
        </section>

        <section className="hero-steps">
          <div className="hero-step-card blue">
            <div className="hero-badge-num">01</div>
            <div className="hero-step-icon"><i className="fa-solid fa-file-arrow-up"></i></div>
            <h2>Upload<br />your document</h2>
            <span className="hero-tag">PDF, JPG, PNG</span>
          </div>
          <div className="hero-arrow blue"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="hero-step-card green">
            <div className="hero-badge-num">02</div>
            <div className="hero-step-icon"><i className="fa-solid fa-sliders"></i></div>
            <h2>Choose<br />print settings</h2>
            <span className="hero-tag">Copies · Paper · Quality</span>
          </div>
          <div className="hero-arrow green"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="hero-step-card orange">
            <div className="hero-badge-num">03</div>
            <div className="hero-step-icon"><i className="fa-solid fa-location-dot"></i></div>
            <h2>Enter<br />delivery address</h2>
            <span className="hero-tag">Across India</span>
          </div>
          <div className="hero-arrow orange"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="hero-step-card purple">
            <div className="hero-badge-num">04</div>
            <div className="hero-step-icon"><i className="fa-solid fa-print"></i></div>
            <h2>We print,<br />dispatch &amp; notify</h2>
            <span className="hero-tag">SMS / Email update</span>
          </div>
        </section>

        <section className="hero-features">
          <div className="hero-feature">
            <div className="hero-ficon blue"><i className="fa-solid fa-indian-rupee-sign"></i></div>
            <div><span className="hero-ftitle blue">Economical</span><p>Best prices always</p></div>
          </div>
          <div className="hero-feature">
            <div className="hero-ficon green"><i className="fa-solid fa-shield-halved"></i></div>
            <div><span className="hero-ftitle green">Secure</span><p>Your documents are safe</p></div>
          </div>
          <div className="hero-feature">
            <div className="hero-ficon orange"><i className="fa-solid fa-clock"></i></div>
            <div><span className="hero-ftitle orange">Fast service</span><p>Quick printing &amp; delivery</p></div>
          </div>
          <div className="hero-feature">
            <div className="hero-ficon purple"><i className="fa-solid fa-location-dot"></i></div>
            <div><span className="hero-ftitle purple">All India reach</span><p>Delivering to every pincode</p></div>
          </div>
        </section>

        <section className="hero-closing">
          <i className="fa-solid fa-file-lines"></i>
          <p>Documents, forms, certificates or anything important — we print and send it to your loved ones anywhere in India, economically.</p>
          <p className="hero-closing-strong">Simple steps. Trusted service. Right to your doorstep.</p>
          <div className="quick-actions" style={{marginTop: "18px", justifyContent: "center"}}>
            <button className="primary-action" type="button" id="getStartedBtn">Get Started →</button>
          </div>
        </section>

        <footer className="site-footer">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/refund">Refund/Cancellation</a>
          <a href="/contact">Contact</a>
        </footer>
      </section>

      <div className="app-shell" id="appShell" style={{display: "none"}}>
        {/* ── Sidebar ──────────────────────────────────────────── */}
        <aside className="sidebar">
          <a className="brand" href="#home" aria-label="Postman Khagatara home">
            <span className="brand-mark">PK</span>
            <span>
              <strong>Postman</strong>
              <small>Khagatara</small>
            </span>
          </a>
          <nav id="motherTabs" className="mother-tabs" aria-label="Main sections" />
        </aside>

        {/* ── Main ─────────────────────────────────────────────── */}
        <main className="main">
          {/* Top bar */}
          <header className="topbar">
            <a className="icon-button" href="#home" title="Home" aria-label="Home">⌂</a>
            <label className="search">
              <span className="sr-only">Search</span>
              <input id="searchInput" type="search" placeholder="Order ID, AWB, module…" />
            </label>
            <label>
              Theme
              <select id="themeSelect" defaultValue="system">
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <label>
              Font
              <span className="font-adjust">
                <button type="button" id="fontDecrease" aria-label="Decrease font size">A−</button>
                <button type="button" id="fontIncrease" aria-label="Increase font size">A+</button>
              </span>
            </label>
            <button className="account-button" type="button" id="accountBtn">Account</button>
          </header>

          {/* Home view — shown inside the app after Get Started */}
          <section id="homeView" className="home-view">
            <section className="hero-closing">
              <i className="fa-solid fa-file-lines"></i>
              <p className="hero-closing-strong">What would you like to do?</p>
              <div className="quick-actions" style={{marginTop: "18px", justifyContent: "center"}}>
                <button className="primary-action" type="button" data-open="print-post">New print order</button>
                <button className="secondary-action" type="button" data-open="track">Track order</button>
                <button className="secondary-action" type="button" data-open="cards">Send a card</button>
              </div>
            </section>
          </section>

          {/* Module view */}
          <section id="moduleView" className="module-view" hidden>
            <div className="module-head">
              <div>
                <p id="breadcrumb" className="breadcrumb" />
                <h2 id="moduleTitle" />
              </div>
              <span id="moduleBadge" className="module-badge" />
            </div>
            {/* Step progress bar */}
            <div id="stepProgress" className="step-progress" />
            <div className="child-tabs-wrapper">
              <button className="scroll-arrow" id="childTabsLeft" type="button" aria-label="Scroll tabs left">&#8592;</button>
              <nav id="childTabs" className="child-tabs" aria-label="Child tabs" />
              <button className="scroll-arrow" id="childTabsRight" type="button" aria-label="Scroll tabs right">&#8594;</button>
            </div>
            <div id="panel" className="panel" />
            <div className="enquiry-banner">
              <span>Have a doubt about this service?</span>
              <a href="mailto:info@khagatara.com">Contact us at info@khagatara.com →</a>
            </div>
          </section>

          <footer className="site-footer">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/refund">Refund/Cancellation</a>
            <a href="/contact">Contact</a>
          </footer>
        </main>
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      <Script src="/client.js" strategy="afterInteractive" />
    </>
  );
}
