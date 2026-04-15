"use server";

import { revalidatePath } from "next/cache";
import { readSession } from "@/lib/auth/session";
import { users, posts, comments } from "@/lib/db/store";

export async function createPost(input: {
  kanaal: string;
  titel: string;
  body: string;
}): Promise<{ ok: true; postId: string } | { ok: false; error: string }> {
  const session = await readSession();
  if (!session) return { ok: false, error: "Niet ingelogd." };
  const user = await users.byId(session.uid);
  if (!user) return { ok: false, error: "Account niet gevonden." };

  const titel = input.titel.trim();
  const body = input.body.trim();
  if (titel.length < 3) return { ok: false, error: "Titel is te kort." };
  if (body.length < 3) return { ok: false, error: "Je bericht is te kort." };
  if (body.length > 4000) return { ok: false, error: "Je bericht is te lang (max 4000 tekens)." };

  const post = await posts.create({
    userId: user._id,
    userNaam: user.naam,
    userInitial: user.avatarInitial ?? user.naam[0].toUpperCase(),
    kanaal: input.kanaal,
    titel,
    body,
  });

  revalidatePath("/platform/tapkamer");
  revalidatePath(`/platform/tapkamer/${post._id}`);
  return { ok: true, postId: post._id };
}

export async function toggleLike(postId: string) {
  const session = await readSession();
  if (!session) return { ok: false as const, error: "Niet ingelogd." };
  await posts.toggleLike(postId, session.uid);
  revalidatePath("/platform/tapkamer");
  revalidatePath(`/platform/tapkamer/${postId}`);
  return { ok: true as const };
}

export async function addComment({ postId, body }: { postId: string; body: string }) {
  const session = await readSession();
  if (!session) return { ok: false as const, error: "Niet ingelogd." };
  const user = await users.byId(session.uid);
  if (!user) return { ok: false as const, error: "Account niet gevonden." };
  const text = body.trim();
  if (text.length < 2) return { ok: false as const, error: "Reactie is te kort." };

  await comments.create({
    postId,
    userId: user._id,
    userNaam: user.naam,
    userInitial: user.avatarInitial ?? user.naam[0].toUpperCase(),
    body: text,
  });

  revalidatePath(`/platform/tapkamer/${postId}`);
  return { ok: true as const };
}
