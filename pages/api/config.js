import { prisma } from "../../lib/prisma";
import { getSessionFromReq } from "../../lib/auth";

const DEFAULT_CONFIG = {
  id: 1,
  bondPaperAvailable: true,
  premiumPaperAvailable: true,
  standardPaperAvailable: true,
  envelopeSizes: ["C4", "C5", "C6"],
  foldingAvailable: true,
  foldTypes: ["No fold", "Single fold", "Tri-fold"],
};

async function getOrCreateConfig() {
  try {
    let config = await prisma.printConfig.findUnique({ where: { id: 1 } });
    if (!config) {
      config = await prisma.printConfig.create({ data: { id: 1 } });
    }
    return config;
  } catch {
    // DB unreachable — return safe defaults so the UI still works
    return DEFAULT_CONFIG;
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const config = await getOrCreateConfig();
    return res.status(200).json(config);
  }

  if (req.method === "PATCH") {
    const session = getSessionFromReq(req);
    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const allowedFields = [
      "bondPaperAvailable",
      "premiumPaperAvailable",
      "standardPaperAvailable",
      "envelopeSizes",
      "foldingAvailable",
      "foldTypes",
    ];

    const data = {};
    for (const key of allowedFields) {
      if (key in req.body) data[key] = req.body[key];
    }

    const updated = await prisma.printConfig.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });

    return res.status(200).json(updated);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
