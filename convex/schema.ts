import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    cnic: v.optional(v.string()),
    company: v.optional(v.string()),
    tier: v.union(v.literal("standard"), v.literal("vip")),
    quantity: v.number(),
    totalPrice: v.number(),
    isPaid: v.optional(v.boolean()),
    isArchived: v.optional(v.boolean()),
    paymentProof: v.optional(v.id("_storage")),
  }),
  sponsors: defineTable({
    name: v.string(),
    icon: v.string(),
    tier: v.union(v.literal("sponsor"), v.literal("partner")),
    url: v.optional(v.string()),
  }),
  agenda: defineTable({
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
  }),
  speakers: defineTable({
    name: v.string(),
    title: v.string(),
    topic: v.string(),
    img: v.string(),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
  }),
  team: defineTable({
    name: v.string(),
    role: v.string(),
    bio: v.string(),
    img: v.optional(v.string()),
    isApply: v.boolean(),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    email: v.optional(v.string()),
    tags: v.optional(
      v.array(
        v.object({
          label: v.string(),
          icon: v.string(),
          color: v.string(),
        })
      )
    ),
  }),
  sponsor_applications: defineTable({
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
    status: v.string(), // "pending", "reviewed", etc.
  }),
  partner_applications: defineTable({
    orgName: v.string(),
    contactName: v.string(),
    email: v.string(),
    website: v.string(),
    collaboration: v.string(),
    status: v.string(),
  }),
  exhibitor_applications: defineTable({
    fullName: v.string(),
    email: v.string(),
    companyName: v.string(),
    category: v.string(),
    showcasePlan: v.string(),
    status: v.string(),
  }),
  core_team_applications: defineTable({
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
    status: v.string(),
  }),
  speaker_applications: defineTable({
    fullName: v.string(),
    email: v.string(),
    jobTitle: v.string(),
    companyName: v.string(),
    linkedinUrl: v.string(),
    talkTitle: v.string(),
    talkDescription: v.string(),
    status: v.string(),
  }),
  newsletter: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
});
