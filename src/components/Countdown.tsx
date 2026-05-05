import { useEffect, useState } from "react";

// Target: August 14, 2026 09:00 PKT (UTC+5)
const TARGET = new Date("2026-08-14T09:00:00+05:00").getTime();

const calc = () => {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Unit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="glass rounded-2xl px-4 py-3 md:px-6 md:py-4 min-w-[72px] md:min-w-[100px] text-center">
      <div className="font-display font-bold text-3xl md:text-5xl tabular-nums text-gradient-primary">
        {String(value).padStart(2, "0")}
      </div>
    </div>
    <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </div>
  </div>
);

const Countdown = () => {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
      <div className="container">
        <div className="flex flex-col items-center text-center gap-8 md:gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cta mb-3">
              Event Begins In
            </p>
            <h3 className="font-display text-2xl md:text-4xl font-semibold">
              The countdown to the future
            </h3>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Unit value={t.days} label="Days" />
            <span className="text-2xl md:text-3xl text-primary/40 font-light">:</span>
            <Unit value={t.hours} label="Hours" />
            <span className="text-2xl md:text-3xl text-primary/40 font-light">:</span>
            <Unit value={t.minutes} label="Minutes" />
            <span className="text-2xl md:text-3xl text-primary/40 font-light">:</span>
            <Unit value={t.seconds} label="Seconds" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
