import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const byClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();
  },
});

export const byId = query({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const upsertFromClerk = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    naam: v.string(),
  },
  handler: async (ctx, { clerkId, email, naam }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { lastLoginAt: now, email });
      return existing._id;
    }
    return ctx.db.insert("users", {
      clerkId,
      email,
      naam,
      avatarInitial: naam.slice(0, 1).toUpperCase(),
      subscriptionStatus: "none",
      createdAt: now,
      lastLoginAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    naam: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, { id, naam, bio }) => {
    const patch: Record<string, unknown> = {};
    if (naam !== undefined) {
      patch.naam = naam;
      patch.avatarInitial = naam.slice(0, 1).toUpperCase();
    }
    if (bio !== undefined) patch.bio = bio || undefined;
    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    // Cascade: delete user's content
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_userId", (q) => q.eq("userId", id))
      .collect();
    for (const p of posts) {
      const cs = await ctx.db
        .query("comments")
        .withIndex("by_postId", (q) => q.eq("postId", p._id))
        .collect();
      for (const c of cs) await ctx.db.delete(c._id);
      await ctx.db.delete(p._id);
    }
    const records = await ctx.db
      .query("brouwketelRecords")
      .withIndex("by_userId", (q) => q.eq("userId", id))
      .collect();
    for (const r of records) await ctx.db.delete(r._id);
    const progress = await ctx.db
      .query("cursusProgress")
      .withIndex("by_userId", (q) => q.eq("userId", id))
      .collect();
    for (const p of progress) await ctx.db.delete(p._id);
    await ctx.db.delete(id);
  },
});
