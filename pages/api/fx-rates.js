// pages/api/fx-rates.js
import { getFxRates } from "../../lib/fxRates";

export default async function handler(req, res) {
  try {
    const rates = await getFxRates();
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).json(rates);
  } catch (err) {
    console.error("fx-rates route error:", err);
    return res.status(500).json({ error: "Failed to fetch exchange rates" });
  }
}
