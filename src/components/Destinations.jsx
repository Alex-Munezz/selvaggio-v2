import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import mara from "../assets/mara.JPG";
import amboseli from "../assets/amboseli.jpg";
import nairobi from "../assets/nairobi.JPG";

const destinations = [
  {
    name: "Maasai Mara",
    location: "Narok County · Kenya",
    description:
      "Endless savannahs, legendary wildlife and unforgettable encounters in one of Africa's most iconic wildernesses.",
    image: mara,
    size: "large",
  },
  {
    name: "Amboseli",
    location: "Kajiado County · Kenya",
    description:
      "Watch elephants roam beneath the magnificent silhouette of Mount Kilimanjaro.",
    image: amboseli,
    size: "small",
  },
  {
    name: "Nairobi National Park",
    location: "Nairobi · Kenya",
    description:
      "A remarkable wilderness experience just minutes from the heart of the city.",
    image: nairobi,
    size: "small",
  },
];

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="overflow-hidden bg-cream px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Where will you go?
              </span>
            </div>

            <h2 className="text-5xl leading-[1] text-forest md:text-6xl lg:text-7xl">
              Wild places.
              <span className="block italic text-gold">
                Unforgettable journeys.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-md text-sm leading-7 text-charcoal/65 md:text-base"
          >
            From legendary savannahs to dramatic mountain landscapes, discover
            Kenya through experiences designed around the way you want to
            travel.
          </motion.p>

        </div>

        {/* Destination Grid */}
        <div className="grid gap-5 lg:grid-cols-12">

          {/* Mara */}
          <motion.a
            href="#book"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="group relative min-h-[560px] overflow-hidden lg:col-span-7"
          >
            <img
              src={mara}
              alt="Maasai Mara safari"
              className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
                {destinations[0].location}
              </p>

              <div className="flex items-end justify-between gap-5">

                <div>
                  <h3 className="text-4xl text-white md:text-5xl">
                    {destinations[0].name}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-6 text-white/75">
                    {destinations[0].description}
                  </p>
                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-deep-forest md:flex">
                  <FiArrowUpRight size={20} />
                </div>

              </div>
            </div>
          </motion.a>

          {/* Right column */}
          <div className="grid gap-5 lg:col-span-5">

            {/* Amboseli */}
            <motion.a
              href="#book"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8 }}
              className="group relative min-h-[270px] overflow-hidden"
            >
              <img
                src={amboseli}
                alt="Amboseli safari"
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">

                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light">
                  {destinations[1].location}
                </p>

                <div className="flex items-center justify-between gap-4">

                  <h3 className="text-3xl text-white">
                    {destinations[1].name}
                  </h3>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-deep-forest">
                    <FiArrowUpRight />
                  </span>

                </div>

              </div>
            </motion.a>

            {/* Nairobi */}
            <motion.a
              href="#book"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative min-h-[270px] overflow-hidden"
            >
              <img
                src={nairobi}
                alt="Nairobi National Park safari"
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">

                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light">
                  {destinations[2].location}
                </p>

                <div className="flex items-center justify-between gap-4">

                  <h3 className="text-3xl text-white">
                    {destinations[2].name}
                  </h3>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-deep-forest">
                    <FiArrowUpRight />
                  </span>

                </div>

              </div>
            </motion.a>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-forest/15 pt-7 sm:flex-row sm:items-center">

          <p className="text-sm text-charcoal/60">
            Looking for somewhere beyond these destinations?
          </p>

          <a
            href="#contact"
            className="group flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-forest"
          >
            Explore all destinations

            <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

        </div>

      </div>
    </section>
  );
}