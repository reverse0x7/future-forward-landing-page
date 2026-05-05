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
import { Users, ArrowLeft, CheckCircle2, Mail, User, Link as LinkIcon, Briefcase, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const JoinCoreTeam = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "General Volunteer" as "Logistics" | "Marketing" | "Developer/Tech" | "Design" | "General Volunteer",
    portfolioUrl: "",
    motivation: "",
  });

  const submitApplication = useMutation(api.core_team_applications.submitApplication);

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
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />

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
                  <Users className="w-3 h-3" />
                  Join the Mission
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                  Let's build <span className="text-gradient-primary">Together</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Future Forward is powered by a community of passionate individuals. Apply to join our core organizing team for 2026.
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
                    <Label htmlFor="email" className="text-sm font-medium ml-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium ml-1">Desired Role</Label>
                  <div className="relative group">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary z-20 transition-colors pointer-events-none" />
                    <Select 
                      value={formData.role} 
                      onValueChange={(val: any) => setFormData({ ...formData, role: val })}
                    >
                      <SelectTrigger className="pl-10 glass bg-white/[0.03] border-white/10 focus:ring-primary/50">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="glass-strong border-white/10">
                        <SelectItem value="Logistics">Logistics & Operations</SelectItem>
                        <SelectItem value="Marketing">Marketing & Social Media</SelectItem>
                        <SelectItem value="Developer/Tech">Developer / Tech Team</SelectItem>
                        <SelectItem value="Design">Visual & Experience Design</SelectItem>
                        <SelectItem value="General Volunteer">General Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-sm font-medium ml-1">Portfolio or LinkedIn URL</Label>
                  <div className="relative group">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="portfolio"
                      required
                      placeholder="https://linkedin.com/in/username"
                      className="pl-10 glass bg-white/[0.03] border-white/10 focus:border-primary/50 transition-all"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation" className="text-sm font-medium ml-1 flex items-center gap-1.5">
                    Why do you want to join the team?
                    <Heart className="w-3 h-3 text-primary" />
                  </Label>
                  <Textarea
                    id="motivation"
                    required
                    placeholder="Tell us about your passion for tech, your relevant experience, and what you hope to contribute to Future Forward 2026..."
                    className="glass bg-white/[0.03] border-white/10 focus:border-primary/50 min-h-[150px] resize-none"
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
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
                      Sending Application...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit My Application
                      <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </span>
                  )}
                </Button>
                
                <p className="text-[10px] text-center text-muted-foreground/60">
                  Applications are reviewed on a rolling basis. We value diversity, passion, and execution.
                </p>
              </form>
            </div>
          ) : (
            <div className="glass-strong rounded-3xl p-12 text-center space-y-6 border border-primary/20 animate-in zoom-in-95 duration-500 shadow-glow-sm">
              <div className="w-20 h-20 bg-primary/20 rounded-full grid place-items-center mx-auto mb-4 border border-primary/30">
                <CheckCircle2 className="w-10 h-10 text-primary animate-in zoom-in-50 duration-700 delay-200" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">You're on the list!</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Your application to join the Future Forward Core Team has been received. Our leads will review your profile and reach out if there's a match!
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

export default JoinCoreTeam;
