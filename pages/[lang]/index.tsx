"use client";
import Head from "next/head";
import Script from "next/script";
import { GetStaticPaths, GetStaticProps } from "next";
import LangSwitcher from "../../components/LangSwitcher";
import { SUPPORTED_LANGS, RTL_LANGS, hreflangTags, loadLocale } from "../../lib/i18n";

interface Props {
  lang: string;
  dir: string;
  t: Record<string, any>;
  hreflangs: { rel: string; hreflang: string; href: string }[];
}

export default function Home({ lang, dir, t, hreflangs }: Props) {
  return (
    <>
      <Head>
        <title>Postman — Khagatara</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t.home?.subheadline} />
        <meta name="keywords" content="print and post India, document printing India, send documents to India, print documents from abroad, NRI printing service, NRI courier service India, send post to India from abroad, registered mail India, certified mail India, speed post India, greeting cards India, send greeting card to India, birthday card delivery India, anniversary card delivery India, festival greeting cards India, newspaper ad placement India, obituary ad booking India, death notice publication India, matrimonial ad booking India, legal notice publication India, gazette notice publication India, tender notice publication India, classified ad India newspaper, display ad newspaper India, flyer distribution India, leaflet distribution India, pamphlet distribution service India, bulk mail India, business mail service India, CSV bulk mail India, business inspection service India, site visit service India, proforma invoice generator, send documents to India from USA, send documents to India from UK, send documents to India from UAE, send documents to India from Canada, send documents to India from Australia, NRI document delivery India, track order India, postman khagatara" />
        <meta property="og:title" content="Postman — Khagatara" />
        <meta property="og:description" content={t.home?.subheadline} />
        <meta property="og:url" content={`https://postman.khagatara.com/${lang}/`} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://postman.khagatara.com/${lang}/`} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {dir === "rtl" && <link rel="stylesheet" href="/rtl.css" />}
        {/* Per-language Google Fonts */}
        {["zh"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap" />}
        {["ja"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" />}
        {["ko"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" />}
        {["hi"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap" />}
        {["bn"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali&display=swap" />}
        {["th"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap" />}
        {["ar"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap" />}
        {["ur"].includes(lang) && <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap" />}
        {hreflangs.map((h) => (
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
              "description": t.home?.subheadline,
              "areaServed": "IN",
            }),
          }}
        />
        {/* Locale data for client.js */}
        <script
          id="locale-data"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(t) }}
        />
      </Head>

      {/* ── Landing (static, separate from the functional app) ──────────── */}
      <section id="landingView" className="landing-view" lang={lang} dir={dir}>
        <section className="hero-new" id="heroSlider">
          <div className="hero-badge" id="heroBadge"><i className="fa-solid fa-file-lines"></i> Document Service</div>
          <h1 id="heroTitle">{t.home?.headline}<br /><span className="hero-accent" id="heroAccent">— Economically</span></h1>
          <p className="hero-subtitle" id="heroSubtitle">{t.home?.subheadline}</p>
          <div className="hero-dots" id="heroDots" aria-hidden="true" />
          <button className="primary-action hero-cta-right" type="button" id="getStartedBtnTop">{t.home?.cta_upload || "Get Started"} →</button>
        </section>

        <section className="hero-steps">
          <div className="hero-step-card blue">
            <div className="hero-badge-num">01</div>
            <div className="hero-step-icon"><i className="fa-solid fa-file-arrow-up"></i></div>
            <h2>{t.home?.step1_title}</h2>
            <span className="hero-tag">{t.home?.step1_tag}</span>
          </div>
          <div className="hero-arrow blue"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="hero-step-card green">
            <div className="hero-badge-num">02</div>
            <div className="hero-step-icon"><i className="fa-solid fa-sliders"></i></div>
            <h2>{t.home?.step2_title}</h2>
            <span className="hero-tag">{t.home?.step2_tag}</span>
          </div>
          <div className="hero-arrow green"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="hero-step-card orange">
            <div className="hero-badge-num">03</div>
            <div className="hero-step-icon"><i className="fa-solid fa-location-dot"></i></div>
            <h2>{t.home?.step3_title}</h2>
            <span className="hero-tag">{t.home?.step3_tag}</span>
          </div>
          <div className="hero-arrow orange"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="hero-step-card purple">
            <div className="hero-badge-num">04</div>
            <div className="hero-step-icon"><i className="fa-solid fa-print"></i></div>
            <h2>{t.home?.step4_title}</h2>
            <span className="hero-tag">{t.home?.step4_tag}</span>
          </div>
        </section>

        <section className="hero-features">
          <div className="hero-feature">
            <div className="hero-ficon blue"><i className="fa-solid fa-indian-rupee-sign"></i></div>
            <div><span className="hero-ftitle blue">{t.home?.feature_economical_title}</span><p>{t.home?.feature_economical_desc}</p></div>
          </div>
          <div className="hero-feature">
            <div className="hero-ficon green"><i className="fa-solid fa-shield-halved"></i></div>
            <div><span className="hero-ftitle green">{t.home?.feature_secure_title}</span><p>{t.home?.feature_secure_desc}</p></div>
          </div>
          <div className="hero-feature">
            <div className="hero-ficon orange"><i className="fa-solid fa-clock"></i></div>
            <div><span className="hero-ftitle orange">{t.home?.feature_fast_title}</span><p>{t.home?.feature_fast_desc}</p></div>
          </div>
          <div className="hero-feature">
            <div className="hero-ficon purple"><i className="fa-solid fa-location-dot"></i></div>
            <div><span className="hero-ftitle purple">{t.home?.feature_reach_title}</span><p>{t.home?.feature_reach_desc}</p></div>
          </div>
        </section>

        <section className="hero-closing">
          <i className="fa-solid fa-file-lines"></i>
          <p>{t.home?.closing_line}</p>
          <p className="hero-closing-strong">{t.home?.closing_strong}</p>
          <div className="quick-actions" style={{marginTop: "18px", justifyContent: "center"}}>
            <button className="primary-action" type="button" id="getStartedBtn">{t.home?.cta_upload || "Get Started"} →</button>
          </div>
        </section>

        <footer className="site-footer">
          <a href="/terms">{t.footer?.terms}</a>
          <a href="/privacy">{t.footer?.privacy}</a>
          <a href="/refund">{t.footer?.refund}</a>
          <a href="/contact">{t.footer?.contact}</a>
        </footer>
      </section>

      <div className="app-shell" id="appShell" style={{display: "none"}} lang={lang} dir={dir}>
        <aside className="sidebar">
          <a className="brand" href={`/${lang}`} aria-label="Postman Khagatara home">
            <span className="brand-mark">PK</span>
            <span>
              <strong>Postman</strong>
              <small>Khagatara</small>
            </span>
          </a>
          <nav id="motherTabs" className="mother-tabs" aria-label="Main sections" />
        </aside>

        <main className="main">
          <header className="topbar">
            <a className="icon-button" href={`/${lang}`} title={t.nav?.home} aria-label={t.nav?.home}>⌂</a>
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
            <button className="account-button" type="button" id="accountBtn">{t.nav?.account}</button>
            <LangSwitcher currentLang={lang} />
          </header>

          <section id="homeView" className="home-view">
            <section className="hero-closing">
              <i className="fa-solid fa-file-lines"></i>
              <p className="hero-closing-strong">{t.home?.closing_strong}</p>
              <div className="quick-actions" style={{marginTop: "18px", justifyContent: "center"}}>
                <button className="primary-action" type="button" data-open="print-post">{t.home?.cta_upload}</button>
                <button className="secondary-action" type="button" data-open="track">{t.home?.cta_track}</button>
                <button className="secondary-action" type="button" data-open="cards">{t.home?.cta_cards}</button>
              </div>
            </section>
          </section>


          <section id="moduleView" className="module-view" hidden>
            <div className="module-head">
              <div>
                <p id="breadcrumb" className="breadcrumb" />
                <h2 id="moduleTitle" />
              </div>
              <span id="moduleBadge" className="module-badge" />
            </div>
            <div id="stepProgress" className="step-progress" />
            <div className="child-tabs-wrapper">
              <button className="scroll-arrow" id="childTabsLeft" type="button" aria-label="Scroll tabs left">&#8592;</button>
              <nav id="childTabs" className="child-tabs" aria-label="Child tabs" />
              <button className="scroll-arrow" id="childTabsRight" type="button" aria-label="Scroll tabs right">&#8594;</button>
            </div>
            <div id="panel" className="panel" />
            <div className="enquiry-banner">
              <span>{t.enquiry?.text || "Have a doubt about this service?"}</span>
              <a href="mailto:info@khagatara.com">{t.enquiry?.cta || "Contact us at info@khagatara.com →"}</a>
            </div>
          </section>

          <footer className="site-footer">
            <a href="/terms">{t.footer?.terms}</a>
            <a href="/privacy">{t.footer?.privacy}</a>
            <a href="/refund">{t.footer?.refund}</a>
            <a href="/contact">{t.footer?.contact}</a>
          </footer>
        </main>
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      <Script src="/client.js" strategy="afterInteractive" />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: SUPPORTED_LANGS.map((lang) => ({ params: { lang } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = (params?.lang as string) || "en";
  const t = await loadLocale(lang);
  const dir = (RTL_LANGS as string[]).includes(lang) ? "rtl" : "ltr";
  const hreflangs = hreflangTags("/");
  return { props: { lang, dir, t, hreflangs } };
};
