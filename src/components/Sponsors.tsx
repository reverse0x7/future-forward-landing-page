import { Sparkles, ArrowUpRight, Gem, Globe } from "lucide-react";
import { useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import zoraivoLogo from "../assets/zoraivo-logo.png";

// No longer using hardcoded arrays

const LogoCard = ({ name, icon, tier }: { name: string; icon: string; tier: "sponsor" | "partner" }) => (
  <div
    className={`shrink-0 flex flex-col items-center justify-center gap-3 rounded-2xl glass ${
      tier === "sponsor" ? "h-32 md:h-36 w-48 md:w-56" : "h-24 md:h-28 w-40 md:w-48"
    }`}
  >
    <img
      src={`https://cdn.simpleicons.org/${icon}/white`}
      alt={`${name} logo`}
      className={tier === "sponsor" ? "w-10 h-10 md:w-12 md:h-12" : "w-7 h-7 md:w-9 md:h-9"}
      loading="lazy"
    />
    <span
      className={`font-display font-bold tracking-[0.15em] text-muted-foreground/70 ${
        tier === "sponsor" ? "text-sm md:text-base" : "text-xs md:text-sm"
      }`}
    >
      {name}
    </span>
  </div>
);

const LogoMarquee = ({
  items,
  tier,
  reverse = false,
  duration = 40,
}: {
  items: { name: string; icon: string }[];
  tier: "sponsor" | "partner";
  reverse?: boolean;
  duration?: number;
}) => {
  const gap = tier === "sponsor" ? "gap-6" : "gap-4";
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex ${gap} w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <LogoCard key={`${item.name}-${i}`} {...item} tier={tier} />
        ))}
      </div>
    </div>
  );
};

const Sponsors = () => {
  const sponsorsData = useQuery(api.sponsors.list);
  
  // Filter into categories
  const sponsorLogos = sponsorsData?.filter(s => s.tier === "sponsor") ?? [];
  const partnerLogos = sponsorsData?.filter(s => s.tier === "partner") ?? [];

  return (
    <section id="sponsors" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] font-accent text-cta mb-4">Backed By</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl">
            Partners in <span className="text-gradient-primary">progress</span>
          </h2>
        </div>

        {/* Blurred sponsor slots — not yet confirmed */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Blurred content behind */}
          <div className="blur-[3px] select-none pointer-events-none opacity-70 py-6">
            <div className="mb-14">
              <p className="flex items-center justify-center gap-2 text-center text-xs uppercase tracking-[0.3em] font-accent text-secondary mb-8">
                <Gem className="w-3.5 h-3.5" />
                Sponsors
              </p>
              <LogoMarquee items={sponsorLogos} tier="sponsor" duration={45} />
            </div>

            <div className="mb-6">
              <p className="flex items-center justify-center gap-2 text-center text-xs uppercase tracking-[0.3em] font-accent text-muted-foreground mb-8">
                <Globe className="w-3.5 h-3.5" />
                Ecosystem Partners
              </p>
              <LogoMarquee items={partnerLogos} tier="partner" reverse duration={35} />
            </div>
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="backdrop-blur-md bg-white/[0.04] rounded-3xl p-8 md:p-10 relative overflow-hidden border border-white/10 max-w-2xl w-full mx-4">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-secondary/15 blur-3xl" />

              <div className="relative text-center">
                <h3 className="font-display font-bold text-xl md:text-2xl mb-2">
                  Sponsor slots are <span className="text-cta">open</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  Get your brand in front of 1000+ founders, engineers and visionaries.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/apply-to-sponsor"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Gem className="w-4 h-4" />
                    Apply for Sponsorship
                  </Link>
                  <Link
                    to="/community-partner"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/20 text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Globe className="w-4 h-4" />
                    Become a Partner
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive Technology Partner — integrated into sponsors */}
        <div>
          <p className="text-center text-xs uppercase tracking-[0.3em] font-accent text-secondary mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Exclusive Technology Partner
          </p>
          <a
            href="https://zoraivo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block max-w-3xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden hover:-translate-y-1 transition-all duration-500">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-secondary/10 blur-3xl" />

              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <img
                    src={zoraivoLogo}
                    alt="Zoraivo logo"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl leading-none">
                      Zoraivo<span className="text-gradient-primary">.com</span>
                    </h3>
                    <p className="mt-1.5 text-xs md:text-sm text-muted-foreground max-w-sm">
                      Powering the infrastructure, tooling and live experiences behind Future Forward 2026.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-primary group-hover:text-primary-glow transition-colors shrink-0">
                  Visit zoraivo.com
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
