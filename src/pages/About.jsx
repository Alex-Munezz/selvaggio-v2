import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCompass,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import guestsImage from "../assets/guests.JPG";
import maraImage from "../assets/mara.JPG";
import amboseliImage from "../assets/amboseli.jpg";

const values = [
  {
    icon: FiHeart,
    title: "Personal",
    description:
      "We take the time to understand what matters to you, creating journeys that feel personal rather than pre-packaged.",
  },
  {
    icon: FiCompass,
    title: "Authentic",
    description:
      "We want you to experience Kenya beyond the obvious — its landscapes, wildlife, people and stories.",
  },
  {
    icon: FiUsers,
    title: "Human",
    description:
      "Great travel is about connection. From your first conversation to your final day, we're here to make the journey feel effortless.",
  },
  {
    icon: FiShield,
    title: "Thoughtful",
    description:
      "Every detail matters. We focus on thoughtful planning, reliable service and experiences that leave a lasting impression.",
  },
];

export default function About() {
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
                About Selvaggio
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              We don't just
              <span className="block italic text-gold-light">
                take you there.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              We create meaningful journeys through Kenya — bringing together
              wild landscapes, extraordinary experiences and genuine human
              connection.
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

      {/* Story */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={guestsImage}
                alt="Guests experiencing a Kenyan safari"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 hidden h-32 w-32 border border-gold/40 sm:block lg:-right-8" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Our Story
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
              Kenya is more than
              <span className="block italic text-gold">
                a destination.
              </span>
            </h2>

            <p className="mt-8 text-base leading-8 text-charcoal/60 sm:text-lg">
              It is a feeling. The first sight of wildlife across an open
              savannah. The warmth of a local welcome. The quiet of a sunrise
              in the bush. The stories shared around a fire at the end of a
              long day.
            </p>

            <p className="mt-5 text-base leading-8 text-charcoal/60">
              Selvaggio exists to help travellers experience those moments in
              a way that feels genuine, comfortable and completely their own.
            </p>

            <p className="mt-5 text-base leading-8 text-charcoal/60">
              We believe travel should leave you with more than photographs.
              It should leave you with stories.
            </p>

            <div className="mt-10 flex items-center gap-5 border-t border-deep-forest/10 pt-7">
              <div>
                <span className="block font-serif text-3xl text-deep-forest">
                  Kenya
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.25em] text-charcoal/40">
                  Our home
                </span>
              </div>

              <span className="h-10 w-px bg-deep-forest/10" />

              <div>
                <span className="block font-serif text-3xl text-deep-forest">
                  Africa
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.25em] text-charcoal/40">
                  Our inspiration
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                What We Believe
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
              The values behind
              <span className="block italic text-gold">
                every journey.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-0 border-t border-deep-forest/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="border-b border-deep-forest/10 px-0 py-9 sm:px-7 sm:first:pl-0 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon size={18} />
                  </span>

                  <span className="mt-7 block text-[9px] font-semibold uppercase tracking-[0.3em] text-gold/70">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 font-serif text-2xl text-deep-forest">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-charcoal/50">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kenya section */}
      <section className="bg-deep-forest px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Our Kenya
              </span>
            </div>

            <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              From the savannah
              <span className="block italic text-gold-light">
                to the coast.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/50">
              Kenya is wonderfully diverse. From the vast grasslands of the
              Maasai Mara to the dramatic views of Amboseli and the energy of
              Nairobi, every region reveals a different side of the country.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/50">
              We want our guests to see beyond the postcard — to slow down,
              explore deeply and experience the character of each place.
            </p>

            <Link
              to="/destinations"
              className="group mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
            >
              Explore destinations

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden sm:aspect-[4/4.5]">
              <img
                src={amboseliImage}
                alt="Kenyan landscape"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden h-28 w-28 border border-gold/30 sm:block lg:-left-8" />
          </motion.div>
        </div>
      </section>

      {/* Difference */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Why Selvaggio
          </span>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl lg:text-6xl">
            Come as a traveller.
            <span className="block italic text-gold">
              Leave with a story.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-charcoal/50 sm:text-base">
            We don't believe in rushing from one attraction to the next. We
            believe in giving you the space to notice, explore, connect and
            simply enjoy being there.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
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
                Your Kenya Story
              </span>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
                Ready to experience Kenya
                <span className="italic text-gold"> differently?</span>
              </h2>
            </div>

            <Link
              to="/book"
              className="group inline-flex w-fit shrink-0 items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
            >
              Start Your Journey

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