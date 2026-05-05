import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("agenda").order("asc").collect();
  },
});

export const create = mutation({
  args: {
    time: v.string(),
    duration: v.string(),
    title: v.string(),
    who: v.optional(v.string()),
    img: v.optional(v.string()),
    tag: v.union(
      v.literal("Keynote"),
      v.literal("Talk"),
      v.literal("Workshop"),
      v.literal("Panel"),
      v.literal("Break"),
      v.literal("Social")
    ),
    track: v.union(
      v.literal("AI & Autonomous Systems"),
      v.literal("Venture & Digital Business"),
      v.literal("Climate Tech & SDGs"),
      v.literal("Health & Bio-Innovation"),
      v.literal("Women Building the Future"),
      v.literal("Skills for Tomorrow"),
      v.literal("General")
    ),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("agenda", args);
  },
});

export const remove = mutation({
  args: { id: v.id("agenda") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
