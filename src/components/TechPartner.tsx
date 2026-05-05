import { Sparkles, ArrowUpRight } from "lucide-react";
import zoraivoLogo from "../assets/zoraivo-logo.png";

const TechPartner = () => {
  return (
    <section className="py-20 md:py-24 relative">
      <div className="container">
        <a
          href="https://zoraivo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="glass-strong bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/10 group-hover:border-primary/40 group-hover:shadow-glow transition-all duration-500">
            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-primary/20 blur-[100px] group-hover:bg-primary/40 transition-colors duration-700" />
            <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-secondary/20 blur-[100px] group-hover:bg-secondary/40 transition-colors duration-700" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-center gap-5 md:gap-6">
                <img
                  src={zoraivoLogo}
                  alt="Zoraivo logo"
                  width={96}
                  height={96}
                  loading="lazy"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl shrink-0 shadow-glow"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Exclusive Technology Partner
                  </p>
                  <h3 className="font-display font-black text-4xl md:text-5xl leading-none">
                    Zoraivo<span className="text-gradient-primary">.com</span>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-md">
                    Powering the infrastructure, tooling and live experiences behind Future Forward 2026.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-primary group-hover:text-primary-glow transition-colors shrink-0">
                Visit zoraivo.com
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default TechPartner;
