import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const inputStyles =
  "mt-2 w-full border border-deep-forest/10 bg-white px-4 py-3.5 text-sm text-deep-forest outline-none transition-all placeholder:text-charcoal/30 focus:border-gold";

export default function Book() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="bg-deep-forest">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-40 lg:px-8 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Start Your Journey
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Let's plan your
              <span className="block italic text-gold-light">
                Kenya story.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Tell us a little about the journey you're imagining. We'll get
              to know what matters to you and help shape the experience around
              it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking area */}
      <section className="px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* Left information */}
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Your Enquiry
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
              A little information
              <span className="block italic text-gold">
                goes a long way.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-7 text-charcoal/55">
              Don't worry if you don't have everything figured out yet. Give us
              the basics and we'll help you with the rest.
            </p>

            <div className="mt-10 space-y-6 border-t border-deep-forest/10 pt-7">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <FiMessageCircle size={17} />
                </span>

                <div>
                  <h3 className="font-serif text-lg text-deep-forest">
                    Personal planning
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-charcoal/45">
                    We'll discuss your interests, pace and expectations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <FiMapPin size={17} />
                </span>

                <div>
                  <h3 className="font-serif text-lg text-deep-forest">
                    Local knowledge
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-charcoal/45">
                    We'll help you choose the right places and experiences.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <FiCheck size={17} />
                </span>

                <div>
                  <h3 className="font-serif text-lg text-deep-forest">
                    Tailored itinerary
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-charcoal/45">
                    Your safari can evolve around what you want to experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-deep-forest/10 pt-7">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-charcoal/35">
                Prefer to talk directly?
              </span>

              <Link
                to="/contact"
                className="group mt-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-deep-forest transition-colors hover:text-gold"
              >
                Contact Selvaggio

                <FiArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-6 shadow-sm sm:p-9 lg:p-12"
          >
            <div className="border-b border-deep-forest/10 pb-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                Safari Enquiry
              </span>

              <h2 className="mt-3 font-serif text-3xl text-deep-forest">
                Tell us about your trip
              </h2>
            </div>

            <form className="mt-8">
              {/* Personal information */}
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    className={inputStyles}
                  />
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    className={inputStyles}
                  />
                </label>
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Email Address
                  <div className="relative">
                    <FiMail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className={`${inputStyles} pl-11`}
                    />
                  </div>
                </label>
              </div>

              {/* Trip details */}
              <div className="mt-10 border-t border-deep-forest/10 pt-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Trip Details
                </span>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Destination
                  <select
                    name="destination"
                    defaultValue=""
                    className={inputStyles}
                  >
                    <option value="" disabled>
                      Select destination
                    </option>
                    <option value="maasai-mara">Maasai Mara</option>
                    <option value="amboseli">Amboseli</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="multiple">Multiple destinations</option>
                    <option value="unsure">I'm not sure yet</option>
                  </select>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Travellers
                  <div className="relative">
                    <FiUsers
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30"
                    />

                    <input
                      type="number"
                      name="travellers"
                      min="1"
                      placeholder="Number of travellers"
                      className={`${inputStyles} pl-11`}
                    />
                  </div>
                </label>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Preferred Travel Date
                  <div className="relative">
                    <FiCalendar
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30"
                    />

                    <input
                      type="date"
                      name="travelDate"
                      className={`${inputStyles} pl-11`}
                    />
                  </div>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Duration
                  <select
                    name="duration"
                    defaultValue=""
                    className={inputStyles}
                  >
                    <option value="" disabled>
                      Select duration
                    </option>
                    <option value="1-3">1–3 days</option>
                    <option value="4-6">4–6 days</option>
                    <option value="7-10">7–10 days</option>
                    <option value="10-plus">10+ days</option>
                    <option value="unsure">I'm not sure yet</option>
                  </select>
                </label>
              </div>

              {/* Accommodation */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Preferred Travel Style
                  <select
                    name="travelStyle"
                    defaultValue=""
                    className={inputStyles}
                  >
                    <option value="" disabled>
                      Select travel style
                    </option>
                    <option value="luxury">Luxury</option>
                    <option value="comfort">Comfort</option>
                    <option value="mid-range">Mid-range</option>
                    <option value="budget">Budget-conscious</option>
                    <option value="unsure">I'm open to suggestions</option>
                  </select>
                </label>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Tell Us More
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell us what you're hoping to experience..."
                    className={`${inputStyles} resize-none`}
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
              >
                Send Safari Enquiry

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <p className="mt-5 text-center text-[10px] leading-5 text-charcoal/35">
                We'll use the information you provide only to respond to your
                safari enquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Bottom reassurance */}
      <section className="bg-deep-forest px-6 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            No fixed formula
          </span>

          <h2 className="mt-6 font-serif text-3xl leading-[1.1] text-white sm:text-4xl">
            Not sure where to start?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
            That's completely fine. Tell us what kind of experience you're
            dreaming about and we'll help you figure out the rest.
          </p>

          <Link
            to="/destinations"
            className="group mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
          >
            Explore destinations first

            <FiArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}