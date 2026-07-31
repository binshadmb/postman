import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const order = await prisma.customerOrder.findUnique({
    where: { publicId: String(req.query.publicId).toUpperCase() },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  return res.status(200).json({
    publicId: order.publicId,
    status: order.status,
    module: order.module,
    amount: order.amount,
    currency: order.currency,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    fulfilledAt: order.fulfilledAt,
    events: order.events,
  });
}
