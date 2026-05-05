import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitApplication = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    companyName: v.string(),
    category: v.string(),
    showcasePlan: v.string(),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("exhibitor_applications", {
      ...args,
      status: "pending",
    });
    return applicationId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("exhibitor_applications").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("exhibitor_applications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
