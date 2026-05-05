import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRegistration = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    cnic: v.optional(v.string()),
    company: v.optional(v.string()),
    tier: v.union(v.literal("standard"), v.literal("vip")),
    quantity: v.number(),
    totalPrice: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("registrations", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      cnic: args.cnic,
      company: args.company,
      tier: args.tier,
      quantity: args.quantity,
      totalPrice: args.totalPrice,
      isPaid: false,
    });
    return id;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("registrations").collect();
  },
});

export const get = query({
  args: { id: v.id("registrations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const submitPaymentProof = mutation({
  args: { id: v.id("registrations"), storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { paymentProof: args.storageId });
  },
});

export const remove = mutation({
  args: { id: v.id("registrations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updatePaidStatus = mutation({
  args: { 
    id: v.id("registrations"),
    isPaid: v.boolean()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isPaid: args.isPaid });
  },
});

export const bulkUpdatePaidStatus = mutation({
  args: { 
    ids: v.array(v.id("registrations")),
    isPaid: v.boolean()
  },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.patch(id, { isPaid: args.isPaid });
    }
  },
});

export const bulkRemove = mutation({
  args: { ids: v.array(v.id("registrations")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});

export const updateArchivedStatus = mutation({
  args: { 
    id: v.id("registrations"),
    isArchived: v.boolean()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isArchived: args.isArchived });
  },
});

export const bulkUpdateArchivedStatus = mutation({
  args: { 
    ids: v.array(v.id("registrations")),
    isArchived: v.boolean()
  },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.patch(id, { isArchived: args.isArchived });
    }
  },
});
