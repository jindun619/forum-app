import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await prisma.user.create({
      data: req.body,
    });
    res.status(200).json({ message: req.body });
  } else if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.json(users);
  }
}
