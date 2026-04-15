import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { kanaal: v.optional(v.string()) },
  handler: async (ctx, { kanaal }) => {
    const q = kanaal
      ? ctx.db
          .query("posts")
          .withIndex("by_kanaal", (q) => q.eq("kanaal", kanaal))
      : ctx.db.query("posts");
    const posts = await q.order("desc").collect();
    // Voeg comment-count toe
    return Promise.all(
      posts.map(async (p) => {
        const cs = await ctx.db
          .query("comments")
          .withIndex("by_postId", (q) => q.eq("postId", p._id))
          .collect();
        return { ...p, commentCount: cs.length };
      }),
    );
  },
});

export const byId = query({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    userNaam: v.string(),
    userInitial: v.string(),
    kanaal: v.string(),
    titel: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("posts", {
      ...args,
      likes: [],
      createdAt: Date.now(),
    });
  },
});

export const toggleLike = mutation({
  args: { postId: v.id("posts"), userId: v.id("users") },
  handler: async (ctx, { postId, userId }) => {
    const post = await ctx.db.get(postId);
    if (!post) return;
    const likes = post.likes.includes(userId)
      ? post.likes.filter((id) => id !== userId)
      : [...post.likes, userId];
    await ctx.db.patch(postId, { likes });
  },
});
