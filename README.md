# postman.khagatara.com

First runnable shell for the Khagatara Postman venture: overseas customers upload or configure print, post, greeting-card, registered-mail, ad, and bulk-mail orders for fulfilment inside India.

## Run

```powershell
npm start
```

Open:

```text
http://localhost:4173
```

## Included

- Seven mother tabs with seven child tabs each
- Live calculators for Print & Post, Greeting Cards, Registered Mail, Newspaper/Media Ads, and Bulk Mail
- Country/currency selector for the Europe-facing reference-price model
- Theme selector and font-size control
- Track Order and Account placeholder workflows
- Static local server with no external dependency install required

## Deploy

Vercel runs `npm run build` and publishes the generated `dist` folder as a static site. Browser-only code lives in `client.js`, so Vercel should not execute it as a server function.

## Next Build Step

Move this shell into Next.js App Router with Neon, Prisma, Razorpay, Brevo, file storage, PDF generation, and order tracking once Phase 1 validation is complete.
