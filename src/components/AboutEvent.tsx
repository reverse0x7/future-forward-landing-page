import { Mic2, MessageSquare, Briefcase, Trophy, Coffee, Zap, Check } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Mic2,
    title: "Visionary Keynotes",
    desc: "Unfiltered perspectives from industry leaders shaping the next decade of technology.",
    color: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-400"
  },
  {
    icon: MessageSquare,
    title: "Interactive Panels",
    desc: "Deep-dive conversations unpacking the reality of tomorrow's technological landscape.",
    color: "from-pink-500 to-rose-500",
    iconColor: "text-pink-400"
  },
  {
    icon: Briefcase,
    title: "Opportunity Expo",
    desc: "Direct access to top companies, elite startups, and exclusive career accelerators.",
    color: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-400"
  },
  {
    icon: Trophy,
    title: "Society Honors",
    desc: "Recognizing the changemakers, researchers, and breakthrough talent of the year.",
    color: "from-primary to-secondary",
    iconColor: "text-primary"
  },
  {
    icon: Coffee,
    title: "Networking Lounge",
    desc: "High-signal collisions with founders, engineers, and your future co-founders.",
    color: "from-purple-500 to-fuchsia-500",
    iconColor: "text-purple-400"
  },
  {
    icon: Zap,
    title: "FF Unplugged",
    desc: "An exclusive, high-energy after-hours experience to celebrate and wrap up the day.",
    color: "from-red-500 to-orange-500",
    iconColor: "text-red-400"
  }
];

const pointers = [
  "Learn from sharp voices shaping the future of work and innovation.",
  "Explore ideas, opportunities, partners, and campus-wide recognition.",
  "Engage with AI, startups, health, sustainability, and future skills in one space.",
  "Meet founders, experts, and peers through a structured networking experience."
];

const AboutEvent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="about-event" className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(168,128,255,0.05),transparent_70%)]" />
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-accent text-primary mb-4">About the Event</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight mb-6">
            A future-facing experience, <br className="hidden md:block" />
            <span className="text-gradient-primary">not a routine seminar</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Future Forward Conference brings together students, founders, professionals, researchers, and changemakers for a complete one-day platform built around relevance, momentum, and meaningful opportunity.
          </p>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto mb-12 text-left">
            {pointers.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-muted-foreground/90 leading-relaxed group">
                <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Background Static Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-white/5 -translate-x-1/2 rounded-full" />
          
          {/* Animated Glowing Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-secondary via-primary to-primary -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(168,128,255,0.5)] origin-top z-0"
            style={{ scaleY }}
          />

          <div className="space-y-4 md:-space-y-6 relative z-10">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex flex-col md:flex-row items-center justify-between group md:even:flex-row-reverse"
              >
                
                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-5/12" />

                {/* Timeline Dot Position Container */}
                <div className="absolute left-8 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "backOut" }}
                    className="w-full h-full rounded-full bg-background border-4 border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all duration-500 shadow-xl shadow-black/50"
                  >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${feature.color} group-hover:scale-150 transition-transform duration-500 shadow-glow`} />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-5/12 pl-24 md:pl-0">
                  <div className={`glass rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 relative overflow-hidden md:text-left ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    
                    {/* Colorful Glow Background */}
                    <div className={`absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br ${feature.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                    
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    
                    <h3 className="font-display font-bold text-2xl mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {feature.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEvent;
