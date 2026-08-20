import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import maraImage from "../../assets/optimized/mara.webp";
import amboseliImage from "../../assets/optimized/amboseli.webp";
import nairobiImage from "../../assets/optimized/nairobi.webp";

const destinations = [
  {
    name: "Maasai Mara",
    location: "Narok County · Kenya",
    description:
      "Endless savannahs, extraordinary wildlife and some of Africa's most unforgettable safari moments.",
    image: maraImage,
    size: "large",
  },
  {
    name: "Amboseli",
    location: "Kajiado County · Kenya",
    description:
      "Iconic elephants beneath the breathtaking silhouette of Mount Kilimanjaro.",
    image: amboseliImage,
    size: "small",
  },
  {
    name: "Nairobi",
    location: "Kenya",
    description:
      "Where the energy of the city meets the wild heart of Africa.",
    image: nairobiImage,
    size: "small",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Explore Kenya
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl lg:text-6xl">
              Destinations that
              <span className="block italic text-gold">
                leave a mark.
              </span>
            </h2>
          </div>

          <Link
            to="/destinations"
            className="group inline-flex w-fit items-center gap-3 border-b border-deep-forest/20 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:border-gold hover:text-gold"
          >
            View all destinations

            <FiArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>

        {/* Destination grid */}
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Main destination */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="group relative min-h-[520px] overflow-hidden sm:min-h-[600px]"
          >
            <img
              src={destinations[0].image}
              alt={destinations[0].name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                  {destinations[0].location}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
                {destinations[0].name}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                {destinations[0].description}
              </p>

              <Link
                to="/destinations"
                className="group/link mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-gold"
              >
                Explore destination

                <FiArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* Supporting destinations */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {destinations.slice(1).map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * (index + 1),
                }}
                className="group relative min-h-[300px] overflow-hidden"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gold">
                    {destination.location}
                  </span>

                  <h3 className="mt-2 font-serif text-3xl text-white">
                    {destination.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="max-w-xs text-xs leading-6 text-white/65">
                      {destination.description}
                    </p>

                    <Link
                      to="/destinations"
                      aria-label={`Explore ${destination.name}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-gold hover:bg-gold hover:text-deep-forest"
                    >
                      <FiArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}