import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

import guestsImage from "../../assets/guests.JPG";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-deep-forest">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={guestsImage}
          alt="Guests enjoying a safari experience in Kenya"
          className="h-full w-full object-cover object-center"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-deep-forest/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/95 via-deep-forest/70 to-deep-forest/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:px-8 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Your Journey Starts Here
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-7 font-serif text-5xl leading-[1] text-white sm:text-6xl lg:text-7xl">
            Ready to experience
            <span className="block italic text-gold-light">
              Kenya differently?
            </span>
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            Tell us what you're dreaming of and we'll help turn it into a
            journey worth remembering. Whether you have a destination in mind
            or simply know you want to explore, we'll take it from there.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/book"
              className="group inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-all duration-300 hover:bg-gold-light"
            >
              Plan Your Safari

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 border border-white/25 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <FiPhone size={15} />

              Talk to us
            </Link>
          </div>
        </motion.div>

        {/* Bottom detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Kenya · East Africa</span>

          <span>Wildlife · Adventure · Discovery</span>

          <span>Travel with purpose</span>
        </motion.div>
      </div>
    </section>
  );
}