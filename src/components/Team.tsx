import { Linkedin, Twitter, Mail, User, Plus, Lightbulb, PenTool, Coffee, Truck, Brain, Zap } from "lucide-react";
import { useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";

const iconMap: Record<string, any> = {
  Lightbulb, PenTool, Coffee, Truck, Brain, Zap, Plus, User, Mail, Linkedin, Twitter
};

const colorMap: Record<string, { text: string; bg: string }> = {
  amber: { text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  fuchsia: { text: "text-fuchsia-400", bg: "bg-fuchsia-500/10 border-fuchsia-500/20" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  indigo: { text: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  red: { text: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

// Team data is now fetched from Convex

const Team = () => {
  const team = useQuery(api.team.list) ?? [];
  return (
    <section id="team" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-cta mb-4">The Crew</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            Meet the <span className="text-gradient-primary">organizers</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
            A small team of operators, designers and engineers obsessed with building the conference we always wanted to attend.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((m, i) => (
            m.isApply ? (
              <article
                key="apply"
                className="group glass border-dashed border-white/20 rounded-2xl p-5 hover:shadow-elevate hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in flex flex-col"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="relative mb-5 rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-white/5 to-transparent flex flex-col items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary/50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500">
                    <Plus className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-foreground/40 group-hover:text-primary/80 transition-colors">Apply to join</span>
                </div>
                
                <div className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-1.5">
                  {m.role}
                </div>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {m.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{m.bio}</p>
                
                <Link 
                  to="/join-core-team" 
                  className="mt-auto w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-center text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent group-hover:shadow-glow group-hover:scale-[1.02]"
                >
                  Submit Application
                </Link>
              </article>
            ) : (
              <article
                key={m.name}
                className="group glass rounded-2xl p-5 hover:shadow-elevate hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in flex flex-col h-full"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="relative mb-5 rounded-xl overflow-hidden aspect-square shrink-0">
                  {m.img ? (
                    <img
                      src={m.img}
                      alt={m.name}
                      width={640}
                      height={800}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center border border-white/5">
                      <User className="w-16 h-16 text-white/10" strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full glass-strong grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {m.twitter && (
                      <a href={m.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-full glass-strong grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {m.email && (
                      <a href={`mailto:${m.email}`} aria-label="Email" className="w-8 h-8 rounded-full glass-strong grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-1.5">
                  {m.role}
                </div>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {m.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{m.bio}</p>
                
                {m.tags && m.tags.length > 0 && (
                  <div className="mt-auto pt-5 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {m.tags.map((tag: any, idx: number) => {
                        const Icon = iconMap[tag.icon] || User;
                        const colors = colorMap[tag.color] || colorMap.blue;
                        return (
                          <span key={idx} className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1.5 rounded-lg border transition-all duration-300 ${colors.bg} ${colors.text} hover:brightness-125 hover:-translate-y-0.5 shadow-sm`}>
                            <Icon className="w-3 h-3" />
                            {tag.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
