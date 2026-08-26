import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiMapPin,} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function LastMinuteBookings() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDayTrips = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:5000/api/packages"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch day trips");
        }

        const data = await response.json();

        const packages = Array.isArray(data)
          ? data
          : data.packages || [];

        const dayTrips = packages
          .filter(
            (item) =>
              item.category === "day-trip" &&
              item.active
          )
          .slice(0, 3);

        setTrips(dayTrips);
      } catch (err) {
        setError("Unable to load last minute trips.");
      } finally {
        setLoading(false);
      }
    };

    fetchDayTrips();
  }, []);

  return (
    <section className="bg-black px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Last Minute Bookings
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-[#ffffff] sm:text-5xl lg:text-6xl">
              One day.
              <span className="block italic text-[#c4a454]">
                Plenty to experience.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#ffffff]/60 sm:text-base">
              Short on time? Explore Nairobi and its
              wildlife with curated day trips designed
              for travellers ready to go.
            </p>
          </motion.div>

<button
  type="button"
  onClick={() => navigate("/packages")}
  className="group inline-flex w-fit items-center justify-center gap-3 bg-[#c4a454] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
>
  View All Safaris

  <FiArrowRight
    size={16}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse bg-[#111111]/10"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="mt-10 text-sm text-[#1c1c1c]/50">
            {error}
          </p>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip, index) => (
              <motion.article
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group overflow-hidden border border-[#c4a454]/20 bg-[#111111] shadow-sm"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#1c1c1c]">
                  {trip.image ? (
                    <img
                      src={trip.image}
                      alt={trip.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#111111] to-[#2a2418]">
                      <span className="text-xs uppercase tracking-[0.3em] text-[#c4a454]/35">
                        Selvaggio Safaris
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5">
                    <span className="bg-[#c4a454] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-black">
                      Book Today
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    <span className="flex items-center gap-2">
                      <FiClock size={13} className="text-[#c4a454]" />
                      {trip.duration_days} Day
                    </span>

                    <span className="flex items-center gap-2">
                      <FiMapPin size={13} className="text-[#c4a454]" />
                      Nairobi
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl leading-tight text-white">
                    {trip.name}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/50">
                    {trip.short_description}
                  </p>

                  <div className="mt-6 flex items-end justify-between border-t border-[#c4a454]/15 pt-5">
                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                        From
                      </span>

                      <p className="mt-1 font-serif text-2xl text-[#e6d69a]">
                        {trip.currency || "USD"}{" "}
                        {trip.price}
                      </p>
                    </div>

                    <Link
                      to={`/packages/${trip.id}`}
                      className="flex h-11 w-11 items-center justify-center border border-[#c4a454]/50 text-[#c4a454] transition-all duration-300 hover:bg-[#c4a454] hover:text-black"
                      aria-label={`View ${trip.name}`}
                    >
                      <FiArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && !error && trips.length === 0 && (
          <div className="mt-12 border border-[#c4a454]/20 bg-white/30 p-8 text-center">
            <p className="text-sm text-[#1c1c1c]/50">
              No day trips are available right now.
            </p>
          </div>
        )}
      </div>
    </section>
 );
}