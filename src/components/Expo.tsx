import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, GraduationCap, Cpu, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const exhibitors = [
  {
    icon: Rocket,
    label: "Startups & Founders",
    desc: "Early-stage ventures, disruptors, and the bold ideas behind them.",
    iconColor: "text-pink-400",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Cpu,
    label: "Tech & Platforms",
    desc: "Enterprise tools, SaaS products, and the infrastructure powering scale.",
    iconColor: "text-blue-400",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: GraduationCap,
    label: "Learning & Institutions",
    desc: "Universities, bootcamps, and skill platforms building future-ready talent.",
    iconColor: "text-emerald-400",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Globe2,
    label: "Impact & Development",
    desc: "CSR initiatives, NGOs, and organizations driving sustainable change.",
    iconColor: "text-purple-400",
    color: "from-purple-500 to-violet-500",
  },
];

const Expo = () => {
  return (
    <section id="expo" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(168,128,255,0.05),transparent_50%)]" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cta mb-4">Where Exposure Meets Action</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Opportunity <br />
              <span className="text-gradient-primary">Expo</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Step out of the audience and into the ecosystem. The Expo is a high-density collision space giving talent direct access to the startups, venture funds, and technology platforms actively shaping the future of work.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Whether you are hunting for your next co-founder, looking to hire elite engineering talent, or showcasing a breakthrough product—this is where deals are made.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="xl" className="group">
                <Link to="/exhibit">
                  Exhibit With Us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="ghostGlass" size="xl">
                <a href="#team">Contact the Team</a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Standalone Tiles */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {exhibitors.map((exhibitor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                className="glass rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-500 group relative overflow-hidden"
              >
                {/* Colorful Glow Background — same as AboutEvent */}
                <div className={`absolute -top-20 -right-20 w-44 h-44 bg-gradient-to-br ${exhibitor.color} rounded-full blur-[70px] opacity-15 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg relative z-10">
                  <exhibitor.icon className={`w-6 h-6 ${exhibitor.iconColor}`} />
                </div>
                <h4 className="font-display font-bold text-base mb-2 text-foreground relative z-10">
                  {exhibitor.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
                  {exhibitor.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Expo;
