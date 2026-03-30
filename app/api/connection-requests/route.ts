import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const RequestSchema = z.object({
  senderId: z.string().min(1),
  receiverId: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { senderId, receiverId } = parsed.data;
  if (senderId === receiverId) {
    return NextResponse.json({ error: "Cannot connect to yourself" }, { status: 400 });
  }

  const existing = await prisma.connectionRequest.findUnique({
    where: { senderId_receiverId: { senderId, receiverId } }
  });

  if (existing) {
    return NextResponse.json({ error: "Request already exists" }, { status: 409 });
  }

  const connection = await prisma.connectionRequest.create({ data: { senderId, receiverId } });
  return NextResponse.json(connection, { status: 201 });
}
