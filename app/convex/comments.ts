import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listForPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, { postId }) => {
    return ctx.db
      .query("comments")
      .withIndex("by_postId", (q) => q.eq("postId", postId))
      .order("asc")
      .collect();
  },
});

export const create = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.id("users"),
    userNaam: v.string(),
    userInitial: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("comments", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
