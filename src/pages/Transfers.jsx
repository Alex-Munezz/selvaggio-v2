import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiMapPin,
  FiMessageCircle,
  FiNavigation,
  FiPhoneCall,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

import {
  useNavigate,
} from "react-router-dom";


const services = [
  {
    title: "Airport Transfers",
    description:
      "Reliable pick-up and drop-off services between JKIA, Wilson Airport and your hotel or residence.",
    icon: FiNavigation,
  },
  {
    title: "Hotel Transfers",
    description:
      "Comfortable transfers between hotels, airports, attractions and meeting locations.",
    icon: FiMapPin,
  },
  {
    title: "Group Transportation",
    description:
      "Transport solutions for families, teams, churches, schools, organisations and larger groups.",
    icon: FiUsers,
  },
  {
    title: "Daily Vehicle Hire",
    description:
      "Hire a vehicle with a professional driver for flexible movement throughout your day.",
    icon: FiTruck,
  },
  {
    title: "Intercity Transfers",
    description:
      "Private road transfers between Nairobi and destinations across Kenya.",
    icon: FiCompass,
  },
  {
    title: "Luggage Assistance",
    description:
      "We help make arrivals and departures smoother with convenient luggage handling support.",
    icon: FiBriefcase,
  },
  {
    title: "Safari Transfers",
    description:
      "Seamless transfers between Nairobi, hotels, safari lodges, camps and national parks.",
    icon: FiNavigation,
  },
  {
    title: "Custom Transport Plans",
    description:
      "Multi-stop and multi-day transport arrangements tailored around your itinerary.",
    icon: FiCalendar,
  },
];


const reasons = [
  {
    title: "Professional Drivers",
    description:
      "Experienced local drivers focused on safety, punctuality and guest comfort.",
    icon: FiUsers,
  },
  {
    title: "Reliable Fleet",
    description:
      "Vehicles suited for individuals, families, groups and safari travel.",
    icon: FiTruck,
  },
  {
    title: "Flexible Scheduling",
    description:
      "Early arrivals, late departures and custom pickup times can all be arranged.",
    icon: FiClock,
  },
  {
    title: "Safe & Dependable",
    description:
      "Travel with confidence from the moment you arrive to your final drop-off.",
    icon: FiShield,
  },
];


const popularTransfers = [
  {
    from: "JKIA",
    to: "Nairobi Hotels",
    label: "Airport Transfer",
  },
  {
    from: "JKIA",
    to: "Wilson Airport",
    label: "Airport Connection",
  },
  {
    from: "Nairobi",
    to: "Naivasha",
    label: "Private Transfer",
  },
  {
    from: "Nairobi",
    to: "Lake Nakuru",
    label: "Private Transfer",
  },
  {
    from: "Nairobi",
    to: "Amboseli",
    label: "Safari Transfer",
  },
  {
    from: "Nairobi",
    to: "Maasai Mara",
    label: "Safari Transfer",
  },
];


const vehicles = [
  {
    name: "Vellfire",
    capacity: "3–5 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_2991-rq5ipo8m3ytdasubiusl9m03cg4mmtxt4nn6gn169i.jpg",
  },
  {
    name: "Voxy",
    capacity: "3–5 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_3084-rq5j0hdrk5k2p6bstgme80wd9mf9gls479s08g5u2g.jpg",
  },
  {
    name: "Noah",
    capacity: "3–5 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/hotel-transfers-qjd1uzyydmtxvoz8bjn8ul0u2htdxwionbyg0owxzk.jpg",
  },
  {
    name: "4×4 Land Cruiser",
    capacity: "Up to 8 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_0298-scaled-rmye6fil4w1j3viqp94odncl3s0brhl27g3xpbmj80.jpg",
  },
  {
    name: "4×4 Land Cruiser",
    capacity: "Up to 8 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_3047-rq5ivvy62ojfnggk9v18h5txv1l8xos8loslfx9zo0.jpg",
  },
  {
    name: "Coaster Bus",
    capacity: "25–30 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_3029-rq5iqn0n4u4ym9x2nho0h1y8ww0henm548f0cw05p4.jpg",
  },
];


const steps = [
  {
    number: "01",
    title: "Send Your Details",
    description:
      "Tell us your pickup point, destination, travel date and group size.",
  },
  {
    number: "02",
    title: "Receive Your Quote",
    description:
      "Our team reviews your request and sends you the appropriate vehicle and price.",
  },
  {
    number: "03",
    title: "Confirm Your Transfer",
    description:
      "Confirm the arrangements and receive your pickup details.",
  },
  {
    number: "04",
    title: "Travel Comfortably",
    description:
      "Your driver meets you on time and gets you safely to your destination.",
  },
];


