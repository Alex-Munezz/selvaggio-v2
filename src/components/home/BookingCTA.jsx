import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import guestsImage from "../../assets/optimized/guests.webp";

export default function BookingCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#111111]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={guestsImage}
          alt="Guests enjoying a safari experience in Kenya"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35" />

        {/* Warm brand glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(196,164,84,0.16),transparent_42%)]" />
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
            <span className="h-px w-12 bg-[#c4a454]" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
              Your Journey Starts Here
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-7 font-serif text-5xl leading-[1] text-white sm:text-6xl lg:text-7xl">
            Ready to experience
            <span className="block italic text-[#e6d69a]">
              Kenya differently?
            </span>
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            Tell us what you're dreaming of and we'll help turn it into a
            journey worth remembering. Whether you already have a destination
            in mind or simply know you want to explore, we'll help shape the
            experience around you.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/packages")}
              className="group inline-flex items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
            >
              Explore Safaris

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-3 border border-[#c4a454]/35 bg-black/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#c4a454] hover:text-[#e6d69a]"
            >
              <FiPhone size={15} />

              Talk to Us
            </button>
          </div>

          {/* Small reassurance */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
            <span>Private safaris</span>
            <span className="text-[#c4a454]">•</span>
            <span>Flexible itineraries</span>
            <span className="text-[#c4a454]">•</span>
            <span>Local expertise</span>
          </div>
        </motion.div>

        {/* Bottom detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-20 flex flex-col gap-5 border-t border-[#c4a454]/15 pt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>Kenya · East Africa</span>

          <span>Wildlife · Adventure · Discovery</span>

          <span>Travel with purpose</span>
        </motion.div>
      </div>
    </section>
  );
}