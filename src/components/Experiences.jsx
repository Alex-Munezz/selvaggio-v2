import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import guests from "../assets/guests.JPG";
import landcruiser from "../assets/landcruiser.jpg";

const experiences = [
  {
    number: "01",
    title: "Game Drives",
    description:
      "Leave the city behind and enter the wild. Our game drives bring you close to Kenya's remarkable wildlife with experienced local guides leading the way.",
    image: guests,
  },
  {
    number: "02",
    title: "Private Safaris",
    description:
      "Your journey, your pace. Enjoy a private safari designed around your interests, schedule and the moments you want to remember.",
    image: landcruiser,
  },
];

export default function Experiences() {
  return (
    <section
      id="experience"
      className="bg-deep-forest px-6 py-24 text-white lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              The Selvaggio Experience
            </span>
          </div>

          <h2 className="text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
            More than a safari.
            <span className="block italic text-gold-light">
              A story worth telling.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            From the first sighting to the last sunset, every journey with
            Selvaggio is designed to bring you closer to Kenya.
          </p>
        </motion.div>

        {/* Experiences */}
        <div className="grid gap-6 lg:grid-cols-2">

          {experiences.map((experience, index) => (
            <motion.article
              key={experience.number}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
              }}
              className="group relative min-h-[620px] overflow-hidden"
            >
              {/* Image */}
              <img
                src={experience.image}
                alt={experience.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

              {/* Number */}
              <div className="absolute left-7 top-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-xs font-semibold tracking-widest text-gold-light">
                {experience.number}
              </div>

              {/* Arrow */}
              <div className="absolute right-7 top-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-deep-forest">
                <FiArrowUpRight size={20} />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
                  Selvaggio Safaris
                </p>

                <h3 className="text-4xl md:text-5xl">
                  {experience.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-base">
                  {experience.description}
                </p>

                <div className="mt-7 h-px w-full bg-white/20" />

                <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition group-hover:text-gold-light">
                  Discover the experience
                  <FiArrowUpRight />
                </div>

              </div>
            </motion.article>
          ))}

        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <p className="max-w-xl text-sm leading-7 text-white/50">
              Whether it is your first safari or your tenth, we create
              experiences that feel personal, effortless and unforgettable.
            </p>

            <a
              href="#book"
              className="group flex w-fit items-center gap-3 border border-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-gold hover:text-deep-forest"
            >
              Plan Your Safari
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  );
}