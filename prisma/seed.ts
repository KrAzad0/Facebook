import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [alice, bob, carol] = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: { email: "alice@example.com", displayName: "Alice", bio: "Cyclist & coffee nerd" }
    }),
    prisma.user.upsert({
      where: { email: "bob@example.com" },
      update: {},
      create: { email: "bob@example.com", displayName: "Bob", bio: "Builder and hiker" }
    }),
    prisma.user.upsert({
      where: { email: "carol@example.com" },
      update: {},
      create: { email: "carol@example.com", displayName: "Carol", bio: "Remote designer" }
    })
  ]);

  await prisma.connection.upsert({
    where: { initiatorId_recipientId: { initiatorId: alice.id, recipientId: bob.id } },
    update: {},
    create: { initiatorId: alice.id, recipientId: bob.id }
  });

  await prisma.connectionRequest.upsert({
    where: { senderId_receiverId: { senderId: carol.id, receiverId: alice.id } },
    update: {},
    create: { senderId: carol.id, receiverId: alice.id }
  });

  await prisma.post.createMany({
    data: [
      { authorId: alice.id, content: "Launched a tiny community ride this weekend 🚴" },
      { authorId: bob.id, content: "Finally switched my desk setup to standing mode." },
      { authorId: carol.id, content: "Anyone have podcast recommendations for product folks?" }
    ],
    skipDuplicates: true
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
