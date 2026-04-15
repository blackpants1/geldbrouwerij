import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db
      .query("cursusProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const markComplete = mutation({
  args: { userId: v.id("users"), moduleId: v.string() },
  handler: async (ctx, { userId, moduleId }) => {
    const existing = await ctx.db
      .query("cursusProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("moduleId"), moduleId))
      .unique();
    if (existing) return;
    await ctx.db.insert("cursusProgress", {
      userId,
      moduleId,
      completedAt: Date.now(),
    });
  },
});

export const markIncomplete = mutation({
  args: { userId: v.id("users"), moduleId: v.string() },
  handler: async (ctx, { userId, moduleId }) => {
    const existing = await ctx.db
      .query("cursusProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("moduleId"), moduleId))
      .unique();
    if (existing) await ctx.db.delete(existing._id);
  },
});
