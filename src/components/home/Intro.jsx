import { motion } from "framer-motion";
import { FiArrowRight, FiCompass, FiMap, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  const stats = [
    {
      value: "100%",
      label: "Tailor-made journeys",
      icon: FiCompass,
    },
    {
      value: "Kenya",
      label: "Locally designed experiences",
      icon: FiMap,
    },
    {
      value: "24/7",
      label: "Support while you travel",
      icon: FiShield,
    },
  ];

  return (
    <section
      id="intro"
      className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a88735]">
                The Selvaggio Way
              </span>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-7 text-[#1c1c1c]/55">
              More than a safari. A thoughtfully designed journey through the
              wild heart of Kenya.
            </p>

            {/* Small data block */}
            <div className="mt-10 space-y-5 border-t border-[#111111]/10 pt-7">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                    <Icon size={16} />
                  </span>

                  <div>
                    <p className="font-serif text-xl text-[#111111]">
                      {value}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#1c1c1c]/45">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main copy */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl lg:text-6xl">
              Kenya has a way of{" "}
              <span className="italic text-[#c4a454]">
                staying with you.
              </span>
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[#1c1c1c]/65 sm:text-lg">
              <p>
                At Selvaggio Safaris, we believe the best journeys are not only
                about where you go, but how deeply you experience each place.
              </p>

              <p>
                From the sweeping plains of the Maasai Mara to the shadow of
                Kilimanjaro in Amboseli, every safari is shaped around your pace,
                your interests and the moments that make the journey truly yours.
              </p>
            </div>

            {/* Brand statement */}
            <div className="mt-10 border-l border-[#c4a454] pl-6">
              <p className="font-serif text-lg italic leading-8 text-[#111111]/80 sm:text-xl">
                "Wild places. Meaningful journeys. Memories that stay with you."
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/packages")}
                className="group inline-flex items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
              >
                Explore Our Safaris

                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => navigate("/about")}
                className="inline-flex items-center justify-center border border-[#111111]/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-all duration-300 hover:border-[#c4a454] hover:text-[#9f8236]"
              >
                Discover Selvaggio
              </button>
            </div>

            {/* Micro reassurance */}
            <p className="mt-5 text-xs leading-6 text-[#1c1c1c]/40">
              Private journeys · Flexible itineraries · Local expertise
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}