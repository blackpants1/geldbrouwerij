import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { readSession } from "@/lib/auth/session";
import { posts, comments } from "@/lib/db/store";
import { getKanaal } from "@/content/tapkamer";
import { Eyebrow } from "@/components/ui/Card";
import { LikeButton } from "@/components/platform/LikeButton";
import { CommentForm } from "@/components/platform/CommentForm";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { robots: { index: false } };

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60_000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 1) return "zojuist";
  if (m < 60) return `${m} min geleden`;
  if (h < 24) return `${h} uur geleden`;
  if (d < 7) return `${d} dag${d > 1 ? "en" : ""} geleden`;
  return new Date(ts).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
  });
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await readSession();
  if (!session) return null;

  const post = await posts.byId(id);
  if (!post) notFound();

  const kanaal = getKanaal(post.kanaal);
  const cs = await comments.listForPost(post._id);

  return (
    <div className="max-w-3xl">
      <Link
        href="/platform/tapkamer"
        className="inline-flex items-center gap-1.5 text-sm text-hout-soft hover:text-bg-groen"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar De Tapkamer
      </Link>

      <article className="mt-4 rounded-2xl bg-creme border border-hout/5 p-6 sm:p-8">
        <div className="flex items-center gap-3 text-sm">
          <div className="h-10 w-10 rounded-full bg-koper text-schuim flex items-center justify-center font-display">
            {post.userInitial}
          </div>
          <div>
            <p className="font-medium text-bg-groen">{post.userNaam}</p>
            <p className="text-xs text-hout-soft">
              {kanaal?.naam} · {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        <Eyebrow className="mt-6">{kanaal?.naam}</Eyebrow>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {post.titel}
        </h1>
        <div className="mt-5 text-hout text-base leading-relaxed whitespace-pre-wrap">
          {post.body}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <LikeButton
            postId={post._id}
            initialLiked={post.likes.some((id) => id === session.uid)}
            initialCount={post.likes.length}
          />
        </div>
      </article>

      <section className="mt-8">
        <h2 className="font-display text-xl sm:text-2xl !text-bg-groen">
          Reacties ({cs.length})
        </h2>
        <ul className="mt-4 space-y-3">
          {cs.map((c) => (
            <li
              key={c._id}
              className="rounded-xl bg-schuim border border-hout/10 p-4"
            >
              <div className="flex items-center gap-2.5 text-sm">
                <div className="h-8 w-8 rounded-full bg-bg-groen text-schuim flex items-center justify-center font-display text-sm">
                  {c.userInitial}
                </div>
                <div>
                  <p className="font-medium text-bg-groen">{c.userNaam}</p>
                  <p className="text-xs text-hout-soft">{timeAgo(c.createdAt)}</p>
                </div>
              </div>
              <p className="mt-2 text-hout text-sm leading-relaxed whitespace-pre-wrap">
                {c.body}
              </p>
            </li>
          ))}
          {cs.length === 0 && (
            <li className="rounded-xl bg-schuim border border-hout/10 p-4 text-sm text-hout-soft">
              Geen reacties — schenk de eerste ronde.
            </li>
          )}
        </ul>

        <CommentForm postId={post._id} />
      </section>
    </div>
  );
}
