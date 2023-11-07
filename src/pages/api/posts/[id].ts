import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    if (req.query.id) {
      await client.post.update({
        where: {
          id: +req.query.id,
        },
        data: {
          authorId: +req.body.authorId,
          title: req.body.title,
          content: req.body.content,
        },
      });
      res.json({
        message: `post named '${req.body.title}' has updated completely`,
      });
    }
  } else if (req.method === "DELETE") {
    if (req.query.id) {
      await client.post.delete({
        where: {
          id: +req.query.id,
        },
      });
      res.json({
        message: `post with ${req.query.id} has been deleted successfully`,
      });
    }
  }
}
