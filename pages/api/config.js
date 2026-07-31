import { prisma } from "../../lib/prisma";
import { getSessionFromReq } from "../../lib/auth";

async function getOrCreateConfig() {
  let config = await prisma.printConfig.findUnique({ where: { id: 1 } });
  if (!config) {
    config = await prisma.printConfig.create({ data: { id: 1 } });
  }
  return config;
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
