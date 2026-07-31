import { prisma } from "../../../../lib/prisma";
import { getSessionFromReq } from "../../../../lib/auth";

function publicOrder(order) {
  const { fileData, ...safe } = order;
  return {
    ...safe,
    hasFile: Boolean(fileData),
  };
}

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const orders = await prisma.customerOrder.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return res.status(200).json({ orders: orders.map(publicOrder) });
}
