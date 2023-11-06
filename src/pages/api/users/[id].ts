import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    await client.user.update({
      where: {
        id: req.body.id
        //body 말고 query값을 넘겨주고 싶은데 계속 에러가 뜸
      },
      data: {
        name: req.body.name
      }
    });
  }
}