export default function Transfers() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      pickup: "",
      destination: "",
      date: "",
      time: "",
      passengers: "",
    });


  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const requestQuote = (e) => {
    e.preventDefault();

    const message = `
Hello Selvaggio Safaris,

I would like to request a transfer quote.

Name: ${form.name || "Not provided"}
Pickup: ${form.pickup || "Not provided"}
Destination: ${form.destination || "Not provided"}
Travel Date: ${form.date || "Not provided"}
Pickup Time: ${form.time || "Not provided"}
Passengers: ${form.passengers || "Not provided"}

Please send me the available vehicle options and transfer cost.
    `.trim();

    const url =
      `https://wa.me/254792464627?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  const generalWhatsApp =
    () => {
      const message =
        "Hello Selvaggio Safaris, I would like to enquire about your transfer services.";

      window.open(
        `https://wa.me/254792464627?text=${encodeURIComponent(
          message
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    };


  return (
    <main className="overflow-hidden bg-[#f6f1e6] text-[#111111]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[82vh] overflow-hidden bg-[#111111]">

        <img
          src="https://selvaggiosafaris.com/wp-content/uploads/2026/07/coaster-1-1024x546.png"
          alt="Selvaggio Safaris Transfers"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />


        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-6 py-28 lg:px-8">

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
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

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-[#c4a454]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#c4a454]">
                Selvaggio Transfers
              </span>

            </div>


            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.96] text-white sm:text-6xl lg:text-8xl">

              Reliable Transfers.

              <span className="block text-[#e6d69a]">
                Wherever You’re Going.
              </span>

            </h1>


            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">

              From airport arrivals and hotel
              transfers to private intercity
              journeys and group transportation,
              travel across Kenya safely,
              comfortably and on time.

            </p>


            <div className="mt-9 flex flex-wrap gap-4">

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById(
                      "transfer-quote"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    });
                }}
                className="group inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
              >

                Request Transfer Quote

                <FiArrowRight
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>


              <button
                type="button"
                onClick={
                  generalWhatsApp
                }
                className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#c4a454] hover:text-[#c4a454]"
              >

                <FiMessageCircle
                  size={15}
                />

                WhatsApp Us

              </button>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

          <div>

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              Travel Made Simple
            </span>


            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">

              From arrival to destination,
              we’ve got the road covered.

            </h2>

          </div>


          <div className="border-l border-[#c4a454]/40 pl-6 sm:pl-10">

            <p className="text-base leading-8 text-[#111111]/55">

              Whether you are arriving at
              Nairobi’s airport, travelling
              between hotels, heading out of the
              city or moving a large group,
              Selvaggio Safaris provides
              dependable private transportation
              tailored to your journey.

            </p>


            <p className="mt-5 text-base leading-8 text-[#111111]/55">

              Our team coordinates your pickup,
              vehicle and route so you can focus
              on enjoying the journey instead of
              worrying about transport logistics.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="bg-[#111111] px-6 py-20 text-white lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a454]">
              Transfer Services
            </span>


            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">

              Transport for every journey.

            </h2>

          </div>


          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">

            {services.map(
              (service) => {

                const Icon =
                  service.icon;

                return (
                  <motion.article
                    key={
                      service.title
                    }
                    whileHover={{
                      y: -4,
                    }}
                    className="bg-[#111111] p-7 transition-colors hover:bg-[#181818]"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c4a454]/10 text-[#c4a454]">

                      <Icon
                        size={18}
                      />

                    </div>


                    <h3 className="mt-6 font-serif text-xl">

                      {
                        service.title
                      }

                    </h3>


                    <p className="mt-3 text-sm leading-6 text-white/40">

                      {
                        service.description
                      }

                    </p>

                  </motion.article>
                );
              }
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR ROUTES
      ====================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
                Popular Transfers
              </span>


              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">

                Common routes.
                <span className="block">
                  Custom journeys.
                </span>

              </h2>

            </div>


            <p className="max-w-md text-sm leading-7 text-[#111111]/45">

              Don’t see your route here?
              Selvaggio can arrange private
              transportation to destinations
              across Kenya.

            </p>

          </div>


          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {popularTransfers.map(
              (route) => (
                <div
                  key={`${route.from}-${route.to}`}
                  className="group border border-[#111111]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c4a454]/60"
                >

                  <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#9f8236]">
                    {route.label}
                  </span>


                  <div className="mt-6 flex items-center gap-4">

                    <div className="flex-1">

                      <span className="text-[8px] uppercase tracking-[0.18em] text-[#111111]/30">
                        From
                      </span>

                      <p className="mt-1 font-serif text-xl">
                        {route.from}
                      </p>

                    </div>


                    <FiArrowRight
                      size={18}
                      className="shrink-0 text-[#c4a454]"
                    />


                    <div className="flex-1">

                      <span className="text-[8px] uppercase tracking-[0.18em] text-[#111111]/30">
                        To
                      </span>

                      <p className="mt-1 font-serif text-xl">
                        {route.to}
                      </p>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY US
      ====================================================== */}
      <section className="bg-[#e9e1cf] px-6 py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">

            <div>

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
                Why Selvaggio
              </span>


              <h2 className="mt-4 font-serif text-4xl leading-tight">

                More than just a ride.

              </h2>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              {reasons.map(
                (reason) => {

                  const Icon =
                    reason.icon;

                  return (
                    <div
                      key={
                        reason.title
                      }
                      className="border border-[#111111]/10 bg-[#f6f1e6] p-6"
                    >

                      <Icon
                        size={20}
                        className="text-[#9f8236]"
                      />


                      <h3 className="mt-5 font-serif text-xl">

                        {
                          reason.title
                        }

                      </h3>


                      <p className="mt-3 text-sm leading-6 text-[#111111]/45">

                        {
                          reason.description
                        }

                      </p>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FLEET
      ====================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              Our Fleet
            </span>


            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">

              The right vehicle for your journey.

            </h2>


            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#111111]/45">

              From individual airport pickups
              to large mission teams and safari
              groups, we can match your journey
              with the appropriate vehicle.

            </p>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {vehicles.map(
              (
                vehicle,
                index
              ) => (
                <article
                  key={`${vehicle.name}-${index}`}
                  className="group overflow-hidden border border-[#111111]/10 bg-white"
                >

                  <div className="h-64 overflow-hidden">

                    <img
                      src={
                        vehicle.image
                      }
                      alt={
                        vehicle.name
                      }
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  </div>


                  <div className="flex items-center justify-between gap-5 p-6">

                    <div>

                      <h3 className="font-serif text-2xl">
                        {
                          vehicle.name
                        }
                      </h3>

                      <p className="mt-1 text-xs text-[#111111]/40">
                        {
                          vehicle.capacity
                        }
                      </p>

                    </div>


                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f1e6] text-[#9f8236]">

                      <FiTruck
                        size={16}
                      />

                    </span>

                  </div>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="bg-[#111111] px-6 py-20 text-white lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a454]">
              Simple Booking Process
            </span>


            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">

              Four steps. One smooth journey.

            </h2>

          </div>


          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-4">

            {steps.map(
              (step) => (
                <div
                  key={step.number}
                  className="bg-[#111111] p-7"
                >

                  <span className="font-serif text-5xl text-[#c4a454]/25">
                    {
                      step.number
                    }
                  </span>


                  <h3 className="mt-8 font-serif text-xl text-white">

                    {
                      step.title
                    }

                  </h3>


                  <p className="mt-3 text-sm leading-6 text-white/40">

                    {
                      step.description
                    }

                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          QUOTE FORM
      ====================================================== */}
      <section
        id="transfer-quote"
        className="px-6 py-20 lg:px-8 lg:py-28"
      >

        <div className="mx-auto grid max-w-7xl overflow-hidden bg-white lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left */}
          <div className="relative overflow-hidden bg-[#111111] p-8 text-white sm:p-10 lg:p-12">

            <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-[#c4a454]/10 blur-3xl" />


            <div className="relative">

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a454]">
                Request A Quote
              </span>


              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">

                Where can we
                <span className="block text-[#e6d69a]">
                  take you?
                </span>

              </h2>


              <p className="mt-6 max-w-md text-sm leading-7 text-white/45">

                Share your transfer details and
                continue directly to WhatsApp.
                Our team will review the route,
                group size and vehicle required
                before sending your quote.

              </p>


              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-3 text-sm text-white/55">

                  <FiCheckCircle
                    className="text-[#c4a454]"
                  />

                  Private transfers

                </div>


                <div className="flex items-center gap-3 text-sm text-white/55">

                  <FiCheckCircle
                    className="text-[#c4a454]"
                  />

                  Professional drivers

                </div>


                <div className="flex items-center gap-3 text-sm text-white/55">

                  <FiCheckCircle
                    className="text-[#c4a454]"
                  />

                  Individual and group transport

                </div>


                <div className="flex items-center gap-3 text-sm text-white/55">

                  <FiCheckCircle
                    className="text-[#c4a454]"
                  />

                  Custom routes available

                </div>

              </div>

            </div>

          </div>


          {/* Form */}
          <form
            onSubmit={
              requestQuote
            }
            className="p-7 sm:p-10 lg:p-12"
          >

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="sm:col-span-2">

                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/40">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your name"
                  className="mt-2 w-full border border-[#111111]/10 bg-[#f6f1e6]/35 px-4 py-4 text-sm outline-none transition-colors focus:border-[#c4a454]"
                />

              </div>


              <div>

                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/40">
                  Pickup Location
                </label>

                <input
                  type="text"
                  name="pickup"
                  value={
                    form.pickup
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="e.g. JKIA"
                  className="mt-2 w-full border border-[#111111]/10 bg-[#f6f1e6]/35 px-4 py-4 text-sm outline-none transition-colors focus:border-[#c4a454]"
                />

              </div>


              <div>

                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/40">
                  Destination
                </label>

                <input
                  type="text"
                  name="destination"
                  value={
                    form.destination
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Where are you going?"
                  className="mt-2 w-full border border-[#111111]/10 bg-[#f6f1e6]/35 px-4 py-4 text-sm outline-none transition-colors focus:border-[#c4a454]"
                />

              </div>


              <div>

                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/40">
                  Travel Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={
                    form.date
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="mt-2 w-full border border-[#111111]/10 bg-[#f6f1e6]/35 px-4 py-4 text-sm outline-none transition-colors focus:border-[#c4a454]"
                />

              </div>


              <div>

                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/40">
                  Pickup Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={
                    form.time
                  }
                  onChange={
                    handleChange
                  }
                  className="mt-2 w-full border border-[#111111]/10 bg-[#f6f1e6]/35 px-4 py-4 text-sm outline-none transition-colors focus:border-[#c4a454]"
                />

              </div>


              <div className="sm:col-span-2">

                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111111]/40">
                  Number of Passengers
                </label>

                <input
                  type="number"
                  name="passengers"
                  value={
                    form.passengers
                  }
                  onChange={
                    handleChange
                  }
                  required
                  min="1"
                  placeholder="e.g. 4"
                  className="mt-2 w-full border border-[#111111]/10 bg-[#f6f1e6]/35 px-4 py-4 text-sm outline-none transition-colors focus:border-[#c4a454]"
                />

              </div>

            </div>


            <button
              type="submit"
              className="group mt-7 flex w-full items-center justify-center gap-3 bg-[#c4a454] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
            >

              <FiMessageCircle
                size={16}
              />

              Continue on WhatsApp

              <FiArrowRight
                className="transition-transform group-hover:translate-x-1"
              />

            </button>

          </form>

        </div>

      </section>


      {/* =====================================================
          SAFARI CROSS-SELL
      ====================================================== */}
      <section className="bg-[#e9e1cf] px-6 py-20 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">

          <div>

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              Going Further?
            </span>


            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Turn your transfer into an adventure.
            </h2>


            <p className="mt-3 max-w-xl text-sm leading-7 text-[#111111]/45">
              Travelling to one of Kenya’s safari
              destinations? Explore our private
              safari packages as part of your
              journey.
            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/packages"
              )
            }
            className="group flex w-fit shrink-0 items-center gap-3 bg-[#111111] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c4a454] transition-colors hover:bg-[#c4a454] hover:text-black"
          >

            Explore Safaris

            <FiArrowRight
              className="transition-transform group-hover:translate-x-1"
            />

          </button>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#111111] px-6 py-24 text-center text-white lg:px-8 lg:py-28">

        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c4a454]/10 blur-3xl" />


        <div className="relative mx-auto max-w-3xl">

          <FiMapPin
            size={23}
            className="mx-auto text-[#c4a454]"
          />


          <span className="mt-5 block text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a454]">
            Your Journey Starts Here
          </span>


          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">

            Arrive.
            <span className="text-[#e6d69a]">
              {" "}Relax.{" "}
            </span>
            We’ll drive.

          </h2>


          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45">

            Tell us where you are coming from,
            where you need to go and how many
            people are travelling. We’ll take
            care of the rest.

          </p>


          <button
            type="button"
            onClick={
              generalWhatsApp
            }
            className="mt-9 inline-flex items-center gap-3 bg-[#c4a454] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
          >

            <FiMessageCircle
              size={16}
            />

            Talk To Our Transfer Team

          </button>

        </div>

      </section>

    </main>
  );
}