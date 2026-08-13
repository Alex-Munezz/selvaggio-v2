import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/destinations" },
  { label: "Safaris", path: "/safaris" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

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
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-deep-forest/30">
            <span className="font-serif text-xl text-gold">S</span>
          </div>

          <div className="leading-none">
            <p className="font-serif text-xl tracking-[0.18em] text-white">
              SELVAGGIO
            </p>

            <p className="mt-1 text-[9px] tracking-[0.45em] text-gold">
              SAFARIS
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-gold"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/book"
            className="group flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-sm font-semibold text-deep-forest transition-all duration-300 hover:bg-transparent hover:text-gold"
          >
            Plan Your Safari

            <FiArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-deep-forest/40 text-white backdrop-blur-sm lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-deep-forest/98 px-6 py-6 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-gold"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 bg-gold px-5 py-3 text-sm font-semibold text-deep-forest"
            >
              Plan Your Safari
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}