"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { users } from "@/lib/db/store";

export async function updateProfile({
  naam,
  bio,
}: {
  naam: string;
  bio?: string;
}) {
  const session = await readSession();
  if (!session) return { ok: false as const, error: "Niet ingelogd." };
  if (naam.trim().length < 2)
    return { ok: false as const, error: "Vul een geldige naam in." };

  await users.update(session.uid, {
    naam: naam.trim(),
    bio: bio?.trim() || undefined,
    avatarInitial: naam.trim()[0].toUpperCase(),
  });

  revalidatePath("/platform");
  revalidatePath("/platform/account");
  return { ok: true as const };
}

/**
 * Verwijdert het lokale User-record + data. Clerk-account blijft bestaan
 * (user kan die zelf via /platform/account → Clerk settings beheren).
 */
export async function deleteAccount() {
  const session = await readSession();
  if (!session) return;
  await users.delete(session.uid);
  redirect("/");
}
