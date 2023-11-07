import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const post = {
      title: req.body.title,
      content: req.body.title,
      author: {
        connect: {
          id: +req.body.authorId,
        },
      },
    };
    await client.post.create({
      data: post,
    });
    res.json({ message: req.body });
  } else if (req.method === "GET") {
    const posts = await client.post.findMany();
    res.json(posts);
  }
}
