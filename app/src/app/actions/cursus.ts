"use server";

import { revalidatePath } from "next/cache";
import { readSession } from "@/lib/auth/session";
import { cursusProgress } from "@/lib/db/store";

export async function toggleModule(moduleId: string, complete: boolean) {
  const session = await readSession();
  if (!session) return { ok: false as const, error: "Niet ingelogd." };
  if (complete) {
    await cursusProgress.markComplete(session.uid, moduleId);
  } else {
    await cursusProgress.markIncomplete(session.uid, moduleId);
  }
  revalidatePath("/platform");
  revalidatePath("/platform/cursus");
  return { ok: true as const };
}
