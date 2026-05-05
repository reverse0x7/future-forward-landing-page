import { Trophy, Star, Zap, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const awards = [
  {
    icon: Trophy,
    title: "Best Society of the Year",
    desc: "The flagship honor — awarded to the campus society with the strongest all-round performance, reach, and legacy.",
    iconColor: "text-yellow-400",
    color: "from-yellow-400 to-amber-500",
  },
  {
    icon: Star,
    title: "Most Innovative Society",
    desc: "Recognizing the team that pushed creative boundaries and introduced truly original programming.",
    iconColor: "text-blue-400",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Zap,
    title: "Best Event Execution",
    desc: "For flawless delivery — logistics, production, and attendee experience executed at the highest level.",
    iconColor: "text-orange-400",
    color: "from-orange-400 to-rose-500",
  },
  {
    icon: Users,
    title: "Highest Student Engagement",
    desc: "Celebrating the society that activated the most participation, community, and campus-wide energy.",
    iconColor: "text-emerald-400",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Heart,
    title: "Social Impact Recognition",
    desc: "Honoring purpose-driven work that created tangible social good beyond the campus walls.",
    iconColor: "text-pink-400",
    color: "from-pink-500 to-fuchsia-500",
  },
];

const AwardCard = ({ award, index }: { award: typeof awards[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
    className="glass rounded-2xl p-7 hover:shadow-2xl transition-shadow duration-500 group relative overflow-hidden"
  >
    {/* Colorful Glow Background */}
    <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${award.color} rounded-full blur-[70px] opacity-15 group-hover:opacity-40 transition-opacity duration-500`} />

    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg relative z-10">
      <award.icon className={`w-6 h-6 ${award.iconColor}`} />
    </div>
    <h3 className="font-display font-bold text-lg mb-2 text-foreground relative z-10">
      {award.title}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
      {award.desc}
    </p>
  </motion.div>
);

const Awards = () => {
  return (
    <section id="awards" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[350px] rounded-full bg-cta/5 blur-[120px] -z-10" />

      <div className="container">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cta mb-4">Recognition & Excellence</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Society <span className="text-gradient-primary">Honors</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A curated recognition segment celebrating innovation, impact, student leadership, and the societies building the strongest campus cultures.
          </p>
        </motion.div>

        {/* Top row: 3 awards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto mb-5">
          {awards.slice(0, 3).map((award, i) => (
            <AwardCard key={i} award={award} index={i} />
          ))}
        </div>

        {/* Bottom row: 2 awards, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {awards.slice(3).map((award, i) => (
            <AwardCard key={i + 3} award={award} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
