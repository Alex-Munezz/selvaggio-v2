import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheck, FiMapPin } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import destinations from "../data/destinations";

export default function DestinationDetail() {
  const { id } = useParams();

  const destination = destinations.find((item) => item.id === id);

  if (!destination) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Destination not found
          </p>

          <h1 className="mt-5 font-serif text-5xl text-deep-forest">
            We couldn't find that destination.
          </h1>

          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
          >
            <FiArrowLeft size={16} />
            Back to destinations
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative min-h-[75vh] overflow-hidden bg-deep-forest">
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-deep-forest/45" />

          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/25 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/55 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl items-end px-6 pb-16 pt-40 lg:px-8 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link
              to="/destinations"
              className="mb-8 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-gold"
            >
              <FiArrowLeft size={14} />
              All destinations
            </Link>

            <div className="flex items-center gap-3">
              <FiMapPin size={14} className="text-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {destination.region}
              </span>
            </div>

            <h1 className="mt-5 font-serif text-6xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              {destination.name}
            </h1>

            <p className="mt-6 max-w-2xl font-serif text-xl italic leading-8 text-white/70 sm:text-2xl">
              {destination.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Discover {destination.name}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
              A place made for
              <span className="block italic text-gold">
                unforgettable moments.
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-charcoal/60 sm:text-lg">
              {destination.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-gold" />

                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                  Highlights
                </span>
              </div>

              <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
                What makes
                <span className="block italic text-gold">
                  {destination.name}
                </span>
                special?
              </h2>
            </motion.div>

            <div className="grid border-t border-deep-forest/10 sm:grid-cols-2">
              {destination.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="border-b border-deep-forest/10 py-7 sm:px-6 sm:first:pl-0"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <FiCheck size={15} />
                    </span>

                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-gold/70">
                        0{index + 1}
                      </span>

                      <h3 className="mt-1 font-serif text-xl text-deep-forest">
                        {highlight}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience statement */}
      <section className="bg-deep-forest px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Experience {destination.name}
          </span>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            The best journeys aren't
            <span className="block italic text-gold-light">
              simply about the destination.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
            They're about the people you meet, the wildlife you encounter, the
            landscapes that stop you in your tracks and the stories you carry
            home.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between gap-10 border-t border-deep-forest/10 pt-10 md:flex-row md:items-end"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Ready to explore?
              </span>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
                Make {destination.name}
                <span className="italic text-gold"> part of your story.</span>
              </h2>
            </div>

            <Link
              to="/book"
              className="group inline-flex w-fit shrink-0 items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
            >
              Plan Your Safari

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}