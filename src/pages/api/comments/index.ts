import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const comment = {
      content: req.body.content,
      user: {
        connect: {
          id: req.body.userId,
        },
      },
      post: {
        connect: {
          id: +req.body.postId,
        },
      },
    };
    await prisma.comment.create({
      data: comment,
    });
    res.json({ message: req.body });
  } else if (req.method === "GET") {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  }
}
