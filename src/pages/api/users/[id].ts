import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.id && typeof req.query.id === "string") {
      const userData = await prisma.user.findUnique({
        where: {
          id: req.query.id,
        },
      });
      res.json({userData})
    }
  } else if (req.method === "PATCH") {
    if (req.query.id) {
      await prisma.user.update({
        where: {
          id: req.query.id.toString(),
        },
        data: {
          name: req.body.name,
        },
      });
      res.json({
        message: `id: ${req.query.id} updated completely to ${req.body.name}`,
      });
    }
  } else if (req.method === "DELETE") {
    if (req.query.id) {
      await prisma.user.delete({
        where: {
          id: req.query.id.toString(),
        },
      });
      res.json({ message: `id: ${req.query.id} deleted completely` });
    }
  }
}
