import { Link } from "react-router-dom";
import { ArrowLeft, Users, Linkedin, Twitter } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import s1 from "../assets/speaker-1.jpg";
import s2 from "../assets/speaker-2.jpg";
import s3 from "../assets/speaker-3.jpg";
import s4 from "../assets/speaker-4.jpg";
import s5 from "../assets/speaker-5.jpg";
import s6 from "../assets/speaker-6.jpg";

type Speaker = {
  img: string;
  name: string;
  title: string;
  topic: string;
  track: "Keynote" | "AI & Research" | "Engineering" | "Design & Product" | "Founders";
};

const speakers: Speaker[] = [
  // Keynote
  { img: s1, name: "Aisha Rehman", title: "CEO, Nexus AI", topic: "A New Computing Era", track: "Keynote" },
  { img: s2, name: "Bilal Khan", title: "Principal Researcher, OpenMind", topic: "What We Build Next", track: "Keynote" },

  // AI & Research
  { img: s4, name: "Daniel Park", title: "Founder, Quantum Labs", topic: "Post-Classical Compute", track: "AI & Research" },
  { img: s6, name: "Robert Hayes", title: "CTO, Helix Robotics", topic: "Embodied Intelligence", track: "AI & Research" },
  { img: s2, name: "Dr. Hana Yusuf", title: "Research Lead, DeepGrid", topic: "Frontier Model Evaluation", track: "AI & Research" },
  { img: s5, name: "Priya Anand", title: "ML Engineer, Anthropic", topic: "Aligning Agentic Systems", track: "AI & Research" },

  // Engineering
  { img: s3, name: "Sara Malik", title: "Staff Engineer, Vercel", topic: "The Composable Web", track: "Engineering" },
  { img: s1, name: "Lina Osei", title: "Distinguished Engineer, Stripe", topic: "Money at Internet Scale", track: "Engineering" },
  { img: s4, name: "Marcus Vega", title: "Principal, Cloudflare", topic: "Edge Runtimes in Production", track: "Engineering" },
  { img: s6, name: "Junaid Ali", title: "Staff SRE, GitHub", topic: "Reliability for AI Workloads", track: "Engineering" },

  // Design & Product
  { img: s5, name: "Maya Chen", title: "Head of Design, Linear", topic: "Designing for Velocity", track: "Design & Product" },
  { img: s3, name: "Noor Siddiqui", title: "Director of Product, Figma", topic: "Multiplayer by Default", track: "Design & Product" },
  { img: s1, name: "Eva Lindgren", title: "Design Partner, Raw Studio", topic: "Brand in the Age of AI", track: "Design & Product" },

  // Founders
  { img: s2, name: "Tariq Mahmood", title: "Co-founder, Helio", topic: "Building from Lahore, Selling to the World", track: "Founders" },
  { img: s4, name: "Sofia Romero", title: "Founder & CEO, Tidalwave", topic: "Capital, Constraints & Conviction", track: "Founders" },
  { img: s6, name: "Kenji Watanabe", title: "Founder, Orbit Bio", topic: "Deep Tech Go-to-Market", track: "Founders" },
];

const tracks: Speaker["track"][] = [
  "Keynote",
  "AI & Research",
  "Engineering",
  "Design & Product",
  "Founders",
];

const SpeakerCard = ({ sp }: { sp: Speaker }) => (
  <article className="group relative overflow-hidden rounded-2xl glass hover:shadow-elevate transition-all duration-500 hover:-translate-y-2">
    <div className="aspect-[4/5] overflow-hidden">
      <img
        src={sp.img}
        alt={sp.name}
        width={640}
        height={800}
        loading="lazy"
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
    </div>

    <div className="absolute bottom-0 inset-x-0 p-5">
      <div className="text-[10px] uppercase tracking-[0.2em] text-cta mb-2">
        {sp.topic}
      </div>
      <h3 className="font-display font-bold text-xl mb-1">{sp.name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{sp.title}</p>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href="#"
          aria-label="LinkedIn"
          className="w-8 h-8 rounded-full glass grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="w-8 h-8 rounded-full glass grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Twitter className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </article>
);

const SpeakersPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      <section className="pt-32 pb-4 relative">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] rounded-full bg-primary/15 blur-[140px] -z-10" />
        <div className="container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cta mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Full Lineup · {speakers.length} speakers
            </p>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] mb-5">
              Voices of <span className="text-gradient-primary">tomorrow</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Meet the operators, researchers and creators shaping the next decade of technology — grouped by track.
            </p>
          </div>
        </div>
      </section>

      {tracks.map((track) => {
        const list = speakers.filter((s) => s.track === track);
        if (list.length === 0) return null;
        return (
          <section key={track} className="py-12 md:py-16">
            <div className="container">
              <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cta mb-2">
                    Track
                  </p>
                  <h2 className="font-display font-bold text-3xl md:text-4xl">
                    {track}
                  </h2>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {list.length} {list.length === 1 ? "speaker" : "speakers"}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((sp, i) => (
                  <SpeakerCard key={`${sp.name}-${i}`} sp={sp} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <div className="pb-24" />

      <Footer />
    </div>
  );
};

export default SpeakersPage;
