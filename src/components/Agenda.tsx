import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Rocket, Globe2, HeartPulse, UserCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Sessions are now fetched from Convex

// Themes removed and moved to Agenda Page

const Agenda = () => {
  const sessions = useQuery(api.agenda.list) ?? [];

  return (
    <section id="agenda" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] font-accent text-primary mb-4">The Schedule</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            A day built for <span className="text-gradient-primary">what's next</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">August 14, 2026 · UMT, Lahore</p>
        </div>

        <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden">
          {/* Blurred list container */}
          <div className="blur-md select-none pointer-events-none opacity-40 py-8 px-2">
            <div className="space-y-3">
              {sessions.slice(0, 5).map((s, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-5 flex items-center gap-5"
                >
                  <div className="font-display font-bold text-lg md:text-xl text-primary tabular-nums w-16 shrink-0">
                    {s.time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-primary mb-1">{s.tag}</div>
                    <h4 className="font-display font-semibold text-base md:text-lg truncate">
                      {s.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="backdrop-blur-xl bg-background/30 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/10 w-full mx-4 shadow-2xl text-center">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/20 blur-[80px] animate-float" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-secondary/20 blur-[80px] animate-float" style={{ animationDelay: "2s" }} />

              <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">
                Schedule <span className="text-white">announced soon</span>
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                We are fine-tuning the timings to ensure a seamless experience. The full agenda will be revealed shortly.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="ghostGlass" size="lg" className="rounded-full group">
                  <Link to="/agenda">
                    Explore Tracks <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
