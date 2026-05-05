import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Globe, ArrowLeft, CheckCircle2, Users, Mail, User, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ApplyPartner = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    contactName: "",
    email: "",
    website: "",
    collaboration: "",
  });

  const submitApplication = useMutation(api.partner_applications.submitApplication);

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
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2" />

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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
                  <Users className="w-3 h-3" />
                  Community Collaboration
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                  Grow with <span className="text-gradient-secondary">Future Forward</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Let's bridge the gap between communities and the future of tech. Apply to be an official community partner.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 md:p-10 border border-white/10 space-y-6 shadow-2xl">
                <div className="space-y-2">
                  <Label htmlFor="orgName" className="text-sm font-medium ml-1">Organization / Community Name</Label>
                  <div className="relative group">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                    <Input
                      id="orgName"
                      required
                      placeholder="e.g. Lahore Tech Community"
                      className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-secondary/50 transition-all"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-sm font-medium ml-1">Contact Person</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                      <Input
                        id="contactName"
                        required
                        placeholder="Your Name"
                        className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-secondary/50 transition-all"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium ml-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="hello@community.org"
                        className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-secondary/50 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium ml-1">Website or Social Link</Label>
                  <div className="relative group">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                    <Input
                      id="website"
                      required
                      placeholder="https://yourcommunity.com"
                      className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-secondary/50 transition-all"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collaboration" className="text-sm font-medium ml-1">How would you like to collaborate?</Label>
                  <Textarea
                    id="collaboration"
                    required
                    placeholder="Tell us about your community and your ideas for partnership (e.g., ticket giveaways, cross-promotion, community booth)..."
                    className="glass bg-white/[0.03] border-white/10 focus:border-secondary/50 min-h-[120px] resize-none"
                    value={formData.collaboration}
                    onChange={(e) => setFormData({ ...formData, collaboration: e.target.value })}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:shadow-glow-secondary transition-all duration-500 font-bold text-base group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Partner Application
                      <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </span>
                  )}
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground/60">
                  Join our ecosystem of partners helping shape the tech landscape in Pakistan.
                </p>
              </form>
            </div>
          ) : (
            <div className="glass-strong rounded-3xl p-12 text-center space-y-6 border border-secondary/20 animate-in zoom-in-95 duration-500 shadow-glow-sm-secondary">
              <div className="w-20 h-20 bg-secondary/20 rounded-full grid place-items-center mx-auto mb-4 border border-secondary/30">
                <CheckCircle2 className="w-10 h-10 text-secondary animate-in zoom-in-50 duration-700 delay-200" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Inquiry Sent!</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Thank you for reaching out. Our community team is excited to explore collaboration opportunities with your organization. We'll be in touch soon!
                </p>
              </div>
              <div className="pt-4">
                <Button asChild variant="outline" className="glass hover:bg-secondary/10 border-white/10">
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

export default ApplyPartner;
