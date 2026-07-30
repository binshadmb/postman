# postman.khagatara.com

First runnable shell for the Khagatara Postman venture: overseas customers upload or configure print, post, greeting-card, registered-mail, ad, and bulk-mail orders for fulfilment inside India.

## Run

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Included

- Seven mother tabs with seven child tabs each
- Live calculators for Print & Post, Greeting Cards, Registered Mail, Newspaper/Media Ads, and Bulk Mail
- Country/currency selector for the Europe-facing reference-price model
- Theme selector and font-size control
- Track Order and Account placeholder workflows
- Next.js Pages Router shell using plain CSS and public browser assets

## Deploy

This now matches the simple Next.js deployment style used by other Khagatara projects. Vercel runs `next build`; browser-only tab/calculator code lives in `public/client.js`.

## Next Build Step

Move this shell into Next.js App Router with Neon, Prisma, Razorpay, Brevo, file storage, PDF generation, and order tracking once Phase 1 validation is complete.
