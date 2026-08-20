import { motion } from "framer-motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

import maraImage from "../../assets/optimized/mara.webp";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={maraImage}
          alt="Selvaggio Safaris vehicle at the Maasai Mara National Reserve entrance"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[58%_center] md:object-[60%_center]"
        />

        {/* Overall dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Left-to-right cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

        {/* Warm golden glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(196,164,84,0.18),transparent_40%)]" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-24 pt-32 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-[#c4a454]" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8c37a]">
              Kenya · East Africa
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Experience Kenya
            <span className="mt-2 block italic text-[#e6d69a]">
              beyond expectations.
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-2xl text-base leading-7 text-white/70 sm:text-lg"
          >
            Discover wild landscapes, extraordinary wildlife and authentic
            Kenyan adventures, thoughtfully crafted around you.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/packages"
              className="group inline-flex items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black transition-all duration-300 hover:bg-[#e1cf8c]"
            >
              Explore Safaris

              <FiArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center border border-[#c4a454]/40 bg-black/20 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#c4a454] hover:text-[#d8c37a]"
            >
              Discover Selvaggio
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom information */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-6 pb-7 lg:px-8">
          <div className="hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40 sm:flex">
            <span>Wildlife</span>
            <span className="text-[#c4a454]">·</span>
            <span>Adventure</span>
            <span className="text-[#c4a454]">·</span>
            <span>Discovery</span>
          </div>

          <a
            href="#intro"
            className="group ml-auto flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/65 transition-colors hover:text-[#d8c37a]"
          >
            Explore

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c4a454]/30 transition-all duration-300 group-hover:border-[#c4a454]">
              <FiChevronDown size={16} className="animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}