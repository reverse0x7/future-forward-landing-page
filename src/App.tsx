import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Tickets from "./pages/Tickets";
import SpeakersPage from "./pages/Speakers";
import AgendaPage from "./pages/Agenda";
import ApplyToSponsor from "./pages/ApplyToSponsor";
import ApplyPartner from "./pages/ApplyPartner";
import ApplyToExhibit from "./pages/ApplyToExhibit";
import JoinCoreTeam from "./pages/JoinCoreTeam";
import ApplyToSpeak from "./pages/ApplyToSpeak";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/tickets" element={<PageTransition><Tickets /></PageTransition>} />
        <Route path="/checkout/:id" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/speakers" element={<PageTransition><SpeakersPage /></PageTransition>} />
        <Route path="/agenda" element={<PageTransition><AgendaPage /></PageTransition>} />
        <Route path="/apply-to-sponsor" element={<PageTransition><ApplyToSponsor /></PageTransition>} />
        <Route path="/community-partner" element={<PageTransition><ApplyPartner /></PageTransition>} />
        <Route path="/exhibit" element={<PageTransition><ApplyToExhibit /></PageTransition>} />
        <Route path="/join-core-team" element={<PageTransition><JoinCoreTeam /></PageTransition>} />
        <Route path="/apply-to-speak" element={<PageTransition><ApplyToSpeak /></PageTransition>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
