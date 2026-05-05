import Header from "../components/Header";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import AboutEvent from "../components/AboutEvent";
import Speakers from "../components/Speakers";
import Agenda from "../components/Agenda";
import Expo from "../components/Expo";
import Awards from "../components/Awards";
import Sponsors from "../components/Sponsors";
import Team from "../components/Team";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Countdown />
        <AboutEvent />
        <Speakers />
        <Sponsors />
        <Agenda />
        <Expo />
        <Awards />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

