"use server";

import { readSession } from "@/lib/auth/session";
import { users } from "@/lib/db/store";

export async function currentUser() {
  const session = await readSession();
  if (!session) return null;
  return users.byId(session.uid);
}
