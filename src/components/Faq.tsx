import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Who is the Future Forward Conference built for?",
    answer: "Future Forward is designed for ambitious students, early-stage founders, tech professionals, investors, and educators. Whether you are looking to launch a startup, secure a role in tech, or simply expand your network, this event is your gateway to the ecosystem."
  },
  {
    question: "Are all academic departments welcome?",
    answer: "Absolutely. Innovation happens at the intersection of disciplines. While the focus leans towards tech and entrepreneurship, students from all backgrounds — engineering, arts, business, and sciences — are strongly encouraged to participate and bring their unique perspectives."
  },
  {
    question: "Is official certification provided for attendees?",
    answer: "Yes, all registered attendees who participate in the full-day conference will receive a verified digital certificate of participation to acknowledge their engagement and commitment to professional growth."
  },
  {
    question: "How can my company or brand exhibit at the Expo?",
    answer: "Brands, startups, and institutions can secure an expo booth by navigating to the Expo section and clicking 'Exhibit With Us'. Fill out the partnership form, and our team will reach out with layout options and availability."
  },
  {
    question: "What is the process for submitting a society for the Honors segment?",
    answer: "University societies can be nominated through our official registration portal. An independent jury will review the submissions based on event execution, student engagement, and overall campus impact over the past academic year."
  }
];

const FaqItem = ({ faq, isOpen, toggleOpen }: { faq: typeof faqs[0], isOpen: boolean, toggleOpen: () => void }) => {
  return (
    <motion.div
      className={`glass rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-primary/30 bg-white/10' : 'hover:border-white/15 hover:bg-white-[0.03]'}`}
      initial={false}
    >
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
      >
        <span className={`font-display font-semibold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-foreground' : 'text-foreground/80'}`}>
          {faq.question}
        </span>
        <div className={`ml-6 shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-muted-foreground'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 text-muted-foreground leading-relaxed">
              {faq.answer}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(168,128,255,0.03),transparent_70%)]" />

      <div className="container max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cta mb-4">Got Questions?</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggleOpen={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
