import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { ArrowLeft, Upload, CheckCircle2, QrCode, Building2, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const registrationId = id as Id<"registrations">;
  
  const registration = useQuery(api.registrations.get, { id: registrationId });
  const generateUploadUrl = useMutation(api.registrations.generateUploadUrl);
  const submitPaymentProof = useMutation(api.registrations.submitPaymentProof);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      // 1. Get upload URL from Convex
      const postUrl = await generateUploadUrl();
      
      // 2. Upload file to URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      const { storageId } = await result.json();
      
      // 3. Save storageId to registration
      await submitPaymentProof({ id: registrationId, storageId });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (registration === undefined) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (registration === null) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Registration not found</h1>
        <Link to="/"><Button>Back to home</Button></Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[400px] rounded-full bg-primary/20 blur-[140px] -z-10" />
        
        <div className="glass-strong rounded-3xl p-10 md:p-14 text-center max-w-lg mx-4 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-4">Verification Pending</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Your registration details have been received and your order is awaiting manual payment verification. Once our team successfully verifies the payment, your ticket(s) will be sent to your provided email address within 30 to 60 minutes.
          </p>
          <Button asChild size="xl" variant="hero" className="w-full">
            <Link to="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] rounded-full bg-primary/15 blur-[140px] -z-10" />
        
        <div className="container max-w-4xl">
          <Link
            to="/tickets"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to tickets
          </Link>

          <div className="mb-10 text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl mb-4">
              Complete your <span className="text-gradient-primary">Payment</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              You're almost there! Please transfer Rs. {registration.totalPrice} to secure your {registration.tier} pass.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Info */}
            <div className="space-y-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8">
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                  <Building2 className="text-primary w-5 h-5" /> Bank Transfer
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Bank Name</div>
                    <div className="font-semibold text-lg">Meezan Bank</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Account Title</div>
                    <div className="font-semibold text-lg">Future Forward Events</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Account Number</div>
                    <div className="font-mono font-semibold text-xl tracking-wider text-primary">0214 0105 1234 5678</div>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-8">
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                  <QrCode className="text-primary w-5 h-5" /> Raast / EasyPaisa / JazzCash
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Account Title</div>
                    <div className="font-semibold text-lg">Future Forward</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Mobile Number (Raast/EasyPaisa)</div>
                    <div className="font-mono font-semibold text-xl tracking-wider text-primary">0300 1234567</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center">
                    <div className="w-40 h-40 bg-white rounded-xl p-2 flex items-center justify-center relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=03001234567')] bg-center bg-no-repeat bg-cover opacity-90 transition-transform group-hover:scale-105" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Proof */}
            <div className="space-y-6">
              <div className="glass-strong rounded-2xl p-6 md:p-8 sticky top-24">
                <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
                  <Upload className="text-primary w-5 h-5" /> Upload Payment Proof
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Please attach a screenshot of your successful transaction.
                </p>

                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-6 ${
                    selectedFile ? 'border-primary bg-primary/5' : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,.pdf" 
                    onChange={handleFileChange}
                  />
                  
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <p className="font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <Button variant="link" className="mt-2 text-primary" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                        Change file
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/5 text-muted-foreground rounded-full flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="font-medium text-foreground mb-1">Click to browse</p>
                      <p className="text-xs text-muted-foreground">Supports JPG, PNG, PDF</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 mb-6">
                  <span className="text-sm uppercase tracking-wider text-muted-foreground">
                    Amount to pay
                  </span>
                  <span className="font-display font-bold text-2xl text-gradient-primary tabular-nums">
                    Rs. {registration.totalPrice}
                  </span>
                </div>

                <Button 
                  className="w-full" 
                  size="xl" 
                  variant="hero"
                  disabled={!selectedFile || isUploading}
                  onClick={handleUpload}
                >
                  {isUploading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Payment Proof"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
