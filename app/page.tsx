import Link from "next/link";
import { getPersonalizedFeed } from "@/lib/feed";
import { prisma } from "@/lib/prisma";
import { PostComposer } from "@/components/PostComposer";
import { ConnectionRequestForm } from "@/components/ConnectionRequestForm";

export default async function Home() {
  const currentUser = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });

  if (!currentUser) {
    return <p>Seed users are not available. Run prisma:seed first.</p>;
  }

  const [feed, users] = await Promise.all([
    getPersonalizedFeed(currentUser.id),
    prisma.user.findMany({ orderBy: { createdAt: "asc" } })
  ]);

  return (
    <>
      <h1>Niche Network</h1>
      <p className="meta">Logged in as {currentUser.displayName} ({currentUser.id})</p>

      <PostComposer userId={currentUser.id} />
      <ConnectionRequestForm senderId={currentUser.id} />

      <section className="card">
        <h2>Profiles</h2>
        {users.map((user) => (
          <p key={user.id}>
            <Link href={`/profile/${user.id}`}>{user.displayName}</Link> <span className="meta">{user.id}</span>
          </p>
        ))}
      </section>

      <section>
        <h2>Personalized Feed</h2>
        {feed.map((post) => (
          <article className="card" key={post.id}>
            <h3>{post.author.displayName}</h3>
            <p>{post.content}</p>
            <p className="meta">{new Date(post.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </section>
    </>
  );
}
