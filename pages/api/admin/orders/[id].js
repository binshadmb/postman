import { prisma } from "../../../../lib/prisma";
import { getSessionFromReq } from "../../../../lib/auth";

// Only orders in these statuses can be deleted — anything paid or further
// along has financial/accounting weight and must be retained, not deleted.
const DELETABLE_STATUSES = ["PAYMENT_PENDING", "CANCELLED", "IN_REVIEW"];

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { id } = req.query;

  if (req.method === "DELETE") {
    const existing = await prisma.customerOrder.findUnique({ where: { id: String(id) } });
    if (!existing) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (!DELETABLE_STATUSES.includes(existing.status)) {
      return res.status(403).json({
        error: `Cannot delete an order with status ${existing.status}. Only ${DELETABLE_STATUSES.join(", ")} can be deleted.`,
      });
    }
    await prisma.customerOrder.delete({ where: { id: existing.id } });
    return res.status(200).json({ deleted: true });
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const allowedStatuses = [
    "PAYMENT_PENDING",
    "PAID",
    "IN_REVIEW",
    "PRINTED",
    "POSTED",
    "FULFILLED",
    "CANCELLED",
    "REFUNDED",
  ];

  const nextStatus = req.body?.status;
  if (!allowedStatuses.includes(nextStatus)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const existing = await prisma.customerOrder.findUnique({ where: { id: String(id) } });
  if (!existing) {
    return res.status(404).json({ error: "Order not found" });
  }

  const now = new Date();
  const order = await prisma.customerOrder.update({
    where: { id: existing.id },
    data: {
      status: nextStatus,
      fulfilledAt: nextStatus === "FULFILLED" ? now : existing.fulfilledAt,
      events: [
        ...((Array.isArray(existing.events) ? existing.events : [])),
        {
          at: now.toISOString(),
          status: nextStatus,
          note: req.body?.note || "Status updated from admin queue.",
        },
      ],
    },
  });

  const { fileData, ...safe } = order;
  return res.status(200).json({ order: { ...safe, hasFile: Boolean(fileData) } });
}
