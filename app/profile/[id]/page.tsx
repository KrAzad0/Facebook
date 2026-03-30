import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: { id: string } };

export default async function ProfilePage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      posts: { orderBy: { createdAt: "desc" }, take: 20 },
      incomingRequests: {
        where: { status: "PENDING" },
        include: { sender: { select: { displayName: true } } }
      },
      outgoingRequests: {
        where: { status: "PENDING" },
        include: { receiver: { select: { displayName: true } } }
      }
    }
  });

  if (!user) return notFound();

  return (
    <>
      <h1>{user.displayName}</h1>
      <p className="meta">{user.bio ?? "No bio yet."}</p>

      <section className="card">
        <h2>Pending Incoming Requests</h2>
        {user.incomingRequests.length === 0 ? <p>None.</p> : user.incomingRequests.map((req) => <p key={req.id}>{req.sender.displayName}</p>)}
      </section>

      <section className="card">
        <h2>Pending Outgoing Requests</h2>
        {user.outgoingRequests.length === 0 ? <p>None.</p> : user.outgoingRequests.map((req) => <p key={req.id}>{req.receiver.displayName}</p>)}
      </section>

      <section>
        <h2>Recent Posts</h2>
        {user.posts.map((post) => (
          <article className="card" key={post.id}>
            <p>{post.content}</p>
            <p className="meta">{new Date(post.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </section>
    </>
  );
}
