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
          authorId: +req.body.authorId,
          // postId: +req.body.postId,
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
        message: `comment with ${req.query.id} has been deleted successfully`,
      });
    }
  }
}
