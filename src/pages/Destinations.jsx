import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Destinations() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:5000/api/destinations"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch destinations");
        }

        const data = await response.json();

        const items = Array.isArray(data)
          ? data
          : data.destinations || [];

        setDestinations(items);
      } catch (err) {
        setError("Unable to load destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <main className="bg-[#f6f1e6]">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(196,164,84,0.16),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                Explore Kenya
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Places that
              <span className="block italic text-[#e6d69a]">
                stay with you.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              From legendary wildlife reserves to landscapes shaped by
              mountains, people and time, discover the places that make Kenya
              unforgettable.
            </p>
          </motion.div>
        </div>

        {/* Bottom detail */}
        <div className="border-t border-[#c4a454]/15">
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

      {/* Destinations */}
      <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-10 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Our Destinations
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl"
            >
              Discover Kenya,
              <span className="italic text-[#c4a454]"> your way.</span>
            </motion.h2>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-20">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
                >
                  <div className="aspect-[4/3] animate-pulse bg-[#111111]/10" />

                  <div>
                    <div className="h-5 w-32 animate-pulse bg-[#111111]/10" />
                    <div className="mt-5 h-12 w-2/3 animate-pulse bg-[#111111]/10" />
                    <div className="mt-5 h-28 animate-pulse bg-[#111111]/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="border border-[#c4a454]/20 bg-white/40 p-8">
              <p className="text-sm text-[#1c1c1c]/50">
                {error}
              </p>
            </div>
          )}

          {/* Destination list */}
          {!loading && !error && destinations.length > 0 && (
            <div className="space-y-20">
              {destinations.map((destination, index) => (
                <motion.article
                  key={destination.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8 }}
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                    index % 2 !== 0
                      ? "lg:[&>*:first-child]:order-2"
                      : ""
                  }`}
                >
                  {/* Image */}
                  <div className="group relative aspect-[4/3] overflow-hidden bg-[#111111]">
                    {destination.image ? (
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#111111] via-[#1c1c1c] to-[#2d2618]">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]/30">
                          Selvaggio Safaris
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <span className="absolute bottom-6 left-6 font-serif text-7xl text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                      <FiMapPin size={13} />

                      <span>
                        {destination.location || "Kenya"}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-4xl text-[#111111] sm:text-5xl">
                      {destination.name}
                    </h3>

                    <p className="mt-5 text-base leading-8 text-[#1c1c1c]/60">
                      {destination.description}
                    </p>

                    {/* Highlights */}
                    {destination.highlights?.length > 0 && (
                      <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[#111111]/10 pt-6 sm:grid-cols-2">
                        {destination.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-center gap-3 text-xs text-[#1c1c1c]/55"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c4a454]" />

                            {highlight}
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/destinations/${destination.id}`)
                      }
                      className="group mt-8 inline-flex items-center gap-3 bg-[#c4a454] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
                    >
                      Explore {destination.name}

                      <FiArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!loading &&
            !error &&
            destinations.length === 0 && (
              <div className="border border-[#c4a454]/20 bg-white/40 p-8 text-center">
                <p className="text-sm text-[#1c1c1c]/50">
                  No destinations are available right now.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-4">
            <span className="h-px w-10 bg-[#c4a454]" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
              Your Journey
            </span>

            <span className="h-px w-10 bg-[#c4a454]" />
          </div>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Not sure where
            <span className="italic text-[#e6d69a]">
              {" "}
              to begin?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Explore our safari journeys and find the destinations,
            landscapes and experiences that feel right for you.
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