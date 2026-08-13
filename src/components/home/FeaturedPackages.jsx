import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

import maraImage from "../../assets/mara.JPG";
import amboseliImage from "../../assets/amboseli.jpg";
import nairobiImage from "../../assets/nairobi.JPG";

const packages = [
  {
    title: "Maasai Mara Escape",
    location: "Maasai Mara",
    duration: "3 Days · 2 Nights",
    description:
      "A classic Kenyan safari through the legendary Maasai Mara, where open savannahs and abundant wildlife create unforgettable moments.",
    image: maraImage,
  },
  {
    title: "Amboseli & Kilimanjaro",
    location: "Amboseli",
    duration: "3 Days · 2 Nights",
    description:
      "Experience the beauty of Amboseli, famous for its elephants, sweeping landscapes and spectacular views of Mount Kilimanjaro.",
    image: amboseliImage,
  },
  {
    title: "Kenya Discovery",
    location: "Nairobi & Beyond",
    duration: "5 Days · 4 Nights",
    description:
      "A carefully crafted introduction to Kenya combining wildlife, landscapes, culture and the energy of Nairobi.",
    image: nairobiImage,
  },
];

export default function FeaturedPackages() {
  return (
    <section className="bg-cream px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Curated Journeys
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl lg:text-6xl">
              Journeys made
              <span className="block italic text-gold">
                for the curious.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-charcoal/55">
            From iconic wildlife destinations to intimate escapes, discover
            journeys thoughtfully designed around the way you want to travel.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.75,
                delay: index * 0.1,
              }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-transparent to-transparent opacity-80" />

                {/* Location */}
                <div className="absolute left-5 top-5 flex items-center gap-2 bg-deep-forest/80 px-4 py-2 backdrop-blur-sm">
                  <FiMapPin size={13} className="text-gold" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white">
                    {pkg.location}
                  </span>
                </div>

                {/* Number */}
                <span className="absolute bottom-5 right-5 font-serif text-5xl text-white/20">
                  0{index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="pt-6">
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  <FiCalendar size={13} />

                  <span>{pkg.duration}</span>
                </div>

                <h3 className="mt-3 font-serif text-3xl text-deep-forest transition-colors duration-300 group-hover:text-gold">
                  {pkg.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-charcoal/60">
                  {pkg.description}
                </p>

                <Link
                  to="/packages"
                  className="group/link mt-6 inline-flex items-center gap-3 border-b border-deep-forest/20 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-deep-forest transition-all duration-300 hover:border-gold hover:text-gold"
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-16 border-t border-deep-forest/10 pt-8"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <p className="font-serif text-xl italic text-deep-forest/70">
              Looking for something completely your own?
            </p>

            <Link
              to="/book"
              className="group inline-flex w-fit items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-deep-forest transition-colors duration-300 hover:bg-gold-light"
            >
              Plan your safari

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}