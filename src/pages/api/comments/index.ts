import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const comment = {
      content: req.body.content,
      user: {
        connect: {
          id: req.body.authorId,
        },
      },
      post: {
        connect: {
          id: +req.body.postId,
        },
      },
    };
    await client.comment.create({
      data: comment,
    });
    res.json({ message: req.body });
  } else if (req.method === "GET") {
    const comments = await client.comment.findMany();
    res.json(comments);
  }
}
