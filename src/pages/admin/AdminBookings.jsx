import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiFilter,
  FiLogOut,
  FiRefreshCw,
  FiSearch,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import {
  API_URL,
  clearAdminSession,
  getAdminToken,
  getAdminUser,
} from "../../utils/adminAuth";

import SSS from "../../assets/SSS.png";


const bookingStatuses = [
  "",
  "pending",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
];

const paymentStatuses = [
  "",
  "unpaid",
  "partial",
  "paid",
];


const formatDate = (value) => {
  if (!value) return "—";

  return new Date(
    `${value}T00:00:00`
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


const formatCreatedDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};


const statusClass = (status) => {
  switch (status) {
    case "confirmed":
      return "border border-green-200 bg-green-50 text-green-700";

    case "completed":
      return "border border-blue-200 bg-blue-50 text-blue-700";

    case "cancelled":
      return "border border-red-200 bg-red-50 text-red-600";

    case "contacted":
      return "border border-purple-200 bg-purple-50 text-purple-700";

    default:
      return "border border-amber-200 bg-amber-50 text-amber-700";
  }
};


const paymentClass = (status) => {
  switch (status) {
    case "paid":
      return "border border-green-200 bg-green-50 text-green-700";

    case "partial":
      return "border border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border border-[#111111]/10 bg-[#111111]/5 text-[#111111]/55";
  }
};


const typeClass = (type) => {
  if (type === "serve-and-safari") {
    return "border border-[#c4a454]/30 bg-[#c4a454]/10 text-[#9f8236]";
  }

  return "border border-[#111111]/10 bg-white text-[#111111]/45";
};


const formatBookingType = (type) => {
  return type === "serve-and-safari"
    ? "Serve & Safari"
    : "Regular Safari";
};


const capitalize = (value) => {
  if (!value) return "";

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};


export default function AdminBookings() {
  const navigate = useNavigate();

  const adminUser = getAdminUser();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [
    paymentStatus,
    setPaymentStatus,
  ] = useState("");

  const [
    bookingType,
    setBookingType,
  ] = useState("");


  const fetchBookings =
    useCallback(async () => {
      setLoading(true);
      setError("");

      const token =
        getAdminToken();

      const params =
        new URLSearchParams();

      if (search.trim()) {
        params.append(
          "search",
          search.trim()
        );
      }

      if (status) {
        params.append(
          "status",
          status
        );
      }

      if (paymentStatus) {
        params.append(
          "payment_status",
          paymentStatus
        );
      }

      if (
        bookingType ===
        "serve-and-safari"
      ) {
        params.append(
          "category",
          "serve-and-safari"
        );
      }

      try {
        const queryString =
          params.toString();

        const url = `${API_URL}/api/admin/bookings${
          queryString
            ? `?${queryString}`
            : ""
        }`;

        const response =
          await fetch(url, {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          });

        const data =
          await response.json();

        if (response.status === 401) {
          clearAdminSession();

          navigate(
            "/admin/login",
            {
              replace: true,
            }
          );

          return;
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.msg ||
              "Unable to load bookings"
          );
        }

        const bookingList =
          data.bookings || [];

        setBookings(
          bookingType ===
          "regular-safari"
            ? bookingList.filter(
                (booking) =>
                  booking.booking_type !==
                  "serve-and-safari"
              )
            : bookingList
        );
      } catch (error) {
        setError(
          error.message ||
            "Unable to load bookings"
        );
      } finally {
        setLoading(false);
      }
    }, [
      bookingType,
      navigate,
      paymentStatus,
      search,
      status,
    ]);


  useEffect(() => {
    const timeout =
      setTimeout(() => {
        fetchBookings();
      }, 300);

    return () =>
      clearTimeout(timeout);
  }, [fetchBookings]);


  const handleLogout = () => {
    clearAdminSession();

    navigate(
      "/admin/login",
      {
        replace: true,
      }
    );
  };


  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPaymentStatus("");
    setBookingType("");
  };


  const hasFilters =
    search.trim() ||
    status ||
    paymentStatus ||
    bookingType;


  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "pending"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "confirmed"
    ).length;

  const paidBookings =
    bookings.filter(
      (booking) =>
        booking.payment_status ===
        "paid"
    ).length;

  const quoteRequiredBookings =
    bookings.filter(
      (booking) =>
        booking.quote_required
    ).length;


  const summaryCards = [
    {
      label: "Bookings Shown",
      value: totalBookings,
      icon: FiUsers,
    },
    {
      label: "Pending",
      value: pendingBookings,
      icon: FiClock,
    },
    {
      label: "Confirmed",
      value: confirmedBookings,
      icon: FiCheckCircle,
    },
    {
      label: "Fully Paid",
      value: paidBookings,
      icon: FiDollarSign,
    },
    {
      label: "Quote Required",
      value: quoteRequiredBookings,
      icon: FiDollarSign,
    },
  ];


  return (
    <main className="min-h-screen bg-[#f6f1e6]">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111111]/95 px-6 py-4 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <img
              src={SSS}
              alt="Selvaggio Safaris"
              className="h-11 w-11 object-contain"
            />

            <div>
              <span className="hidden text-[8px] font-semibold uppercase tracking-[0.32em] text-[#c4a454] sm:block">
                Selvaggio Safaris
              </span>

              <h1 className="font-serif text-xl text-white sm:mt-1 sm:text-2xl">
                Consultant Dashboard
              </h1>
            </div>
          </div>

          {/* User */}
          <div className="flex items-center gap-4">
            <div className="hidden border-r border-white/10 pr-5 text-right sm:block">
              <p className="text-sm font-medium text-white">
                {adminUser?.name ||
                  "Staff User"}
              </p>

              <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#c4a454]/70">
                {adminUser?.role ||
                  "consultant"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#c4a454]/60 hover:bg-[#c4a454]/10 hover:text-[#c4a454]"
              title="Logout"
              aria-label="Logout"
            >
              <FiLogOut
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </header>


      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="px-6 py-9 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#c4a454]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                  Safari Operations
                </span>
              </div>

              <h2 className="mt-4 font-serif text-4xl text-[#111111] sm:text-5xl">
                Bookings
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#111111]/45">
                Review guest reservations,
                monitor payments and manage
                each safari from enquiry to
                completion.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchBookings}
              disabled={loading}
              className="group flex w-fit items-center gap-2 border border-[#111111]/10 bg-white px-5 py-3 text-xs font-semibold text-[#111111] transition-all hover:border-[#c4a454] hover:text-[#9f8236] disabled:opacity-50"
            >
              <FiRefreshCw
                size={15}
                className={
                  loading
                    ? "animate-spin"
                    : "transition-transform duration-500 group-hover:rotate-180"
                }
              />

              Refresh
            </button>
          </div>


          {/* =================================================
              SUMMARY CARDS
          ================================================== */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {summaryCards.map(
              (item, index) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    key={item.label}
                    className={`relative overflow-hidden border p-6 transition-all duration-300 ${
                      index === 0
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[#111111]/10 bg-white hover:-translate-y-0.5 hover:border-[#c4a454]/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          index === 0
                            ? "bg-[#c4a454]/15 text-[#c4a454]"
                            : "bg-[#f6f1e6] text-[#9f8236]"
                        }`}
                      >
                        <Icon
                          size={17}
                        />
                      </span>

                      <span
                        className={`font-serif text-5xl ${
                          index === 0
                            ? "text-[#e6d69a]"
                            : "text-[#111111]"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>

                    <p
                      className={`mt-6 text-[9px] font-bold uppercase tracking-[0.25em] ${
                        index === 0
                          ? "text-white/35"
                          : "text-[#111111]/35"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                );
              }
            )}
          </div>


          {/* =================================================
              FILTERS
          ================================================== */}
          <div className="mt-8 border border-[#111111]/10 bg-white">
            <div className="flex items-center justify-between border-b border-[#111111]/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <FiFilter
                  size={14}
                  className="text-[#9f8236]"
                />

                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#111111]/45">
                  Find Bookings
                </span>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9f8236] transition-colors hover:text-[#111111]"
                >
                  <FiX size={13} />

                  Reset Filters
                </button>
              )}
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-[1fr_180px_200px_180px]">
              {/* Search */}
              <div className="relative">
                <FiSearch
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search guest, email, phone or reference..."
                  className="w-full border border-[#111111]/10 bg-[#f6f1e6]/35 py-3.5 pl-11 pr-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#111111]/30 focus:border-[#c4a454]"
                />
              </div>

              {/* Booking Type */}
              <select
                value={
                  bookingType
                }
                onChange={(e) =>
                  setBookingType(
                    e.target.value
                  )
                }
                className="border border-[#111111]/10 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#c4a454]"
              >
                <option value="">
                  All Safari Types
                </option>

                <option value="regular-safari">
                  Regular Safari
                </option>

                <option value="serve-and-safari">
                  Serve & Safari
                </option>
              </select>

              {/* Booking Status */}
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                className="border border-[#111111]/10 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#c4a454]"
              >
                {bookingStatuses.map(
                  (value) => (
                    <option
                      key={
                        value ||
                        "all"
                      }
                      value={value}
                    >
                      {value
                        ? capitalize(
                            value
                          )
                        : "All Booking Statuses"}
                    </option>
                  )
                )}
              </select>

              {/* Payment Status */}
              <select
                value={
                  paymentStatus
                }
                onChange={(e) =>
                  setPaymentStatus(
                    e.target.value
                  )
                }
                className="border border-[#111111]/10 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#c4a454]"
              >
                {paymentStatuses.map(
                  (value) => (
                    <option
                      key={
                        value ||
                        "all"
                      }
                      value={value}
                    >
                      {value
                        ? capitalize(
                            value
                          )
                        : "All Payments"}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>


          {/* Error */}
          {error && (
            <div className="mt-6 border border-red-200 bg-red-50 px-5 py-4">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}


          {/* Loading */}
          {loading && (
            <div className="py-24 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#111111]/10 border-t-[#c4a454]" />

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111]/35">
                Loading bookings
              </p>
            </div>
          )}


          {/* No Results */}
          {!loading &&
            !error &&
            bookings.length === 0 && (
              <div className="mt-6 border border-[#111111]/10 bg-white px-6 py-20 text-center">
                <FiSearch
                  size={26}
                  className="mx-auto text-[#c4a454]"
                />

                <h3 className="mt-5 font-serif text-3xl text-[#111111]">
                  No bookings found.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#111111]/40">
                  No bookings match your
                  current search and filters.
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={
                      resetFilters
                    }
                    className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9f8236]"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}


          {/* =================================================
              DESKTOP TABLE
          ================================================== */}
          {!loading &&
            bookings.length > 0 && (
              <div className="mt-6 hidden overflow-hidden border border-[#111111]/10 bg-white lg:block">
                <div className="flex items-center justify-between border-b border-[#111111]/10 px-5 py-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#111111]/35">
                    Booking Records
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#111111]/30">
                    {bookings.length}{" "}
                    {bookings.length ===
                    1
                      ? "booking"
                      : "bookings"}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1320px]">
                    <thead className="bg-[#111111]">
                      <tr>
                        {[
                          "Booking",
                          "Guest",
                          "Safari",
                          "Type",
                          "Travel",
                          "Guests",
                          "Total",
                          "Booking Status",
                          "Payment",
                          "",
                        ].map(
                          (
                            heading
                          ) => (
                            <th
                              key={
                                heading
                              }
                              className="px-5 py-4 text-left text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                            >
                              {
                                heading
                              }
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {bookings.map(
                        (
                          booking
                        ) => (
                          <tr
                            key={
                              booking.reference
                            }
                            className="group border-b border-[#111111]/10 transition-colors last:border-b-0 hover:bg-[#f6f1e6]/45"
                          >
                            {/* Booking */}
                            <td className="px-5 py-5">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/admin/bookings/${booking.reference}`
                                  )
                                }
                                className="text-left"
                              >
                                <p className="text-xs font-bold text-[#9f8236] transition-colors group-hover:text-[#111111]">
                                  {
                                    booking.reference
                                  }
                                </p>

                                <p className="mt-1 text-[9px] text-[#111111]/30">
                                  Received{" "}
                                  {formatCreatedDate(
                                    booking.created_at
                                  )}
                                </p>
                              </button>
                            </td>

                            {/* Guest */}
                            <td className="px-5 py-5">
                              <p className="text-sm font-semibold text-[#111111]">
                                {booking
                                  .customer
                                  ?.name ||
                                  "—"}
                              </p>

                              <p className="mt-1 max-w-[180px] truncate text-[11px] text-[#111111]/40">
                                {booking
                                  .customer
                                  ?.email ||
                                  "—"}
                              </p>
                            </td>

                            {/* Safari */}
                            <td className="max-w-[240px] px-5 py-5">
                              <p className="line-clamp-2 text-sm leading-5 text-[#111111]/70">
                                {booking
                                  .package
                                  ?.name ||
                                  "—"}
                              </p>
                            </td>

                            {/* Type */}
                            <td className="px-5 py-5">
                              <span
                                className={`inline-block whitespace-nowrap px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] ${typeClass(
                                  booking.booking_type
                                )}`}
                              >
                                {formatBookingType(
                                  booking.booking_type
                                )}
                              </span>

                              {booking.quote_required && (
                                <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.14em] text-[#9f8236]">
                                  Quote Required
                                </p>
                              )}
                            </td>

                            {/* Travel */}
                            <td className="px-5 py-5">
                              <div className="flex items-center gap-2 whitespace-nowrap text-xs text-[#111111]/60">
                                <FiCalendar
                                  size={
                                    14
                                  }
                                  className="text-[#c4a454]"
                                />

                                {formatDate(
                                  booking.travel_date
                                )}
                              </div>
                            </td>

                            {/* Guests */}
                            <td className="px-5 py-5">
                              <div className="flex items-center gap-2 text-sm text-[#111111]/60">
                                <FiUsers
                                  size={
                                    14
                                  }
                                  className="text-[#c4a454]"
                                />

                                {
                                  booking.guests
                                }
                              </div>
                            </td>

                            {/* Total */}
                            <td className="px-5 py-5">
                              {booking.total_amount !==
                              null ? (
                                <p className="whitespace-nowrap font-serif text-lg text-[#111111]">
                                  {
                                    booking.currency
                                  }{" "}
                                  {Number(
                                    booking.total_amount
                                  ).toLocaleString()}
                                </p>
                              ) : (
                                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#9f8236]">
                                  Quote Required
                                </span>
                              )}
                            </td>

                            {/* Booking status */}
                            <td className="px-5 py-5">
                              <span
                                className={`inline-block whitespace-nowrap px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] ${statusClass(
                                  booking.status
                                )}`}
                              >
                                {
                                  booking.status
                                }
                              </span>
                            </td>

                            {/* Payment */}
                            <td className="px-5 py-5">
                              <span
                                className={`inline-block whitespace-nowrap px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] ${paymentClass(
                                  booking.payment_status
                                )}`}
                              >
                                {
                                  booking.payment_status
                                }
                              </span>
                            </td>

                            {/* View */}
                            <td className="px-5 py-5">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/admin/bookings/${booking.reference}`
                                  )
                                }
                                className="group/view flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9f8236] transition-colors hover:text-[#111111]"
                              >
                                View

                                <FiArrowRight
                                  size={
                                    14
                                  }
                                  className="transition-transform duration-300 group-hover/view:translate-x-1"
                                />
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


          {/* =================================================
              MOBILE / TABLET CARDS
          ================================================== */}
          {!loading &&
            bookings.length > 0 && (
              <div className="mt-6 grid gap-4 lg:hidden">
                {bookings.map(
                  (booking) => (
                    <article
                      key={
                        booking.reference
                      }
                      className="border border-[#111111]/10 bg-white p-5 transition-all hover:border-[#c4a454]/50"
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9f8236]">
                            {
                              booking.reference
                            }
                          </p>

                          <span
                            className={`mt-2 inline-block px-2.5 py-1.5 text-[7px] font-bold uppercase tracking-[0.14em] ${typeClass(
                              booking.booking_type
                            )}`}
                          >
                            {formatBookingType(
                              booking.booking_type
                            )}
                          </span>

                          <h3 className="mt-3 font-serif text-2xl text-[#111111]">
                            {booking
                              .customer
                              ?.name ||
                              "Guest"}
                          </h3>

                          <p className="mt-1 text-xs text-[#111111]/40">
                            {
                              booking
                                .customer
                                ?.email
                            }
                          </p>
                        </div>

                        <span
                          className={`shrink-0 px-2.5 py-1.5 text-[7px] font-bold uppercase tracking-[0.15em] ${statusClass(
                            booking.status
                          )}`}
                        >
                          {
                            booking.status
                          }
                        </span>
                      </div>

                      {/* Safari */}
                      <div className="mt-6 border-t border-[#111111]/10 pt-5">
                        <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#111111]/30">
                          Safari
                        </span>

                        <p className="mt-2 text-sm leading-6 text-[#111111]/70">
                          {booking
                            .package
                            ?.name ||
                            "—"}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="mt-5 grid grid-cols-3 gap-3 border-y border-[#111111]/10 py-5">
                        <div>
                          <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#111111]/30">
                            Travel
                          </span>

                          <p className="mt-2 text-xs text-[#111111]">
                            {formatDate(
                              booking.travel_date
                            )}
                          </p>
                        </div>

                        <div>
                          <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#111111]/30">
                            Guests
                          </span>

                          <p className="mt-2 text-xs text-[#111111]">
                            {
                              booking.guests
                            }
                          </p>
                        </div>

                        <div>
                          <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#111111]/30">
                            Total
                          </span>

                          <p className="mt-2 text-xs font-semibold text-[#111111]">
                            {booking.total_amount !==
                            null
                              ? `${booking.currency} ${Number(
                                  booking.total_amount
                                ).toLocaleString()}`
                              : "Quote Required"}
                          </p>
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className="mt-5 flex items-center justify-between gap-4">
                        <span
                          className={`px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.15em] ${paymentClass(
                            booking.payment_status
                          )}`}
                        >
                          Payment:{" "}
                          {
                            booking.payment_status
                          }
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/bookings/${booking.reference}`
                            )
                          }
                          className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9f8236]"
                        >
                          Open Booking

                          <FiArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
        </div>
      </section>
    </main>
  );
}