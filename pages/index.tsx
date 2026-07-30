"use client";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <title>Postman — Khagatara</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/styles.css" />
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
            <div className="hero">
              <div className="hero-copy">
                <p className="eyebrow">postman.khagatara.com</p>
                <h1>Print, post, track,&nbsp;and prove delivery inside India.</h1>
                <p className="hero-text">
                  A service desk for overseas senders who need Indian documents,
                  greeting cards, registered mail, media ads, and bulk mail handled locally.
                </p>
                <div className="quick-actions">
                  <button className="primary-action" type="button" data-open="print-post">New print order</button>
                  <button className="secondary-action" type="button" data-open="track">Track order</button>
                  <button className="secondary-action" type="button" data-open="cards">Send a card</button>
                </div>
              </div>
              <div className="workflow-visual" aria-hidden="true">
                <div className="desk-card document">
                  <span className="line strong" />
                  <span className="line" />
                  <span className="line short" />
                </div>
                <div className="desk-card envelope">
                  <span className="stamp" />
                  <span className="address-line" />
                  <span className="address-line short" />
                </div>
                <div className="desk-card receipt">
                  <span className="barcode" />
                  <strong>AWB</strong>
                  <span>Tracking ready</span>
                </div>
              </div>
            </div>

            <div className="metrics-grid">
              <article><span>Service modules</span><strong>7</strong></article>
              <article><span>Options per module</span><strong>7</strong></article>
              <article><span>Live calculators</span><strong>5</strong></article>
              <article><span>Phase</span><strong>1 → 2</strong></article>
            </div>

            {/* Module cards on home */}
            <div id="moduleCards" className="module-cards" />
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
            <nav id="childTabs" className="child-tabs" aria-label="Child tabs" />
            <div id="panel" className="panel" />
          </section>
        </main>
      </div>

      <Script src="/client.js" strategy="afterInteractive" />
    </>
  );
}
