import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Rocket, ArrowLeft, CheckCircle2, Building2, Mail, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ApplyToExhibit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    category: "",
    showcasePlan: "",
  });

  const submitApplication = useMutation(api.exhibitor_applications.submitApplication);

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
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full -translate-x-1/2" />

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
                  <Rocket className="w-3 h-3" />
                  Exhibitor Opportunity
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                  Showcase your <span className="text-gradient-primary">Innovation</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Join the Expo at Future Forward 2026. Secure a dedicated space to demonstrate your products to 1000+ elite attendees.
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
                    <Label htmlFor="email" className="text-sm font-medium ml-1">Work Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium ml-1">Company / Startup Name</Label>
                  <div className="relative group">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="companyName"
                      required
                      placeholder="NextGen Tech"
                      className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium ml-1">Product / Service Category</Label>
                  <div className="relative group">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="category"
                      required
                      placeholder="e.g. AI/ML, SaaS, Fintech, Hardware..."
                      className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="showcase" className="text-sm font-medium ml-1">Describe what you plan to showcase</Label>
                  <Textarea
                    id="showcase"
                    required
                    placeholder="Tell us about your product demo, hardware prototype, or the core experience you want to provide at your booth..."
                    className="glass bg-white/[0.03] border-white/10 focus:border-primary/50 min-h-[120px] resize-none"
                    value={formData.showcasePlan}
                    onChange={(e) => setFormData({ ...formData, showcasePlan: e.target.value })}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-glow transition-all duration-500 font-bold text-base group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Apply for Booth Space
                      <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  )}
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground/60">
                  Limited booth spaces available. Selection is based on innovation and ecosystem fit.
                </p>
              </form>
            </div>
          ) : (
            <div className="glass-strong rounded-3xl p-12 text-center space-y-6 border border-primary/20 animate-in zoom-in-95 duration-500 shadow-glow-sm">
              <div className="w-20 h-20 bg-primary/20 rounded-full grid place-items-center mx-auto mb-4 border border-primary/30">
                <CheckCircle2 className="w-10 h-10 text-primary animate-in zoom-in-50 duration-700 delay-200" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Expo Application Received!</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  We've received your inquiry. Our Expo team will review your product category and showcase plan. Expect an update within 3-5 business days.
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

export default ApplyToExhibit;
