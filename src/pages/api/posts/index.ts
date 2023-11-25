import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const post = {
      title: req.body.title,
      content: req.body.content,
      user: {
        connect: {
          id: req.body.userId,
        },
      },
    };
    await prisma.post.create({
      data: post,
    });
    res.json({ message: req.body });
  } else if (req.method === "GET") {
    const posts = await prisma.post.findMany();
    res.json(posts);
  }
}
