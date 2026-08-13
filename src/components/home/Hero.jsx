import { motion } from "framer-motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

import maraImage from "../../assets/mara.JPG";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-deep-forest">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={maraImage}
          alt="Selvaggio Safaris vehicle at the Maasai Mara National Reserve entrance"
          className="h-full w-full object-cover object-[58%_center] md:object-[60%_center]"
        />

        {/* Overall dark overlay */}
        <div className="absolute inset-0 bg-deep-forest/50" />

        {/* Left-to-right cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-forest via-deep-forest/75 to-deep-forest/10" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-deep-forest to-transparent" />
      </div>

      {/* Content */}
     <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-28 pt-24 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Kenya · East Africa
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-5xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Experience Kenya
            <span className="mt-2 block italic text-gold-light">
              beyond expectations.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-2xl text-base leading-7 text-white/75 sm:text-lg"
          >
            Discover wild landscapes, extraordinary wildlife and authentic
            Kenyan adventures, thoughtfully crafted around you.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/destinations"
              className="group inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-deep-forest transition-all duration-300 hover:bg-gold-light"
            >
              Explore Safaris

              <FiArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center border border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Discover Selvaggio
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom information */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-6 pb-7 lg:px-8">
          <div className="hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 sm:flex">
            <span>Wildlife</span>
            <span>·</span>
            <span>Adventure</span>
            <span>·</span>
            <span>Discovery</span>
          </div>

          <a
            href="#intro"
            className="group ml-auto flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-gold"
          >
            Explore

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-gold">
              <FiChevronDown size={16} className="animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}