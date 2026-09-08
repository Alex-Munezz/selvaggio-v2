import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function FeaturedPackages() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://selvaggio-api.onrender.com/api/packages"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch packages");
        }

        const data = await response.json();

        const items = Array.isArray(data)
          ? data
          : data.packages || [];

        const featuredPackages = items
          .filter(
            (item) =>
              item.active &&
              // item.featured &&
              item.category !== "day-trip"
          )
          .slice(0, 3);

        setPackages(featuredPackages);
      } catch (err) {
        setError("Unable to load safari packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const getDuration = (pkg) => {
    if (pkg.duration_days === 1) {
      return "1 Day";
    }

    if (pkg.duration_nights > 0) {
      return `${pkg.duration_days} Days · ${pkg.duration_nights} Nights`;
    }

    return `${pkg.duration_days} Days`;
  };

  const getLocation = (pkg) => {
    if (!pkg.destinations?.length) {
      return "Kenya";
    }

    return pkg.destinations
      .map((destination) => destination.name)
      .join(" · ");
  };

  return (
    <section className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Curated Journeys
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl lg:text-6xl">
              Journeys made
              <span className="block italic text-[#c4a454]">
                for the curious.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#1c1c1c]/55">
            From iconic wildlife destinations to intimate escapes, discover
            journeys thoughtfully designed around the way you want to travel.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="aspect-[4/5] animate-pulse bg-[#111111]/10" />

                <div className="mt-6 h-6 w-2/3 animate-pulse bg-[#111111]/10" />

                <div className="mt-4 h-20 animate-pulse bg-[#111111]/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-16 border border-[#c4a454]/20 p-8">
            <p className="text-sm text-[#1c1c1c]/50">
              {error}
            </p>
          </div>
        )}

        {/* Packages */}
        {!loading && !error && packages.length > 0 && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.1,
                }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">
                  {pkg.image ? (
                    <img
                      src={pkg.image}
                      alt={pkg.name}
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

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Location */}
                  <div className="absolute left-5 top-5 flex max-w-[85%] items-center gap-2 bg-black/75 px-4 py-2 backdrop-blur-sm">
                    <FiMapPin
                      size={13}
                      className="shrink-0 text-[#c4a454]"
                    />

                    <span className="truncate text-[9px] font-semibold uppercase tracking-[0.25em] text-white">
                      {getLocation(pkg)}
                    </span>
                  </div>

                  {/* Number */}
                  <span className="absolute bottom-5 right-5 font-serif text-5xl text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Price */}
                  {pkg.price !== null && pkg.price !== undefined && (
                    <div className="absolute bottom-5 left-5">
                      <span className="block text-[8px] font-semibold uppercase tracking-[0.25em] text-white/50">
                        From
                      </span>

                      <span className="mt-1 block font-serif text-2xl text-[#e6d69a]">
                        {pkg.currency || "USD"} {pkg.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pt-6">
                  <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9f8236]">
                    <FiCalendar size={13} />

                    <span>{getDuration(pkg)}</span>
                  </div>

                  <h3 className="mt-3 font-serif text-3xl text-[#111111] transition-colors duration-300 group-hover:text-[#c4a454]">
                    {pkg.name}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#1c1c1c]/60">
                    {pkg.short_description}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/packages/${pkg.id}`)
                    }
                    className="group/button mt-6 inline-flex items-center gap-3 border-b border-[#111111]/20 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#111111] transition-all duration-300 hover:border-[#c4a454] hover:text-[#9f8236]"
                  >
                    View Journey

                    <FiArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/button:translate-x-1"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* No packages */}
        {!loading && !error && packages.length === 0 && (
          <div className="mt-16 border border-[#c4a454]/20 p-8 text-center">
            <p className="text-sm text-[#1c1c1c]/50">
              No featured safari journeys are available right now.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-16 border-t border-[#111111]/10 pt-8"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif text-xl italic text-[#111111]/70">
                Haven't found the journey you're looking for?
              </p>

              <p className="mt-2 text-xs leading-6 text-[#1c1c1c]/45">
                Explore our full collection of safari experiences across Kenya.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/packages")}
              className="group inline-flex w-fit items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
            >
              View All Safaris

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}