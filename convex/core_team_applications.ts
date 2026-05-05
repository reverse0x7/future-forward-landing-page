import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitApplication = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("Logistics"),
      v.literal("Marketing"),
      v.literal("Developer/Tech"),
      v.literal("Design"),
      v.literal("General Volunteer")
    ),
    portfolioUrl: v.string(),
    motivation: v.string(),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("core_team_applications", {
      ...args,
      status: "pending",
    });
    return applicationId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("core_team_applications").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("core_team_applications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
