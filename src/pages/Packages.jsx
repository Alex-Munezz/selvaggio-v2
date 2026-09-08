import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCalendar,
  FiMapPin,
  FiSliders,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [destinationFilter, setDestinationFilter] =
    useState("all");
  const [durationFilter, setDurationFilter] =
    useState("all");
  const [priceFilter, setPriceFilter] =
    useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://selvaggio-api.onrender.com/api/packages"
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load safari packages"
          );
        }

        const data = await response.json();

        const packageList = Array.isArray(data)
          ? data
          : data.packages || [];

        const activePackages = packageList.filter(
          (pkg) => {
            const category = String(
              pkg.category || ""
            )
              .trim()
              .toLowerCase();

            return (
              pkg.active !== false &&
              category !== "serve-and-safari"
            );
          }
        );

        setPackages(activePackages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const getDestinationNames = (pkg) => {
    if (
      Array.isArray(pkg.destinations) &&
      pkg.destinations.length > 0
    ) {
      return pkg.destinations
        .map((destination) =>
          typeof destination === "string"
            ? destination
            : destination.name
        )
        .filter(Boolean);
    }

    if (pkg.destination) {
      return [pkg.destination];
    }

    return [];
  };

  const formatDestination = (pkg) => {
    const destinations = getDestinationNames(pkg);

    if (destinations.length > 0) {
      return destinations.join(" · ");
    }

    return "Kenya";
  };

  // const getDurationDays = (pkg) => {
  //   if (
  //     pkg.duration_days !== null &&
  //     pkg.duration_days !== undefined
  //   ) {
  //     return Number(pkg.duration_days);
  //   }

  //   if (pkg.duration) {
  //     const match = String(pkg.duration).match(/\d+/);

  //     if (match) {
  //       return Number(match[0]);
  //     }
  //   }

  //   return null;
  // };

  const formatDuration = (pkg) => {
    if (
      pkg.duration_days !== null &&
      pkg.duration_days !== undefined
    ) {
      const days = Number(pkg.duration_days);
      const nights =
        pkg.duration_nights !== null &&
        pkg.duration_nights !== undefined
          ? Number(pkg.duration_nights)
          : null;

      let duration = `${days} ${
        days === 1 ? "Day" : "Days"
      }`;

      if (nights !== null) {
        duration += ` · ${nights} ${
          nights === 1 ? "Night" : "Nights"
        }`;
      }

      return duration;
    }

    return pkg.duration || "Custom duration";
  };

  const formatCategory = (category) => {
    if (!category) {
      return "Safari";
    }

    return category
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  const formatPrice = (pkg) => {
    if (
      pkg.price === null ||
      pkg.price === undefined
    ) {
      return null;
    }

    const price = Number(pkg.price);

    if (Number.isNaN(price)) {
      return null;
    }

    return `${pkg.currency || "USD"} ${price.toLocaleString()}`;
  };

  const destinationOptions = useMemo(() => {
    const destinations = packages.flatMap((pkg) => {
      if (
        Array.isArray(pkg.destinations) &&
        pkg.destinations.length > 0
      ) {
        return pkg.destinations
          .map((destination) =>
            typeof destination === "string"
              ? destination
              : destination.name
          )
          .filter(Boolean);
      }

      return pkg.destination
        ? [pkg.destination]
        : [];
    });

    return [...new Set(destinations)].sort();
  }, [packages]);

  const categoryOptions = useMemo(() => {
    const categories = packages
      .map((pkg) => pkg.category)
      .filter(Boolean);

    return [...new Set(categories)].sort();
  }, [packages]);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      let destinationNames = [];

      if (
        Array.isArray(pkg.destinations) &&
        pkg.destinations.length > 0
      ) {
        destinationNames = pkg.destinations
          .map((destination) =>
            typeof destination === "string"
              ? destination
              : destination.name
          )
          .filter(Boolean);
      } else if (pkg.destination) {
        destinationNames = [pkg.destination];
      }

      let days = null;

      if (
        pkg.duration_days !== null &&
        pkg.duration_days !== undefined
      ) {
        days = Number(pkg.duration_days);
      } else if (pkg.duration) {
        const match = String(pkg.duration).match(
          /\d+/
        );

        if (match) {
          days = Number(match[0]);
        }
      }

      const price =
        pkg.price !== null &&
        pkg.price !== undefined &&
        !Number.isNaN(Number(pkg.price))
          ? Number(pkg.price)
          : null;

      const matchesDestination =
        destinationFilter === "all" ||
        destinationNames.includes(
          destinationFilter
        );

      let matchesDuration = true;

      if (durationFilter === "1") {
        matchesDuration = days === 1;
      }

      if (durationFilter === "2-3") {
        matchesDuration =
          days !== null &&
          days >= 2 &&
          days <= 3;
      }

      if (durationFilter === "4-5") {
        matchesDuration =
          days !== null &&
          days >= 4 &&
          days <= 5;
      }

      if (durationFilter === "6+") {
        matchesDuration =
          days !== null && days >= 6;
      }

      let matchesPrice = true;

      if (priceFilter === "under-500") {
        matchesPrice =
          price !== null && price < 500;
      }

      if (priceFilter === "500-1000") {
        matchesPrice =
          price !== null &&
          price >= 500 &&
          price <= 1000;
      }

      if (priceFilter === "1000+") {
        matchesPrice =
          price !== null && price > 1000;
      }

      const matchesCategory =
        categoryFilter === "all" ||
        pkg.category === categoryFilter;

      return (
        matchesDestination &&
        matchesDuration &&
        matchesPrice &&
        matchesCategory
      );
    });
  }, [
    packages,
    destinationFilter,
    durationFilter,
    priceFilter,
    categoryFilter,
  ]);

  const hasActiveFilters =
    destinationFilter !== "all" ||
    durationFilter !== "all" ||
    priceFilter !== "all" ||
    categoryFilter !== "all";

  const featuredPackage = useMemo(() => {
    return (
      packages.find((pkg) => pkg.featured) ||
      packages[0] ||
      null
    );
  }, [packages]);

  const visiblePackages = useMemo(() => {
    if (hasActiveFilters) {
      return filteredPackages;
    }

    if (!featuredPackage) {
      return packages;
    }

    return packages.filter(
      (pkg) => pkg.id !== featuredPackage.id
    );
  }, [
    packages,
    filteredPackages,
    featuredPackage,
    hasActiveFilters,
  ]);

  const resetFilters = () => {
    setDestinationFilter("all");
    setDurationFilter("all");
    setPriceFilter("all");
    setCategoryFilter("all");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Selvaggio Safaris
          </span>

          <p className="mt-5 font-serif text-3xl text-[#111111]">
            Loading journeys...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Selvaggio Safaris
          </span>

          <h1 className="mt-5 font-serif text-4xl text-[#111111]">
            We couldn't load the safari journeys.
          </h1>

          <p className="mt-5 text-sm text-[#111111]/50">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f6f1e6]">
      {/* Hero */}
      <section className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8 lg:pb-32">
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
                Curated Journeys
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Journeys designed

              <span className="block italic text-[#e6d69a]">
                around discovery.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Explore our carefully crafted safari
              experiences, created to bring you closer
              to Kenya's wildlife, landscapes and
              culture.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Selvaggio Safaris
            </span>

            <span className="text-right text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Wildlife · Adventure · Discovery
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-[#111111]/10 bg-[#f6f1e6] px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FiSliders
                  size={16}
                  className="text-[#c4a454]"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                  Find Your Journey
                </span>
              </div>

              <h2 className="mt-3 font-serif text-3xl text-[#111111]">
                Filter your safari.
              </h2>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#111111]/45">
                {filteredPackages.length}{" "}
                {filteredPackages.length === 1
                  ? "journey"
                  : "journeys"}{" "}
                found
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9f8236] transition-colors hover:text-[#111111]"
                >
                  <FiX size={14} />
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {/* Destination */}
            <div className="border border-[#111111]/5 bg-white p-4">
              <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                Destination
              </label>

              <select
                value={destinationFilter}
                onChange={(e) =>
                  setDestinationFilter(
                    e.target.value
                  )
                }
                className="w-full cursor-pointer bg-transparent text-sm text-[#111111] outline-none"
              >
                <option value="all">
                  All Destinations
                </option>

                {destinationOptions.map(
                  (destination) => (
                    <option
                      key={destination}
                      value={destination}
                    >
                      {destination}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Duration */}
            <div className="border border-[#111111]/5 bg-white p-4">
              <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                Travel Days
              </label>

              <select
                value={durationFilter}
                onChange={(e) =>
                  setDurationFilter(e.target.value)
                }
                className="w-full cursor-pointer bg-transparent text-sm text-[#111111] outline-none"
              >
                <option value="all">
                  Any Duration
                </option>

                <option value="1">
                  1 Day
                </option>

                <option value="2-3">
                  2–3 Days
                </option>

                <option value="4-5">
                  4–5 Days
                </option>

                <option value="6+">
                  6+ Days
                </option>
              </select>
            </div>

            {/* Price */}
            <div className="border border-[#111111]/5 bg-white p-4">
              <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                Price Range
              </label>

              <select
                value={priceFilter}
                onChange={(e) =>
                  setPriceFilter(e.target.value)
                }
                className="w-full cursor-pointer bg-transparent text-sm text-[#111111] outline-none"
              >
                <option value="all">
                  Any Price
                </option>

                <option value="under-500">
                  Under USD 500
                </option>

                <option value="500-1000">
                  USD 500 – 1,000
                </option>

                <option value="1000+">
                  USD 1,000+
                </option>
              </select>
            </div>

            {/* Category */}
            <div className="border border-[#111111]/5 bg-white p-4">
              <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                Safari Type
              </label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
                className="w-full cursor-pointer bg-transparent text-sm text-[#111111] outline-none"
              >
                <option value="all">
                  All Safari Types
                </option>

                {categoryOptions.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {formatCategory(category)}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Package */}
      {featuredPackage && !hasActiveFilters && (
        <section className="px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-center gap-4">
              <span className="h-px w-10 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Featured Journey
              </span>
            </div>

            <motion.article
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
                duration: 0.8,
              }}
              className="grid overflow-hidden bg-[#111111] lg:grid-cols-[1.15fr_0.85fr]"
            >
              {/* Image */}
              <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
                {featuredPackage.image ? (
                  <img
                    src={featuredPackage.image}
                    alt={featuredPackage.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#111111] via-[#1c1c1c] to-[#2d2618]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute bottom-7 left-7 flex max-w-[80%] items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white sm:bottom-10 sm:left-10">
                  <FiMapPin
                    size={14}
                    className="shrink-0 text-[#c4a454]"
                  />

                  {formatDestination(
                    featuredPackage
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                  {formatCategory(
                    featuredPackage.category
                  )}
                </span>

                <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
                  {featuredPackage.name}
                </h2>

                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <span className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/45">
                    <FiCalendar
                      size={14}
                      className="text-[#c4a454]"
                    />

                    {formatDuration(
                      featuredPackage
                    )}
                  </span>

                  {formatPrice(
                    featuredPackage
                  ) && (
                    <span className="font-serif text-xl text-[#e6d69a]">
                      From{" "}
                      {formatPrice(
                        featuredPackage
                      )}
                    </span>
                  )}
                </div>

                {(featuredPackage.short_description ||
                  featuredPackage.description) && (
                  <p className="mt-7 text-sm leading-7 text-white/55 sm:text-base">
                    {featuredPackage.short_description ||
                      featuredPackage.description}
                  </p>
                )}

                {featuredPackage.highlights?.length >
                  0 && (
                  <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-3 border-t border-white/10 pt-7 sm:grid-cols-2">
                    {featuredPackage.highlights
                      .slice(0, 6)
                      .map(
                        (
                          highlight,
                          index
                        ) => (
                          <span
                            key={`${highlight}-${index}`}
                            className="text-xs leading-5 text-white/55"
                          >
                            <span className="mr-2 text-[#c4a454]">
                              •
                            </span>

                            {highlight}
                          </span>
                        )
                      )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/packages/${featuredPackage.id}`
                    )
                  }
                  className="group mt-9 inline-flex w-fit items-center gap-3 bg-[#c4a454] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
                >
                  Explore Journey

                  <FiArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Package Results */}
      {visiblePackages.length > 0 && (
        <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#c4a454]" />

                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                  {hasActiveFilters
                    ? "Matching Journeys"
                    : "More Journeys"}
                </span>
              </div>

              <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
                {hasActiveFilters
                  ? "Safaris that match"
                  : "Find the journey"}

                <span className="block italic text-[#c4a454]">
                  {hasActiveFilters
                    ? "your preferences."
                    : "that feels like you."}
                </span>
              </h2>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {visiblePackages.map(
                (pkg, index) => (
                  <motion.article
                    key={pkg.id}
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
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.05,
                    }}
                    className="group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                      {pkg.image ? (
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#111111] via-[#1c1c1c] to-[#2d2618]" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                      <div className="absolute bottom-5 left-5 flex max-w-[85%] items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                        <FiMapPin
                          size={13}
                          className="shrink-0 text-[#c4a454]"
                        />

                        {formatDestination(pkg)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9f8236]">
                          {formatCategory(
                            pkg.category
                          )}
                        </span>

                        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#111111]/40">
                          <FiCalendar size={12} />

                          {formatDuration(pkg)}
                        </span>
                      </div>

                      <h3 className="mt-3 font-serif text-3xl leading-tight text-[#111111] sm:text-4xl">
                        {pkg.name}
                      </h3>

                      {(pkg.short_description ||
                        pkg.description) && (
                        <p className="mt-4 max-w-xl text-sm leading-7 text-[#111111]/55">
                          {pkg.short_description ||
                            pkg.description}
                        </p>
                      )}

                      <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-[#111111]/10 pt-5">
                        {formatPrice(pkg) ? (
                          <div>
                            <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9f8236]">
                              From
                            </span>

                            <span className="mt-1 block font-serif text-2xl text-[#111111]">
                              {formatPrice(pkg)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-serif text-lg text-[#111111]/50">
                            Custom pricing
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/packages/${pkg.id}`
                            )
                          }
                          className="group/link inline-flex items-center gap-3 border-b border-[#111111]/15 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#111111] transition-all hover:border-[#c4a454] hover:text-[#9f8236]"
                        >
                          View Journey

                          <FiArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover/link:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* No Filter Results */}
      {hasActiveFilters &&
        filteredPackages.length === 0 && (
          <section className="bg-white px-6 py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                No Matches
              </span>

              <h2 className="mt-5 font-serif text-4xl text-[#111111] sm:text-5xl">
                No journeys match

                <span className="block italic text-[#c4a454]">
                  those filters.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#111111]/50">
                Try changing your destination,
                travel days, price range or safari
                type.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-8 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
              >
                Show All Safaris
              </button>
            </div>
          </section>
        )}

      {/* Completely Empty Database */}
      {!hasActiveFilters &&
        packages.length === 0 && (
          <section className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                Safari Journeys
              </span>

              <h2 className="mt-5 font-serif text-4xl text-[#111111] sm:text-5xl">
                New adventures are coming soon.
              </h2>
            </div>
          </section>
        )}

      {/* Custom Safari CTA */}
      <section className="bg-[#f6f1e6] px-6 py-24 sm:py-32 lg:px-8 lg:py-36">
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
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-4">
            <span className="h-px w-10 bg-[#c4a454]" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
              Your Safari, Your Way
            </span>

            <span className="h-px w-10 bg-[#c4a454]" />
          </div>

          <h2 className="mt-7 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl lg:text-6xl">
            Don't see exactly

            <span className="block italic text-[#c4a454]">
              what you're looking for?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#111111]/55 sm:text-base">
            Every traveller is different. Tell us
            where you want to go, what you want to
            experience and how you want to travel —
            we'll help create something personal.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/book")
            }
            className="group mt-9 inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
          >
            Create Your Safari

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