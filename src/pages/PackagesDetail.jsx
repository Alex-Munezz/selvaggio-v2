import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiTag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://127.0.0.1:5000/api/packages/${id}`
        );

        if (!response.ok) {
          throw new Error("Package not found");
        }

        const data = await response.json();

        setSelectedPackage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const formatCategory = (category) => {
    if (!category) return "Safari";

    return category
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatMoney = (amount, currency = "USD") => {
    if (
      amount === null ||
      amount === undefined ||
      Number.isNaN(Number(amount))
    ) {
      return null;
    }

    return `${currency} ${Number(amount).toLocaleString()}`;
  };

  const formatDate = (date) => {
    if (!date) return null;

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Selvaggio Safaris
          </span>

          <p className="mt-5 font-serif text-3xl text-[#111111]">
            Loading your journey...
          </p>
        </div>
      </main>
    );
  }

  if (error || !selectedPackage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Journey not found
          </p>

          <h1 className="mt-5 font-serif text-5xl text-[#111111]">
            We couldn't find that safari.
          </h1>

          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="mt-8 inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
          >
            <FiArrowLeft size={16} />
            Back to packages
          </button>
        </div>
      </main>
    );
  }

  const destinationNames =
    selectedPackage.destinations
      ?.map((item) =>
        typeof item === "string" ? item : item.name
      )
      .filter(Boolean)
      .join(" · ") || "Kenya";

  const days = Number(selectedPackage.duration_days || 0);
  const nights =
    selectedPackage.duration_nights !== null &&
    selectedPackage.duration_nights !== undefined
      ? Number(selectedPackage.duration_nights)
      : null;

  const durationLabel = `${days} ${
    days === 1 ? "Day" : "Days"
  }${
    nights !== null
      ? ` · ${nights} ${nights === 1 ? "Night" : "Nights"}`
      : ""
  }`;

const itinerary = [
  ...(selectedPackage.itinerary ||
    selectedPackage.itineraries ||
    []),
].sort((a, b) => a.day_number - b.day_number);

