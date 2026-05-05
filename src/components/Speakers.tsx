import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter, Presentation, Stars } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Speakers are now fetched from Convex

const Speakers = () => {
  const speakers = useQuery(api.speakers.list) ?? [];
  return (
    <section id="speakers" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-accent text-primary mb-4">The Lineup</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
              Voices of <span className="text-gradient-primary">tomorrow</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Hear from the operators and creators shipping the technologies the rest of the world will use in five years.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden">
          <div className="blur-md select-none pointer-events-none opacity-40 pb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((sp, i) => (
                <article
                  key={sp.name}
                  className="group relative overflow-hidden rounded-2xl glass animate-card-loop"
                  style={{ animationDelay: `${i * 3}s` }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={sp.img}
                      alt={sp.name}
                      width={640}
                      height={800}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale animate-img-loop"
                      style={{ animationDelay: `${i * 3}s` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-primary mb-2">
                      {sp.topic}
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1">{sp.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{sp.title}</p>
                    <div className="flex items-center gap-2">
                      {sp.linkedin && (
                        <a href={sp.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full glass grid place-items-center hover:bg-primary/20 transition-colors">
                          <Linkedin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                        </a>
                      )}
                      {sp.twitter && (
                        <a href={sp.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full glass grid place-items-center hover:bg-primary/20 transition-colors">
                          <Twitter className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="backdrop-blur-xl bg-background/30 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/10 max-w-3xl w-full mx-4 shadow-2xl">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/20 blur-[80px] animate-float" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-secondary/20 blur-[80px] animate-float" style={{ animationDelay: "2s" }} />

              <div className="relative text-center">
                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">
                  The lineup is <span className="text-white">almost locked</span>
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                  We are finalizing the voices that will define the next decade of tech. A few exclusive slots remain for visionary builders and operators. Pitch us your boldest ideas.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/apply-to-speak"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_30px_hsl(var(--primary)/0.25)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
                  >
                    <Presentation className="w-4 h-4" />
                    Apply to Speak
                  </Link>
                  <a
                    href="#agenda"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full glass border border-white/20 text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Stars className="w-4 h-4" />
                    Featured Tracks
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
