import prisma from "@/lib/db";

export async function getUserNameByUserId(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user ? user.name : null;
}

export async function getUserImageByUserId(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user ? user.image : null;
}