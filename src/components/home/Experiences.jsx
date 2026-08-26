import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCamera,
  FiCompass,
  FiHeart,
  FiMap,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const experiences = [
  {
    number: "01",
    title: "Wildlife",
    description:
      "Get close to Kenya's extraordinary wildlife, from the Big Five to the smaller stories unfolding across the savannah.",
    icon: FiCamera,
  },
  {
    number: "02",
    title: "Safari",
    description:
      "Explore Kenya's wild landscapes on thoughtfully planned game drives led by people who know the land.",
    icon: FiCompass,
  },
  {
    number: "03",
    title: "Adventure",
    description:
      "Go beyond the ordinary with journeys that take you into dramatic landscapes and unforgettable moments.",
    icon: FiMap,
  },
  {
    number: "04",
    title: "Culture",
    description:
      "Meet communities, discover traditions and experience the people and stories that make Kenya unique.",
    icon: FiHeart,
  },
];

export default function Experiences() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#111111] px-6 py-24 text-white sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                Beyond the Safari
              </span>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-7 text-white/45">
              Every journey is an opportunity to see Kenya differently.
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              More than a destination.
              <span className="block italic text-[#e6d69a]">
                An experience.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Experience list */}
        <div className="mt-20 border-t border-white/10">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;

            return (
              <motion.div
                key={experience.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="group grid gap-6 border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[80px_0.7fr_1fr_60px] md:items-center md:px-5"
              >
                {/* Number */}
                <span className="text-xs font-semibold tracking-[0.2em] text-[#c4a454]/70">
                  {experience.number}
                </span>

                {/* Title */}
                <div className="flex items-center gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#c4a454] transition-all duration-300 group-hover:border-[#c4a454] group-hover:bg-[#c4a454] group-hover:text-black">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>

                  <h3 className="font-serif text-3xl transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                    {experience.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="max-w-xl text-sm leading-7 text-white/50 transition-colors duration-300 group-hover:text-white/70">
                  {experience.description}
                </p>

                {/* Arrow button */}
                <button
                  type="button"
                  onClick={() => navigate("/experiences")}
                  aria-label={`Explore ${experience.title}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 group-hover:border-[#c4a454] group-hover:bg-[#c4a454] group-hover:text-black"
                >
                  <FiArrowUpRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
        >
          <p className="max-w-md text-sm leading-7 text-white/40">
            Tell us what kind of adventure you're looking for and we'll help
            shape the journey around you.
          </p>

          <button
            type="button"
            onClick={() => navigate("/experiences")}
            className="group inline-flex w-fit items-center gap-3 bg-[#c4a454] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
          >
            Discover Our Experiences

            <FiArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}