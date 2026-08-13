import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCamera,
  FiHeart,
  FiMap,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import maraImage from "../assets/mara.JPG";
import amboseliImage from "../assets/amboseli.jpg";
import guestsImage from "../assets/guests.JPG";

const safariStyles = [
  {
    title: "Classic Wildlife",
    description:
      "Spend your days exploring Kenya's wild landscapes, following wildlife and experiencing the rhythm of the African bush.",
    icon: FiMap,
    image: maraImage,
  },
  {
    title: "Family Safaris",
    description:
      "Thoughtfully paced adventures designed to give families meaningful wildlife encounters and unforgettable time together.",
    icon: FiUsers,
    image: guestsImage,
  },
  {
    title: "Photography Safaris",
    description:
      "Slow down, observe and capture the extraordinary details of Kenya's wildlife, landscapes and changing light.",
    icon: FiCamera,
    image: amboseliImage,
  },
  {
    title: "Tailor-Made Journeys",
    description:
      "Build a safari around your interests, preferred pace and the places you most want to experience.",
    icon: FiHeart,
    image: maraImage,
  },
];

export default function Safaris() {
  return (
    <main className="bg-cream">
      {/* Hero */}
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
                The Selvaggio Experience
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Safari isn't just
              <span className="block italic text-gold-light">
                where you go.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              It's how you experience the journey. The landscapes, the wildlife,
              the people, the quiet moments and everything in between.
            </p>
          </motion.div>
        </div>

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

      {/* Introduction */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Beyond the Ordinary
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
              Every safari should feel
              <span className="block italic text-gold">
                personal.
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-charcoal/60 sm:text-lg">
              There is no single way to experience Kenya. Some travellers want
              to follow wildlife across the savannah from sunrise to sunset.
              Others want slow mornings, beautiful landscapes, meaningful
              cultural encounters or time to simply disconnect.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-charcoal/60">
              At Selvaggio, we believe the best safari is the one that feels
              like it was made for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Safari styles */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Safari Styles
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
              Find your way
              <span className="block italic text-gold">
                into the wild.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {safariStyles.map((safari, index) => {
              const Icon = safari.icon;

              return (
                <motion.article
                  key={safari.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                  }}
                  className="group relative min-h-[440px] overflow-hidden bg-deep-forest"
                >
                  {/* Image */}
                  <img
                    src={safari.image}
                    alt={safari.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-deep-forest/45 transition-colors duration-500 group-hover:bg-deep-forest/60" />

                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/20 to-transparent" />

                  {/* Number */}
                  <span className="absolute right-7 top-6 font-serif text-6xl text-white/15">
                    0{index + 1}
                  </span>

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-9">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold">
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-6 font-serif text-3xl text-white sm:text-4xl">
                      {safari.title}
                    </h3>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">
                      {safari.description}
                    </p>

                    <Link
                      to="/book"
                      className="group/link mt-7 inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light"
                    >
                      Plan this experience

                      <FiArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-deep-forest px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            The Selvaggio Way
          </span>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Less rushing.
            <span className="block italic text-gold-light">
              More experiencing.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
            We believe the most memorable safari moments aren't always the
            ones you planned. Sometimes they're the unexpected encounter, the
            golden light across the plains or the silence before the next
            discovery.
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
                Your Journey
              </span>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
                Tell us how you want to
                <span className="italic text-gold">
                  {" "}
                  experience Kenya.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/50">
                Whether you know exactly what you want or need a little
                inspiration, we'll help shape the journey around you.
              </p>
            </div>

            <Link
              to="/book"
              className="group inline-flex w-fit shrink-0 items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
            >
              Start Planning

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