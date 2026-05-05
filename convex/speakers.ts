import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("speakers").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    topic: v.string(),
    img: v.string(),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("speakers", args);
  },
});

export const remove = mutation({
  args: { id: v.id("speakers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
