import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const subscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { success: true, message: "Already subscribed!" };
    }

    await ctx.db.insert("newsletter", {
      email: args.email,
    });

    return { success: true, message: "Subscribed successfully!" };
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("newsletter").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("newsletter") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
