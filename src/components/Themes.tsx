import { Brain, Rocket, Globe2, HeartPulse, UserCircle2, Sparkles } from "lucide-react";

const themes = [
  {
    icon: Brain,
    title: "AI & Autonomous Systems",
    desc: "Exploring the frontiers of machine intelligence, automation, and the systems running tomorrow.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Rocket,
    title: "Venture & Digital Business",
    desc: "From zero to one. Strategies, funding, and the digital economy for the next generation of startups.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Globe2,
    title: "Climate Tech & SDGs",
    desc: "Building sustainable solutions and addressing the planet's most critical climate challenges.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: HeartPulse,
    title: "Health & Bio-Innovation",
    desc: "The intersection of technology, psychology, and pharmacy transforming human well-being.",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: UserCircle2,
    title: "Women Building the Future",
    desc: "Highlighting the female visionaries, engineers, and founders shaping the modern tech landscape.",
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    icon: Sparkles,
    title: "Skills for Tomorrow",
    desc: "Upskilling for the post-AI workplace. What to learn when machines can code and create.",
    color: "from-yellow-400 to-orange-500"
  }
];

const Themes = () => {
  return (
    <section id="themes" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-cta mb-4">Conference Tracks</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight">
            Featured <span className="text-gradient-primary">Themes</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-6">
            Future Forward is structured around six core pillars representing the most critical areas of innovation, research, and opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {themes.map((theme, i) => (
            <div 
              key={i}
              className="glass rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Colorful Glow Background */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${theme.color} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg relative z-10`}>
                <theme.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="font-display font-bold text-xl mb-3 text-foreground relative z-10">
                {theme.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-sm relative z-10">
                {theme.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Themes;
