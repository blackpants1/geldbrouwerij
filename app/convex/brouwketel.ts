import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db
      .query("brouwketelRecords")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    userId: v.optional(v.id("users")),
    email: v.string(),
    naam: v.optional(v.string()),
    score: v.number(),
    kleur: v.union(
      v.literal("rood"),
      v.literal("amber"),
      v.literal("groen"),
    ),
    assen: v.object({
      spaarquote: v.number(),
      vasteLastenRatio: v.number(),
      bufferMaanden: v.number(),
      schuldenRatio: v.number(),
      automatisering: v.number(),
    }),
    input: v.any(),
    acties: v.array(v.string()),
    projectie30: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("brouwketelRecords", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const attachToUser = mutation({
  args: { email: v.string(), userId: v.id("users") },
  handler: async (ctx, { email, userId }) => {
    const orphans = await ctx.db
      .query("brouwketelRecords")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect();
    for (const r of orphans) {
      if (!r.userId) await ctx.db.patch(r._id, { userId });
    }
  },
});
