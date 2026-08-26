import { Link } from "react-router-dom";
import { FiArrowUpRight, FiFacebook, FiInstagram, FiMail, FiPhone,} from "react-icons/fi";
import logo from "../../assets/SSS.png";
import { AiFillTikTok } from "react-icons/ai";

const footerLinks = {
  Explore: [
    { label: "Destinations", path: "/destinations" },
    { label: "Safaris", path: "/packages" },
    { label: "Packages", path: "/packages" },
  ],
  Selvaggio: [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Plan Your Safari", path: "/packages" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main footer */}
        <div className="grid gap-14 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full">
                <img src={logo} alt="Selvaggio Safaris Logo" />
              </div>

              <div className="leading-none">
                <p className="font-serif text-xl tracking-[0.18em]">
                  SELVAGGIO
                </p>

                <p className="mt-1 text-[9px] tracking-[0.45em] text-[#c4a454]">
                  SAFARIS
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/45">
              Thoughtfully crafted safari experiences across Kenya, connecting
              you with extraordinary landscapes, wildlife and unforgettable
              moments.
            </p>

            {/* Social links */}
            <div className="mt-7 flex gap-3">
              <a
                href="https://www.instagram.com/selvaggiosafarissolutions/"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#c4a454] hover:text-[#c4a454]"
              >
                <FiInstagram size={16} />
              </a>

              <a
                href="https://www.facebook.com/selvaggiosafaris/"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#c4a454] hover:text-[#c4a454]"
              >
                <FiFacebook size={16} />
              </a>
                            <a
                href="https://www.tiktok.com/@selvaggiosafaris001"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#c4a454] hover:text-[#c4a454]"
              >
                <AiFillTikTok size={16} />
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                {title}
              </h3>

              <nav className="mt-6 flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={`${title}-${link.label}`}
                    to={link.path}
                    className="w-fit text-sm text-white/45 transition-colors duration-300 hover:text-[#e6d69a]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
              Get in touch
            </h3>

            <div className="mt-6 space-y-4">
              <a
                href="tel:+254792464627"
                className="flex items-center gap-3 text-sm text-white/45 transition-colors hover:text-white"
              >
                <FiPhone size={15} className="text-[#c4a454]" />
                +254 792 464 627
              </a>

              <a
                href="mailto:selvaggiosafarissolutions@gmail.com"
                className="flex items-center gap-3 text-sm text-white/45 transition-colors hover:text-white"
              >
                <FiMail size={15} className="text-[#c4a454]" />
                selvaggiosafarissolutions@gmail.com
              </a>
            </div>

            <Link
              to="/packages"
              className="group mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#c4a454]"
            >
              Start Your Journey

              <FiArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-[#c4a454]/15 pt-6 text-[10px] uppercase tracking-[0.18em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Selvaggio Safaris. All rights reserved.
          </p>

          <p>Kenya · East Africa</p>
        </div>
      </div>
    </footer>
  );
}