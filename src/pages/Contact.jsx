import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const inputStyles =
  "mt-2 w-full border border-[#111111]/10 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-all placeholder:text-[#111111]/30 focus:border-[#c4a454]";

const contactDetails = [
  {
    icon: FiMail,
    label: "Email",
    value: "selvaggiosafarissolutions@gmail.com",
    href: "mailto:selvaggiosafarissolutions@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone / WhatsApp",
    value: "+254 792 464 627",
    href: "tel:+254792464627",
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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    const subjectLabels = {
      "safari-enquiry": "Safari Enquiry",
      "serve-and-safari": "Serve & Safari Enquiry",
      transfers: "Transfers Enquiry",
      "existing-booking": "Existing Booking",
      "general-question": "General Question",
      partnership: "Partnership / Business Enquiry",
      other: "General Enquiry",
    };

    const enquiryType =
      subjectLabels[formData.subject] || "Website Enquiry";

    try {
      const response = await fetch(
        "https://formspree.io/f/mljrqvvz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            enquiryType,
            subject: enquiryType,
            message: formData.message,
            _subject: `Selvaggio Website - ${enquiryType}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      navigate("/success");
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        "We couldn't send your message. Please try again or contact us through WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#f6f1e6]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(196,164,84,0.13),transparent_40%)]" />

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
                Get In Touch
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Let's start a

              <span className="block italic text-[#e6d69a]">
                conversation.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Planning a safari, arranging transfers,
              exploring Serve & Safari or simply have
              a question about Kenya? We'd love to
              hear from you.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Selvaggio Safaris
            </span>

            <span className="text-right text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
              Nairobi · Kenya
            </span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Details */}
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
                Contact Selvaggio
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
              We're here to

              <span className="block italic text-[#c4a454]">
                help you plan.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-[#111111]/55">
              Whether you've already chosen your
              journey or you're still figuring out
              where to begin, talk to us and we'll
              help point you in the right direction.
            </p>

            {/* Contact Details */}
            <div className="mt-10 border-t border-[#111111]/10">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                      <Icon size={17} />
                    </span>

                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111]/35">
                        {detail.label}
                      </span>

                      <span className="mt-1 block text-sm text-[#111111]">
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
                      className="flex items-center gap-4 border-b border-[#111111]/10 py-5 transition-colors hover:text-[#9f8236]"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div
                    key={detail.label}
                    className="flex items-center gap-4 border-b border-[#111111]/10 py-5"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254792464627?text=Hello%20Selvaggio%20Safaris%2C%20I%27d%20like%20to%20make%20an%20enquiry."
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex items-center gap-4 border border-[#111111]/10 bg-white p-5 transition-all duration-300 hover:border-[#c4a454]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-[#c4a454]">
                <FiMessageCircle size={18} />
              </span>

              <div>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111]/35">
                  Prefer WhatsApp?
                </span>

                <span className="mt-1 block text-sm font-semibold text-[#111111] transition-colors group-hover:text-[#9f8236]">
                  Start a conversation
                </span>
              </div>

              <FiArrowRight
                size={17}
                className="ml-auto text-[#111111] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c4a454]"
              />
            </a>

            {/* Quick Help */}
            <div className="mt-10 border-t border-[#111111]/10 pt-7">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#111111]/35">
                Ready to book instead?
              </span>

              <button
                type="button"
                onClick={() => navigate("/packages")}
                className="group mt-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#9f8236] transition-colors hover:text-[#111111]"
              >
                Explore Safari Packages

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
                Send Us A Message
              </span>

              <h2 className="mt-3 font-serif text-3xl text-[#111111]">
                How can we help?
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#111111]/45">
                Give us a few details and we'll have
                a better idea of what you're looking
                for.
              </p>
            </div>

            <form
              className="mt-8"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  First Name

                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
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
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputStyles}
                    required
                  />
                </label>
              </div>

              {/* Email */}
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
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputStyles} pl-11`}
                      required
                    />
                  </div>
                </label>
              </div>

              {/* Subject */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  What can we help with?

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputStyles}
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>

                    <option value="safari-enquiry">
                      Safari Enquiry
                    </option>

                    <option value="serve-and-safari">
                      Serve & Safari
                    </option>

                    <option value="transfers">
                      Transfers
                    </option>

                    <option value="existing-booking">
                      Existing Booking
                    </option>

                    <option value="general-question">
                      General Question
                    </option>

                    <option value="partnership">
                      Partnership / Business Enquiry
                    </option>

                    <option value="other">
                      Something Else
                    </option>
                  </select>
                </label>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                  Message

                  <textarea
                    name="message"
                    rows="7"
                    placeholder="Tell us a little more about what you're looking for..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputStyles} resize-none`}
                    required
                  />
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-6 border border-red-200 bg-red-50 px-5 py-4">
                  <p className="text-sm leading-6 text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Sending Message..."
                  : "Send Message"}

                {!submitting && (
                  <FiSend
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>

              <p className="mt-5 text-center text-[10px] leading-5 text-[#111111]/35">
                We only use the information you
                provide to respond to your enquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
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
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
            Already dreaming about the trip?
          </span>

          <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-[#111111] sm:text-5xl">
            Skip the questions.

            <span className="block italic text-[#c4a454]">
              Start exploring.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#111111]/50">
            Browse our safari journeys, compare
            destinations, travel days and pricing,
            then reserve the experience that feels
            right for you.
          </p>

          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="group mt-8 inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a]"
          >
            Explore Safaris

            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </section>

      {/* Location Strip */}
      <section className="bg-[#111111] px-6 py-8 lg:px-8">
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