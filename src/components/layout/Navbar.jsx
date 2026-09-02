import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiArrowRight,
  FiChevronDown,
} from "react-icons/fi";

import SSS from "../../assets/SSS.png";

const navigation = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Destinations",
    path: "/destinations",
  },
  {
    label: "Transfers",
    path: "/transfers",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

const safariLinks = [
  {
    label: "Regular Safaris",
    path: "/packages",
    description:
      "Explore our private safari journeys across Kenya.",
  },
  {
    label: "Serve & Safari",
    path: "/serve-and-safari",
    description:
      "Combine meaningful service with an unforgettable safari.",
  },
];

export default function Navbar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [safariOpen, setSafariOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSafariOpen(false);
  }, [location.pathname]);

  const safariIsActive =
    location.pathname.startsWith("/safaris") ||
    location.pathname.startsWith(
      "/serve-and-safari"
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "border-b border-white/10 bg-[#111111]/95 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center">
            <img
              src={SSS}
              alt="Selvaggio Safaris Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="leading-none">
            <p className="font-serif text-xl tracking-[0.18em] text-white">
              SELVAGGIO
            </p>

            <p className="mt-1 text-[9px] tracking-[0.45em] text-[#c4a454]">
              SAFARIS
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Home + Destinations + Transfers */}
          {navigation
            .slice(0, 3)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#c4a454]"
                      : "text-white/75 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

          {/* Safaris Dropdown */}
          <div className="group relative">
            <button
              type="button"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                safariIsActive
                  ? "text-[#c4a454]"
                  : "text-white/75 group-hover:text-white"
              }`}
            >
              Safaris

              <FiChevronDown
                size={15}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </button>

            {/* Invisible bridge prevents dropdown closing */}
            <div className="absolute left-1/2 top-full h-5 w-72 -translate-x-1/2" />

            <div className="pointer-events-none absolute left-1/2 top-[calc(100%+18px)] w-80 -translate-x-1/2 translate-y-2 border border-white/10 bg-[#111111] opacity-0 shadow-2xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <div className="border-b border-white/10 px-6 py-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                  Explore Safaris
                </span>
              </div>

              {safariLinks.map((item) => {
                const isActive =
                  location.pathname.startsWith(
                    item.path
                  );

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group/item block border-b border-white/10 px-6 py-5 transition-colors last:border-b-0 ${
                      isActive
                        ? "bg-white/[0.06]"
                        : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`font-serif text-lg ${
                          isActive
                            ? "text-[#e6d69a]"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                      </span>

                      <FiArrowRight
                        size={15}
                        className="text-[#c4a454] transition-transform duration-300 group-hover/item:translate-x-1"
                      />
                    </div>

                    <p className="mt-2 text-xs leading-5 text-white/40">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* About + Contact */}
          {navigation
            .slice(3)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#c4a454]"
                      : "text-white/75 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

          {/* CTA */}
          <Link
            to="/book"
            className="group flex items-center gap-2 border border-[#c4a454] bg-[#c4a454] px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-transparent hover:text-[#c4a454]"
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
          onClick={() =>
            setIsOpen((prev) => !prev)
          }
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#111111]/50 text-white backdrop-blur-sm lg:hidden"
          aria-label={
            isOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FiX size={22} />
          ) : (
            <FiMenu size={22} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#111111]/98 px-6 py-6 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {/* Home */}
            <NavLink
              to="/"
              onClick={() =>
                setIsOpen(false)
              }
              className={({ isActive }) =>
                `border-b border-white/10 px-4 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#c4a454]"
                    : "text-white/75"
                }`
              }
            >
              Home
            </NavLink>

            {/* Destinations */}
            <NavLink
              to="/destinations"
              onClick={() =>
                setIsOpen(false)
              }
              className={({ isActive }) =>
                `border-b border-white/10 px-4 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#c4a454]"
                    : "text-white/75"
                }`
              }
            >
              Destinations
            </NavLink>

            {/* Transfers */}
            <NavLink
              to="/transfers"
              onClick={() =>
                setIsOpen(false)
              }
              className={({ isActive }) =>
                `border-b border-white/10 px-4 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#c4a454]"
                    : "text-white/75"
                }`
              }
            >
              Transfers
            </NavLink>

            {/* Mobile Safaris Dropdown */}
            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() =>
                  setSafariOpen(
                    (prev) => !prev
                  )
                }
                className={`flex w-full items-center justify-between px-4 py-4 text-sm font-medium ${
                  safariIsActive
                    ? "text-[#c4a454]"
                    : "text-white/75"
                }`}
              >
                Safaris

                <FiChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    safariOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {safariOpen && (
                <div className="border-t border-white/5 bg-white/[0.025] px-4 py-2">
                  {safariLinks.map(
                    (item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setIsOpen(false);
                          setSafariOpen(
                            false
                          );
                        }}
                        className="block border-b border-white/5 px-3 py-4 last:border-b-0"
                      >
                        <span className="font-serif text-lg text-[#e6d69a]">
                          {item.label}
                        </span>

                        <p className="mt-1 text-xs leading-5 text-white/35">
                          {
                            item.description
                          }
                        </p>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {/* About */}
            <NavLink
              to="/about"
              onClick={() =>
                setIsOpen(false)
              }
              className={({ isActive }) =>
                `border-b border-white/10 px-4 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#c4a454]"
                    : "text-white/75"
                }`
              }
            >
              About
            </NavLink>

            {/* Contact */}
            <NavLink
              to="/contact"
              onClick={() =>
                setIsOpen(false)
              }
              className={({ isActive }) =>
                `border-b border-white/10 px-4 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#c4a454]"
                    : "text-white/75"
                }`
              }
            >
              Contact
            </NavLink>

            {/* CTA */}
            <Link
              to="/book"
              onClick={() =>
                setIsOpen(false)
              }
              className="mt-6 flex items-center justify-center gap-2 bg-[#c4a454] px-5 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e6d69a]"
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