import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#experience" },
  { label: "About Us", href: "#about" },
  { label: "Reviews", href: "#reviews" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#091510] px-6 pb-8 pt-20 text-white lg:px-10"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Main footer */}
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-12">

          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="/" className="inline-block">
              <p className="font-serif text-3xl tracking-[0.15em]">
                SELVAGGIO
              </p>

              <p className="mt-1 text-[10px] tracking-[0.45em] text-gold">
                SAFARIS
              </p>
            </a>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/45">
              Thoughtfully crafted safari experiences across Kenya.
              Discover wild places, meaningful encounters and journeys
              worth remembering.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-3">
              <a
                href="/"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-gold hover:text-gold"
              >
                <FiInstagram />
              </a>

              <a
                href="/"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-gold hover:text-gold"
              >
                <FiFacebook />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              Explore
            </p>

            <div className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/55 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              Start a conversation
            </p>

            <div className="flex flex-col gap-5">

              <a
                href="mailto:info@selvaggiosafaris.com"
                className="group flex items-center gap-4 text-sm text-white/60 transition hover:text-white"
              >
                <FiMail className="text-gold" />

                info@selvaggiosafaris.com

                <FiArrowUpRight className="opacity-0 transition group-hover:opacity-100" />
              </a>

              <a
                href="tel:+254000000000"
                className="flex items-center gap-4 text-sm text-white/60 transition hover:text-white"
              >
                <FiPhone className="text-gold" />

                +254 XXX XXX XXX
              </a>

              <div className="flex items-start gap-4 text-sm leading-6 text-white/60">
                <FiMapPin className="mt-1 shrink-0 text-gold" />

                Nairobi, Kenya
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-4 pt-7 text-[10px] uppercase tracking-[0.18em] text-white/30 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Selvaggio Safaris. All rights reserved.
          </p>

          <p>
            Crafted with intention.
          </p>
        </div>

      </div>
    </footer>
  );
}   