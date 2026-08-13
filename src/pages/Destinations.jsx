import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

import destinations from "../data/destinations";

export default function Destinations() {
  return (
    <main className="bg-cream">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-deep-forest">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Explore Kenya
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Places that
              <span className="block italic text-gold-light">
                stay with you.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              From legendary wildlife reserves to landscapes shaped by
              mountains, people and time, discover the places that make Kenya
              unforgettable.
            </p>
          </motion.div>
        </div>

        {/* Bottom detail */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Selvaggio Safaris
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Kenya · East Africa
            </span>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Our Destinations
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl"
            >
              Discover Kenya,
              <span className="italic text-gold"> your way.</span>
            </motion.h2>
          </div>

          <div className="space-y-20">
            {destinations.map((destination, index) => (
              <motion.article
                key={destination.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="group relative aspect-[4/3] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent" />

                  <span className="absolute bottom-6 left-6 font-serif text-7xl text-white/20">
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                    <FiMapPin size={13} />

                    <span>{destination.region}</span>
                  </div>

                  <h3 className="mt-4 font-serif text-4xl text-deep-forest sm:text-5xl">
                    {destination.name}
                  </h3>

                  <p className="mt-5 text-base leading-8 text-charcoal/60">
                    {destination.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-deep-forest/10 pt-6">
                    {destination.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3 text-xs text-charcoal/55"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />

                        {highlight}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/destinations/${destination.id}`}
                    className="group mt-8 inline-flex items-center gap-3 border-b border-deep-forest/20 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:border-gold hover:text-gold"
                  >
                    Explore {destination.name}

                    <FiArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep-forest px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-4">
            <span className="h-px w-10 bg-gold" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Your Journey
            </span>

            <span className="h-px w-10 bg-gold" />
          </div>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Not sure where
            <span className="italic text-gold-light"> to begin?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Tell us what you're looking for and we'll help you discover the
            right destination and create a safari around it.
          </p>

          <Link
            to="/book"
            className="group mt-9 inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
          >
            Plan Your Safari

            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}