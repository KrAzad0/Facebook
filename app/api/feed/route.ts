import { NextResponse } from "next/server";
import { getPersonalizedFeed } from "@/lib/feed";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
  }

  const feed = await getPersonalizedFeed(userId);
  return NextResponse.json(feed);
}
