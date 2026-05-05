import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Presentation, ArrowLeft, CheckCircle2, Briefcase, Mail, User, Link as LinkIcon, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ApplyToSpeak = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    jobTitle: "",
    companyName: "",
    linkedinUrl: "",
    talkTitle: "",
    talkDescription: "",
  });

  const submitApplication = useMutation(api.speaker_applications.submit);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full glass p-8 md:p-12 rounded-3xl text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Application Received!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for pitching your talk for Future Forward 2026. Our program committee will review your proposal and get back to you soon.
            </p>
            <Button asChild variant="hero" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <Link
            to="/#speakers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Speakers
          </Link>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <Presentation className="w-3.5 h-3.5" />
              Call for Speakers
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Apply to <span className="text-gradient-primary">Speak</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              We're looking for visionary builders, operators, and creators who are shipping the future. 
              Share your insights with 1000+ attendees in Lahore.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl border border-white/10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Jane Doe"
                    className="pl-10 glass-input focus:ring-primary/50"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium ml-1">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    className="pl-10 glass-input focus:ring-primary/50"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium ml-1">Job Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="jobTitle"
                    placeholder="CTO / Founder"
                    className="pl-10 glass-input focus:ring-primary/50"
                    required
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium ml-1">Company Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="companyName"
                    placeholder="Future Tech"
                    className="pl-10 glass-input focus:ring-primary/50"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="text-sm font-medium ml-1">LinkedIn Profile URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/janedoe"
                  className="pl-10 glass-input focus:ring-primary/50"
                  required
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talkTitle" className="text-sm font-medium ml-1">Proposed Talk Title</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="talkTitle"
                  placeholder="The Future of Agentic AI in 2026"
                  className="pl-10 glass-input focus:ring-primary/50"
                  required
                  value={formData.talkTitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talkDescription" className="text-sm font-medium ml-1">Brief Talk Description</Label>
              <Textarea
                id="talkDescription"
                placeholder="Tell us about your talk and why it's a fit for Future Forward..."
                className="glass-input min-h-[120px] focus:ring-primary/50 resize-none p-4"
                required
                value={formData.talkDescription}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-primary text-white font-bold text-base hover:shadow-glow transition-all duration-300 disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Proposal"
              )}
            </Button>
            
            <p className="text-[11px] text-center text-muted-foreground/60 px-4 leading-relaxed">
              By submitting this form, you agree to our Speaker Terms and Privacy Policy. 
              Our committee reviews proposals on a rolling basis.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Building2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>
);

export default ApplyToSpeak;
