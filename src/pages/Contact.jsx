import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const inputStyles =
  "mt-2 w-full border border-deep-forest/10 bg-white px-4 py-3.5 text-sm text-deep-forest outline-none transition-all placeholder:text-charcoal/30 focus:border-gold";

const contactDetails = [
  {
    icon: FiMail,
    label: "Email",
    value: "hello@selvaggiosafaris.com",
    href: "mailto:hello@selvaggiosafaris.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+254 700 000 000",
    href: "tel:+254700000000",
  },
  {
    icon: FiMapPin,
    label: "Based in",
    value: "Nairobi, Kenya",
    href: null,
  },
  {
    icon: FiClock,
    label: "Availability",
    value: "Monday – Saturday",
    href: null,
  },
];

export default function Contact() {
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
                Get In Touch
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Let's start a
              <span className="block italic text-gold-light">
                conversation.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Have a question, need some inspiration or simply want to talk
              about Kenya? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Contact Selvaggio
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
              We're here to
              <span className="block italic text-gold">
                help you plan.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-charcoal/55">
              Whether you're planning your first safari or returning to Kenya
              for another adventure, get in touch and let's talk about what
              you're looking for.
            </p>

            {/* Details */}
            <div className="mt-10 border-t border-deep-forest/10">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Icon size={17} />
                    </span>

                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-charcoal/35">
                        {detail.label}
                      </span>

                      <span className="mt-1 block text-sm text-deep-forest">
                        {detail.value}
                      </span>
                    </div>
                  </>
                );

                if (detail.href) {
                  return (
                    <a
                      key={detail.label}
                      href={detail.href}
                      className="flex items-center gap-4 border-b border-deep-forest/10 py-5 transition-colors hover:text-gold"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div
                    key={detail.label}
                    className="flex items-center gap-4 border-b border-deep-forest/10 py-5"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex items-center gap-4 border border-deep-forest/10 bg-white p-5 transition-all duration-300 hover:border-gold"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-deep-forest text-gold">
                <FiMessageCircle size={18} />
              </span>

              <div>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-charcoal/35">
                  Prefer WhatsApp?
                </span>

                <span className="mt-1 block text-sm font-semibold text-deep-forest transition-colors group-hover:text-gold">
                  Start a conversation
                </span>
              </div>

              <FiArrowRight
                size={17}
                className="ml-auto text-deep-forest transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold"
              />
            </a>
          </motion.div>

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
                Send Us A Message
              </span>

              <h2 className="mt-3 font-serif text-3xl text-deep-forest">
                How can we help?
              </h2>
            </div>

            <form className="mt-8">
              {/* Name */}
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

              {/* Email */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Email Address
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={inputStyles}
                  />
                </label>
              </div>

              {/* Subject */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  What can we help with?
                  <select
                    name="subject"
                    defaultValue=""
                    className={inputStyles}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="safari-enquiry">
                      I want to plan a safari
                    </option>
                    <option value="existing-booking">
                      I have an existing booking
                    </option>
                    <option value="general-question">
                      I have a general question
                    </option>
                    <option value="partnership">
                      Partnership / Business enquiry
                    </option>
                    <option value="other">Something else</option>
                  </select>
                </label>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Message
                  <textarea
                    name="message"
                    rows="7"
                    placeholder="Tell us a little more..."
                    className={`${inputStyles} resize-none`}
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
              >
                Send Message

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <p className="mt-5 text-center text-[10px] leading-5 text-charcoal/35">
                We respect your privacy and will only use your details to
                respond to your enquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick booking CTA */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Already dreaming about the trip?
          </span>

          <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-deep-forest sm:text-5xl">
            Skip the questions.
            <span className="block italic text-gold">
              Start planning.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-charcoal/50">
            If you're ready to start putting your safari together, tell us
            about your ideal journey and we'll take it from there.
          </p>

          <Link
            to="/book"
            className="group mt-8 inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light"
          >
            Plan My Safari

            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>

      {/* Location strip */}
      <section className="bg-deep-forest px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
            Selvaggio Safaris
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
            Nairobi · Kenya · East Africa
          </span>
        </div>
      </section>
    </main>
  );
}