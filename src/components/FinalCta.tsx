import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCta = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-primary opacity-20 blur-[140px]" />
      </div>

      <div className="container">
        <div className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border-primary/20">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative">
            <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.95] mb-6">
              Ready to <span className="text-gradient-primary">shape</span><br />the future?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Limited Early-Bird passes remain. Lock yours in before they're gone.
            </p>
            <Button asChild variant="hero" size="xl" className="active:scale-95">
              <Link to="/tickets">
                Purchase Tickets <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
