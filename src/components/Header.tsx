import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo_primary from "../assets/nav-logo.png";


const links = [
  { label: "Speakers", href: "/#speakers" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Expo", href: "/#expo" },
  { label: "Awards", href: "/#awards" },
];

const HEADER_OFFSET = 96;

const smoothScrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When arriving on home with a hash (e.g. from /tickets), smooth-scroll to it
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.slice(1);
      // Wait a tick for sections to render
      requestAnimationFrame(() => smoothScrollToId(id));
    }
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes("#")) return;
    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    if (location.pathname === targetPath) {
      e.preventDefault();
      smoothScrollToId(hash);
      // Update the URL hash without jumping
      window.history.replaceState(null, "", `#${hash}`);
    } else {
      e.preventDefault();
      navigate(`${targetPath}#${hash}`);
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container">
        <nav className={`glass-strong rounded-2xl px-5 py-3 flex items-center justify-between transition-all ${scrolled ? "shadow-card" : ""}`}>
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                // Clean up hash if present
                if (window.location.hash) {
                  window.history.replaceState(null, "", " ");
                }
              }
              setOpen(false);
            }}
          >
            <img 
              src={logo_primary} 
              alt="Future Forward Conference Logo" 
              className="h-16 md:h-20 w-auto -my-4 group-hover:scale-105 transition-transform" 
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-5 xl:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex active:scale-95 shadow-glow">
              <Link to="/tickets">Reserve Now</Link>
            </Button>
            <button
              className="md:hidden w-9 h-9 grid place-items-center rounded-lg glass"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 animate-slide-down">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="block py-2 text-muted-foreground hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Button asChild variant="hero" size="sm" className="w-full">
                  <Link to="/tickets" onClick={() => setOpen(false)}>Reserve Now</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
