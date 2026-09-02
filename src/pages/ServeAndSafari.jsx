import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

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
  FiHeart,
  FiMapPin,
  FiMessageCircle,
  FiPhoneCall,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

import {
  useNavigate,
} from "react-router-dom";


const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:5000";


const services = [
  {
    title:
      "Airport Pick-up & Drop-off",
    icon: FiTruck,
  },
  {
    title:
      "Group Transportation",
    icon: FiUsers,
  },
  {
    title:
      "Hotel Transfers",
    icon: FiMapPin,
  },
  {
    title:
      "Luggage Assistance",
    icon: FiBriefcase,
  },
  {
    title:
      "Daily Vehicle Hire",
    icon: FiCalendar,
  },
  {
    title:
      "Multi-Location Transport",
    icon: FiCompass,
  },
  {
    title:
      "24/7 Support",
    icon: FiPhoneCall,
  },
  {
    title:
      "Custom Itinerary Planning",
    icon: FiCheckCircle,
  },
];


const steps = [
  {
    number: "01",
    title: "Arrive in Kenya",
    description:
      "Your team arrives in Kenya and our team is ready to receive you.",
  },
  {
    number: "02",
    title:
      "Travel to Your Mission Location",
    description:
      "We take your team safely and comfortably to your ministry or project location.",
  },
  {
    number: "03",
    title:
      "Focus on Your Mission",
    description:
      "Your team focuses on service while we take care of transportation and logistics.",
  },
  {
    number: "04",
    title:
      "Celebrate With a Safari",
    description:
      "Complete your mission with an unforgettable Kenyan safari experience.",
  },
  {
    number: "05",
    title: "Safe Departure",
    description:
      "We return your team safely and on time for your departure.",
  },
];


const reasons = [
  "Experienced Drivers",
  "Reliable Fleet",
  "Flexible Scheduling",
  "Comfortable Vehicles",
  "Local Knowledge",
  "Professional Planning",
  "24/7 Support",
  "Affordable Group Rates",
];


const destinations = [
  {
    title: "Maasai Mara",
    description:
      "Experience the Great Migration and incredible wildlife.",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/2026/02/IMG_9513-180x180.jpg",
  },
  {
    title: "Amboseli",
    description:
      "Home of the big elephants with stunning views of Mt. Kilimanjaro.",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/2026/06/Day-Tour-To-Amboseli-National-Park-From-Nairobi-180x180.jpg",
  },
  {
    title: "Lake Nakuru",
    description:
      "Famous for flamingos, rhinos and diverse birdlife.",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/2026/06/Lake-Nakuru-National-Park-Tour-%E2%80%94-Get-Amazed-By-The-Natural-Beauty-180x180.jpg",
  },
  {
    title: "Diani Beach",
    description:
      "Relax on Kenya's white sandy beaches and turquoise waters.",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/2022/01/diani-beach-180x180.jpg",
  },
];


const vehicles = [
  {
    name: "Coaster Bus",
    capacity:
      "25–30 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_3029-rq5iqn0n4u4ym9x2nho0h1y8ww0henm548f0cw05p4.jpg",
  },
  {
    name: "2 Vellfires",
    capacity:
      "3–5 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_2991-rq5ipo8m3ytdasubiusl9m03cg4mmtxt4nn6gn169i.jpg",
  },
  {
    name: "Voxy",
    capacity:
      "3–5 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_3084-rq5j0hdrk5k2p6bstgme80wd9mf9gls479s08g5u2g.jpg",
  },
  {
    name: "4×4 Landcruiser",
    capacity:
      "8 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_0298-scaled-rmye6fil4w1j3viqp94odncl3s0brhl27g3xpbmj80.jpg",
  },
  {
    name: "Noah",
    capacity:
      "3–5 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/hotel-transfers-qjd1uzyydmtxvoz8bjn8ul0u2htdxwionbyg0owxzk.jpg",
  },
  {
    name: "4×4 Landcruiser",
    capacity:
      "8 Passengers",
    image:
      "https://selvaggiosafaris.com/wp-content/uploads/elementor/thumbs/IMG_3047-rq5ivvy62ojfnggk9v18h5txv1l8xos8loslfx9zo0.jpg",
  },
];


const groups = [
  "Churches",
  "Organizations",
  "Medical Teams",
  "Volunteer Groups",
  "NGOs",
  "Schools",
];


const whatsappLink =
  "https://wa.me/254792464627?text=" +
  encodeURIComponent(
    "Hello Selvaggio Safaris, I would like to enquire about planning a Serve & Safari mission trip."
  );


