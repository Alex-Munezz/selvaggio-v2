import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  motion,
} from "framer-motion";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";


const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:5000";


const organisationTypes = [
  "Church",
  "NGO",
  "School",
  "Medical Team",
  "Volunteer Group",
  "Organisation",
  "Other",
];


const serviceOptions = [
  {
    value: "airport-transfer",
    label: "Airport Transfers",
  },
  {
    value: "daily-transport",
    label: "Daily Mission Transport",
  },
  {
    value: "hotel-transfer",
    label: "Hotel Transfers",
  },
  {
    value: "luggage-assistance",
    label: "Luggage Assistance",
  },
  {
    value: "multi-location-transport",
    label: "Multi-Location Transport",
  },
  {
    value: "safari-extension",
    label: "Safari Extension",
  },
];


const inputClass =
  "mt-2 w-full border border-[#111111]/10 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#111111]/25 focus:border-[#c4a454]";


const labelClass =
  "text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/40";


const formatDateValue = (date) => {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


const calculateReturnDate = (
  startDate,
  durationDays
) => {
  if (
    !startDate ||
    !durationDays
  ) {
    return "";
  }

  const date = new Date(
    `${startDate}T00:00:00`
  );

  date.setDate(
    date.getDate() +
      Number(durationDays) -
      1
  );

  return formatDateValue(
    date
  );
};


export default function ServeSafariBook() {
  const navigate =
    useNavigate();

  const [searchParams] =
    useSearchParams();

  const queryPackage =
    searchParams.get("package") ||
    "";


  const [packages, setPackages] =
    useState([]);

  const [
    selectedPackageId,
    setSelectedPackageId,
  ] = useState(
    queryPackage
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    bookingResult,
    setBookingResult,
  ] = useState(null);


  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",

      adults: 5,
      children: 0,

      organisationName: "",
      organisationType: "",
      missionLocation: "",

      missionStartDate: "",
      missionEndDate: "",

      safariStartDate: "",

      arrivalFlightNumber: "",
      arrivalDate: "",
      arrivalTime: "",

      departureFlightNumber: "",
      departureDate: "",
      departureTime: "",

      serviceNeeds: [
        "safari-extension",
      ],

      transportNotes: "",
      specialRequests: "",
    });


  useEffect(() => {
    const fetchPackages =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await axios.get(
              `${API_URL}/api/packages?category=serve-and-safari&active=true`
            );

          const packageList =
            Array.isArray(
              response.data
            )
              ? response.data
              : [];

          setPackages(
            packageList
          );

          if (
            !selectedPackageId &&
            packageList.length > 0
          ) {
            setSelectedPackageId(
              String(
                packageList[0].id
              )
            );
          }

        } catch (error) {
          console.error(
            error
          );

          setError(
            "Unable to load Serve & Safari packages."
          );

        } finally {
          setLoading(false);
        }
      };

    fetchPackages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const selectedPackage =
    useMemo(() => {
      return (
        packages.find(
          (pkg) =>
            String(pkg.id) ===
            String(
              selectedPackageId
            )
        ) || null
      );
    }, [
      packages,
      selectedPackageId,
    ]);


  const safariReturnDate =
    useMemo(() => {
      return calculateReturnDate(
        form.safariStartDate,
        selectedPackage
          ?.duration_days
      );
    }, [
      form.safariStartDate,
      selectedPackage,
    ]);


  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setSubmitError("");
    setBookingResult(null);

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const toggleService = (
    value
  ) => {
    setForm((previous) => {
      const exists =
        previous.serviceNeeds.includes(
          value
        );

      return {
        ...previous,

        serviceNeeds: exists
          ? previous.serviceNeeds.filter(
              (item) =>
                item !== value
            )
          : [
              ...previous.serviceNeeds,
              value,
            ],
      };
    });
  };


  const handlePackageChange = (
    event
  ) => {
    const value =
      event.target.value;

    setSelectedPackageId(
      value
    );

    setBookingResult(null);
    setSubmitError("");

    navigate(
      `/serve-and-safari/book?package=${value}`,
      {
        replace: true,
      }
    );
  };


  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSubmitError("");
    setBookingResult(null);


    if (!selectedPackageId) {
      setSubmitError(
        "Please select a safari package."
      );

      return;
    }


    if (
      !form.firstName.trim() ||
      !form.lastName.trim()
    ) {
      setSubmitError(
        "Please enter your full name."
      );

      return;
    }


    if (
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setSubmitError(
        "Please provide your email and phone number."
      );

      return;
    }


    if (
      !form.organisationName.trim()
    ) {
      setSubmitError(
        "Please enter your organisation or church name."
      );

      return;
    }


    if (
      !form.missionLocation.trim()
    ) {
      setSubmitError(
        "Please enter your mission location."
      );

      return;
    }


    if (
      !form.safariStartDate
    ) {
      setSubmitError(
        "Please choose your preferred safari start date."
      );

      return;
    }


    if (
      form.missionStartDate &&
      form.missionEndDate &&
      form.missionEndDate <
        form.missionStartDate
    ) {
      setSubmitError(
        "Mission end date cannot be before the mission start date."
      );

      return;
    }


    try {
      setSubmitting(true);

      const response =
        await axios.post(
          `${API_URL}/api/bookings`,
          {
            customer_name:
              `${form.firstName} ${form.lastName}`.trim(),

            customer_email:
              form.email
                .trim()
                .toLowerCase(),

            customer_phone:
              form.phone.trim(),

            package_id:
              Number(
                selectedPackageId
              ),

            travel_date:
              form.safariStartDate,

            return_date:
              safariReturnDate ||
              null,

            adults:
              Number(
                form.adults
              ),

            children:
              Number(
                form.children
              ),

            special_requests:
              form.specialRequests.trim(),

            serve_safari: {
              organisation_name:
                form.organisationName.trim(),

              organisation_type:
                form.organisationType ||
                null,

              mission_location:
                form.missionLocation.trim(),

              mission_start_date:
                form.missionStartDate ||
                null,

              mission_end_date:
                form.missionEndDate ||
                null,

              arrival_flight_number:
                form.arrivalFlightNumber.trim() ||
                null,

              arrival_date:
                form.arrivalDate ||
                null,

              arrival_time:
                form.arrivalTime ||
                null,

              departure_flight_number:
                form.departureFlightNumber.trim() ||
                null,

              departure_date:
                form.departureDate ||
                null,

              departure_time:
                form.departureTime ||
                null,

              service_needs:
                form.serviceNeeds,

              transport_notes:
                form.transportNotes.trim(),

              extra_details: {},
            },
          }
        );

      setBookingResult(
        response.data
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {
      console.error(
        error
      );

      setSubmitError(
        error.response?.data?.error ||
          "Unable to submit your Serve & Safari request."
      );

    } finally {
      setSubmitting(false);
    }
  };


  const whatsappFollowUp =
    () => {
      if (!bookingResult) {
        return;
      }

      const message =
        `Hello Selvaggio Safaris, I have submitted a Serve & Safari request. My booking reference is ${bookingResult.reference}.`;

      window.open(
        `https://wa.me/254792464627?text=${encodeURIComponent(
          message
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    };


  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111]">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#c4a454]" />

          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
            Preparing Mission Travel
          </p>

        </div>

      </main>
    );
  }


  if (bookingResult) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] px-6 py-24 text-white">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="w-full max-w-2xl border border-white/10 bg-[#161616] p-8 text-center sm:p-12"
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c4a454]/10 text-[#c4a454]">

            <FiCheckCircle
              size={28}
            />

          </div>


          <span className="mt-8 block text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a454]">
            Request Received
          </span>


          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
            Your mission journey
            <span className="block text-[#e6d69a]">
              starts here.
            </span>
          </h1>


          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45">
            Your Serve & Safari request has been
            received. Our team will review your
            mission logistics and safari extension
            before preparing a custom quote.
          </p>


          <div className="mt-8 border border-[#c4a454]/20 bg-[#c4a454]/5 px-6 py-5">

            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
              Booking Reference
            </span>

            <p className="mt-2 font-serif text-3xl text-[#e6d69a]">
              {
                bookingResult.reference
              }
            </p>

          </div>


          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              type="button"
              onClick={
                whatsappFollowUp
              }
              className="inline-flex items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
            >

              <FiMessageCircle />

              Follow Up On WhatsApp

            </button>


            <button
              type="button"
              onClick={() =>
                navigate(
                  "/serve-and-safari"
                )
              }
              className="inline-flex items-center justify-center gap-3 border border-white/15 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#c4a454] hover:text-[#c4a454]"
            >

              Back to Serve & Safari

            </button>

          </div>

        </motion.div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#f6f1e6] text-[#111111]">

      {/* HERO */}
      <section className="bg-[#111111] px-6 pb-20 pt-32 text-white lg:px-8 lg:pb-24">

        <div className="mx-auto max-w-7xl">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/serve-and-safari"
              )
            }
            className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c4a454]"
          >

            <FiArrowLeft />

            Serve & Safari

          </button>


          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-10 max-w-4xl"
          >

            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#c4a454]">
              Mission Travel Request
            </span>


            <h1 className="mt-5 font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">

              Tell us about
              <span className="block text-[#e6d69a]">
                your mission.
              </span>

            </h1>


            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              Share your mission dates, group
              information, transport needs and
              preferred safari extension. Our
              consultants will use these details
              to prepare a custom travel quote.
            </p>

          </motion.div>

        </div>

      </section>


      <section className="px-6 py-16 lg:px-8 lg:py-24">

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.45fr]">

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-7"
          >

            {/* CONTACT */}
            <div className="border border-[#111111]/10 bg-white p-6 sm:p-8">

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                01 · Contact Details
              </span>


              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div>
                  <label className={labelClass}>
                    First Name *
                  </label>

                  <input
                    name="firstName"
                    value={
                      form.firstName
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                    required
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Last Name *
                  </label>

                  <input
                    name="lastName"
                    value={
                      form.lastName
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                    required
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      form.email
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                    required
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Phone / WhatsApp *
                  </label>

                  <input
                    name="phone"
                    value={
                      form.phone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="+254..."
                    className={inputClass}
                    required
                  />
                </div>

              </div>

            </div>


            {/* ORGANISATION */}
            <div className="border border-[#111111]/10 bg-white p-6 sm:p-8">

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                02 · Mission Team
              </span>


              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div>
                  <label className={labelClass}>
                    Organisation / Church *
                  </label>

                  <input
                    name="organisationName"
                    value={
                      form.organisationName
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                    required
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Organisation Type
                  </label>

                  <select
                    name="organisationType"
                    value={
                      form.organisationType
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  >

                    <option value="">
                      Select type
                    </option>

                    {organisationTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}

                  </select>
                </div>


                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Mission Location *
                  </label>

                  <input
                    name="missionLocation"
                    value={
                      form.missionLocation
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Kajiado, Kenya"
                    className={inputClass}
                    required
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Mission Start Date
                  </label>

                  <input
                    type="date"
                    name="missionStartDate"
                    value={
                      form.missionStartDate
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Mission End Date
                  </label>

                  <input
                    type="date"
                    name="missionEndDate"
                    value={
                      form.missionEndDate
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Adults *
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="adults"
                    value={
                      form.adults
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Children
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="children"
                    value={
                      form.children
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>

              </div>

            </div>


            {/* SAFARI */}
            <div className="border border-[#111111]/10 bg-white p-6 sm:p-8">

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                03 · Safari Extension
              </span>


              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">

                  <label className={labelClass}>
                    Safari Package *
                  </label>

                  <select
                    value={
                      selectedPackageId
                    }
                    onChange={
                      handlePackageChange
                    }
                    className={inputClass}
                  >

                    {packages.map(
                      (pkg) => (
                        <option
                          key={pkg.id}
                          value={pkg.id}
                        >

                          {pkg.name}

                        </option>
                      )
                    )}

                  </select>

                </div>


                <div>
                  <label className={labelClass}>
                    Preferred Safari Start *
                  </label>

                  <input
                    type="date"
                    name="safariStartDate"
                    value={
                      form.safariStartDate
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                    required
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Expected Safari End
                  </label>

                  <input
                    value={
                      safariReturnDate
                    }
                    readOnly
                    className={`${inputClass} bg-[#f6f1e6]`}
                  />
                </div>

              </div>

            </div>


            {/* FLIGHTS */}
            <div className="border border-[#111111]/10 bg-white p-6 sm:p-8">

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                04 · Flight Information
              </span>


              <div className="mt-6 grid gap-5 sm:grid-cols-3">

                <div>
                  <label className={labelClass}>
                    Arrival Flight
                  </label>

                  <input
                    name="arrivalFlightNumber"
                    value={
                      form.arrivalFlightNumber
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. KQ101"
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Arrival Date
                  </label>

                  <input
                    type="date"
                    name="arrivalDate"
                    value={
                      form.arrivalDate
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Arrival Time
                  </label>

                  <input
                    type="time"
                    name="arrivalTime"
                    value={
                      form.arrivalTime
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Departure Flight
                  </label>

                  <input
                    name="departureFlightNumber"
                    value={
                      form.departureFlightNumber
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. KQ102"
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Departure Date
                  </label>

                  <input
                    type="date"
                    name="departureDate"
                    value={
                      form.departureDate
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>


                <div>
                  <label className={labelClass}>
                    Departure Time
                  </label>

                  <input
                    type="time"
                    name="departureTime"
                    value={
                      form.departureTime
                    }
                    onChange={
                      handleChange
                    }
                    className={inputClass}
                  />
                </div>

              </div>

            </div>


            {/* SERVICES */}
            <div className="border border-[#111111]/10 bg-white p-6 sm:p-8">

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9f8236]">
                05 · Travel Support
              </span>


              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {serviceOptions.map(
                  (service) => {
                    const selected =
                      form.serviceNeeds.includes(
                        service.value
                      );

                    return (
                      <button
                        key={
                          service.value
                        }
                        type="button"
                        onClick={() =>
                          toggleService(
                            service.value
                          )
                        }
                        className={`flex items-center justify-between border p-4 text-left transition-all ${
                          selected
                            ? "border-[#c4a454] bg-[#c4a454]/10"
                            : "border-[#111111]/10 bg-[#f6f1e6]/30"
                        }`}
                      >

                        <span className="text-sm font-medium">
                          {
                            service.label
                          }
                        </span>


                        {selected && (
                          <FiCheckCircle
                            className="text-[#9f8236]"
                          />
                        )}

                      </button>
                    );
                  }
                )}

              </div>


              <div className="mt-5">

                <label className={labelClass}>
                  Transport Notes
                </label>

                <textarea
                  rows="4"
                  name="transportNotes"
                  value={
                    form.transportNotes
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Tell us about daily transport, luggage, multiple locations or other logistical needs..."
                  className={`${inputClass} resize-none`}
                />

              </div>


              <div className="mt-5">

                <label className={labelClass}>
                  Other Requests
                </label>

                <textarea
                  rows="4"
                  name="specialRequests"
                  value={
                    form.specialRequests
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Dietary needs, accessibility requirements, accommodation preferences or anything else we should know..."
                  className={`${inputClass} resize-none`}
                />

              </div>

            </div>


            {submitError && (
              <div className="border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                {submitError}
              </div>
            )}


            <button
              type="submit"
              disabled={
                submitting
              }
              className="group flex w-full items-center justify-center gap-3 bg-[#111111] px-7 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4a454] transition-colors hover:bg-[#c4a454] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >

              {submitting
                ? "Submitting Request..."
                : "Submit Mission Trip Request"}

              {!submitting && (
                <FiArrowRight
                  className="transition-transform group-hover:translate-x-1"
                />
              )}

            </button>

          </form>


          {/* SIDEBAR */}
          <aside>

            <div className="sticky top-28 space-y-5">

              <div className="bg-[#111111] p-7 text-white">

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#c4a454]">
                  Selected Safari
                </span>


                <h2 className="mt-4 font-serif text-3xl text-[#e6d69a]">
                  {selectedPackage?.name ||
                    "Serve & Safari"}
                </h2>


                {selectedPackage && (
                  <>

                    <div className="mt-6 space-y-4 border-t border-white/10 pt-6">

                      <div className="flex items-center gap-3 text-sm text-white/50">

                        <FiClock
                          className="text-[#c4a454]"
                        />

                        {
                          selectedPackage.duration_days
                        }{" "}
                        Days ·{" "}
                        {
                          selectedPackage.duration_nights
                        }{" "}
                        Nights

                      </div>


                      <div className="flex items-center gap-3 text-sm text-white/50">

                        <FiUsers
                          className="text-[#c4a454]"
                        />

                        Custom Group Quote

                      </div>


                      <div className="flex items-center gap-3 text-sm text-white/50">

                        <FiCalendar
                          className="text-[#c4a454]"
                        />

                        Flexible Travel Dates

                      </div>

                    </div>


                    <div className="mt-7 border border-[#c4a454]/20 bg-[#c4a454]/5 p-5">

                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#c4a454]">
                        Pricing
                      </span>

                      <p className="mt-2 font-serif text-2xl">
                        Quote Required
                      </p>

                      <p className="mt-2 text-xs leading-5 text-white/35">
                        Final pricing depends on
                        group size, mission logistics,
                        transport requirements and
                        selected safari arrangements.
                      </p>

                    </div>

                  </>
                )}

              </div>


              <div className="border border-[#111111]/10 bg-white p-6">

                <FiMapPin
                  className="text-[#9f8236]"
                />

                <h3 className="mt-4 font-serif text-xl">
                  What happens next?
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#111111]/45">
                  A Selvaggio consultant will review
                  your mission itinerary, transport
                  needs and safari extension before
                  contacting you with a personalised
                  quote.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}