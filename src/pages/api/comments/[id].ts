import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    if (req.query.id) {
      await client.comment.update({
        where: {
          id: +req.query.id,
        },
        data: {
          content: req.body.content,
          userId: req.body.authorId,
        },
      });
      res.json({
        message: `comment with id '${req.query.id}' has updated completely`,
      });
    }
  } else if (req.method === "DELETE") {
    if (req.query.id) {
      await client.comment.delete({
        where: {
          id: +req.query.id,
        },
      });
      res.json({
        message: `comment with id ${req.query.id} has been deleted successfully`,
      });
    }
  }
}
