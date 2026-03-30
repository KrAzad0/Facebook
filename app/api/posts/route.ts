import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const CreatePostSchema = z.object({
  authorId: z.string().min(1),
  content: z.string().min(3).max(500)
});

export async function POST(request: Request) {
  const parsed = CreatePostSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const post = await prisma.post.create({ data: parsed.data });
  return NextResponse.json(post, { status: 201 });
}
