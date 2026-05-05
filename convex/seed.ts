import { mutation } from "./_generated/server";

const SPONSORS = [
  { name: "Google", icon: "google", tier: "sponsor" },
  { name: "Microsoft", icon: "microsoft", tier: "sponsor" },
  { name: "NVIDIA", icon: "nvidia", tier: "sponsor" },
  { name: "Meta", icon: "meta", tier: "sponsor" },
  { name: "OpenAI", icon: "openai", tier: "sponsor" },
  { name: "Stripe", icon: "stripe", tier: "sponsor" },
];

const PARTNERS = [
  { name: "GitHub", icon: "github", tier: "partner" },
  { name: "Vercel", icon: "vercel", tier: "partner" },
  { name: "Cloudflare", icon: "cloudflare", tier: "partner" },
  { name: "Figma", icon: "figma", tier: "partner" },
  { name: "Notion", icon: "notion", tier: "partner" },
  { name: "Discord", icon: "discord", tier: "partner" },
  { name: "Supabase", icon: "supabase", tier: "partner" },
  { name: "Linear", icon: "linear", tier: "partner" },
  { name: "Railway", icon: "railway", tier: "partner" },
];

const AGENDA = [
  {
    time: "08:00",
    duration: "60 min",
    title: "Doors Open · Registration & Coffee",
    tag: "Break",
    track: "General",
    description: "Pick up your pass, grab a coffee and meet fellow attendees before the day kicks off.",
  },
  {
    time: "09:00",
    duration: "45 min",
    title: "Opening Keynote: A New Computing Era",
    who: "Aisha Rehman",
    tag: "Keynote",
    track: "General",
    description: "A sweeping look at the forces reshaping software, hardware, and the people who build them.",
  },
  {
    time: "10:00",
    duration: "30 min",
    title: "The Composable Web in 2026",
    who: "Sara Malik",
    tag: "Talk",
    track: "Skills for Tomorrow",
    description: "How edge runtimes, RSC, and typed contracts are quietly rewriting how we ship product.",
  },
  {
    time: "10:30",
    duration: "90 min",
    title: "Building Agentic Systems at Scale",
    who: "Bilal Khan",
    tag: "Workshop",
    track: "AI & Autonomous Systems",
    description: "Hands-on workshop: design, evaluate and ship multi-step agents with real production guardrails.",
  },
  {
    time: "12:00",
    duration: "60 min",
    title: "Lunch & Networking",
    tag: "Break",
    track: "General",
    description: "Curated tables by topic — find your tribe over chef-prepared regional cuisine.",
  },
  {
    time: "13:00",
    duration: "45 min",
    title: "Designing for Velocity",
    who: "Maya Chen",
    tag: "Talk",
    track: "Women Building the Future",
    description: "What teams shipping the fastest products in the world get right about design systems.",
  },
  {
    time: "14:00",
    duration: "45 min",
    title: "Embodied Intelligence: Robots Among Us",
    who: "Robert Hayes",
    tag: "Talk",
    track: "AI & Autonomous Systems",
    description: "Field reports from deploying autonomous machines in messy, human environments.",
  },
  {
    time: "15:00",
    duration: "45 min",
    title: "Health & Bio-Innovation: The Next Frontier",
    who: "Daniel Park",
    tag: "Talk",
    track: "Health & Bio-Innovation",
    description: "How computational biology and AI are accelerating drug discovery and personalized medicine.",
  },
  {
    time: "16:00",
    duration: "30 min",
    title: "Coffee & Demos",
    tag: "Break",
    track: "General",
    description: "Sponsor showcase, hands-on demos and the unofficial best espresso in Lahore.",
  },
  {
    time: "16:30",
    duration: "60 min",
    title: "Founder Fireside: From Lahore to Global",
    who: "Daniel Park",
    tag: "Panel",
    track: "Venture & Digital Business",
    description: "Three founders on building venture-scale companies from emerging tech ecosystems.",
  },
  {
    time: "17:30",
    duration: "30 min",
    title: "Closing: What We Build Next",
    who: "Bilal Khan",
    tag: "Keynote",
    track: "Climate Tech & SDGs",
    description: "A short, sharp send-off focused on leveraging tech for sustainable climate solutions.",
  },
  {
    time: "19:00",
    duration: "until late",
    title: "After-Party · Rooftop",
    tag: "Social",
    track: "General",
    description: "Music, conversation and skyline views. Open to all pass holders.",
  },
];

