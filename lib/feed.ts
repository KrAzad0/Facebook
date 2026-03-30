import { prisma } from "@/lib/prisma";

export async function getPersonalizedFeed(userId: string) {
  const connections = await prisma.connection.findMany({
    where: {
      OR: [{ initiatorId: userId }, { recipientId: userId }]
    },
    select: { initiatorId: true, recipientId: true }
  });

  const connectedUserIds = new Set<string>([userId]);
  for (const connection of connections) {
    connectedUserIds.add(connection.initiatorId);
    connectedUserIds.add(connection.recipientId);
  }

  return prisma.post.findMany({
    where: {
      authorId: { in: [...connectedUserIds] }
    },
    include: {
      author: {
        select: {
          id: true,
          displayName: true,
          avatarUrl: true
        }
      }
    },
    orderBy: { createdAt: "desc" },
    take: 50
  });
}
