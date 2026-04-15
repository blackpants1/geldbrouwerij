/**
 * Session-laag. Clerk is de source of truth voor authenticatie.
 * We mappen Clerk-identiteit naar onze lokale User (in .data/users.json)
 * zodat alle platform-features (Brouwketel history, Tapkamer posts,
 * cursus-voortgang) via dezelfde API blijven werken.
 *
 * Zodra Convex er in zit: users.upsertFromClerk wordt een Convex mutation,
 * de rest van de app blijft ongewijzigd.
 */

import { auth, currentUser } from "@clerk/nextjs/server";
import { users } from "@/lib/db/store";

export type Session = {
  uid: string;          // lokale User._id
  clerkId: string;
  email: string;
  naam: string;
};

export async function readSession(): Promise<Session | null> {
  const { userId } = await auth();
  if (!userId) return null;
  const cu = await currentUser();
  if (!cu) return null;

  const email =
    cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)?.emailAddress ??
    cu.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const naam =
    cu.firstName ||
    cu.username ||
    email.split("@")[0];

  // Upsert via Convex — idempotent op clerkId
  const user = await users.upsertFromClerk({ clerkId: cu.id, email, naam });

  return {
    uid: user._id,
    clerkId: cu.id,
    email,
    naam: user.naam,
  };
}

export async function requireSession(): Promise<Session> {
  const s = await readSession();
  if (!s) throw new Error("UNAUTHENTICATED");
  return s;
}

/** Niet meer nodig met Clerk — Clerk beheert eigen sessie. Stub voor compat. */
export async function destroySession() {
  // no-op
}
