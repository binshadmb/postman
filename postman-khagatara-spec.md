# postman.khagatara.com — Full Spec & Skeleton

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js (App Router) | Reuse pattern from Blueport/Khagatara Books |
| Styling | Tailwind CSS + CSS variables | For theme selector support |
| State | React Context / Zustand | Theme, font-size, cart/order-in-progress state |
| Backend | Next.js API routes / Node | Same repo, serverless-friendly |
| DB | Neon Postgres + Prisma | Same as Blueport/Books |
| Auth | NextAuth (email/OTP + Google) | KYC fields extended in user table |
| Payments | Razorpay | Payment links + webhook for status |
| Email | Brevo (@khagatara.com, DKIM/DMARC set) | Booking slip, status updates |
| File storage | S3-compatible (Cloudflare R2 / Wasabi) | Uploaded docs, card designs, ad creatives |
| PDF generation | Existing Khagatara Books PDF pattern (e.g., pdf-lib / Puppeteer) | Booking slip, GST invoice |
| Tracking integration | India Post tracking scrape/API + courier AWB APIs | Embedded in `/track/[orderId]` |
| Hosting | Vercel or existing VPS | Match current Khagatara deployment |

---

## 2. Database Schema (core tables)

- `users` (id, name, email, phone, kyc_status, created_at)
- `addresses` (id, user_id, label, line1, line2, city, state, pincode, country)
- `orders` (id, order_code, user_id, module, status, amount, payment_ref, created_at)
- `order_items` (id, order_id, module_specific_json, quantity, unit_price)
- `print_options` (color, sides, paper_gsm, paper_size, binding)
- `card_options` (occasion, size, fold_style, stock, personalization_json, addons_json)
- `ad_bookings` (paper_name, language, edition, ad_type, size_cm, color, publish_date, proof_url)
- `tracking_events` (id, order_id, status, timestamp, note, awb_number)
- `payment_slips` (id, order_id, pdf_url, generated_at)
- `templates` (id, user_id, module, name, saved_json) — for reorder/saved designs

---

## 3. UI/UX Global Requirements

- **Theme selector:** Light / Dark / System — stored in user prefs + localStorage fallback for guests
- **Font size selector:** range 12.5px–18px, step 0.5, applied via root CSS variable (`--base-font-size`), persisted per user/session
- **Home arrow:** persistent back-to-home icon (top-left, all pages) — single click returns to dashboard/home regardless of depth
- **Layout:** sidebar (mother tabs) + top bar (search, theme, font size, account) + breadcrumb trail + main content area with child-tab sub-navigation

---

## 4. Full Site Skeleton

```
Home (/)
├── Top Bar: Logo | Home Arrow | Search | Theme Selector | Font Size Selector | Account Icon
├── Sidebar (7 Mother Tabs)
│
├── 1. Document Print & Post (/print-post)
│   ├── Upload Document
│   ├── Print Options
│   ├── Post Options
│   ├── Price Calculator
│   ├── Order History
│   ├── Saved Addresses
│   └── Reorder/Templates
│
├── 2. Greeting Cards (/cards)
│   ├── Choose Occasion
│   ├── Card Format
│   ├── Personalization
│   ├── Add-ons
│   ├── Price Calculator
│   ├── Order History
│   └── Saved Designs
│
├── 3. Registered/Certified Mail (/registered-mail)
│   ├── Registered Post
│   ├── Speed Post
│   ├── Legal Notice Format Check
│   ├── Price Calculator
│   ├── Order History
│   ├── Saved Recipients
│   └── Proof/Receipt Archive
│
├── 4. Newspaper/Media Ad Placement (/ads)
│   ├── Ad Type Selection
│   ├── Select Paper
│   ├── Size & Color
│   ├── Proof Delivery
│   ├── Price Calculator
│   ├── Order History
│   └── Saved Ad Templates
│
├── 5. Bulk/Business Mail (/bulk)
│   ├── CSV Upload
│   ├── Template Selection
│   ├── Batch Print Options
│   ├── Price Calculator
│   ├── Order History
│   ├── Saved Recipient Lists
│   └── Saved Templates
│
├── 6. Track Order (/track)
│   ├── Order Status Timeline
│   ├── Payment Slip Download
│   ├── India Post/AWB Tracking
│   ├── Proof/Tearsheet Viewer
│   ├── Delivery Confirmation
│   ├── Support/Raise Issue
│   └── Rate This Order
│
└── 7. Account (/account)
    ├── Account Creation/Sign-up
    ├── Login
    ├── Profile & KYC
    ├── Payment Methods
    ├── Address Book
    ├── Order History (consolidated)
    └── Notifications/Preferences
```

---

## 5. Price Calculator Logic (per module, generic pattern)

**Input → Formula → Output**

- **Print & Post:** pages × per-page rate (by color/paper GSM) + binding fee + post/courier rate (by zone/weight slab, from a rate table) = estimated total
- **Cards:** base card price (by stock/size) + personalization fee + add-ons + post rate = estimated total
- **Registered Mail:** base registered/speed post rate (by weight slab) + legal-format-check fee (if applicable) = estimated total
- **Ads:** column-cm × per-cm rate (varies by paper/edition/color) + service margin = estimated total
- **Bulk:** (per-unit cost from Print & Post/Cards calculator) × batch quantity − volume discount tier = estimated total

All calculators live-update on option change, before checkout, using rate tables stored in DB (editable by admin without code changes).

---

## 6. Rollout Note

This spec assumes Phase 2/3 build. Phase 1 (manual validation) should still run in parallel — this skeleton is the target once demand is validated per the original blueprint's phased plan.
