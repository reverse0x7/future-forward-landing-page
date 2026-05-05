import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitApplication = mutation({
  args: {
    orgName: v.string(),
    contactName: v.string(),
    email: v.string(),
    website: v.string(),
    collaboration: v.string(),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("partner_applications", {
      ...args,
      status: "pending",
    });
    return applicationId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("partner_applications").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("partner_applications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
