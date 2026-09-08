import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiSun,
  FiNavigation,
  FiCamera,
  FiUsers,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://selvaggio-api.onrender.com/api/destinations/${id}`
        );

        if (!response.ok) {
          throw new Error("Destination not found");
        }

        const data = await response.json();
        setDestination(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Selvaggio Safaris
          </span>

          <p className="mt-5 font-serif text-3xl text-[#111111]">
            Loading destination...
          </p>
        </div>
      </main>
    );
  }

  if (error || !destination) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Destination not found
          </p>

          <h1 className="mt-5 font-serif text-5xl text-[#111111]">
            We couldn't find that destination.
          </h1>

          <button
            type="button"
            onClick={() => navigate("/destinations")}
            className="mt-8 inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
          >
            <FiArrowLeft size={16} />
            Back to destinations
          </button>
        </div>
      </main>
    );
  }

  const quickFacts = [
    {
      icon: FiCalendar,
      label: "Best Time",
      value: destination.best_time_to_visit,
    },
    {
      icon: FiClock,
      label: "Recommended Stay",
      value: destination.recommended_stay,
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: destination.location,
    },
  ].filter((item) => item.value);

  return (
    <main className="bg-[#f6f1e6]">
      {/* Hero */}
      <section className="relative min-h-[78vh] overflow-hidden bg-[#111111]">
        <div className="absolute inset-0">
          {destination.image ? (
            <img
              src={destination.image}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#111111] via-[#1c1c1c] to-[#2d2618]" />
          )}

          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(196,164,84,0.16),transparent_40%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-end px-6 pb-16 pt-40 lg:px-8 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <button
              type="button"
              onClick={() => navigate("/destinations")}
              className="mb-8 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-[#c4a454]"
            >
              <FiArrowLeft size={14} />
              All Destinations
            </button>

            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
              <FiMapPin size={14} />
              {destination.location}
            </div>

            <h1 className="mt-5 font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-8xl">
              {destination.name}
            </h1>

            {destination.short_description && (
              <p className="mt-6 max-w-2xl font-serif text-xl italic leading-8 text-white/70 sm:text-2xl">
                {destination.short_description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      {quickFacts.length > 0 && (
        <section className="relative z-20 px-6 lg:px-8">
          <div className="mx-auto -mt-8 grid max-w-7xl overflow-hidden bg-[#111111] shadow-2xl sm:grid-cols-3">
            {quickFacts.map((fact, index) => {
              const Icon = fact.icon;

              return (
                <div
                  key={fact.label}
                  className={`p-7 lg:p-9 ${
                    index !== quickFacts.length - 1
                      ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <Icon size={20} className="text-[#c4a454]" />

                  <span className="mt-5 block text-[9px] font-semibold uppercase tracking-[0.28em] text-white/40">
                    {fact.label}
                  </span>

                  <p className="mt-3 font-serif text-lg leading-7 text-white">
                    {fact.value}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Introduction */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Discover
              </span>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-7 text-[#1c1c1c]/50">
              Explore the landscapes, wildlife and character that make this
              destination one of Kenya's most memorable places.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              Experience
              <span className="italic text-[#c4a454]">
                {" "}
                {destination.name}.
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#1c1c1c]/60 sm:text-lg">
              {destination.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      {destination.highlights?.length > 0 && (
        <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                  Destination Highlights
                </span>

                <h2 className="mt-5 font-serif text-4xl text-[#111111] sm:text-5xl">
                  What makes it
                  <span className="block italic text-[#c4a454]">
                    unforgettable.
                  </span>
                </h2>
              </div>

              <div className="grid border-t border-[#111111]/10 sm:grid-cols-2">
                {destination.highlights.map((highlight, index) => (
                  <motion.div
                    key={`${highlight}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                    className="border-b border-[#111111]/10 py-7 sm:px-6"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                        <FiCheck size={15} />
                      </span>

                      <p className="font-serif text-xl text-[#111111]">
                        {highlight}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Wildlife + Activities */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {destination.wildlife_highlights?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] p-8 sm:p-10"
            >
              <FiCamera size={24} className="text-[#c4a454]" />

              <span className="mt-6 block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                Wildlife
              </span>

              <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
                Wildlife highlights
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {destination.wildlife_highlights.map((animal, index) => (
                  <div
                    key={`${animal}-${index}`}
                    className="flex items-center gap-3 border-b border-white/10 py-3 text-sm text-white/65"
                  >
                    <FiCheck className="shrink-0 text-[#c4a454]" />
                    {animal}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {destination.activities?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#c4a454] p-8 sm:p-10"
            >
              <FiNavigation size={24} className="text-black" />

              <span className="mt-6 block text-[10px] font-semibold uppercase tracking-[0.3em] text-black/60">
                Experiences
              </span>

              <h2 className="mt-3 font-serif text-3xl text-[#111111] sm:text-4xl">
                Things to do
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {destination.activities.map((activity, index) => (
                  <div
                    key={`${activity}-${index}`}
                    className="flex items-center gap-3 border-b border-black/15 py-3 text-sm text-black/70"
                  >
                    <FiCheck className="shrink-0 text-black" />
                    {activity}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Climate + Getting There */}
      {(destination.climate || destination.getting_there) && (
        <section className="bg-[#111111] px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                Know Before You Go
              </span>

              <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">
                Plan your
                <span className="italic text-[#e6d69a]"> journey.</span>
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {destination.climate && (
                <div className="border border-white/10 p-8 sm:p-10">
                  <FiSun size={24} className="text-[#c4a454]" />

                  <h3 className="mt-6 font-serif text-2xl text-white">
                    Climate
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/50">
                    {destination.climate}
                  </p>
                </div>
              )}

              {destination.getting_there && (
                <div className="border border-white/10 p-8 sm:p-10">
                  <FiNavigation size={24} className="text-[#c4a454]" />

                  <h3 className="mt-6 font-serif text-2xl text-white">
                    Getting there
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/50">
                    {destination.getting_there}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Travel Tips + Ideal For */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          {destination.travel_tips?.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Travel Tips
              </span>

              <h2 className="mt-5 font-serif text-4xl text-[#111111]">
                Travel prepared.
              </h2>

              <div className="mt-8">
                {destination.travel_tips.map((tip, index) => (
                  <div
                    key={`${tip}-${index}`}
                    className="flex gap-5 border-b border-black/10 py-5"
                  >
                    <span className="font-serif text-xl italic text-[#c4a454]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-7 text-[#111111]/60">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {destination.ideal_for?.length > 0 && (
            <div>
              <FiUsers size={24} className="text-[#c4a454]" />

              <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Ideal For
              </span>

              <h2 className="mt-5 font-serif text-4xl text-[#111111]">
                Who will love it.
              </h2>

              <div className="mt-8 flex flex-wrap gap-3">
                {destination.ideal_for.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="border border-[#c4a454]/40 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-4">
            <span className="h-px w-10 bg-[#c4a454]" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
              Explore Further
            </span>

            <span className="h-px w-10 bg-[#c4a454]" />
          </div>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Ready to experience
            <span className="block italic text-[#e6d69a]">
              {destination.name}?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Explore safari journeys that include this destination and find an
            experience that matches the way you want to travel.
          </p>

          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="group mt-9 inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
          >
            Explore Safaris

            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </section>
    </main>
  );
}