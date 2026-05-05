import { Handshake, Music } from "lucide-react";
import { motion } from "framer-motion";

const Highlights = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">


      <div className="container max-w-5xl">
        {/* Section label */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cta">Also at Future Forward</p>
        </motion.div>

        <div className="space-y-20">

          {/* Networking Lounge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative group cursor-default"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
              {/* Large Icon */}
              <div className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-2">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-cyan-500/15 to-blue-500/5 border border-cyan-500/20 group-hover:border-cyan-400/40 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                  <Handshake className="w-11 h-11 md:w-13 md:h-13 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-[50px] opacity-10 group-hover:opacity-35 transition-opacity duration-500" />
                </div>
              </div>

              {/* Text */}
              <div className="text-center md:text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/80 font-semibold mb-3">Networking Lounge</p>
                <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
                  Founders
                  <span className="block text-foreground">Networking Lounge</span>
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                  A structured space for high-signal collisions — connect with founders, investors, mentors, and future collaborators in curated conversations that go beyond small talk.
                </p>
              </div>
            </div>

            {/* Decorative line */}
            <div className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-3/4 rounded-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
          </motion.div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-border" />
            <div className="w-2 h-2 rounded-full bg-primary/30" />
            <div className="w-16 h-px bg-border" />
          </div>

          {/* FF Unplugged */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative group cursor-default"
          >
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-14">
              {/* Large Icon */}
              <div className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-2">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-orange-500/15 to-red-500/5 border border-orange-500/20 group-hover:border-orange-400/40 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(251,146,60,0.15)]">
                  <Music className="w-11 h-11 md:w-13 md:h-13 text-orange-400 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-[50px] opacity-10 group-hover:opacity-35 transition-opacity duration-500" />
                </div>
              </div>

              {/* Text */}
              <div className="text-center md:text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-orange-400/80 font-semibold mb-3">Cultural Closing</p>
                <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
                  FF Unplugged
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl md:ml-auto">
                  A soulful and elevated closing segment that brings poetry, performance, and emotion into a day built around ideas, ambition, and connection.
                </p>
              </div>
            </div>

            {/* Decorative line */}
            <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 w-1 h-3/4 rounded-full bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Highlights;
