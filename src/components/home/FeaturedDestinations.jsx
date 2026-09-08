import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function FeaturedDestinations() {
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
          "https://selvaggio-api.onrender.com/api/destinations"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch destinations");
        }

        const data = await response.json();

        const items = Array.isArray(data)
          ? data
          : data.destinations || [];

        setDestinations(items.slice(0, 3));
      } catch (err) {
        setError("Unable to load destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="min-h-[520px] animate-pulse bg-[#111111]/10 sm:min-h-[600px]" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="min-h-[300px] animate-pulse bg-[#111111]/10" />
              <div className="min-h-[300px] animate-pulse bg-[#111111]/10" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-[#1c1c1c]/50">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) {
    return null;
  }

  const mainDestination = destinations[0];
  const supportingDestinations = destinations.slice(1);

  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Explore Kenya
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl lg:text-6xl">
              Destinations that
              <span className="block italic text-[#c4a454]">
                leave a mark.
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/destinations")}
            className="group inline-flex w-fit items-center gap-3 bg-[#c4a454] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
          >
            View All Destinations

            <FiArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>

        {/* Destination grid */}
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Main destination */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="group relative min-h-[520px] overflow-hidden bg-[#111111] sm:min-h-[600px]"
          >
            {mainDestination.image ? (
              <img
                src={mainDestination.image}
                alt={mainDestination.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1c1c1c] to-[#2d2618]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(196,164,84,0.12),transparent_45%)]" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#c4a454]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e6d69a]">
                  {mainDestination.location}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
                {mainDestination.name}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                {mainDestination.short_description ||
                  mainDestination.description}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(`/destinations/${mainDestination.id}`)
                }
                className="group/link mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-[#c4a454]"
              >
                Explore Destination

                <FiArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                />
              </button>
            </div>
          </motion.div>

          {/* Supporting destinations */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {supportingDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * (index + 1),
                }}
                className="group relative min-h-[300px] overflow-hidden bg-[#111111]"
              >
                {destination.image ? (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1c1c1c] to-[#2d2618]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#e6d69a]">
                    {destination.location}
                  </span>

                  <h3 className="mt-2 font-serif text-3xl text-white">
                    {destination.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="max-w-xs text-xs leading-6 text-white/65">
                      {destination.short_description ||
                        destination.description}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/destinations/${destination.id}`)
                      }
                      aria-label={`Explore ${destination.name}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/50 text-[#c4a454] transition-all duration-300 hover:bg-[#c4a454] hover:text-black"
                    >
                      <FiArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}