const SPEAKERS = [
  { 
    name: "Aisha Rehman", 
    title: "CEO, Nexus AI", 
    topic: "Generative Systems",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  { 
    name: "Bilal Khan", 
    title: "Principal Researcher, OpenMind", 
    topic: "Edge Intelligence",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  { 
    name: "Sara Malik", 
    title: "Staff Engineer, Vercel", 
    topic: "The Composable Web",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
];

const TEAM = [
  {
    name: "Abdullah Sikandar",
    role: "Event Director",
    bio: "Architecting the experience end-to-end.",
    isApply: false,
    tags: [
      { label: "Visionary", icon: "Lightbulb", color: "amber" },
      { label: "Design Nerd", icon: "PenTool", color: "fuchsia" },
      { label: "Coffee Addict", icon: "Coffee", color: "orange" }
    ],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "abdullah@futureforward.io"
  },
  {
    name: "Abbas Khan",
    role: "Head of Operations",
    bio: "Making sure every second runs on time.",
    isApply: false,
    tags: [
      { label: "Logistics", icon: "Truck", color: "emerald" },
      { label: "Chess Player", icon: "Brain", color: "blue" },
      { label: "Problem Solver", icon: "Zap", color: "indigo" }
    ],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "abbas@futureforward.io"
  },
  {
    name: "Open Position",
    role: "Join the Core Team",
    bio: "Passionate about building the future? We are looking for operators and creators.",
    isApply: true,
    tags: []
  }
];

export const seedSponsors = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing to avoid duplicates
    const existingSponsors = await ctx.db.query("sponsors").collect();
    for (const s of existingSponsors) {
      await ctx.db.delete(s._id);
    }

    const existingAgenda = await ctx.db.query("agenda").collect();
    for (const a of existingAgenda) {
      await ctx.db.delete(a._id);
    }

    const existingSpeakers = await ctx.db.query("speakers").collect();
    for (const s of existingSpeakers) {
      await ctx.db.delete(s._id);
    }

    const existingTeam = await ctx.db.query("team").collect();
    for (const t of existingTeam) {
      await ctx.db.delete(t._id);
    }

    // Insert sponsors
    for (const s of SPONSORS) {
      await ctx.db.insert("sponsors", {
        name: s.name,
        icon: s.icon,
        tier: s.tier as "sponsor" | "partner",
      });
    }

    // Insert partners
    for (const p of PARTNERS) {
      await ctx.db.insert("sponsors", {
        name: p.name,
        icon: p.icon,
        tier: p.tier as "sponsor" | "partner",
      });
    }

    // Insert agenda
    for (const a of AGENDA) {
      await ctx.db.insert("agenda", {
        time: a.time,
        duration: a.duration,
        title: a.title,
        who: a.who,
        tag: a.tag as any,
        track: a.track as any,
        description: a.description,
      });
    }

    // Insert speakers
    for (const s of SPEAKERS) {
      await ctx.db.insert("speakers", {
        name: s.name,
        title: s.title,
        topic: s.topic,
        img: s.img,
        linkedin: s.linkedin,
        twitter: s.twitter,
      });
    }

    // Insert team
    for (const t of TEAM) {
      await ctx.db.insert("team", {
        name: t.name,
        role: t.role,
        bio: t.bio,
        isApply: t.isApply,
        tags: t.tags as any,
        linkedin: t.linkedin,
        twitter: t.twitter,
        email: t.email,
      });
    }
    
    return "Seeding complete!";
  },
});
