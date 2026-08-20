import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiCheck, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiUsers} from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const inputStyles =
  "mt-2 w-full border border-deep-forest/10 bg-white px-4 py-3.5 text-sm text-deep-forest outline-none transition-all placeholder:text-charcoal/30 focus:border-gold";

export default function Book() {

const [searchParams] = useSearchParams();

const packageId = searchParams.get("package");

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
const [priceLoading, setPriceLoading] = useState(false);
const [priceError, setPriceError] = useState("");

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const previewPrice = async () => {
  if (!packageId || !formData.travelDate) {
    return;
  }

  try {
    setPriceLoading(true);
    setPriceError("");

    const response = await axios.post(
      "http://127.0.0.1:5000/api/bookings/preview-price",
      {
        package_id: Number(packageId),
        travel_date: formData.travelDate,
        adults: Number(formData.adults),
        children: Number(formData.children),
      }
    );

    setPricing(response.data.pricing);
  } catch (error) {
    setPricing(null);

    setPriceError(
      error.response?.data?.error ||
        "Unable to calculate price"
    );
  } finally {
    setPriceLoading(false);
  }
};

useEffect(() => {
  if (formData.travelDate && packageId) {
    previewPrice();
  }
}, [
  formData.travelDate,
  formData.adults,
  formData.children,
  packageId,
]);

const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
const [bookingResult, setBookingResult] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!packageId) {
    setSubmitError("No package selected.");
    return;
  }

  try {
    setSubmitting(true);
    setSubmitError("");

    const response = await axios.post(
      "http://127.0.0.1:5000/api/bookings",
      {
        customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
        customer_email: formData.email,
        customer_phone: formData.phone,
        package_id: Number(packageId),
        travel_date: formData.travelDate,
        adults: Number(formData.adults),
        children: Number(formData.children),
        special_requests: formData.message,
      }
    );

    setBookingResult(response.data);
  } catch (error) {
    setSubmitError(
      error.response?.data?.error ||
        "Unable to create booking"
    );
  } finally {
    setSubmitting(false);
  }
};

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

            <form className="mt-8"
            onSubmit={handleSubmit}>
              {/* Personal information */}
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleChange}
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
                    value={formData.lastName}
                    onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Phone Number
                  <div className="relative">
                    <FiPhone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="With country code, e.g. +254 7XX XXX XXX"
                      className={`${inputStyles} pl-11`}
                      value={formData.phone}
                      onChange={handleChange}
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
    Adults
    <input
      type="number"
      name="adults"
      min="1"
      max="6"
      value={formData.adults}
      onChange={handleChange}
      className={inputStyles}
    />
  </label>

  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
    Children
    <input
      type="number"
      name="children"
      min="0"
      value={formData.children}
      onChange={handleChange}
      className={inputStyles}
    />
  </label>
</div>
<div className="mt-6">
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
        value={formData.travelDate}
        onChange={handleChange}
        className={`${inputStyles} pl-11`}
      />
    </div>
  </label>
</div>

{priceLoading && (
  <p className="mt-4 text-sm text-charcoal/50">
    Calculating your safari price...
  </p>
)}

{priceError && (
  <p className="mt-4 text-sm text-red-600">
    {priceError}
  </p>
)}

{pricing && (
  <div className="mt-6 border border-gold/30 bg-cream p-5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
      Price Summary
    </span>

    <div className="mt-4 space-y-2 text-sm text-charcoal/70">
      <p>
        Adults: {formData.adults}
      </p>

      <p>
        Adult rate: {pricing.currency} {pricing.adult_rate}
      </p>

      {Number(formData.children) > 0 && (
        <>
          <p>
            Children: {formData.children}
          </p>

          <p>
            Child rate: {pricing.currency} {pricing.child_rate}
          </p>

          <p>
            Children total: {pricing.currency}{" "}
            {pricing.children_total}
          </p>
        </>
      )}

      <div className="mt-4 border-t border-deep-forest/10 pt-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
          Total
        </span>

        <p className="mt-1 font-serif text-2xl text-deep-forest">
          {pricing.currency} {pricing.total_amount}
        </p>
      </div>
    </div>
  </div>
)}
              {/* Message */}
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-forest">
                  Tell Us More
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell us what you're hoping to experience..."
                    className={`${inputStyles} resize-none`}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Submit */}
  <button
  type="submit"
  disabled={submitting || !pricing}
  className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
>
  {submitting ? "Creating Booking..." : "Book This Safari"}

  {!submitting && (
    <FiArrowRight
      size={17}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  )}
</button>

              {submitError && (
  <p className="mt-4 text-sm text-red-600">
    {submitError}
  </p>
)}

{bookingResult && (
  <div className="mt-6 border border-gold/30 bg-cream p-5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
      Booking Created
    </span>

    <h3 className="mt-3 font-serif text-2xl text-deep-forest">
      Your safari is reserved.
    </h3>

    <div className="mt-4 space-y-2 text-sm text-charcoal/70">
      <p>
        Reference:{" "}
        <strong>{bookingResult.reference}</strong>
      </p>

      <p>
        Total:{" "}
        {bookingResult.pricing?.currency}{" "}
        {bookingResult.pricing?.total_amount}
      </p>
    </div>
  </div>
)}

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