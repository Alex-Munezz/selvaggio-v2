import { motion } from "framer-motion";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import landcruiser from "../assets/landcruiser.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-deep-forest">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={landcruiser}
          alt="Selvaggio Safaris Land Cruiser exploring Kenya"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/90 via-deep-forest/45 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-end px-6 pb-20 pt-36 lg:px-10 lg:pb-24">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl"
        >

          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
              Kenya · East Africa
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[92px]">
            Experience Kenya
            <span className="block italic text-gold-light">
              beyond expectations.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Discover wild landscapes, extraordinary wildlife and authentic
            Kenyan adventures, thoughtfully crafted around you.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <a
              href="#destinations"
              className="group flex w-fit items-center gap-3 bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-deep-forest transition duration-300 hover:bg-gold-light"
            >
              Explore Safaris

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#experience"
              className="flex w-fit items-center gap-3 border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white/10"
            >
              Discover Selvaggio
            </a>

          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#destinations"
        className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 text-white/60 transition hover:text-white md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          Explore
        </span>

        <FiArrowDown className="animate-bounce" />
      </a>

      {/* Bottom label */}
      <div className="absolute bottom-8 left-6 z-10 lg:left-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          Wildlife · Adventure · Discovery
        </p>
      </div>
    </section>
  );
}