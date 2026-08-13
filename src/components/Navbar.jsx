import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
const links = [
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-deep-forest/95 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Brand */}
 <a href="/" className="flex items-center gap-3">
  <div className="flex h-11 w-11 items-center justify-center">
    <img
      src={logo}
      alt="Selvaggio Safaris"
      className="h-full w-full object-contain"
    />
  </div>

  <div>
    <p className="font-serif text-xl tracking-[0.18em] text-white">
      SELVAGGIO
    </p>

    <p className="mt-1 text-[9px] tracking-[0.45em] text-gold">
      SAFARIS
    </p>
  </div>
</a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-white/80 transition duration-300 hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#book"
            className="border border-gold px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-gold hover:text-deep-forest"
          >
            Book Your Safari
          </a>
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-2xl text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10 bg-deep-forest/98 px-6 py-7 backdrop-blur-xl">
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-white transition hover:text-gold"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="w-fit bg-gold px-6 py-3 text-sm font-semibold text-deep-forest"
            >
              Book Your Safari
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}