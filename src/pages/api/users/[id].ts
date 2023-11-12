import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    if (req.query.id) {
      await client.user.update({
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
      await client.user.delete({
        where: {
          id: req.query.id.toString(),
        },
      });
      res.json({ message: `id: ${req.query.id} deleted completely` });
    }
  }
}