export default function ServeAndSafari() {
  const navigate =
    useNavigate();

  const [
    safariPackages,
    setSafariPackages,
  ] = useState([]);

  const [
    packagesLoading,
    setPackagesLoading,
  ] = useState(true);

  const [
    packagesError,
    setPackagesError,
  ] = useState("");


  useEffect(() => {
    const fetchPackages =
      async () => {
        try {
          setPackagesLoading(
            true
          );

          setPackagesError("");

          const response =
            await axios.get(
              `${API_URL}/api/packages?category=serve-and-safari&active=true`
            );

          const data =
            Array.isArray(
              response.data
            )
              ? response.data
              : [];

          setSafariPackages(
            data
          );

        } catch (error) {
          console.error(
            "Serve & Safari packages error:",
            error
          );

          setPackagesError(
            "Unable to load safari extensions at the moment."
          );

        } finally {
          setPackagesLoading(
            false
          );
        }
      };

    fetchPackages();
  }, []);


  const startMissionRequest =
    () => {
      navigate(
        "/serve-and-safari/book"
      );
    };


  const bookPackage = (
    packageId
  ) => {
    navigate(
      `/serve-and-safari/book?package=${packageId}`
    );
  };


  const scrollToServices =
    () => {
      document
        .getElementById(
          "services"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        });
    };


  return (
    <main className="overflow-hidden bg-[#f6f1e6] text-[#111111]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[88vh] overflow-hidden bg-[#111111]">

        <img
          src="https://selvaggiosafaris.com/wp-content/uploads/2026/07/coaster-1-1024x546.png"
          alt="Selvaggio Serve and Safari"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />


        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-28 lg:px-8">

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
                Serve & Safari
              </span>

            </div>


            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-8xl">

              Serve with Purpose.

              <span className="block text-[#e6d69a]">
                Explore With Wonder.
              </span>

            </h1>


            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">

              Mission trips made easy with
              Selvaggio Safaris. From airport
              transfers and group logistics to
              safari adventures, we take care of
              the journey so your team can focus
              on the mission.

            </p>


            <div className="mt-9 flex flex-wrap gap-4">

              <button
                type="button"
                onClick={
                  startMissionRequest
                }
                className="group inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
              >

                Plan Your Mission Trip

                <FiArrowRight
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>


              <button
                type="button"
                onClick={
                  scrollToServices
                }
                className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#c4a454] hover:text-[#c4a454]"
              >

                Explore Services

              </button>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <div>

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              Your Mission. Our Support.
            </span>

            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">

              We handle the journey so you can
              focus on serving.

            </h2>

          </div>


          <div className="border-l border-[#c4a454]/40 pl-6 sm:pl-10">

            <p className="text-base leading-8 text-[#111111]/55">

              Planning a mission trip to Kenya?
              Whether you’re coming to serve in
              schools, hospitals, orphanages or
              community projects, Selvaggio
              Safaris Solutions is here to make
              your journey seamless from arrival
              to departure.

            </p>


            <p className="mt-5 text-base leading-8 text-[#111111]/55">

              We provide dependable airport
              transfers, comfortable
              transportation throughout your
              mission, and unforgettable safari
              experiences once your work is
              complete.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section
        id="services"
        className="bg-[#111111] px-6 py-20 text-white lg:px-8 lg:py-28"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a454]">
              Mission Travel Services
            </span>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Everything your team needs.
            </h2>

          </div>


          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">

            {services.map(
              (service) => {
                const Icon =
                  service.icon;

                return (
                  <motion.div
                    key={
                      service.title
                    }
                    whileHover={{
                      y: -4,
                    }}
                    className="group bg-[#111111] p-7 transition-colors hover:bg-[#181818]"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c4a454]/10 text-[#c4a454]">

                      <Icon
                        size={18}
                      />

                    </div>

                    <h3 className="mt-6 font-serif text-xl text-white">
                      {
                        service.title
                      }
                    </h3>

                  </motion.div>
                );
              }
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              How It Works
            </span>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              From touchdown to takeoff.
            </h2>

          </div>


          <div className="mt-14 grid gap-4 md:grid-cols-5">

            {steps.map(
              (step) => (
                <div
                  key={
                    step.number
                  }
                  className="relative border border-[#111111]/10 bg-white p-6"
                >

                  <span className="font-serif text-4xl text-[#c4a454]/35">
                    {
                      step.number
                    }
                  </span>

                  <h3 className="mt-8 font-serif text-xl">
                    {
                      step.title
                    }
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#111111]/45">
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
          WHY SELVAGGIO
      ====================================================== */}
      <section className="bg-[#e9e1cf] px-6 py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
                Why Selvaggio
              </span>

              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Why mission teams choose us.
              </h2>

            </div>


            <div className="grid gap-3 sm:grid-cols-2">

              {reasons.map(
                (reason) => (
                  <div
                    key={
                      reason
                    }
                    className="flex items-center gap-3 border-b border-[#111111]/10 py-4"
                  >

                    <FiCheckCircle
                      className="shrink-0 text-[#9f8236]"
                    />

                    <span className="text-sm font-medium">
                      {reason}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DESTINATIONS
      ====================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              After The Mission
            </span>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">

              End your mission with an
              unforgettable safari.

            </h2>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {destinations.map(
              (destination) => (
                <article
                  key={
                    destination.title
                  }
                  className="group overflow-hidden bg-[#111111]"
                >

                  <div className="h-64 overflow-hidden">

                    <img
                      src={
                        destination.image
                      }
                      alt={
                        destination.title
                      }
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                  </div>


                  <div className="p-6">

                    <h3 className="font-serif text-2xl text-white">
                      {
                        destination.title
                      }
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/45">
                      {
                        destination.description
                      }
                    </p>

                  </div>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          BACKEND-DRIVEN SAFARI EXTENSIONS
      ====================================================== */}
      <section className="bg-[#111111] px-6 py-20 text-white lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div className="max-w-3xl">

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a454]">
                Suggested Safari Extensions
              </span>

              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Turn your mission into
                <span className="block text-[#e6d69a]">
                  an unforgettable journey.
                </span>
              </h2>

            </div>


            <p className="max-w-sm text-sm leading-7 text-white/40">

              Select your preferred safari and
              send us your mission details. Our
              consultants will prepare a custom
              group quote.

            </p>

          </div>


          {/* Loading */}
          {packagesLoading && (
            <div className="py-24 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#c4a454]" />

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
                Loading Safari Extensions
              </p>

            </div>
          )}


          {/* Error */}
          {!packagesLoading &&
            packagesError && (
              <div className="mt-12 border border-red-400/20 bg-red-400/5 px-6 py-10 text-center">

                <p className="text-sm text-red-200/70">
                  {
                    packagesError
                  }
                </p>

              </div>
            )}


          {/* Empty */}
          {!packagesLoading &&
            !packagesError &&
            safariPackages.length ===
              0 && (
              <div className="mt-12 border border-white/10 px-6 py-16 text-center">

                <FiCompass
                  size={25}
                  className="mx-auto text-[#c4a454]"
                />

                <h3 className="mt-5 font-serif text-2xl">
                  Safari extensions are being prepared.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
                  Contact our team and we can
                  create a custom safari
                  extension for your mission
                  group.
                </p>

              </div>
            )}


          {/* Package Cards */}
          {!packagesLoading &&
            !packagesError &&
            safariPackages.length >
              0 && (
              <div className="mt-12 grid gap-6 lg:grid-cols-3">

                {safariPackages.map(
                  (pkg) => (
                    <motion.article
                      key={
                        pkg.id
                      }
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
                        amount: 0.15,
                      }}
                      className="group flex h-full flex-col overflow-hidden border border-white/10 bg-[#161616]"
                    >

                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">

                        <img
                          src={
                            pkg.image
                          }
                          alt={
                            pkg.name
                          }
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />


                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">

                          <span className="border border-[#c4a454]/30 bg-black/60 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#e6d69a] backdrop-blur">
                            Custom Quote
                          </span>

                          <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">

                            <FiClock />

                            {
                              pkg.duration_days
                            }{" "}
                            Days

                          </span>

                        </div>

                      </div>


                      <div className="flex flex-1 flex-col p-6">

                        <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#c4a454]">
                          Serve & Safari
                        </span>


                        <h3 className="mt-3 font-serif text-2xl leading-tight text-[#e6d69a]">

                          {
                            pkg.name
                          }

                        </h3>


                        {pkg.short_description && (
                          <p className="mt-4 text-sm leading-6 text-white/40">

                            {
                              pkg.short_description
                            }

                          </p>
                        )}


                        {/* Destinations */}
                        {Array.isArray(
                          pkg.destinations
                        ) &&
                          pkg.destinations
                            .length >
                            0 && (
                            <div className="mt-5 flex flex-wrap gap-2">

                              {pkg.destinations.map(
                                (
                                  destination
                                ) => (
                                  <span
                                    key={
                                      destination.id
                                    }
                                    className="border border-white/10 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.15em] text-white/35"
                                  >
                                    {
                                      destination.name
                                    }
                                  </span>
                                )
                              )}

                            </div>
                          )}


                        {/* Itinerary */}
                        {Array.isArray(
                          pkg.itinerary
                        ) &&
                          pkg.itinerary
                            .length >
                            0 && (
                            <div className="mt-7 border-t border-white/10 pt-6">

                              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
                                Itinerary
                              </span>


                              <div className="mt-4 space-y-4">

                                {[
                                  ...pkg.itinerary,
                                ]
                                  .sort(
                                    (
                                      a,
                                      b
                                    ) =>
                                      Number(
                                        a.day_number
                                      ) -
                                      Number(
                                        b.day_number
                                      )
                                  )
                                  .map(
                                    (
                                      item
                                    ) => (
                                      <div
                                        key={
                                          item.id ||
                                          item.day_number
                                        }
                                        className="flex gap-3"
                                      >

                                        <span className="mt-[5px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c4a454]/10 text-[8px] font-bold text-[#c4a454]">

                                          {
                                            item.day_number
                                          }

                                        </span>


                                        <div>

                                          <p className="text-xs font-medium leading-5 text-white/60">

                                            {
                                              item.title
                                            }

                                          </p>

                                          {item.description && (
                                            <p className="mt-1 text-[11px] leading-5 text-white/30">

                                              {
                                                item.description
                                              }

                                            </p>
                                          )}

                                        </div>

                                      </div>
                                    )
                                  )}

                              </div>

                            </div>
                          )}


                        <div className="mt-auto pt-7">

                          <button
                            type="button"
                            onClick={() =>
                              bookPackage(
                                pkg.id
                              )
                            }
                            className="group/button flex w-full items-center justify-center gap-3 bg-[#c4a454] px-5 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
                          >

                            Request This Safari

                            <FiArrowRight
                              className="transition-transform group-hover/button:translate-x-1"
                            />

                          </button>

                        </div>

                      </div>

                    </motion.article>
                  )
                )}

              </div>
            )}

        </div>

      </section>


      {/* =====================================================
          VEHICLES
      ====================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              Our Fleet
            </span>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Vehicles for every group size.
            </h2>

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

                  <div className="h-60 overflow-hidden">

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


                  <div className="flex items-center justify-between gap-4 p-5">

                    <div>

                      <h3 className="font-serif text-xl">
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


                    <FiTruck
                      className="text-[#c4a454]"
                    />

                  </div>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHO WE WORK WITH
      ====================================================== */}
      <section className="bg-[#e9e1cf] px-6 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9f8236]">
              Who We Work With
            </span>

            <h2 className="mt-4 font-serif text-4xl">
              Supporting teams that come to
              make a difference.
            </h2>

          </div>


          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">

            {groups.map(
              (group) => (
                <div
                  key={
                    group
                  }
                  className="border border-[#111111]/10 bg-[#f6f1e6] p-5 text-center"
                >

                  <FiHeart
                    size={18}
                    className="mx-auto text-[#9f8236]"
                  />

                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em]">
                    {
                      group
                    }
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#111111] px-6 py-24 text-center text-white lg:px-8 lg:py-32">

        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c4a454]/10 blur-3xl" />


        <div className="relative mx-auto max-w-3xl">

          <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#c4a454]">
            Mission Travel Made Simple
          </span>


          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">

            Focus on your mission.

            <span className="block text-[#e6d69a]">
              We’ll handle the journey.
            </span>

          </h2>


          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50">

            Whether you’re bringing a team of
            five or fifty, Selvaggio Safaris
            Solutions is your trusted travel
            partner throughout Kenya.

          </p>


          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              type="button"
              onClick={
                startMissionRequest
              }
              className="group inline-flex items-center justify-center gap-3 bg-[#c4a454] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#e6d69a]"
            >

              Plan Your Mission Trip

              <FiArrowRight
                className="transition-transform group-hover:translate-x-1"
              />

            </button>


            <a
              href={
                whatsappLink
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-white/15 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#c4a454] hover:text-[#c4a454]"
            >

              <FiMessageCircle
                size={16}
              />

              WhatsApp Us

            </a>

          </div>

        </div>

      </section>

    </main>
  );
}