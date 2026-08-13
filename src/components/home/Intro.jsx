import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section
      id="intro"
      className="bg-cream px-6 py-24 sm:py-32 lg:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                The Selvaggio Way
              </span>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-7 text-charcoal/55">
              More than a safari. A carefully crafted journey through the wild
              heart of Kenya.
            </p>
          </motion.div>

          {/* Main copy */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl lg:text-6xl">
              Kenya has a way of{" "}
              <span className="italic text-gold">
                staying with you.
              </span>
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-charcoal/65 sm:text-lg">
              <p>
                At Selvaggio Safaris, we believe the best journeys aren't
                simply about where you go, but how you experience it.
              </p>

              <p>
                From the sweeping plains of the Maasai Mara to the dramatic
                landscapes of Amboseli, we create authentic safari experiences
                shaped around your pace, your curiosity and the moments you'll
                remember long after you've returned home.
              </p>
            </div>

            {/* Brand statement */}
            <div className="mt-10 border-l border-gold pl-6">
              <p className="font-serif text-lg italic leading-8 text-deep-forest/80 sm:text-xl">
                "Wild places. Meaningful journeys. Memories that last."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}