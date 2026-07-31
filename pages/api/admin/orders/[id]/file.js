import { prisma } from "../../../../../lib/prisma";
import { getSessionFromReq } from "../../../../../lib/auth";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const order = await prisma.customerOrder.findUnique({
    where: { id: String(req.query.id) },
  });

  if (!order || !order.fileData) {
    return res.status(404).json({ error: "File not found" });
  }

  const fileName = order.fileName || `${order.publicId}-upload.bin`;
  res.setHeader("Content-Type", order.fileMimeType || "application/octet-stream");
  res.setHeader("Content-Length", order.fileData.length);
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(fileName)}"`);
  return res.status(200).send(Buffer.from(order.fileData));
}
