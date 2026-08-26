import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCamera,
  FiCheck,
  FiHeart,
  FiMap,
  FiMapPin,
  FiSun,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import maraImage from "../assets/mara.JPG";
import amboseliImage from "../assets/amboseli.jpg";
import guestsImage from "../assets/guests.JPG";

const safariStyles = [
  {
    title: "Classic Wildlife",
    description:
      "Explore Kenya's iconic parks and reserves through expertly guided game drives, remarkable wildlife encounters and unforgettable landscapes.",
    icon: FiMap,
    image: maraImage,
  },
  {
    title: "Family Safaris",
    description:
      "Thoughtfully paced adventures designed for families to discover wildlife, explore together and create memories that last far beyond the journey.",
    icon: FiUsers,
    image: guestsImage,
  },
  {
    title: "Photography Safaris",
    description:
      "Take your time, follow the light and capture Kenya's wildlife and landscapes with journeys designed around patience and observation.",
    icon: FiCamera,
    image: amboseliImage,
  },
  {
    title: "Tailor-Made Journeys",
    description:
      "Shape your safari around the destinations, pace, accommodation and experiences that matter most to you.",
    icon: FiHeart,
    image: maraImage,
  },
];

const safariBenefits = [
  {
    icon: FiMapPin,
    title: "Iconic Destinations",
    description:
      "From Maasai Mara and Amboseli to Samburu and the Rift Valley.",
  },
  {
    icon: FiUsers,
    title: "Private Experiences",
    description:
      "Journeys designed around your group, interests and preferred pace.",
  },
  {
    icon: FiSun,
    title: "Local Expertise",
    description:
      "Safari knowledge built around Kenya's landscapes, wildlife and seasons.",
  },
  {
    icon: FiCheck,
    title: "Flexible Planning",
    description:
      "Choose an existing journey or let us help tailor one around you.",
  },
];

export default function Safaris() {
  const navigate = useNavigate();

  return (
    <main className="bg-[#f6f1e6]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(196,164,84,0.13),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8 lg:pb-32">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                The Selvaggio Experience
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Safari isn't just

              <span className="block italic text-[#e6d69a]">
                where you go.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              It's how you experience the journey —
              the landscapes, wildlife, people,
              quiet moments and unexpected encounters
              that make Kenya unforgettable.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  navigate("/packages")
                }
                className="group inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
              >
                Explore Safari Packages

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/destinations")
                }
                className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#c4a454] hover:text-[#c4a454]"
              >
                Explore Destinations
              </button>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Selvaggio Safaris
            </span>

            <span className="text-right text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Explore · Experience · Discover
            </span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Beyond the Ordinary
              </span>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-7 text-[#111111]/45">
              Great safaris aren't measured only
              by how many animals you see, but by
              how deeply you experience the places
              you visit.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h2 className="font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              Every safari should feel

              <span className="block italic text-[#c4a454]">
                personal.
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#111111]/60 sm:text-lg">
              There is no single way to experience
              Kenya. Some travellers want wildlife
              encounters from sunrise to sunset.
              Others want slow mornings, beautiful
              landscapes, cultural experiences and
              time to simply disconnect.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#111111]/60">
              At Selvaggio, we believe the best
              safari is the one that feels like it
              was designed around you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-[#111111]/10 bg-white px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {safariBenefits.map(
            (benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.06,
                  }}
                  className="border-b border-[#111111]/10 px-6 py-10 sm:border-r lg:border-b-0 last:border-r-0"
                >
                  <Icon
                    size={22}
                    className="text-[#c4a454]"
                  />

                  <h3 className="mt-5 font-serif text-xl text-[#111111]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[#111111]/45">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </section>

      {/* Safari Styles */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Safari Styles
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              Find your way

              <span className="block italic text-[#c4a454]">
                into the wild.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#111111]/50">
              Whether you're travelling for wildlife,
              photography, family time or a completely
              personalised experience, we'll help find
              the right journey.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {safariStyles.map(
              (safari, index) => {
                const Icon = safari.icon;

                return (
                  <motion.article
                    key={safari.title}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                    }}
                    className="group relative min-h-[470px] overflow-hidden bg-[#111111]"
                  >
                    {/* Image */}
                    <img
                      src={safari.image}
                      alt={safari.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/50" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,164,84,0.12),transparent_45%)]" />

                    {/* Number */}
                    <span className="absolute right-7 top-6 font-serif text-6xl text-white/15">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-9">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c4a454]/50 text-[#c4a454]">
                        <Icon size={18} />
                      </div>

                      <h3 className="mt-6 font-serif text-3xl text-white sm:text-4xl">
                        {safari.title}
                      </h3>

                      <p className="mt-4 max-w-lg text-sm leading-7 text-white/60">
                        {safari.description}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          navigate("/packages")
                        }
                        className="group/link mt-7 inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#c4a454] transition-colors hover:text-[#e6d69a]"
                      >
                        Explore Safaris

                        <FiArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </button>
                    </div>
                  </motion.article>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Journey Path */}
      <section className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Your Safari
              </span>

              <h2 className="mt-5 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
                From idea to

                <span className="block italic text-[#c4a454]">
                  unforgettable.
                </span>
              </h2>
            </div>

            <div>
              {[
                {
                  number: "01",
                  title: "Choose your journey",
                  text: "Browse safari packages or explore the destinations that inspire you.",
                },
                {
                  number: "02",
                  title: "Make it yours",
                  text: "Choose your travel date, group size and any special experiences.",
                },
                {
                  number: "03",
                  title: "Explore Kenya",
                  text: "Travel with experienced local support and enjoy the journey at your own pace.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="grid gap-4 border-t border-[#111111]/10 py-7 sm:grid-cols-[80px_1fr]"
                >
                  <span className="font-serif text-2xl italic text-[#c4a454]">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl text-[#111111]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#111111]/50">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden bg-[#111111] px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,164,84,0.1),transparent_45%)]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
            The Selvaggio Way
          </span>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Less rushing.

            <span className="block italic text-[#e6d69a]">
              More experiencing.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
            Some of the best safari moments can't
            be scheduled — an unexpected encounter,
            golden light over the plains or the
            silence before the next discovery.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex flex-col justify-between gap-10 border-t border-[#111111]/10 pt-10 md:flex-row md:items-end"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                Your Journey
              </span>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
                Ready to experience

                <span className="italic text-[#c4a454]">
                  {" "}
                  Kenya?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#111111]/50">
                Browse our safari packages or tell
                us how you'd like your journey to
                feel and we'll help shape it around
                you.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  navigate("/packages")
                }
                className="group inline-flex w-fit items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
              >
                Explore Packages

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/book")
                }
                className="inline-flex w-fit items-center border border-[#111111]/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:border-[#c4a454] hover:text-[#9f8236]"
              >
                Plan Your Safari
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}