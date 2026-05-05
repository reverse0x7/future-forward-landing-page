import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("sponsors").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    tier: v.union(v.literal("sponsor"), v.literal("partner")),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sponsors", args);
  },
});

export const remove = mutation({
  args: { id: v.id("sponsors") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
