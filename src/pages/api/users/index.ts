import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await client.user.create({
      data: req.body
    });
    res.status(200).json({message: req.body})
  } else if (req.method === 'GET') {
    const users = await client.user.findMany()
    res.json(users)
  }
}
