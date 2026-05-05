import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  Ticket,
  QrCode,
  Zap,
  Crown,
} from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";
import heroGradient from "../assets/hero-gradient.mp4.asset.json";
import logo_primary from "../assets/nav-logo.png";

const AttendeeCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height;
    const ry = (x - 0.5) * 18; // rotateY
    const rx = -(y - 0.5) * 18; // rotateX
    setTilt({ rx, ry, mx: x * 100, my: y * 100 });
  };

  const reset = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  return (
    <div
      className="relative w-full max-w-[460px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Glow under card */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-primary blur-3xl transition-opacity duration-500 -z-10"
        style={{ opacity: hovered ? 0.55 : 0.25 }}
      />

      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={() => {
          // Tap-to-toggle for touch devices (no hover capability)
          if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
            setHovered((h) => !h);
            if (hovered) setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
          }
        }}
        className="relative glass-strong rounded-3xl p-10 md:p-12 overflow-hidden border-primary/30 cursor-pointer select-none min-h-[500px] flex flex-col justify-between"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovered ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
          transition: hovered
            ? "transform 0.1s ease-out"
            : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Cursor-following sheen */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, hsl(var(--primary) / 0.25), transparent 55%)`,
          }}
        />

        {/* Animated scanning line — visible on hover */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_hsl(var(--primary))] animate-scan-line" />
        </div>

        <div
          className="flex items-center justify-between mb-12"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center gap-2">
            <img
              src={logo_primary}
              alt="Future Forward Conference Logo"
              className="h-16 w-auto -my-4"
            />
          </div>
          <span
            className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-accent font-semibold px-2.5 py-1 rounded-full border transition-all duration-500 ${hovered
              ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow scale-105"
              : "text-primary border-primary/40 bg-primary/5"
              }`}
          >
            <Crown className="w-3 h-3" /> VIP
          </span>
        </div>

        <div style={{ transform: "translateZ(60px)" }} className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.25em] font-accent text-muted-foreground mb-1.5">
            Attendee
          </div>
          <h3 className="font-display font-bold text-3xl leading-tight">
            Mubeen M.
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Founder · Zoraivo.com
          </p>
        </div>

        {/* Meta grid */}
        <div
          className="grid grid-cols-2 gap-4 mb-12"
          style={{ transform: "translateZ(40px)" }}
        >
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-muted-foreground mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date
            </div>
            <div className="text-sm font-semibold">Aug 14, 2026</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-muted-foreground mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Venue
            </div>
            <div className="text-sm font-semibold">UMT Lahore</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-muted-foreground mb-1">
              Pass ID
            </div>
            <div className="text-sm font-semibold tabular-nums">FF-26-0142</div>
          </div>
        </div>

        {/* Footer / QR */}
        <div
          className="flex items-end justify-between"
          style={{ transform: "translateZ(50px)" }}
        >
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-muted-foreground mb-1">
              Status
            </div>
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all duration-500 ${hovered
                ? "border-primary/60 bg-primary/15 shadow-[0_0_18px_hsl(var(--primary)/0.45)]"
                : "border-primary/20 bg-primary/5"
                }`}
            >
              <span className="relative flex w-1.5 h-1.5">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${hovered ? "animate-ping" : ""
                    }`}
                />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-accent font-semibold text-primary tracking-wide">
                {hovered ? "Checked In" : "Confirmed"}
              </span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-lg bg-foreground/95 grid place-items-center">
            <QrCode className="w-12 h-12 text-background" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pb-0">
      {/* Looping gradient video background */}
      <div className="absolute inset-0 -z-10">
        <video
          src={heroGradient.url}
          autoPlay
          loop
          muted
          playsInline
          poster={heroBg}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="absolute inset-0 grid-bg opacity-25" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-[120px] animate-float" />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-secondary/20 blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: copy + CTAs */}
          <div className="text-center lg:text-left lg:pl-8 xl:pl-16">
            <div className="flex justify-center lg:justify-start mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[10px] md:text-xs font-display font-bold text-primary tracking-widest uppercase shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                <Sparkles className="w-3 h-3" /> Inaugural Edition 2026
              </span>
            </div>

            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8 animate-fade-in-up">
              <span className="block text-gradient">Future</span>
              <span className="block text-gradient-primary animate-gradient-shift bg-[length:200%_auto]">
                Forward
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl text-foreground mt-4 tracking-[0.1em] uppercase font-display font-light">
                Conference
              </span>
            </h1>

            <p
              className="max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              The first chapter. One day. Fifty speakers. The boldest minds in tech converge to architect what comes next at the inaugural Future Forward Conference.
            </p>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-muted-foreground mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                August 14, 2026
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                UMT, Lahore
              </span>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button asChild variant="hero" size="xl" className="active:scale-95">
                <Link to="/tickets">
                  Secure My Early Access <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="ghostGlass" size="xl">
                <a href="#agenda">Event's Agenda</a>
              </Button>
            </div>
          </div>

          {/* Right: interactive attendee card */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <AttendeeCard />
          </div>
        </div>
      </div>

      {/* Scroll indicator — only on tall viewports */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 text-muted-foreground pointer-events-none">
        <span className="text-xs tracking-[0.2em] font-accent uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
