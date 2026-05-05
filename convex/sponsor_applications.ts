import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitApplication = mutation({
  args: {
    fullName: v.string(),
    workEmail: v.string(),
    companyName: v.string(),
    tier: v.union(
      v.literal("Title"),
      v.literal("Platinum"),
      v.literal("Gold"),
      v.literal("Silver")
    ),
    marketingGoals: v.string(),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("sponsor_applications", {
      ...args,
      status: "pending",
    });
    return applicationId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("sponsor_applications").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("sponsor_applications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
