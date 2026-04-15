import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    naam: v.string(),
    bio: v.optional(v.string()),
    avatarInitial: v.string(),
    subscriptionStatus: v.optional(
      v.union(
        v.literal("trial"),
        v.literal("active"),
        v.literal("canceled"),
        v.literal("none"),
      ),
    ),
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  brouwketelRecords: defineTable({
    userId: v.optional(v.id("users")),
    email: v.string(),
    naam: v.optional(v.string()),
    score: v.number(),
    kleur: v.union(v.literal("rood"), v.literal("amber"), v.literal("groen")),
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
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  posts: defineTable({
    userId: v.id("users"),
    userNaam: v.string(),
    userInitial: v.string(),
    kanaal: v.string(),
    titel: v.string(),
    body: v.string(),
    likes: v.array(v.id("users")),
    createdAt: v.number(),
  })
    .index("by_kanaal", ["kanaal"])
    .index("by_userId", ["userId"]),

  comments: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
    userNaam: v.string(),
    userInitial: v.string(),
    body: v.string(),
    createdAt: v.number(),
  }).index("by_postId", ["postId"]),

  cursusProgress: defineTable({
    userId: v.id("users"),
    moduleId: v.string(),
    completedAt: v.number(),
  }).index("by_userId", ["userId"]),
});
