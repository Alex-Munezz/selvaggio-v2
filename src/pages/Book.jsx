import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

const inputStyles =
  "mt-2 w-full border border-[#111111]/10 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-all placeholder:text-[#111111]/30 focus:border-[#c4a454]";

export default function Book() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryPackageId =
    searchParams.get("package") || "";

  const [packages, setPackages] = useState([]);
  const [packagesLoading, setPackagesLoading] =
    useState(true);
  const [packagesError, setPackagesError] =
    useState("");

  const [
    selectedPackageId,
    setSelectedPackageId,
  ] = useState(queryPackageId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelDate: "",
    adults: 1,
    children: 0,
    message: "",
  });

  const [pricing, setPricing] = useState(null);
  const [priceLoading, setPriceLoading] =
    useState(false);
  const [priceError, setPriceError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);
  const [submitError, setSubmitError] =
    useState("");
  const [bookingResult, setBookingResult] =
    useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setPackagesLoading(true);
        setPackagesError("");

        const response = await axios.get(
          "http://127.0.0.1:5000/api/packages"
        );

        const packageList = Array.isArray(
          response.data
        )
          ? response.data
          : response.data.packages || [];

        setPackages(
          packageList.filter((pkg) => {
            const category = String(
              pkg.category || ""
            )
              .trim()
              .toLowerCase();

            return (
              pkg.active !== false &&
              category !==
                "serve-and-safari"
            );
          })
        );
      } catch (error) {
        setPackagesError(
          "Unable to load safari packages."
        );
      } finally {
        setPackagesLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    if (
      !selectedPackageId ||
      !formData.travelDate
    ) {
      setPricing(null);
      setPriceError("");
      return;
    }

    const previewPrice = async () => {
      try {
        setPriceLoading(true);
        setPriceError("");
        setPricing(null);

        const response = await axios.post(
          "http://127.0.0.1:5000/api/bookings/preview-price",
          {
            package_id: Number(
              selectedPackageId
            ),
            travel_date:
              formData.travelDate,
            adults: Number(
              formData.adults
            ),
            children: Number(
              formData.children
            ),
          }
        );

        setPricing(
          response.data.pricing ||
            response.data
        );
      } catch (error) {
        setPricing(null);

console.log("PRICE ERROR:", error);
console.log("BACKEND RESPONSE:", error.response?.data);

setPriceError(
  error.response?.data?.error ||
  error.response?.data?.message ||
  error.message ||
  "Unable to calculate price"
);
      } finally {
        setPriceLoading(false);
      }
    };

    previewPrice();
  }, [
    selectedPackageId,
    formData.travelDate,
    formData.adults,
    formData.children,
  ]);

  const selectedPackage = useMemo(() => {
    return (
      packages.find(
        (pkg) =>
          String(pkg.id) ===
          String(selectedPackageId)
      ) || null
    );
  }, [packages, selectedPackageId]);

  const isDayTrip = useMemo(() => {
  if (!selectedPackage) return false;

  return (
    Number(selectedPackage.duration_days) === 1 ||
    selectedPackage.category === "day-trip"
  );
}, [selectedPackage]);

