import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

import landcruiser from "../assets/landcruiser.jpg";

const features = [
  "Pop-up roof for unobstructed views",
  "Comfortable 4x4 safari vehicles",
  "Experienced professional guides",
  "Private & group safari options",
];

export default function Fleet() {
  return (
    <section className="overflow-hidden bg-deep-forest px-6 py-24 text-white lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-span-7"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={landcruiser}
                alt="Selvaggio Safaris Land Cruiser"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/50 via-transparent to-transparent" />

              {/* Image label */}
              <div className="absolute bottom-6 left-6 border border-white/30 bg-deep-forest/60 px-5 py-3 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
                  Explore differently
                </p>
              </div>
            </div>

            {/* Decorative frame */}
            <div className="pointer-events-none absolute -bottom-5 -right-5 -z-0 h-32 w-32 border-b border-r border-gold/50" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Your Safari Vehicle
              </span>
            </div>

            <h2 className="text-5xl leading-[1.05] md:text-6xl">
              Get closer
              <span className="block italic text-gold-light">
                to the wild.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-7 text-white/60 md:text-base">
              The right vehicle can change the entire safari. Our 4x4 Land
              Cruisers are built to take you deeper into Kenya while keeping
              you comfortable, connected and ready for the next sighting.
            </p>

            {/* Features */}
            <div className="mt-9 border-t border-white/10">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-4 border-b border-white/10 py-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50">
                    <FiCheck size={13} className="text-gold" />
                  </span>

                  <span className="text-sm text-white/75">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#book"
              className="group mt-9 flex w-fit items-center gap-3 bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-deep-forest transition duration-300 hover:bg-gold-light"
            >
              Start Planning

              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}