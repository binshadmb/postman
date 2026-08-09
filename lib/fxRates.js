// lib/fxRates.js
// Live exchange rates (INR-based), cached in-memory, with a static fallback
// if the live API is unreachable. Free, no API key required.

const FALLBACK_RATES = {
  INR: { symbol: "₹", rate: 1 },
  EUR: { symbol: "€", rate: 0.0109 },
  GBP: { symbol: "£", rate: 0.0094 },
  USD: { symbol: "$", rate: 0.012 },
};

const SYMBOLS = { INR: "₹", EUR: "€", GBP: "£", USD: "$" };

let cache = { rates: null, fetchedAt: 0 };
const CACHE_MS = 60 * 60 * 1000; // 1 hour

async function getFxRates() {
  const now = Date.now();
  if (cache.rates && now - cache.fetchedAt < CACHE_MS) {
    return cache.rates;
  }

  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
    if (!res.ok) throw new Error(`FX API returned ${res.status}`);
    const data = await res.json();

    const rates = {
      INR: { symbol: SYMBOLS.INR, rate: 1 },
      EUR: { symbol: SYMBOLS.EUR, rate: data.rates?.EUR || FALLBACK_RATES.EUR.rate },
      GBP: { symbol: SYMBOLS.GBP, rate: data.rates?.GBP || FALLBACK_RATES.GBP.rate },
      USD: { symbol: SYMBOLS.USD, rate: data.rates?.USD || FALLBACK_RATES.USD.rate },
    };

    cache = { rates, fetchedAt: now };
    return rates;
  } catch (err) {
    console.error("FX rate fetch failed, using fallback:", err.message);
    return FALLBACK_RATES;
  }
}

module.exports = { getFxRates, FALLBACK_RATES };
