import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Minus, Plus, Ticket, Crown, Zap, Tag, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

type TierId = "standard" | "vip";

type Tier = {
  id: TierId;
  name: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  icon: typeof Zap;
  tagline: string;
  perks: string[];
};

// Early-bird is a discount on the Standard pass, not a separate tier.
const EARLY_BIRD_DEADLINE = "June 30, 2026";

const tiers: Tier[] = [
  {
    id: "standard",
    name: "Standard Pass",
    price: 800,
    originalPrice: 1200,
    tag: "Early Bird · Save 400 PKR",
    icon: Zap,
    tagline: "Everything you need for a full day of Future Forward.",
    perks: [
      "Full single-day access",
      "All keynotes & talks",
      "Welcome kit & swag",
      "Coffee & lunch included",
      "Session recordings",
    ],
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: 2000,
    icon: Crown,
    tagline: "The premium experience — closer to the stage and the people.",
    perks: [
      "Everything in Standard",
      "Front-row reserved seating",
      "Speaker meet & greet",
      "Private founder dinner",
      "Backstage access",
      "Exclusive afterparty",
    ],
  },
];

// Valid coupon codes — add more as needed
const COUPONS: Record<string, { label: string; type: "percent" | "flat"; value: number }> = {
  FUTURE20: { label: "FUTURE20", type: "percent", value: 20 },
  EARLYBIRD: { label: "EARLYBIRD", type: "flat", value: 200 },
  WELCOME10: { label: "WELCOME10", type: "percent", value: 10 },
};

