import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import { readSession } from "@/lib/auth/session";
import { posts, comments } from "@/lib/db/store";
import { Eyebrow } from "@/components/ui/Card";
import { PostForm } from "@/components/platform/PostForm";
import { kanalen, getKanaal } from "@/content/tapkamer";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "De Tapkamer", robots: { index: false } };

type Props = { searchParams: Promise<{ k?: string }> };

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

export default async function TapkamerPage({ searchParams }: Props) {
  const session = await readSession();
  if (!session) return null;

  const { k } = await searchParams;
  const actief = k && getKanaal(k) ? k : undefined;
  const allPosts = await posts.list(actief);

  const commentCountByPost = new Map<string, number>();
  for (const p of allPosts) {
    const cs = await comments.listForPost(p._id);
    commentCountByPost.set(p._id, cs.length);
  }

  return (
    <div>
      <Eyebrow>De Tapkamer</Eyebrow>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">
        De bar van De Geldbrouwerij.
      </h1>
      <p className="mt-2 text-hout-soft max-w-xl">
        Warm, nuchter, nooit oordelend. Deel je Proost-moment, stel je vraag,
        help een Brouwmaatje.
      </p>

      {/* Kanalen */}
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Kanalen">
        <Link
          href="/platform/tapkamer"
          className={cn(
            "rounded-full px-4 py-2 text-sm border transition-colors",
            !actief
              ? "bg-bg-groen text-schuim border-bg-groen"
              : "bg-schuim text-hout border-hout/10 hover:border-bg-groen/40",
          )}
        >
          Alle kanalen
        </Link>
        {kanalen.map((k) => (
          <Link
            key={k.slug}
            href={`/platform/tapkamer?k=${k.slug}`}
            className={cn(
              "rounded-full px-4 py-2 text-sm border transition-colors",
              actief === k.slug
                ? "bg-bg-groen text-schuim border-bg-groen"
                : "bg-schuim text-hout border-hout/10 hover:border-bg-groen/40",
            )}
          >
            {k.naam}
          </Link>
        ))}
      </nav>

      {/* New post */}
      <div className="mt-6">
        <PostForm defaultKanaal={actief ?? "algemeen"} />
      </div>

      {/* Posts */}
      <div className="mt-8 space-y-4">
        {allPosts.length === 0 && (
          <div className="rounded-2xl bg-creme border border-hout/5 p-8 text-center">
            <p className="font-display text-xl !text-bg-groen">
              Nog geen biertje getapt.
            </p>
            <p className="mt-1 text-hout-soft text-sm">
              Schenk de eerste ronde in — post een kennismaking of een
              Proost-moment.
            </p>
          </div>
        )}
        {allPosts.map((p) => {
          const kanaal = getKanaal(p.kanaal);
          return (
            <article
              key={p._id}
              className="rounded-2xl bg-creme border border-hout/5 p-5 sm:p-6 hover:shadow-[var(--shadow-soft)] transition-shadow"
            >
              <div className="flex items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-full bg-koper text-schuim flex items-center justify-center font-display">
                  {p.userInitial}
                </div>
                <div>
                  <p className="font-medium text-bg-groen">{p.userNaam}</p>
                  <p className="text-xs text-hout-soft">
                    {kanaal?.naam} · {timeAgo(p.createdAt)}
                  </p>
                </div>
              </div>
              <h2 className="mt-4 font-display text-xl !text-bg-groen">
                <Link
                  href={`/platform/tapkamer/${p._id}`}
                  className="hover:text-koper-dark"
                >
                  {p.titel}
                </Link>
              </h2>
              <p className="mt-2 text-hout leading-relaxed whitespace-pre-wrap line-clamp-4">
                {p.body}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-hout-soft">
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {p.likes.length}
                </span>
                <Link
                  href={`/platform/tapkamer/${p._id}`}
                  className="inline-flex items-center gap-1 hover:text-bg-groen"
                >
                  <MessageCircle className="h-4 w-4" />
                  {commentCountByPost.get(p._id) ?? 0}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
