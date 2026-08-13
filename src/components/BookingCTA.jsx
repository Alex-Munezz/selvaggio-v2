import { motion } from "framer-motion";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

export default function BookingCTA() {
  return (
    <section
      id="book"
      className="relative overflow-hidden bg-deep-forest px-6 py-28 lg:px-10 lg:py-36"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-gold/10" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-[500px] w-[500px] rounded-full border border-white/5" />

      <div className="relative z-10 mx-auto max-w-[1200px] text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Your next adventure
            </span>

            <span className="h-px w-10 bg-gold" />
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-5xl text-5xl leading-[0.98] text-white md:text-7xl lg:text-8xl">
            Your Kenya story
            <span className="block italic text-gold-light">
              starts here.
            </span>
          </h2>

          {/* Copy */}
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Tell us what you're dreaming about. We'll help you turn it into
            a safari that's personal, seamless and unforgettable.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <a
              href="#contact"
              className="group flex w-full items-center justify-center gap-3 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-deep-forest transition duration-300 hover:bg-gold-light sm:w-auto"
            >
              Plan Your Safari

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="flex w-full items-center justify-center gap-3 border border-white/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:border-white hover:bg-white/10 sm:w-auto"
            >
              <FiMessageCircle />

              Talk to Our Team
            </a>

          </div>

          {/* Small reassurance */}
          <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-white/30">
            No obligation · Personal advice · Tailored itineraries
          </p>
        </motion.div>

      </div>
    </section>
  );
}