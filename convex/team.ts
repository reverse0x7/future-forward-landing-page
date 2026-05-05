import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("team").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    bio: v.string(),
    img: v.optional(v.string()),
    isApply: v.boolean(),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("team", args);
  },
});

export const remove = mutation({
  args: { id: v.id("team") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