const Tickets = () => {
  const [selected, setSelected] = useState<TierId | null>(null);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", cnic: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  
  const createRegistration = useMutation(api.registrations.createRegistration);
  const detailsRef = useRef<HTMLDivElement>(null);

  const tier = tiers.find((t) => t.id === selected) ?? null;
  const subtotal = tier ? tier.price * qty : 0;

  // Calculate discount
  const couponData = appliedCoupon ? COUPONS[appliedCoupon] : null;
  const discount = couponData
    ? couponData.type === "percent"
      ? Math.round(subtotal * (couponData.value / 100))
      : Math.min(couponData.value, subtotal)
    : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
      toast.success(`Coupon "${code}" applied!`);
    } else {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const handleSelect = (id: TierId) => {
    setSelected(id);
    // Defer to allow the details section to mount/expand before scrolling
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tier) {
      toast.error("Please select a ticket first.");
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please complete attendee details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const id = await createRegistration({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        cnic: form.cnic.trim() || undefined,
        company: form.company.trim() || undefined,
        tier: tier.id,
        quantity: qty,
        totalPrice: total,
      });

      // Navigate to checkout with the registration ID
      navigate(`/checkout/${id}`);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Page hero */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] rounded-full bg-primary/15 blur-[140px] -z-10" />
        <div className="container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
              <Ticket className="w-4 h-4" /> Tickets
            </p>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] mb-5">
              Secure your <span className="text-gradient-primary">seat</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Two passes. One unforgettable day. Early-bird pricing on the Standard
              pass ends {EARLY_BIRD_DEADLINE}.
            </p>
          </div>
        </div>
      </section>

      {/* Tier selection */}
      <section className="pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tiers.map((t) => {
              const Icon = t.icon;
              const active = selected === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  aria-pressed={active}
                  className={`relative text-left glass-strong rounded-3xl p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 ${
                    active
                      ? "border-primary/70 shadow-glow ring-1 ring-primary/40"
                      : t.tag
                        ? "border-primary/20 shadow-[0_0_20px_rgba(123,63,228,0.15)] hover:border-primary/40"
                        : "hover:border-primary/30"
                  }`}
                >
                  {t.tag && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full font-semibold shadow-glow">
                      {t.tag}
                    </span>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl grid place-items-center transition-colors ${
                        active
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-muted text-primary"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {active && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-2xl mb-1">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{t.tagline}</p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display font-black text-4xl text-gradient-primary">
                      Rs. {t.price}
                    </span>
                    {t.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        Rs. {t.originalPrice}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">/ pass</span>
                  </div>

                  <ul className="space-y-2.5">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/85">{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-7 text-center text-sm font-semibold py-2.5 rounded-xl transition-all ${
                      active
                        ? "bg-gradient-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {active ? "Selected — continue below" : "Choose this pass"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Attendee details + summary */}
      <section ref={detailsRef} className="pb-24 md:pb-32 scroll-mt-24">
        <div className="container">
          <div
            className={`max-w-4xl mx-auto transition-all duration-500 ${
              tier ? "opacity-100" : "opacity-40 pointer-events-none select-none"
            }`}
          >
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                Step 2
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl">
                {tier ? `Your ${tier.name}` : "Select a pass to continue"}
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid lg:grid-cols-[1fr_360px] gap-6"
            >
              {/* Attendee form */}
              <div className="glass-strong rounded-2xl p-6 md:p-8">
                <h3 className="font-display font-bold text-xl mb-1">
                  Attendee details
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll email your tickets and event updates here.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="name"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Full name
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ada Lovelace"
                      className="mt-2 glass border-white/20 focus-visible:ring-primary"
                      maxLength={100}
                      required
                      disabled={!tier}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ada@future.io"
                      className="mt-2 glass border-white/20 focus-visible:ring-primary"
                      maxLength={255}
                      required
                      disabled={!tier}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="company"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Company <span className="opacity-50">(optional)</span>
                    </Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Nexus AI"
                      className="mt-2 glass border-white/20 focus-visible:ring-primary"
                      maxLength={100}
                      disabled={!tier}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="03XX XXXXXXX"
                      className="mt-2 glass border-white/20 focus-visible:ring-primary"
                      maxLength={15}
                      required
                      disabled={!tier}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="cnic"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      CNIC number
                    </Label>
                    <Input
                      id="cnic"
                      value={form.cnic}
                      onChange={(e) =>
                        setForm({ ...form, cnic: e.target.value })
                      }
                      placeholder="XXXXX-XXXXXXX-X"
                      className="mt-2 glass border-white/20 focus-visible:ring-primary"
                      maxLength={15}
                      required
                      disabled={!tier}
                    />
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <aside className="glass-strong rounded-2xl p-6 md:p-7 self-start">
                <h3 className="font-display font-bold text-lg mb-5">
                  Order summary
                </h3>

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-1">
                      Pass
                    </div>
                    <div className="font-display font-semibold">
                      {tier?.name ?? "—"}
                    </div>
                  </div>
                  <div className="font-display font-bold text-lg text-gradient-primary tabular-nums">
                    Rs. {tier?.price ?? 0}
                  </div>
                </div>

                <div className="flex items-center justify-between glass rounded-xl p-2.5 mb-5">
                  <span className="text-sm text-muted-foreground pl-2">
                    Quantity
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-8 h-8 rounded-lg grid place-items-center hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-40"
                      aria-label="Decrease"
                      disabled={!tier}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold tabular-nums">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(Math.min(10, qty + 1))}
                      className="w-8 h-8 rounded-lg grid place-items-center hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-40"
                      aria-label="Increase"
                      disabled={!tier}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm pb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="tabular-nums">Rs. {subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3 h-3" />
                        {couponData?.label}
                      </span>
                      <span className="tabular-nums">−Rs. {discount}</span>
                    </div>
                  )}
                </div>

                {/* Coupon code */}
                <div className="py-4 border-b border-white/10">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between glass rounded-xl px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">{appliedCoupon}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="w-6 h-6 rounded-md grid place-items-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Remove coupon"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <Input
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase());
                            setCouponError("");
                          }}
                          placeholder="Coupon code"
                          className="flex-1 glass border-white/20 focus-visible:ring-primary text-sm h-9"
                          disabled={!tier}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={!tier || !couponCode.trim()}
                          className="px-4 h-9 rounded-lg text-sm font-medium bg-white/5 border border-white/15 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all disabled:opacity-30 disabled:pointer-events-none"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-400 mt-1.5 pl-1">{couponError}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-4 mb-5">
                  <span className="text-sm uppercase tracking-wider text-muted-foreground">
                    Total
                  </span>
                  <span className="font-display font-black text-2xl text-gradient-primary tabular-nums">
                    Rs. {total}
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full active:scale-[0.98]"
                  disabled={!tier || isSubmitting}
                >
                  {isSubmitting 
                    ? "Processing..." 
                    : tier 
                      ? `Reserve · Rs. ${total}` 
                      : "Select a pass"
                  }
                </Button>

                <p className="text-[11px] text-muted-foreground text-center mt-3">
                  Secure checkout. Refundable up to 7 days before the event.
                </p>
              </aside>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
