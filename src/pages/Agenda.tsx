import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Brain, Rocket, Globe2, HeartPulse, UserCircle2, Sparkles } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Images will be handled dynamically or fall back to imports
import s1 from "../assets/speaker-1.jpg";
import s2 from "../assets/speaker-2.jpg";
import s3 from "../assets/speaker-3.jpg";
import s4 from "../assets/speaker-4.jpg";
import s5 from "../assets/speaker-5.jpg";
import s6 from "../assets/speaker-6.jpg";

type Session = {
  time: string;
  duration: string;
  title: string;
  who?: string;
  img?: string;
  tag: "Keynote" | "Talk" | "Workshop" | "Panel" | "Break" | "Social";
  track: "AI & Autonomous Systems" | "Venture & Digital Business" | "Climate Tech & SDGs" | "Health & Bio-Innovation" | "Women Building the Future" | "Skills for Tomorrow" | "General";
  description: string;
};

const themes = [
  { icon: Brain, title: "AI & Autonomous Systems", color: "text-blue-400", border: "border-blue-400/20" },
  { icon: Rocket, title: "Venture & Digital Business", color: "text-indigo-400", border: "border-indigo-400/20" },
  { icon: Globe2, title: "Climate Tech & SDGs", color: "text-emerald-400", border: "border-emerald-400/20" },
  { icon: HeartPulse, title: "Health & Bio-Innovation", color: "text-rose-400", border: "border-rose-400/20" },
  { icon: UserCircle2, title: "Women Building the Future", color: "text-pink-400", border: "border-pink-400/20" },
  { icon: Sparkles, title: "Skills for Tomorrow", color: "text-violet-400", border: "border-violet-400/20" }
];

// Schedule is now fetched from Convex

const tagStyles: Record<Session["tag"], string> = {
  Keynote: "bg-gradient-primary text-primary-foreground border-transparent",
  Talk: "border-primary/40 bg-primary/10 text-primary",
  Workshop: "border-secondary/40 bg-secondary/10 text-secondary",
  Panel: "border-primary/40 bg-primary/10 text-primary",
  Break: "border-border bg-muted/40 text-muted-foreground",
  Social: "border-secondary/40 bg-secondary/10 text-secondary",
};

const AgendaPage = () => {
  const schedule = useQuery(api.agenda.list) ?? [];
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Page hero */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] rounded-full bg-secondary/15 blur-[140px] -z-10" />
        <div className="container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="max-w-3xl">
            {/* <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Full Schedule
            </p> */}
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] mb-5">
              A day built for <span className="text-gradient-primary">what's next</span>
            </h1>
            {/* <p className="text-muted-foreground text-lg mb-6">
              Twelve sessions across four spaces — keynotes, workshops, panels, and the after-hours moments in between.
            </p> */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                August 14, 2026
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                UMT, Lahore
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      <section className="pb-16 relative">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {themes.map((theme, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3.5 group opacity-0 animate-fade-in cursor-default"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}
                >
                  <div className={`w-10 h-10 rounded-2xl border ${theme.border} bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <theme.icon className={`w-5 h-5 ${theme.color}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] group-hover:text-foreground transition-colors">
                      {theme.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Full schedule - Hidden for now, tracks only */}
      {/* 
      <section className="pb-24 md:pb-32 relative">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-6 md:pl-10">
              <div
                aria-hidden
                className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
              />

              <ul className="space-y-4">
                {schedule.map((s, i) => (
                  <li
                    key={`${s.time}-${i}`}
                    className="relative opacity-0 animate-fade-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span
                      aria-hidden
                      className="absolute -left-[18px] md:-left-[26px] top-6 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-glow"
                    />

                    <article className="glass-strong rounded-2xl p-5 md:p-6 hover:border-primary/40 transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                        <div className="md:w-28 shrink-0">
                          <div className="font-display font-black text-2xl md:text-3xl text-gradient-primary tabular-nums leading-none">
                            {s.time}
                          </div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1.5">
                            {s.duration}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full border ${tagStyles[s.tag]}`}
                            >
                              {s.tag}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                              {s.track}
                            </span>
                          </div>

                          <h3 className="font-display font-bold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                            {s.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 max-w-prose">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      */}

      <Footer />
    </div>
  );
};

export default AgendaPage;
