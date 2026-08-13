import { motion } from "framer-motion";
import {
  FiCompass,
  FiMapPin,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const reasons = [
  {
    number: "01",
    icon: FiCompass,
    title: "Local Expertise",
    text: "Our guides know Kenya beyond the usual routes, helping you discover wildlife, landscapes and moments that feel genuinely authentic.",
  },
  {
    number: "02",
    icon: FiMapPin,
    title: "Journeys Made for You",
    text: "From private escapes to group adventures, we shape each safari around your time, interests and way of travelling.",
  },
  {
    number: "03",
    icon: FiShield,
    title: "Built for the Wild",
    text: "Travel with capable 4x4 safari vehicles prepared for the terrain, giving you comfort and confidence wherever the road leads.",
  },
  {
    number: "04",
    icon: FiUsers,
    title: "Personal Service",
    text: "From your first enquiry to your final game drive, we keep things simple, responsive and personal.",
  },
];

export default function WhySelvaggio() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-cream px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Why Selvaggio
              </span>
            </div>

            <h2 className="text-5xl leading-[1.05] text-forest md:text-6xl lg:text-7xl">
              Kenya is wild.
              <span className="block italic text-gold">
                Your journey shouldn't be.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-lg text-sm leading-7 text-charcoal/65 md:text-base lg:col-span-5"
          >
            Great safaris are about more than seeing wildlife. They are about
            knowing where to go, when to go and how to make every moment count.
            That's where we come in.
          </motion.p>

        </div>

        {/* Reasons */}
        <div className="mt-20 grid border-t border-forest/15 md:grid-cols-2">

          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="group border-b border-forest/15 py-10 md:even:border-l md:even:pl-10 md:odd:pr-10"
              >
                <div className="flex gap-6">

                  {/* Number */}
                  <span className="pt-1 text-xs font-semibold tracking-[0.2em] text-gold">
                    {reason.number}
                  </span>

                  <div className="flex-1">

                    <div className="mb-5 flex items-center justify-between">

                      <Icon
                        size={25}
                        strokeWidth={1.5}
                        className="text-forest transition duration-300 group-hover:text-gold"
                      />

                      <span className="text-forest/20 transition duration-300 group-hover:text-gold">
                        ↗
                      </span>

                    </div>

                    <h3 className="text-2xl text-forest md:text-3xl">
                      {reason.title}
                    </h3>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-charcoal/60">
                      {reason.text}
                    </p>

                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 flex flex-col gap-6 border-t border-forest/15 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-serif text-2xl italic text-forest md:text-3xl">
            Come for the wildlife.
            <span className="text-gold"> Leave with a story.</span>
          </p>

          <a
            href="#contact"
            className="w-fit border-b border-gold pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest transition hover:text-gold"
          >
            Meet Selvaggio
          </a>
        </motion.div>

      </div>
    </section>
  );
}