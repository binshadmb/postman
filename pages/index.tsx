"use client";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <title>Postman — Khagatara</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Print, post, track and prove delivery inside India. Document printing, greeting cards, registered mail, newspaper ads and bulk mail — handled locally for overseas senders." />
        <meta name="keywords" content="print and post India, document printing Kerala, registered mail India, speed post India, greeting cards India, newspaper ad placement India, postman khagatara" />
        <meta property="og:title" content="Postman — Khagatara" />
        <meta property="og:description" content="Print, post, track and prove delivery inside India. For overseas senders." />
        <meta property="og:url" content="https://postman.khagatara.com/" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://postman.khagatara.com/" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Postman — Khagatara",
              "url": "https://postman.khagatara.com",
              "description": "Print, post, track and prove delivery inside India. Document printing, greeting cards, registered mail, newspaper ads and bulk mail handled locally for overseas senders.",
              "areaServed": "IN",
              "serviceType": [
                "Document Print & Post",
                "Greeting Cards",
                "Registered Mail",
                "Newspaper Ad Placement",
                "Bulk Business Mail",
                "Order Tracking"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "postman@khagatara.com",
                "contactType": "customer service"
              }
            })
          }}
        />
      </Head>

      <div className="app-shell">
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
              <input id="fontSize" type="range" min="12.5" max="18" step="0.5" defaultValue="15" />
            </label>
            <button className="account-button" type="button" id="accountBtn">Account</button>
          </header>

          {/* Home view */}
          <section id="homeView" className="home-view">
            {/* ── Hero ── */}
            <section className="hero-new">
              <div className="hero-badge"><i className="fa-solid fa-file-lines"></i> Document Service</div>
              <h1>Send Documents in India<br /><span className="hero-accent">— Economically</span></h1>
              <p className="hero-subtitle">Simple steps to print and send your important documents across India at the most <strong>economical</strong> cost.</p>
            </section>

            {/* ── Steps ── */}
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

            {/* ── Feature strip ── */}
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

            {/* ── Closing ── */}
            <section className="hero-closing">
              <i className="fa-solid fa-file-lines"></i>
              <p>Documents, forms, certificates or anything important — we print and send it to your loved ones anywhere in India, economically.</p>
              <p className="hero-closing-strong">Simple steps. Trusted service. Right to your doorstep.</p>
              <div className="quick-actions" style={{marginTop: "18px", justifyContent: "center"}}>
                <button className="primary-action" type="button" data-open="print-post">New print order</button>
                <button className="secondary-action" type="button" data-open="track">Track order</button>
                <button className="secondary-action" type="button" data-open="cards">Send a card</button>
              </div>
            </section>

            {/* Module cards removed */}
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
