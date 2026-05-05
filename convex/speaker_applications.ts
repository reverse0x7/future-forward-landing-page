import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submit = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    jobTitle: v.string(),
    companyName: v.string(),
    linkedinUrl: v.string(),
    talkTitle: v.string(),
    talkDescription: v.string(),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("speaker_applications", {
      ...args,
      status: "pending",
    });
    return applicationId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("speaker_applications").collect();
  },
});

export const remove = mutation({
  args: { id: v.id("speaker_applications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
