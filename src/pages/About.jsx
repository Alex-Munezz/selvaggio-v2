import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCompass,
  FiHeart,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import guestsImage from "../assets/guests.JPG";
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

const experiences = [
  {
    number: "01",
    title: "Safari Journeys",
    description:
      "Private wildlife journeys across Kenya's most remarkable parks, reserves and landscapes.",
    action: "Explore Safaris",
    path: "/safaris",
    icon: FiCompass,
  },
  {
    number: "02",
    title: "Serve & Safari",
    description:
      "Meaningful journeys that combine community service, cultural connection and unforgettable safari experiences.",
    action: "Discover Serve & Safari",
    path: "/serve-and-safari",
    icon: FiHeart,
  },
  {
    number: "03",
    title: "Transfers",
    description:
      "Reliable airport transfers, group transportation and private travel support throughout your journey in Kenya.",
    action: "Explore Transfers",
    path: "/transfers",
    icon: FiTruck,
  },
];

export default function About() {
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
                About Selvaggio
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              We don't just

              <span className="block italic text-[#e6d69a]">
                take you there.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              We create meaningful journeys through
              Kenya — connecting people with wildlife,
              landscapes, communities and experiences
              worth remembering.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Selvaggio Safaris
            </span>

            <span className="text-right text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Explore · Experience · Inspire
            </span>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={guestsImage}
                alt="Guests enjoying a Selvaggio safari experience"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 hidden h-32 w-32 border border-[#c4a454]/40 sm:block lg:-right-8" />

            <div className="absolute bottom-6 left-6 bg-[#111111] px-6 py-5 sm:bottom-8 sm:left-8">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                Our Home
              </span>

              <p className="mt-2 font-serif text-2xl text-white">
                Kenya
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Our Story
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              Kenya is more than

              <span className="block italic text-[#c4a454]">
                a destination.
              </span>
            </h2>

            <p className="mt-8 text-base leading-8 text-[#111111]/60 sm:text-lg">
              It is a feeling. The first sight of
              wildlife across an open savannah. The
              warmth of a local welcome. The quiet of
              sunrise in the bush. The stories shared
              after a day of exploration.
            </p>

            <p className="mt-5 text-base leading-8 text-[#111111]/60">
              Selvaggio exists to help travellers
              experience those moments in a way that
              feels genuine, comfortable and
              completely their own.
            </p>

            <p className="mt-5 text-base leading-8 text-[#111111]/60">
              Whether you're here for safari,
              service, transportation or a little of
              everything, our goal remains the same:
              to help you experience Kenya with
              confidence, connection and purpose.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#111111]/10 pt-7">
              <div>
                <span className="block font-serif text-3xl text-[#111111]">
                  Kenya
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111]/35">
                  Our home
                </span>
              </div>

              <div className="border-l border-[#111111]/10 pl-6">
                <span className="block font-serif text-3xl text-[#111111]">
                  People
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111]/35">
                  At the heart of it
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-[#111111] px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                What We Do
              </span>

              <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-white sm:text-5xl">
                More than

                <span className="block italic text-[#e6d69a]">
                  one kind of journey.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
                From the moment you arrive to the
                moment you leave, Selvaggio can help
                shape the experience around how you
                want to travel.
              </p>
            </div>

            <div>
              {experiences.map((experience, index) => {
                const Icon = experience.icon;

                return (
                  <motion.div
                    key={experience.title}
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
                      delay: index * 0.08,
                    }}
                    className="grid gap-6 border-t border-white/10 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-center"
                  >
                    <span className="font-serif text-2xl italic text-[#c4a454]">
                      {experience.number}
                    </span>

                    <div>
                      <div className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className="text-[#c4a454]"
                        />

                        <h3 className="font-serif text-2xl text-white">
                          {experience.title}
                        </h3>
                      </div>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/45">
                        {experience.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(experience.path)
                      }
                      className="group inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4a454] transition-colors hover:text-[#e6d69a]"
                    >
                      {experience.action}

                      <FiArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                What We Believe
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              The values behind

              <span className="block italic text-[#c4a454]">
                every journey.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid border-t border-[#111111]/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
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
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="border-b border-[#111111]/10 py-9 sm:px-7 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                    <Icon size={18} />
                  </span>

                  <span className="mt-7 block text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]/70">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h3 className="mt-2 font-serif text-2xl text-[#111111]">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#111111]/50">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kenya */}
      <section className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Our Kenya
              </span>
            </div>

            <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl lg:text-6xl">
              From the savannah

              <span className="block italic text-[#c4a454]">
                to the city and beyond.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#111111]/55">
              Kenya is wonderfully diverse. From the
              vast grasslands of the Maasai Mara to
              Amboseli's views of Kilimanjaro,
              northern Kenya's dramatic wilderness,
              the Rift Valley and the energy of
              Nairobi, every region reveals a
              different character.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#111111]/55">
              We want our guests to experience more
              than the postcard — to slow down,
              explore deeply and understand what
              makes each place special.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/destinations")
              }
              className="group mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9f8236] transition-colors hover:text-[#111111]"
            >
              Explore Destinations

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden sm:aspect-[4/4.5]">
              <img
                src={amboseliImage}
                alt="Kenyan safari landscape"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden h-28 w-28 border border-[#c4a454]/30 sm:block lg:-left-8" />
          </motion.div>
        </div>
      </section>

      {/* Why Selvaggio */}
      <section className="relative overflow-hidden bg-[#111111] px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,164,84,0.10),transparent_45%)]" />

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
            Why Selvaggio
          </span>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Come as a traveller.

            <span className="block italic text-[#e6d69a]">
              Leave with a story.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
            We don't believe travel should feel like
            a race from one attraction to another.
            We believe in giving you space to notice,
            explore, connect and simply enjoy being
            there.
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl border-y border-white/10 sm:grid-cols-3">
            <div className="border-b border-white/10 p-6 sm:border-b-0 sm:border-r">
              <span className="font-serif text-2xl text-[#e6d69a]">
                Local
              </span>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/30">
                Knowledge
              </p>
            </div>

            <div className="border-b border-white/10 p-6 sm:border-b-0 sm:border-r">
              <span className="font-serif text-2xl text-[#e6d69a]">
                Personal
              </span>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/30">
                Service
              </p>
            </div>

            <div className="p-6">
              <span className="font-serif text-2xl text-[#e6d69a]">
                Thoughtful
              </span>

              <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/30">
                Journeys
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
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
                Your Kenya Story
              </span>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
                Ready to experience Kenya

                <span className="italic text-[#c4a454]">
                  {" "}
                  differently?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#111111]/50">
                Whether you're planning a safari,
                Serve & Safari journey or need
                reliable travel support, we're ready
                to help.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/book")
              }
              className="group inline-flex w-fit shrink-0 items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
            >
              Start Your Journey

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}