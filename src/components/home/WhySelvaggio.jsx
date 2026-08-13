import { motion } from "framer-motion";
import {
  FiCompass,
  FiHeart,
  FiShield,
  FiStar,
  FiUsers,
} from "react-icons/fi";

const reasons = [
  {
    icon: FiCompass,
    title: "Local Knowledge",
    description:
      "Our journeys are shaped by an intimate understanding of Kenya's landscapes, wildlife and hidden gems.",
  },
  {
    icon: FiHeart,
    title: "Personal Journeys",
    description:
      "No two travellers are the same. We shape every safari around your interests, pace and sense of adventure.",
  },
  {
    icon: FiShield,
    title: "Travel With Confidence",
    description:
      "From planning to the final drive home, we're here to make your journey seamless, comfortable and memorable.",
  },
  {
    icon: FiStar,
    title: "Thoughtful Experiences",
    description:
      "We focus on meaningful encounters rather than simply ticking destinations off a list.",
  },
];

export default function WhySelvaggio() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Intro */}
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
                Why Selvaggio
              </span>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-7 text-charcoal/50">
              The difference is in the details, from the first conversation to
              the final sunset.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl lg:text-6xl">
              Travel with purpose.
              <span className="block italic text-gold">
                Explore with meaning.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-charcoal/60 sm:text-lg">
              We believe a great safari should feel effortless, personal and
              deeply connected to the place you're visiting. That's why we
              approach every journey with curiosity, care and a genuine love
              for Kenya.
            </p>
          </motion.div>
        </div>

        {/* Reasons */}
        <div className="mt-20 grid border-t border-deep-forest/10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="group border-b border-deep-forest/10 px-0 py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:px-8 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-deep-forest/10 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-deep-forest">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                <span className="mt-7 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/70">
                  0{index + 1}
                </span>

                <h3 className="mt-3 font-serif text-2xl text-deep-forest">
                  {reason.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-charcoal/50">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-20 border-t border-deep-forest/10 pt-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <FiUsers className="text-gold" size={20} />

              <p className="text-sm text-charcoal/50">
                Your journey. Your pace. Your Kenya.
              </p>
            </div>

            <span className="font-serif text-xl italic text-deep-forest/60">
              Discover the Selvaggio difference.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}