const maxPartySize = useMemo(() => {
  if (!isDayTrip || !selectedPackage) {
    return 6;
  }

  const pricingRows = Array.isArray(
    selectedPackage.pricing
  )
    ? selectedPackage.pricing
    : [];

  let max = 0;

  pricingRows.forEach((row) => {
    for (let pax = 1; pax <= 8; pax += 1) {
      const value =
        row?.[`price_${pax}_pax`];

      if (
        value !== null &&
        value !== undefined
      ) {
        max = Math.max(max, pax);
      }
    }
  });

  return max || 6;
}, [isDayTrip, selectedPackage]);

  const formatCategory = (category) => {
    if (!category) return "Safari";

    return category
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  const formatDuration = (pkg) => {
    if (!pkg) return null;

    const days =
      pkg.duration_days !== null &&
      pkg.duration_days !== undefined
        ? Number(pkg.duration_days)
        : null;

    const nights =
      pkg.duration_nights !== null &&
      pkg.duration_nights !== undefined
        ? Number(pkg.duration_nights)
        : null;

    if (days === null) {
      return pkg.duration || null;
    }

    return `${days} ${
      days === 1 ? "Day" : "Days"
    }${
      nights !== null
        ? ` · ${nights} ${
            nights === 1
              ? "Night"
              : "Nights"
          }`
        : ""
    }`;
  };

  const formatDestination = (pkg) => {
    if (!pkg) return "Kenya";

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
        .filter(Boolean)
        .join(" · ");
    }

    return pkg.destination || "Kenya";
  };

  const formatMoney = (
    amount,
    currency = "USD"
  ) => {
    if (
      amount === null ||
      amount === undefined ||
      Number.isNaN(Number(amount))
    ) {
      return null;
    }

    return `${currency} ${Number(
      amount
    ).toLocaleString()}`;
  };

  const pricingTotal =
    pricing?.total_amount ??
    pricing?.amount ??
    null;

  const childrenTotal =
    pricing?.children_total ??
    (pricing?.child_rate &&
    Number(formData.children) > 0
      ? Number(pricing.child_rate) *
        Number(formData.children)
      : null);

  const today = (() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  })();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingResult(null);
    setSubmitError("");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePackageChange = (e) => {
    const value = e.target.value;

    setSelectedPackageId(value);
    setPricing(null);
    setPriceError("");
    setBookingResult(null);

    if (value) {
      navigate(
        `/book?package=${value}`,
        { replace: true }
      );
    } else {
      navigate("/book", {
        replace: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPackageId) {
      setSubmitError(
        "Please select a safari package."
      );
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim()
    ) {
      setSubmitError(
        "Please enter your full name."
      );
      return;
    }

    if (
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setSubmitError(
        "Please provide your email and phone number."
      );
      return;
    }

    if (!formData.travelDate) {
      setSubmitError(
        "Please choose your travel date."
      );
      return;
    }

    if (!pricing) {
      setSubmitError(
        "Please wait for your safari price to be calculated."
      );
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/bookings",
        {
          customer_name:
            `${formData.firstName} ${formData.lastName}`.trim(),
          customer_email:
            formData.email.trim(),
          customer_phone:
            formData.phone.trim(),
          package_id: Number(
            selectedPackageId
          ),
          travel_date:
            formData.travelDate,
          adults: Number(
            formData.adults
          ),
          children: Number(
            formData.children
          ),
          special_requests:
            formData.message.trim(),
        }
      );

      setBookingResult(response.data);

      if (
        response.data.reference &&
        response.data.payment_access_token
      ) {
        sessionStorage.setItem(
          `selvaggio_payment_access_${response.data.reference}`,
          response.data.payment_access_token
        );
      }

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      setSubmitError(
        error.response?.data?.error ||
          "Unable to create booking"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const bookingTotal =
    bookingResult?.pricing
      ?.total_amount ??
    bookingResult?.pricing?.amount ??
    bookingResult?.total_amount ??
    pricingTotal;

  const bookingCurrency =
    bookingResult?.pricing?.currency ||
    bookingResult?.currency ||
    pricing?.currency ||
    selectedPackage?.currency ||
    "USD";

  return (
    <main className="bg-[#f6f1e6]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(196,164,84,0.12),transparent_38%)]" />

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
                Start Your Journey
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Let's plan your

              <span className="block italic text-[#e6d69a]">
                Kenya story.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Choose your safari, travel date
              and group size. We'll calculate
              your journey price and reserve
              your adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking area */}
      <section className="px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* Left Information */}
          <motion.aside
            initial={{
              opacity: 0,
              x: -25,
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
              duration: 0.7,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                Your Booking
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              A few details

              <span className="block italic text-[#c4a454]">
                and you're on your way.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-7 text-[#111111]/55">
              Select your safari and travel
              date, then tell us who's joining
              you. Your price will update
              automatically.
            </p>

            {/* Selected package */}
            {selectedPackage && (
              <div className="mt-10 bg-[#111111] p-7">
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c4a454]">
                  Selected Journey
                </span>

                <h3 className="mt-3 font-serif text-2xl leading-tight text-white">
                  {selectedPackage.name}
                </h3>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3 text-xs text-white/55">
                    <FiMapPin className="shrink-0 text-[#c4a454]" />
                    {formatDestination(
                      selectedPackage
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-white/55">
                    <FiCalendar className="shrink-0 text-[#c4a454]" />
                    {formatDuration(
                      selectedPackage
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-white/55">
                    <FiTag className="shrink-0 text-[#c4a454]" />
                    {formatCategory(
                      selectedPackage.category
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 space-y-6 border-t border-[#111111]/10 pt-7">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                  <FiMessageCircle size={17} />
                </span>

                <div>
                  <h3 className="font-serif text-lg text-[#111111]">
                    Personal planning
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-[#111111]/45">
                    Tell us about any special
                    requests or experiences you
                    want included.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                  <FiMapPin size={17} />
                </span>

                <div>
                  <h3 className="font-serif text-lg text-[#111111]">
                    Local expertise
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-[#111111]/45">
                    Every journey is supported
                    by local safari knowledge
                    and experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                  <FiCheck size={17} />
                </span>

                <div>
                  <h3 className="font-serif text-lg text-[#111111]">
                    Secure reservation
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-[#111111]/45">
                    Your booking receives a
                    unique Selvaggio reference
                    for tracking and payment.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-[#111111]/10 pt-7">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#111111]/35">
                Prefer to talk directly?
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate("/contact")
                }
                className="group mt-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:text-[#9f8236]"
              >
                Contact Selvaggio

                <FiArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 25,
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
              duration: 0.7,
            }}
            className="bg-white p-6 shadow-sm sm:p-9 lg:p-12"
          >
            <div className="border-b border-[#111111]/10 pb-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                Safari Booking
              </span>

              <h2 className="mt-3 font-serif text-3xl text-[#111111]">
                Reserve your journey
              </h2>
            </div>

            <form
              className="mt-8"
              onSubmit={handleSubmit}
            >
              {/* Package */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Safari Package

                  <select
                    value={
                      selectedPackageId
                    }
                    onChange={
                      handlePackageChange
                    }
                    disabled={
                      packagesLoading
                    }
                    required
                    className={inputStyles}
                  >
                    <option value="">
                      {packagesLoading
                        ? "Loading safaris..."
                        : "Select your safari"}
                    </option>

                    {packages.map((pkg) => (
                      <option
                        key={pkg.id}
                        value={pkg.id}
                      >
                        {pkg.name}
                      </option>
                    ))}
                  </select>
                </label>

                {packagesError && (
                  <p className="mt-2 text-sm text-red-600">
                    {packagesError}
                  </p>
                )}
              </div>

              {/* Personal */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  First Name

                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    value={
                      formData.firstName
                    }
                    onChange={handleChange}
                    className={inputStyles}
                    required
                  />
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Last Name

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    value={
                      formData.lastName
                    }
                    onChange={handleChange}
                    className={inputStyles}
                    required
                  />
                </label>
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Email Address

                  <div className="relative">
                    <FiMail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputStyles} pl-11`}
                      required
                    />
                  </div>
                </label>
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Phone Number

                  <div className="relative">
                    <FiPhone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +254 792 464 627"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputStyles} pl-11`}
                      required
                    />
                  </div>
                </label>
              </div>

              {/* Trip Details */}
              <div className="mt-10 border-t border-[#111111]/10 pt-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                  Trip Details
                </span>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Adults

                  <div className="relative">
                    <FiUsers
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30"
                    />

                    <input
                      type="number"
                      name="adults"
                      min="1"
                        max={
                         isDayTrip
                           ? Math.max(
                               1,
                               maxPartySize -
                                 Number(
                                   formData.children || 0
                                 )
                             )
                           : 6
                       }
                      value={
                        formData.adults
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputStyles} pl-11`}
                      required
                    />
                  </div>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Children

                  <div className="relative">
                    <FiUsers
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30"
                    />

                    <input
                      type="number"
                      name="children"
                      min="0"
                        max={
                         isDayTrip
                           ? Math.max(
                               0,
                               maxPartySize -
                                 Number(
                                   formData.adults || 0
                                 )
                             )
                           : undefined
                       }
                      value={
                        formData.children
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputStyles} pl-11`}
                    />
                  </div>
                </label>
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Preferred Travel Date

                  <div className="relative">
                    <FiCalendar
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30"
                    />

                    <input
                      type="date"
                      name="travelDate"
                      min={today}
                      value={
                        formData.travelDate
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputStyles} pl-11`}
                      required
                    />
                  </div>
                </label>
              </div>

              {/* Price Loading */}
              {priceLoading && (
                <div className="mt-6 border border-[#c4a454]/20 bg-[#f6f1e6] p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9f8236]">
                    Calculating
                  </span>

                  <p className="mt-2 text-sm text-[#111111]/50">
                    Finding the correct
                    safari rate for your
                    travel date and group...
                  </p>
                </div>
              )}

              {priceError && (
                <div className="mt-6 border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-600">
                    {priceError}
                  </p>
                </div>
              )}

              {/* Price Summary */}
              {pricing &&
                !priceLoading && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-6 overflow-hidden border border-[#c4a454]/30"
                  >
                    <div className="bg-[#111111] px-6 py-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
                        Safari Price
                      </span>

                      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                        <h3 className="font-serif text-2xl text-white">
                          Your price summary
                        </h3>

                        {pricing.season_name && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {
                              pricing.season_name
                            }
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#f6f1e6] p-6">
                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between gap-5 border-b border-[#111111]/10 pb-4">
                          <span className="text-[#111111]/50">
                            Adults
                          </span>

                          <span className="font-medium text-[#111111]">
                            {
                              formData.adults
                            }
                          </span>
                        </div>

                        {pricing.adult_rate !==
                          null &&
                          pricing.adult_rate !==
                            undefined && (
                            <div className="flex justify-between gap-5 border-b border-[#111111]/10 pb-4">
                              <span className="text-[#111111]/50">
                                Adult rate
                              </span>

                              <span className="font-medium text-[#111111]">
                                {formatMoney(
                                  pricing.adult_rate,
                                  pricing.currency
                                )}
                              </span>
                            </div>
                          )}

                        {Number(
                          formData.children
                        ) > 0 && (
                          <>
                            <div className="flex justify-between gap-5 border-b border-[#111111]/10 pb-4">
                              <span className="text-[#111111]/50">
                                Children
                              </span>

                              <span className="font-medium text-[#111111]">
                                {
                                  formData.children
                                }
                              </span>
                            </div>

                            {pricing.child_rate !==
                              null &&
                              pricing.child_rate !==
                                undefined && (
                                <div className="flex justify-between gap-5 border-b border-[#111111]/10 pb-4">
                                  <span className="text-[#111111]/50">
                                    Child rate
                                  </span>

                                  <span className="font-medium text-[#111111]">
                                    {formatMoney(
                                      pricing.child_rate,
                                      pricing.currency
                                    )}
                                  </span>
                                </div>
                              )}

                            {childrenTotal !==
                              null && (
                              <div className="flex justify-between gap-5 border-b border-[#111111]/10 pb-4">
                                <span className="text-[#111111]/50">
                                  Children
                                  total
                                </span>

                                <span className="font-medium text-[#111111]">
                                  {formatMoney(
                                    childrenTotal,
                                    pricing.currency
                                  )}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {pricing.accommodation_level && (
                          <div className="flex justify-between gap-5 border-b border-[#111111]/10 pb-4">
                            <span className="text-[#111111]/50">
                              Accommodation
                            </span>

                            <span className="text-right font-medium text-[#111111]">
                              {
                                pricing.accommodation_level
                              }
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-5 border-t border-[#111111]/15 pt-6">
                        <div>
                          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9f8236]">
                            Total Safari Price
                          </span>

                          <p className="mt-2 font-serif text-3xl text-[#111111]">
                            {formatMoney(
                              pricingTotal,
                              pricing.currency
                            )}
                          </p>
                        </div>

                        <FiCheck
                          size={24}
                          className="text-[#c4a454]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

              {/* Message */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Special Requests

                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Dietary requirements, celebrations, accessibility needs or anything else we should know..."
                    value={
                      formData.message
                    }
                    onChange={
                      handleChange
                    }
                    className={`${inputStyles} resize-none`}
                  />
                </label>
              </div>

              {/* Error */}
              {submitError && (
                <div className="mt-6 border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-600">
                    {submitError}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  submitting ||
                  !pricing ||
                  priceLoading
                }
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting
                  ? "Creating Booking..."
                  : "Reserve This Safari"}

                {!submitting && (
                  <FiArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>

              <p className="mt-5 text-center text-[10px] leading-5 text-[#111111]/35">
                Your booking price is
                calculated by the Selvaggio
                booking system using your
                selected travel date and group
                size.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Booking Success */}
      {bookingResult && (
        <section className="bg-[#111111] px-6 py-24 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
              <FiCheck size={24} />
            </span>

            <span className="mt-7 block text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
              Booking Created
            </span>

            <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">
              Your safari is

              <span className="block italic text-[#e6d69a]">
                officially reserved.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45">
              Keep your booking reference
              somewhere safe. You'll use it
              when managing or paying for
              your safari.
            </p>

            <div className="mx-auto mt-10 grid max-w-2xl border border-white/10 sm:grid-cols-2">
              <div className="border-b border-white/10 p-6 sm:border-b-0 sm:border-r">
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Booking Reference
                </span>

                <p className="mt-3 font-serif text-2xl text-[#e6d69a]">
                  {
                    bookingResult.reference
                  }
                </p>
              </div>

              <div className="p-6">
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Safari Total
                </span>

                <p className="mt-3 font-serif text-2xl text-white">
                  {formatMoney(
                    bookingTotal,
                    bookingCurrency
                  )}
                </p>
              </div>

            </div>
            {/* <button
  type="button"
  onClick={() =>
    navigate(
      `/payment/${bookingResult.reference}`
    )
  }
  className="group mt-10 inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
>
  Continue to Payment

  <FiArrowRight
    size={17}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</button> */}
          </motion.div>
          
        </section>
      )}

      {/* Bottom Reassurance */}
      <section className="bg-[#f6f1e6] px-6 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
            Need Inspiration?
          </span>

          <h2 className="mt-6 font-serif text-3xl leading-[1.1] text-[#111111] sm:text-4xl">
            Not sure which safari
            suits you?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#111111]/45">
            Explore our destinations and
            safari journeys first, then come
            back when something catches your
            eye.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/destinations")
            }
            className="group mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9f8236] transition-colors hover:text-[#111111]"
          >
            Explore Destinations

            <FiArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>
    </main>
  );
}