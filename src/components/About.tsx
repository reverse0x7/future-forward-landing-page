import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const stats = [
  { value: 50, suffix: "+", label: "World-class Speakers" },
  { value: 1000, suffix: "+", label: "Tech Attendees" },
  { value: 25, suffix: "+", label: "Hands-on Experiences" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(value * eased));
            if (p < 1) requestAnimationFrame(tick);
            else setN(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gradient-primary tabular-nums leading-none">
      {n}
      {suffix}
    </div>
  );
};

const About = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cta mb-4">Why Attend</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
              The frontier <span className="text-gradient-primary">won't wait.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Future Forward is a massive, city-wide convergence hosted right in the heart of a vibrant university campus. It's where students, founders, and industry leaders from across Lahore meet the technologies defining the next decade.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No fluff. No filler. Just the people, the products, and the ideas building the future — transforming the campus into an innovation hub for one incredible day.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Learn from sharp voices shaping the future of work and innovation.",
                "Explore ideas, opportunities, partners, and campus-wide recognition.",
                "Engage with AI, startups, health, sustainability, and future skills in one space.",
                "Meet founders, experts, and peers through a structured networking experience."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-5 max-w-md mx-auto lg:max-w-none w-full">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-6 sm:p-7 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
              >
                <Counter value={s.value} suffix={s.suffix} />
                <div className="mt-3 text-sm text-muted-foreground leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
