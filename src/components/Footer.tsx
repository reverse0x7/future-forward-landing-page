import { Facebook, Instagram, Linkedin, Mail, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo_primary from "../assets/nav-logo.png";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const subscribe = useMutation(api.newsletter.subscribe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      console.log("Subscribing email:", email);
      const result = await subscribe({ email });
      console.log("Subscription result:", result);
      
      if (result && result.message) {
        toast({
          title: "Newsletter",
          description: result.message,
        });
      } else {
        throw new Error("Invalid response from server");
      }
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative pt-20 pb-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container">
        <div className="grid md:grid-cols-5 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo_primary}
                alt="Future Forward Conference Logo"
                className="h-16 w-auto -my-4 -ml-2 origin-left"
              />
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Get the latest speaker reveals, agenda drops and ticket releases delivered to your inbox.
            </p>
            <form className="flex gap-2 max-w-sm" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="you@future.io"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass bg-primary/5 border-primary/30 focus-visible:ring-primary placeholder:text-muted-foreground/70"
              />
              <Button
                variant="hero"
                size="icon"
                type="submit"
                aria-label="Subscribe"
                disabled={isSubmitting}
                className="shadow-none hover:shadow-none hover:scale-100 flex-shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-3 md:contents gap-y-10">
            <div>
              <h4 className="font-display font-semibold text-[10px] md:text-sm mb-4 uppercase tracking-wider">Event</h4>
              <ul className="space-y-2 text-[10px] md:text-sm text-muted-foreground">
                <li><a href="#speakers" className="hover:text-primary transition-colors">Speakers</a></li>
                <li><a href="#agenda" className="hover:text-primary transition-colors">Agenda</a></li>
                <li><a href="#sponsors" className="hover:text-primary transition-colors">Sponsors</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Venue</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-[10px] md:text-sm mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-[10px] md:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Code of Conduct</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Media Inquiries</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-[10px] md:text-sm mb-4 uppercase tracking-wider">Contact Us</h4>
              <ul className="space-y-3 text-[10px] md:text-sm text-muted-foreground">
                <li><a href="tel:+923001234567" className="hover:text-primary transition-colors block truncate">+92 300 1234567</a></li>
                <li><a href="mailto:hello@futureforward.io" className="hover:text-primary transition-colors block truncate">hello@futureforward.io</a></li>
                <li className="pt-2">
                  <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                    {[
                      { Icon: Instagram, label: "Instagram", href: "#" },
                      { Icon: Linkedin, label: "LinkedIn", href: "#" },
                      { Icon: Facebook, label: "Facebook", href: "#" },
                    ].map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="w-8 h-8 md:w-10 md:h-10 grid place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all hover:-translate-y-0.5"
                        aria-label={label}
                      >
                        <Icon className="w-3 h-3 md:w-4 md:h-4" />
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 pt-8 gap-6 md:gap-8 border-t border-white/5">
          <div className="space-y-2">
            <p className="text-[10px] md:text-base text-foreground/90 font-semibold tracking-tight text-left">
              Website by{" "}
              <a
                href="https://zoraivo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-all duration-300"
              >
                Zoraivo.com
              </a>
            </p>
            <p className="text-[9px] md:text-xs text-muted-foreground/40 max-w-sm leading-relaxed text-left">
              Powering the infrastructure, tooling and live experiences behind Future Forward 2026.
            </p>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <p className="text-[9px] md:text-xs text-muted-foreground/50 text-right leading-tight">
              Brought to you by <span className="text-muted-foreground/80 font-medium">BeelanoCo · Event Management Company</span>
            </p>
            <p className="text-[8px] md:text-[11px] text-muted-foreground/40 text-right tracking-widest uppercase">
              © 2026 FUTURE FORWARD.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
