import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //id는 postId를 뜻함
    if (req.query.id) {
      const comments = await prisma.comment.findMany({
        where: {
          postId: +req.query.id,
        },
      });
      res.json(comments)
    }
  } else if (req.method === "PATCH") {
    if (req.query.id) {
      await prisma.comment.update({
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
      await prisma.comment.delete({
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
