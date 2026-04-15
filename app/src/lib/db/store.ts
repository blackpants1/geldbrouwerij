/**
 * Data-laag — praat met Convex. Alle platform-features lopen hierdoorheen.
 *
 * Convex levert:
 *  - Real-time queries (in Fase 2.1 via client-side subscriptions)
 *  - Type-safe mutations
 *  - Automatic caching
 *
 * Voor nu: server-side HTTP client (vanuit server actions / RSC).
 * Client-side real-time voor Tapkamer komt in Fase 2.1.
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  throw new Error(
    "NEXT_PUBLIC_CONVEX_URL ontbreekt. Run `npx convex dev` in /app.",
  );
}

const client = new ConvexHttpClient(CONVEX_URL);

// ────────────────────────────── types ──────────────────────────────

export interface User {
  _id: Id<"users">;
  clerkId: string;
  email: string;
  naam: string;
  bio?: string;
  avatarInitial: string;
  subscriptionStatus?: "trial" | "active" | "canceled" | "none";
  createdAt: number;
  lastLoginAt?: number;
}

export interface BrouwketelRecord {
  _id: Id<"brouwketelRecords">;
  userId?: Id<"users">;
  email: string;
  naam?: string;
  score: number;
  kleur: "rood" | "amber" | "groen";
  assen: {
    spaarquote: number;
    vasteLastenRatio: number;
    bufferMaanden: number;
    schuldenRatio: number;
    automatisering: number;
  };
  input: Record<string, unknown>;
  acties: string[];
  projectie30: number;
  createdAt: number;
}

export interface Post {
  _id: Id<"posts">;
  userId: Id<"users">;
  userNaam: string;
  userInitial: string;
  kanaal: string;
  titel: string;
  body: string;
  likes: Id<"users">[];
  createdAt: number;
  commentCount?: number;
}

export interface Comment {
  _id: Id<"comments">;
  postId: Id<"posts">;
  userId: Id<"users">;
  userNaam: string;
  userInitial: string;
  body: string;
  createdAt: number;
}

export interface CursusProgress {
  _id: Id<"cursusProgress">;
  userId: Id<"users">;
  moduleId: string;
  completedAt: number;
}

// ────────────────────────────── users ──────────────────────────────

export const users = {
  async byId(id: string): Promise<User | null> {
    return client.query(api.users.byId, { id: id as Id<"users"> });
  },
  async byClerkId(clerkId: string): Promise<User | null> {
    return client.query(api.users.byClerkId, { clerkId });
  },
  async upsertFromClerk(params: {
    clerkId: string;
    email: string;
    naam: string;
  }): Promise<User> {
    const id = await client.mutation(api.users.upsertFromClerk, params);
    const user = await client.query(api.users.byId, { id });
    if (!user) throw new Error("User upsert failed");
    return user;
  },
  // Backwards compat — vroeger ging de local flow via email.
  async upsertFromEmail(params: {
    email: string;
    naam?: string;
  }): Promise<User> {
    // Deze pad is verouderd: elke auth gaat via Clerk. Map email → tijdelijke
    // "local-fallback" user. Wordt niet meer aangeroepen zodra readSession
    // Clerk gebruikt.
    throw new Error(
      "users.upsertFromEmail deprecated — gebruik upsertFromClerk.",
    );
  },
  async update(
    id: string,
    patch: { naam?: string; bio?: string },
  ): Promise<void> {
    await client.mutation(api.users.update, {
      id: id as Id<"users">,
      naam: patch.naam,
      bio: patch.bio,
    });
  },
  async delete(id: string): Promise<void> {
    await client.mutation(api.users.remove, { id: id as Id<"users"> });
  },
};

// ──────────────────────── brouwketel records ───────────────────────

export const brouwketelRecords = {
  async listForUser(userId: string): Promise<BrouwketelRecord[]> {
    return client.query(api.brouwketel.listForUser, {
      userId: userId as Id<"users">,
    });
  },
  async create(params: {
    userId?: string;
    email: string;
    naam?: string;
    score: number;
    kleur: "rood" | "amber" | "groen";
    assen: BrouwketelRecord["assen"];
    input: Record<string, unknown>;
    acties: string[];
    projectie30: number;
  }): Promise<void> {
    await client.mutation(api.brouwketel.create, {
      userId: params.userId ? (params.userId as Id<"users">) : undefined,
      email: params.email,
      naam: params.naam,
      score: params.score,
      kleur: params.kleur,
      assen: params.assen,
      input: params.input,
      acties: params.acties,
      projectie30: params.projectie30,
    });
  },
  async attachToUser(email: string, userId: string): Promise<void> {
    await client.mutation(api.brouwketel.attachToUser, {
      email,
      userId: userId as Id<"users">,
    });
  },
};

// ───────────────────────────── posts ───────────────────────────────

export const posts = {
  async list(kanaal?: string): Promise<Post[]> {
    return client.query(api.posts.list, { kanaal });
  },
  async byId(id: string): Promise<Post | null> {
    return client.query(api.posts.byId, { id: id as Id<"posts"> });
  },
  async create(params: {
    userId: string;
    userNaam: string;
    userInitial: string;
    kanaal: string;
    titel: string;
    body: string;
  }): Promise<{ _id: string }> {
    const id = await client.mutation(api.posts.create, {
      userId: params.userId as Id<"users">,
      userNaam: params.userNaam,
      userInitial: params.userInitial,
      kanaal: params.kanaal,
      titel: params.titel,
      body: params.body,
    });
    return { _id: id };
  },
  async toggleLike(postId: string, userId: string): Promise<void> {
    await client.mutation(api.posts.toggleLike, {
      postId: postId as Id<"posts">,
      userId: userId as Id<"users">,
    });
  },
};

// ──────────────────────────── comments ─────────────────────────────

export const comments = {
  async listForPost(postId: string): Promise<Comment[]> {
    return client.query(api.comments.listForPost, {
      postId: postId as Id<"posts">,
    });
  },
  async create(params: {
    postId: string;
    userId: string;
    userNaam: string;
    userInitial: string;
    body: string;
  }): Promise<void> {
    await client.mutation(api.comments.create, {
      postId: params.postId as Id<"posts">,
      userId: params.userId as Id<"users">,
      userNaam: params.userNaam,
      userInitial: params.userInitial,
      body: params.body,
    });
  },
};

// ───────────────────────── cursus progress ─────────────────────────

export const cursusProgress = {
  async listForUser(userId: string): Promise<CursusProgress[]> {
    return client.query(api.cursus.listForUser, {
      userId: userId as Id<"users">,
    });
  },
  async markComplete(userId: string, moduleId: string): Promise<void> {
    await client.mutation(api.cursus.markComplete, {
      userId: userId as Id<"users">,
      moduleId,
    });
  },
  async markIncomplete(userId: string, moduleId: string): Promise<void> {
    await client.mutation(api.cursus.markIncomplete, {
      userId: userId as Id<"users">,
      moduleId,
    });
  },
};