const prices =
  selectedPackage.prices ||
  selectedPackage.pricing ||
  [];

  const inclusions = selectedPackage.inclusions || [];
  const exclusions = selectedPackage.exclusions || [];
  const extras = selectedPackage.optional_extras || [];

  const startingPrice = formatMoney(
    selectedPackage.price,
    selectedPackage.currency
  );

  return (
    <main className="bg-[#f6f1e6]">
      {/* Hero */}
      <section className="relative min-h-[82vh] overflow-hidden bg-[#111111]">
        <div className="absolute inset-0">
          {selectedPackage.image ? (
            <img
              src={selectedPackage.image}
              alt={selectedPackage.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#111111] via-[#1c1c1c] to-[#2d2618]" />
          )}

          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(196,164,84,0.16),transparent_40%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl items-end px-6 pb-16 pt-40 lg:px-8 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <button
              type="button"
              onClick={() => navigate("/packages")}
              className="mb-8 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-[#c4a454]"
            >
              <FiArrowLeft size={14} />
              All journeys
            </button>

            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                <FiMapPin size={14} />
                {destinationNames}
              </span>

              <span className="h-1 w-1 rounded-full bg-white/30" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {formatCategory(selectedPackage.category)}
              </span>
            </div>

            <h1 className="mt-5 font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              {selectedPackage.name}
            </h1>

            {selectedPackage.short_description && (
              <p className="mt-6 max-w-3xl font-serif text-xl italic leading-8 text-white/70 sm:text-2xl">
                {selectedPackage.short_description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                <FiCalendar
                  size={15}
                  className="text-[#c4a454]"
                />

                {durationLabel}
              </span>

              {startingPrice && (
                <span className="flex items-center gap-3 font-serif text-xl text-[#e6d69a]">
                  <FiTag
                    size={16}
                    className="text-[#c4a454]"
                  />

                  From {startingPrice}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="relative z-20 px-6 lg:px-8">
        <div className="mx-auto -mt-8 grid max-w-7xl overflow-hidden bg-[#111111] shadow-2xl sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-white/10 p-7 sm:border-r lg:border-b-0">
            <FiCalendar
              size={20}
              className="text-[#c4a454]"
            />

            <span className="mt-5 block text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Duration
            </span>

            <p className="mt-2 font-serif text-xl text-white">
              {durationLabel}
            </p>
          </div>

          <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r">
            <FiMapPin
              size={20}
              className="text-[#c4a454]"
            />

            <span className="mt-5 block text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Destinations
            </span>

            <p className="mt-2 font-serif text-xl leading-7 text-white">
              {destinationNames}
            </p>
          </div>

          <div className="border-b border-white/10 p-7 sm:border-r sm:border-b-0">
            <FiTag
              size={20}
              className="text-[#c4a454]"
            />

            <span className="mt-5 block text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Safari Type
            </span>

            <p className="mt-2 font-serif text-xl text-white">
              {formatCategory(selectedPackage.category)}
            </p>
          </div>

          <div className="p-7">
            <FiUsers
              size={20}
              className="text-[#c4a454]"
            />

            <span className="mt-5 block text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Starting From
            </span>

            <p className="mt-2 font-serif text-xl text-[#e6d69a]">
              {startingPrice || "Custom pricing"}
            </p>
          </div>
        </div>
      </section>

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
                The Journey
              </span>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-7 text-[#111111]/50">
              A carefully planned safari designed around
              memorable landscapes, wildlife encounters and
              authentic Kenyan experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              A safari designed
              <span className="block italic text-[#c4a454]">
                for unforgettable moments.
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-[#111111]/60 sm:text-lg">
              {selectedPackage.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      {selectedPackage.highlights?.length > 0 && (
        <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-[#c4a454]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                    Journey Highlights
                  </span>
                </div>

                <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
                  What you'll
                  <span className="block italic text-[#c4a454]">
                    experience.
                  </span>
                </h2>
              </motion.div>

              <div className="grid border-t border-[#111111]/10 sm:grid-cols-2">
                {selectedPackage.highlights.map(
                  (highlight, index) => (
                    <motion.div
                      key={`${highlight}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
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

                        <div>
                          <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9f8236]/70">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <p className="mt-1 font-serif text-xl text-[#111111]">
                            {highlight}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Itinerary */}
      {itinerary.length > 0 && (
        <section className="bg-[#111111] px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                Your Itinerary
              </span>

              <h2 className="mt-5 font-serif text-4xl leading-[1.08] text-white sm:text-5xl">
                Day by day,
                <span className="italic text-[#e6d69a]">
                  {" "}
                  the adventure unfolds.
                </span>
              </h2>
            </div>

            <div className="mt-16">
              {itinerary.map((day, index) => (
                <motion.div
                  key={day.id || `${day.day_number}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                  }}
                  className="grid border-t border-white/10 py-8 md:grid-cols-[180px_1fr] md:gap-12"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                      Day{" "}
                      {String(day.day_number).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-white sm:text-3xl">
                      {day.title}
                    </h3>

                    {day.description && (
                      <p className="mt-4 max-w-3xl text-sm leading-8 text-white/50 sm:text-base">
                        {day.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {prices.length > 0 && (
        <section className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                  Safari Pricing
                </span>

                <h2 className="mt-5 font-serif text-4xl text-[#111111] sm:text-5xl">
                  Choose the option
                  <span className="block italic text-[#c4a454]">
                    that fits you.
                  </span>
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-[#111111]/50">
                  Rates vary by season, group size and
                  accommodation level. Select your preferred
                  travel dates during booking for final
                  pricing.
                </p>
              </div>

              <div className="space-y-6">
                {prices.map((price, index) => (
                  <motion.div
                    key={price.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    className="bg-white p-7 sm:p-9"
                  >
                    <div className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9f8236]">
                          {price.season_name ||
                            "Safari Rate"}
                        </span>

                        <h3 className="mt-2 font-serif text-2xl text-[#111111]">
                          {price.accommodation_level ||
                            "Standard"}
                        </h3>
                      </div>

                      {(price.start_date ||
                        price.end_date) && (
                        <div className="text-sm text-[#111111]/45">
                          {formatDate(
                            price.start_date
                          ) || "Open"}{" "}
                          —{" "}
                          {formatDate(price.end_date) ||
                            "Open"}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {[
                        ["1 Pax", price.price_1_pax],
                        ["2 Pax", price.price_2_pax],
                        ["3 Pax", price.price_3_pax],
                        ["4 Pax", price.price_4_pax],
                        ["5 Pax", price.price_5_pax],
                        ["6 Pax", price.price_6_pax],
                      ].map(([label, amount]) => {
                        const formatted =
                          formatMoney(
                            amount,
                            price.currency ||
                              selectedPackage.currency
                          );

                        if (!formatted) return null;

                        return (
                          <div
                            key={label}
                            className="border border-[#111111]/10 p-4"
                          >
                            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9f8236]">
                              {label}
                            </span>

                            <p className="mt-2 font-serif text-lg text-[#111111]">
                              {formatted}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {price.child_price !== null &&
                      price.child_price !==
                        undefined && (
                        <div className="mt-5 flex items-center justify-between border-t border-[#111111]/10 pt-5">
                          <span className="text-xs uppercase tracking-[0.18em] text-[#111111]/45">
                            Child Rate
                          </span>

                          <span className="font-serif text-xl text-[#c4a454]">
                            {formatMoney(
                              price.child_price,
                              price.currency ||
                                selectedPackage.currency
                            )}
                          </span>
                        </div>
                      )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Inclusions / Exclusions */}
      {(inclusions.length > 0 ||
        exclusions.length > 0) && (
        <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                What's Covered
              </span>

              <h2 className="mt-5 font-serif text-4xl text-[#111111] sm:text-5xl">
                Know what's
                <span className="italic text-[#c4a454]">
                  {" "}
                  included.
                </span>
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {inclusions.length > 0 && (
                <div className="bg-[#111111] p-8 sm:p-10">
                  <FiPlus
                    size={24}
                    className="text-[#c4a454]"
                  />

                  <h3 className="mt-6 font-serif text-3xl text-white">
                    Included
                  </h3>

                  <div className="mt-7">
                    {inclusions.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex gap-3 border-b border-white/10 py-4"
                      >
                        <FiCheck className="mt-1 shrink-0 text-[#c4a454]" />

                        <p className="text-sm leading-6 text-white/60">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exclusions.length > 0 && (
                <div className="border border-[#111111]/10 bg-[#f6f1e6] p-8 sm:p-10">
                  <FiMinus
                    size={24}
                    className="text-[#9f8236]"
                  />

                  <h3 className="mt-6 font-serif text-3xl text-[#111111]">
                    Not Included
                  </h3>

                  <div className="mt-7">
                    {exclusions.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex gap-3 border-b border-[#111111]/10 py-4"
                      >
                        <FiX className="mt-1 shrink-0 text-[#9f8236]" />

                        <p className="text-sm leading-6 text-[#111111]/55">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Optional Extras */}
      {extras.length > 0 && (
        <section className="bg-[#f6f1e6] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                  Make It Yours
                </span>

                <h2 className="mt-5 font-serif text-4xl text-[#111111]">
                  Optional
                  <span className="block italic text-[#c4a454]">
                    experiences.
                  </span>
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {extras.map((extra, index) => (
                  <div
                    key={`${extra}-${index}`}
                    className="flex items-center gap-4 border border-[#111111]/10 bg-white p-5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                      <FiPlus size={14} />
                    </span>

                    <p className="text-sm leading-6 text-[#111111]/65">
                      {extra}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Flexible Safari Note */}
      <section className="bg-[#111111] px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
            Made for you
          </span>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            This is a starting point,
            <span className="block italic text-[#e6d69a]">
              not a limitation.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
            Your safari can be shaped around your
            interests, preferred pace, accommodation
            style and the experiences you want most.
          </p>
        </motion.div>
      </section>

      {/* Booking CTA */}
      <section className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between gap-10 border-t border-[#111111]/10 pt-10 md:flex-row md:items-end"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                Ready when you are
              </span>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
                Let's make this
                <span className="italic text-[#c4a454]">
                  {" "}
                  your journey.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#111111]/50">
                Choose your travel dates, number of
                guests and any special requests. We'll
                take it from there.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/book?package=${selectedPackage.id}`
                )
              }
              className="group inline-flex w-fit shrink-0 items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
            >
              Book This Safari

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