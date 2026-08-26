import {
  useEffect,
  useState,
} from "react";

import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiSave,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  API_URL,
  clearAdminSession,
  getAdminToken,
} from "../../utils/adminAuth";

import SSS from "../../assets/SSS.png";


const statuses = [
  "pending",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
];


const formatDate = (value) => {
  if (!value) return "—";

  return new Date(
    `${value}T00:00:00`
  ).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
};


const formatCreatedDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};


const statusClass = (status) => {
  switch (status) {
    case "confirmed":
      return "border-green-200 bg-green-50 text-green-700";

    case "completed":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "cancelled":
      return "border-red-200 bg-red-50 text-red-600";

    case "contacted":
      return "border-purple-200 bg-purple-50 text-purple-700";

    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
};


const paymentClass = (status) => {
  switch (status) {
    case "paid":
      return "border-green-400/20 bg-green-400/10 text-green-300";

    case "partial":
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";

    default:
      return "border-white/10 bg-white/5 text-white/50";
  }
};


const statusIcon = (status) => {
  switch (status) {
    case "confirmed":
    case "completed":
      return FiCheckCircle;

    case "cancelled":
      return FiXCircle;

    default:
      return FiClock;
  }
};


const getWhatsAppNumber = (phone) => {
  if (!phone) return "";

  return phone.replace(/\D/g, "");
};


export default function AdminBookingDetail() {
  const { reference } =
    useParams();

  const navigate =
    useNavigate();

  const [booking, setBooking] =
    useState(null);

  const [status, setStatus] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  const loadBooking = async () => {
    const token =
      getAdminToken();

    try {
      const response = await fetch(
        `${API_URL}/api/admin/bookings/${reference}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

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
            "Unable to load booking"
        );
      }

      setBooking(
        data.booking
      );

      setStatus(
        data.booking.status
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to load booking"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadBooking();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);


  const updateStatus = async () => {
    const token =
      getAdminToken();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/bookings/${reference}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

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
            "Unable to update booking"
        );
      }

      setBooking(
        data.booking
      );

      setStatus(
        data.booking.status
      );

      setSuccess(
        "Booking status updated successfully."
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to update booking"
      );
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#111111]/10 border-t-[#c4a454]" />

          <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111]/35">
            Loading booking
          </p>
        </div>
      </main>
    );
  }


  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="text-center">
          <FiXCircle
            size={30}
            className="mx-auto text-[#c4a454]"
          />

          <h1 className="mt-5 font-serif text-3xl text-[#111111]">
            Booking not found.
          </h1>

          <p className="mt-3 text-sm text-[#111111]/40">
            The booking may have been removed
            or the reference is incorrect.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/bookings"
              )
            }
            className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9f8236]"
          >
            <FiArrowLeft size={15} />

            Back to bookings
          </button>
        </div>
      </main>
    );
  }


  const StatusIcon =
    statusIcon(
      booking.status
    );

  const whatsappNumber =
    getWhatsAppNumber(
      booking.customer?.phone
    );

  const whatsappMessage =
    encodeURIComponent(
      `Hello ${booking.customer?.name || ""}, this is Selvaggio Safaris regarding your booking ${booking.reference}.`
    );


  return (
    <main className="min-h-screen bg-[#f6f1e6]">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111111]/95 px-6 py-4 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">

          <div className="flex items-center gap-4">
            <img
              src={SSS}
              alt="Selvaggio Safaris"
              className="h-10 w-10 object-contain"
            />

            <div>
              <span className="hidden text-[8px] font-semibold uppercase tracking-[0.3em] text-[#c4a454] sm:block">
                Consultant Portal
              </span>

              <p className="font-serif text-lg text-white sm:mt-1">
                Booking Details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/bookings"
              )
            }
            className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c4a454] transition-colors hover:text-[#e6d69a]"
          >
            <FiArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span className="hidden sm:inline">
              Back to Bookings
            </span>

            <span className="sm:hidden">
              Back
            </span>
          </button>
        </div>
      </header>


      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="px-6 py-9 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">

          {/* Booking Heading */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#c4a454]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                  Booking Reference
                </span>
              </div>

              <h1 className="mt-4 font-serif text-4xl text-[#111111] sm:text-5xl">
                {booking.reference}
              </h1>

              <p className="mt-3 text-sm text-[#111111]/40">
                Received{" "}
                {formatCreatedDate(
                  booking.created_at
                )}
              </p>
            </div>


            {/* Status badges */}
            <div className="flex flex-wrap gap-3">

              <span
                className={`inline-flex items-center gap-2 border px-4 py-2 text-[8px] font-bold uppercase tracking-[0.17em] ${statusClass(
                  booking.status
                )}`}
              >
                <StatusIcon size={13} />

                {booking.status}
              </span>

              <span
                className={`border px-4 py-2 text-[8px] font-bold uppercase tracking-[0.17em] ${
                  booking.payment_status ===
                  "paid"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : booking.payment_status ===
                      "partial"
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-[#111111]/10 bg-white text-[#111111]/50"
                }`}
              >
                Payment:{" "}
                {booking.payment_status}
              </span>
            </div>
          </div>


          {/* Alerts */}
          {error && (
            <div className="mt-7 border border-red-200 bg-red-50 px-5 py-4">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}


          {success && (
            <div className="mt-7 flex items-center gap-3 border border-[#c4a454]/30 bg-white px-5 py-4">
              <FiCheckCircle
                size={17}
                className="shrink-0 text-[#9f8236]"
              />

              <p className="text-sm text-[#111111]/65">
                {success}
              </p>
            </div>
          )}


          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

            {/* =================================================
                MAIN COLUMN
            ================================================== */}
            <div className="space-y-6">

              {/* Guest */}
              <section className="border border-[#111111]/10 bg-white">

                <div className="border-b border-[#111111]/10 px-6 py-5 sm:px-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                    Guest Details
                  </span>

                  <h2 className="mt-2 font-serif text-3xl text-[#111111]">
                    {booking.customer?.name ||
                      "Guest"}
                  </h2>
                </div>


                <div className="grid sm:grid-cols-2">

                  <a
                    href={`mailto:${booking.customer?.email}`}
                    className="group flex items-center gap-4 border-b border-[#111111]/10 px-6 py-5 transition-colors hover:bg-[#f6f1e6]/50 sm:border-b-0 sm:border-r sm:px-8"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6f1e6] text-[#9f8236]">
                      <FiMail
                        size={16}
                      />
                    </span>

                    <div className="min-w-0">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#111111]/30">
                        Email
                      </span>

                      <p className="mt-1 truncate text-sm text-[#111111]/65 transition-colors group-hover:text-[#9f8236]">
                        {booking.customer?.email ||
                          "Not provided"}
                      </p>
                    </div>
                  </a>


                  <a
                    href={
                      booking.customer?.phone
                        ? `tel:${booking.customer.phone}`
                        : undefined
                    }
                    className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-[#f6f1e6]/50 sm:px-8"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6f1e6] text-[#9f8236]">
                      <FiPhone
                        size={16}
                      />
                    </span>

                    <div>
                      <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#111111]/30">
                        Phone
                      </span>

                      <p className="mt-1 text-sm text-[#111111]/65 transition-colors group-hover:text-[#9f8236]">
                        {booking.customer?.phone ||
                          "Not provided"}
                      </p>
                    </div>
                  </a>
                </div>


                {/* Actions */}
                <div className="flex flex-wrap gap-3 border-t border-[#111111]/10 bg-[#f6f1e6]/30 px-6 py-5 sm:px-8">

                  {booking.customer?.email && (
                    <a
                      href={`mailto:${booking.customer.email}?subject=${encodeURIComponent(
                        `Selvaggio Safaris Booking ${booking.reference}`
                      )}`}
                      className="inline-flex items-center gap-2 border border-[#111111]/10 bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:border-[#c4a454] hover:text-[#9f8236]"
                    >
                      <FiMail size={14} />

                      Email Guest
                    </a>
                  )}


                  {booking.customer?.phone && (
                    <a
                      href={`tel:${booking.customer.phone}`}
                      className="inline-flex items-center gap-2 border border-[#111111]/10 bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:border-[#c4a454] hover:text-[#9f8236]"
                    >
                      <FiPhone size={14} />

                      Call
                    </a>
                  )}


                  {whatsappNumber && (
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#111111] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#c4a454] transition-colors hover:bg-[#c4a454] hover:text-black"
                    >
                      <FiMessageCircle
                        size={14}
                      />

                      WhatsApp Guest
                    </a>
                  )}
                </div>
              </section>


              {/* Safari Details */}
              <section className="border border-[#111111]/10 bg-white p-6 sm:p-8">

                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                  Safari Details
                </span>

                <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-tight text-[#111111] sm:text-3xl">
                  {booking.package?.name ||
                    "Safari Package"}
                </h2>


                <div className="mt-8 grid gap-0 border-y border-[#111111]/10 sm:grid-cols-3">

                  {/* Travel */}
                  <div className="border-b border-[#111111]/10 py-6 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0">
                    <FiCalendar
                      size={18}
                      className="text-[#c4a454]"
                    />

                    <span className="mt-4 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#111111]/30">
                      Travel Date
                    </span>

                    <p className="mt-2 text-sm font-medium text-[#111111]">
                      {formatDate(
                        booking.travel_date
                      )}
                    </p>
                  </div>


                  {/* Return */}
                  <div className="border-b border-[#111111]/10 py-6 sm:border-b-0 sm:border-r sm:px-5">
                    <FiCalendar
                      size={18}
                      className="text-[#c4a454]"
                    />

                    <span className="mt-4 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#111111]/30">
                      Return Date
                    </span>

                    <p className="mt-2 text-sm font-medium text-[#111111]">
                      {formatDate(
                        booking.return_date
                      )}
                    </p>
                  </div>


                  {/* Guests */}
                  <div className="py-6 sm:pl-5">
                    <FiUsers
                      size={18}
                      className="text-[#c4a454]"
                    />

                    <span className="mt-4 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#111111]/30">
                      Travellers
                    </span>

                    <p className="mt-2 text-sm font-medium text-[#111111]">
                      {booking.adults}{" "}
                      adult
                      {booking.adults !== 1
                        ? "s"
                        : ""}

                      {booking.children > 0 &&
                        ` · ${booking.children} child${
                          booking.children !==
                          1
                            ? "ren"
                            : ""
                        }`}
                    </p>
                  </div>
                </div>
              </section>


              {/* Special Requests */}
              <section className="border border-[#111111]/10 bg-white p-6 sm:p-8">

                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                  Special Requests
                </span>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#111111]/60">
                  {booking.special_requests ||
                    "No special requests were provided by the guest."}
                </p>
              </section>
            </div>


            {/* =================================================
                SIDEBAR
            ================================================== */}
            <aside className="space-y-6">

              {/* Price */}
              <section className="relative overflow-hidden bg-[#111111] p-6 text-white sm:p-8">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(196,164,84,0.13),transparent_50%)]" />

                <div className="relative">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c4a454]">
                    Safari Total
                  </span>

                  <p className="mt-4 font-serif text-4xl text-[#e6d69a] sm:text-5xl">
                    {booking.currency}{" "}
                    {Number(
                      booking.total_amount ||
                        0
                    ).toLocaleString()}
                  </p>


                  <div className="mt-7 border-t border-white/10 pt-6">

                    <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/30">
                      Payment Status
                    </span>

                    <div className="mt-3">
                      <span
                        className={`inline-block border px-3 py-2 text-[8px] font-bold uppercase tracking-[0.16em] ${paymentClass(
                          booking.payment_status
                        )}`}
                      >
                        {
                          booking.payment_status
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </section>


              {/* Booking Management */}
              <section className="border border-[#111111]/10 bg-white">

                <div className="border-b border-[#111111]/10 px-6 py-5 sm:px-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                    Booking Management
                  </span>

                  <h3 className="mt-2 font-serif text-2xl text-[#111111]">
                    Update status
                  </h3>
                </div>


                <div className="p-6 sm:p-8">

                  <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/35">
                    Current Workflow Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(
                        e.target.value
                      );

                      setSuccess("");
                    }}
                    className="mt-3 w-full border border-[#111111]/10 bg-white px-4 py-3.5 text-sm capitalize text-[#111111] outline-none transition-colors focus:border-[#c4a454]"
                  >
                    {statuses.map(
                      (value) => (
                        <option
                          key={value}
                          value={value}
                        >
                          {value
                            .charAt(0)
                            .toUpperCase() +
                            value.slice(1)}
                        </option>
                      )
                    )}
                  </select>


                  <button
                    type="button"
                    onClick={
                      updateStatus
                    }
                    disabled={
                      saving ||
                      status ===
                        booking.status
                    }
                    className="group mt-4 flex w-full items-center justify-center gap-2 bg-[#c4a454] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiSave
                      size={15}
                    />

                    {saving
                      ? "Saving..."
                      : status ===
                        booking.status
                      ? "Status Up To Date"
                      : "Update Status"}
                  </button>


                  <div className="mt-6 border-t border-[#111111]/10 pt-5">
                    <p className="text-[10px] leading-5 text-[#111111]/35">
                      Use the booking workflow to
                      track progress from a new
                      reservation through guest
                      contact, confirmation and
                      completion.
                    </p>
                  </div>
                </div>
              </section>


              {/* Quick Reference */}
              <section className="border border-[#111111]/10 bg-[#f6f1e6] p-6">

                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#111111]/35">
                  Quick Reference
                </span>

                <p className="mt-3 font-mono text-sm font-semibold text-[#111111]">
                  {booking.reference}
                </p>

                <p className="mt-2 text-[10px] leading-5 text-[#111111]/40">
                  Use this reference when
                  communicating with the guest
                  about their reservation.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}