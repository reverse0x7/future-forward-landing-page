import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Gem, ArrowLeft, CheckCircle2, Building2, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ApplyToSponsor = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    tier: "Gold" as "Title" | "Platinum" | "Gold" | "Silver",
    marketingGoals: "",
  });

  const submitApplication = useMutation(api.sponsor_applications.submitApplication);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitApplication(formData);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container max-w-2xl relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {!isSuccess ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                  <Gem className="w-3 h-3" />
                  Partnership Opportunity
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                  Power the <span className="text-gradient-primary">Future</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Join us as a sponsor for Future Forward 2026 and connect with 1000+ visionaries.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 md:p-10 border border-white/10 space-y-6 shadow-2xl">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium ml-1">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="fullName"
                        required
                        placeholder="John Doe"
                        className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workEmail" className="text-sm font-medium ml-1">Work Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="workEmail"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium ml-1">Company Name</Label>
                  <div className="relative group">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="companyName"
                      required
                      placeholder="Tech Solutions Inc."
                      className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tier" className="text-sm font-medium ml-1">Desired Sponsorship Tier</Label>
                  <Select 
                    value={formData.tier} 
                    onValueChange={(val: any) => setFormData({ ...formData, tier: val })}
                  >
                    <SelectTrigger className="glass bg-white/[0.03] border-white/10 focus:ring-primary/50">
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent className="glass-strong border-white/10">
                      <SelectItem value="Title">Title Sponsor (Exclusive)</SelectItem>
                      <SelectItem value="Platinum">Platinum Partner</SelectItem>
                      <SelectItem value="Gold">Gold Partner</SelectItem>
                      <SelectItem value="Silver">Silver Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals" className="text-sm font-medium ml-1">Primary Marketing Goals</Label>
                  <Textarea
                    id="goals"
                    required
                    placeholder="Tell us what you'd like to achieve (e.g., brand awareness, lead generation, talent acquisition)..."
                    className="glass bg-white/[0.03] border-white/10 focus:border-primary/50 min-h-[120px] resize-none"
                    value={formData.marketingGoals}
                    onChange={(e) => setFormData({ ...formData, marketingGoals: e.target.value })}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-500 font-bold text-base group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Sponsorship Inquiry
                      <Gem className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </span>
                  )}
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground/60">
                  By submitting this form, you agree to our team contacting you regarding partnership opportunities.
                </p>
              </form>
            </div>
          ) : (
            <div className="glass-strong rounded-3xl p-12 text-center space-y-6 border border-primary/20 animate-in zoom-in-95 duration-500 shadow-glow-sm">
              <div className="w-20 h-20 bg-primary/20 rounded-full grid place-items-center mx-auto mb-4 border border-primary/30">
                <CheckCircle2 className="w-10 h-10 text-primary animate-in zoom-in-50 duration-700 delay-200" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Application Received!</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Thank you for your interest in Future Forward 2026. Our partnership team will review your application and get back to you within 48 hours.
                </p>
              </div>
              <div className="pt-4">
                <Button asChild variant="outline" className="glass hover:bg-primary/10 border-white/10">
                  <Link to="/">Return to Landing Page</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplyToSponsor;
