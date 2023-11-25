import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.id) {
      const post = await prisma.post.findUnique({
        where: {
          id: +req.query.id,
        },
      });
      res.json({ post });
    }
  } else if (req.method === "PATCH") {
    if (req.query.id) {
      const curDate = new Date()
      await prisma.post.update({
        where: {
          id: +req.query.id,
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          date: curDate
        },
      });
      res.json({
        message: `post named '${req.body.title}' has updated completely`,
      });
    }
  } else if (req.method === "DELETE") {
    if (req.query.id) {
      await prisma.post.delete({
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
