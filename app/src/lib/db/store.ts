/**
 * Lokale file-backed data layer die de Convex-API qua shape volgt.
 * Zodra de echte Convex-integratie aan gaat, wisselen we deze hele
 * file uit voor `convex/_generated/api.ts`-aanroepen en blijven de
 * consumers (platform pages, server actions) ongewijzigd.
 */

import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = () => path.join(process.cwd(), ".data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR(), file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T) {
  await fs.mkdir(DATA_DIR(), { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR(), file),
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

// ────────────────────────────── USERS ──────────────────────────────
export interface User {
  _id: string;
  email: string;
  naam: string;
  createdAt: number;
  lastLoginAt?: number;
  subscriptionStatus?: "trial" | "active" | "canceled" | "none";
  subscriptionPlan?: "monthly" | "quarterly" | "yearly";
  trialEndsAt?: number;
  bio?: string;
  avatarInitial?: string;
}

export const users = {
  async list() {
    return readJson<User[]>("users.json", []);
  },
  async byEmail(email: string) {
    const all = await this.list();
    return all.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  },
  async byId(_id: string) {
    const all = await this.list();
    return all.find((u) => u._id === _id) ?? null;
  },
  async upsertFromEmail({
    email,
    naam,
  }: {
    email: string;
    naam?: string;
  }): Promise<User> {
    const all = await this.list();
    const existing = all.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (existing) {
      existing.lastLoginAt = Date.now();
      if (naam && !existing.naam) existing.naam = naam;
      await writeJson("users.json", all);
      return existing;
    }
    const nu: User = {
      _id: id("usr"),
      email,
      naam: naam ?? email.split("@")[0],
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      subscriptionStatus: "none",
      avatarInitial: (naam ?? email).slice(0, 1).toUpperCase(),
    };
    all.push(nu);
    await writeJson("users.json", all);
    return nu;
  },
  async update(_id: string, patch: Partial<User>) {
    const all = await this.list();
    const idx = all.findIndex((u) => u._id === _id);
    if (idx < 0) return null;
    all[idx] = { ...all[idx], ...patch };
    await writeJson("users.json", all);
    return all[idx];
  },
  async delete(_id: string) {
    const all = await this.list();
    const next = all.filter((u) => u._id !== _id);
    await writeJson("users.json", next);
  },
};

// ────────────────────── BROUWKETEL RESULTS ─────────────────────────
export interface BrouwketelRecord {
  _id: string;
  userId?: string;
  email: string;
  naam?: string;
  score: number;
  kleur: "rood" | "amber" | "groen";
  assen: Record<string, number>;
  input: Record<string, unknown>;
  acties: string[];
  projectie30: number;
  createdAt: number;
}

export const brouwketelRecords = {
  async listForUser(userId: string) {
    const all = await readJson<BrouwketelRecord[]>(
      "brouwketel-records.json",
      [],
    );
    return all
      .filter((r) => r.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  },
  async listForEmail(email: string) {
    const all = await readJson<BrouwketelRecord[]>(
      "brouwketel-records.json",
      [],
    );
    return all
      .filter((r) => r.email.toLowerCase() === email.toLowerCase())
      .sort((a, b) => b.createdAt - a.createdAt);
  },
  async create(record: Omit<BrouwketelRecord, "_id" | "createdAt">) {
    const all = await readJson<BrouwketelRecord[]>(
      "brouwketel-records.json",
      [],
    );
    const nu: BrouwketelRecord = {
      ...record,
      _id: id("bkt"),
      createdAt: Date.now(),
    };
    all.push(nu);
    await writeJson("brouwketel-records.json", all);
    return nu;
  },
  async attachToUser(email: string, userId: string) {
    const all = await readJson<BrouwketelRecord[]>(
      "brouwketel-records.json",
      [],
    );
    let changed = false;
    for (const r of all) {
      if (
        r.email.toLowerCase() === email.toLowerCase() &&
        !r.userId
      ) {
        r.userId = userId;
        changed = true;
      }
    }
    if (changed) await writeJson("brouwketel-records.json", all);
  },
};

// ───────────────────────── TAPKAMER POSTS ──────────────────────────
export interface Post {
  _id: string;
  userId: string;
  userNaam: string;
  userInitial: string;
  kanaal: string;
  titel: string;
  body: string;
  likes: string[]; // userIds
  createdAt: number;
}

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  userNaam: string;
  userInitial: string;
  body: string;
  createdAt: number;
}

export const posts = {
  async list(kanaal?: string) {
    const all = await readJson<Post[]>("posts.json", []);
    const filtered = kanaal ? all.filter((p) => p.kanaal === kanaal) : all;
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  },
  async byId(_id: string) {
    const all = await readJson<Post[]>("posts.json", []);
    return all.find((p) => p._id === _id) ?? null;
  },
  async create(post: Omit<Post, "_id" | "createdAt" | "likes">) {
    const all = await readJson<Post[]>("posts.json", []);
    const nu: Post = {
      ...post,
      _id: id("pst"),
      likes: [],
      createdAt: Date.now(),
    };
    all.push(nu);
    await writeJson("posts.json", all);
    return nu;
  },
  async toggleLike(postId: string, userId: string) {
    const all = await readJson<Post[]>("posts.json", []);
    const p = all.find((x) => x._id === postId);
    if (!p) return null;
    const i = p.likes.indexOf(userId);
    if (i >= 0) p.likes.splice(i, 1);
    else p.likes.push(userId);
    await writeJson("posts.json", all);
    return p;
  },
};

export const comments = {
  async listForPost(postId: string) {
    const all = await readJson<Comment[]>("comments.json", []);
    return all
      .filter((c) => c.postId === postId)
      .sort((a, b) => a.createdAt - b.createdAt);
  },
  async create(comment: Omit<Comment, "_id" | "createdAt">) {
    const all = await readJson<Comment[]>("comments.json", []);
    const nu: Comment = {
      ...comment,
      _id: id("cmt"),
      createdAt: Date.now(),
    };
    all.push(nu);
    await writeJson("comments.json", all);
    return nu;
  },
};

// ────────────────────── CURSUS PROGRESS ────────────────────────────
export interface CursusProgress {
  userId: string;
  moduleId: string;
  completedAt: number;
}

export const cursusProgress = {
  async listForUser(userId: string): Promise<CursusProgress[]> {
    const all = await readJson<CursusProgress[]>("cursus-progress.json", []);
    return all.filter((p) => p.userId === userId);
  },
  async markComplete(userId: string, moduleId: string) {
    const all = await readJson<CursusProgress[]>("cursus-progress.json", []);
    const exists = all.find(
      (p) => p.userId === userId && p.moduleId === moduleId,
    );
    if (!exists) {
      all.push({ userId, moduleId, completedAt: Date.now() });
      await writeJson("cursus-progress.json", all);
    }
    return all.filter((p) => p.userId === userId);
  },
  async markIncomplete(userId: string, moduleId: string) {
    const all = await readJson<CursusProgress[]>("cursus-progress.json", []);
    const next = all.filter(
      (p) => !(p.userId === userId && p.moduleId === moduleId),
    );
    await writeJson("cursus-progress.json", next);
    return next.filter((p) => p.userId === userId);
  },
};
