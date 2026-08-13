import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

import packages from "../data/packages";

export default function Packages() {
  const featuredPackage = packages[0];
  const remainingPackages = packages.slice(1);

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="bg-deep-forest">
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
                Curated Journeys
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Journeys designed
              <span className="block italic text-gold-light">
                around discovery.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Explore our carefully crafted safari experiences, created to
              bring you closer to Kenya's wildlife, landscapes and culture.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Selvaggio Safaris
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Wildlife · Adventure · Discovery
            </span>
          </div>
        </div>
      </section>

      {/* Featured Package */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Featured Journey
            </span>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="grid overflow-hidden bg-deep-forest lg:grid-cols-[1.15fr_0.85fr]"
          >
            {/* Image */}
            <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
              <img
                src={featuredPackage.image}
                alt={featuredPackage.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white sm:left-10 sm:bottom-10">
                <FiMapPin size={14} className="text-gold" />
                {featuredPackage.destination}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                {featuredPackage.category}
              </span>

              <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
                {featuredPackage.name}
              </h2>

              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/45">
                <FiCalendar size={14} className="text-gold" />
                {featuredPackage.duration}
              </div>

              <p className="mt-7 text-sm leading-7 text-white/55 sm:text-base">
                {featuredPackage.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/10 pt-7">
                {featuredPackage.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="text-xs leading-5 text-white/55"
                  >
                    <span className="mr-2 text-gold">•</span>
                    {highlight}
                  </span>
                ))}
              </div>

              <Link
                to={`/packages/${featuredPackage.id}`}
                className="group mt-9 inline-flex w-fit items-center gap-3 bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-deep-forest transition-colors hover:bg-gold-light"
              >
                Explore Journey

                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      {/* All Packages */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                More Journeys
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
              Find the journey
              <span className="block italic text-gold">that feels like you.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {remainingPackages.map((pkg, index) => (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/65 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                    <FiMapPin size={13} className="text-gold" />
                    {pkg.destination}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                      {pkg.category}
                    </span>

                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-charcoal/40">
                      <FiCalendar size={12} />
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-3xl text-deep-forest sm:text-4xl">
                    {pkg.name}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-charcoal/55">
                    {pkg.shortDescription}
                  </p>

                  <Link
                    to={`/packages/${pkg.id}`}
                    className="group/link mt-6 inline-flex items-center gap-3 border-b border-deep-forest/15 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-deep-forest transition-all hover:border-gold hover:text-gold"
                  >
                    View journey

                    <FiArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Safari CTA */}
      <section className="bg-cream px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
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
              Your Safari, Your Way
            </span>

            <span className="h-px w-10 bg-gold" />
          </div>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl lg:text-6xl">
            Don't see exactly
            <span className="block italic text-gold">
              what you're looking for?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-charcoal/55 sm:text-base">
            Every traveller is different. Tell us where you want to go, what
            you want to experience and how you want to travel — we'll help
            create something personal.
          </p>

          <Link
            to="/book"
            className="group mt-9 inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
          >
            Create Your Safari

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