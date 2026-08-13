import { motion } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote:
      "From the first conversation to our final game drive, everything felt thoughtfully planned. We never felt rushed, and every day brought something completely different.",
    guest: "A Selvaggio Guest",
    journey: "Maasai Mara Safari",
  },
  {
    quote:
      "Kenya exceeded every expectation. The landscapes, the wildlife and the little moments in between made this a journey we'll remember for a very long time.",
    guest: "A Selvaggio Guest",
    journey: "Kenya Discovery",
  },
  {
    quote:
      "What stood out most was how personal the experience felt. It wasn't simply a safari itinerary — it felt like our own journey through Kenya.",
    guest: "A Selvaggio Guest",
    journey: "Amboseli & Maasai Mara",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-deep-forest px-6 py-24 text-white sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Guest Stories
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              The memories
              <span className="block italic text-gold-light">
                speak for themselves.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45">
            The most meaningful measure of a journey is what stays with you
            after you return home.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.journey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className="group flex min-h-[360px] flex-col justify-between border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:border-gold/40 hover:bg-white/[0.04] sm:p-9"
            >
              {/* Stars */}
              <div className="flex gap-1 text-gold">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={13}
                    fill="currentColor"
                    strokeWidth={1}
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="mt-10">
                <span className="font-serif text-5xl leading-none text-gold/40">
                  “
                </span>

                <p className="-mt-2 font-serif text-xl leading-8 text-white/85 sm:text-2xl">
                  {testimonial.quote}
                </p>
              </div>

              {/* Guest */}
              <div className="mt-10 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {testimonial.guest}
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gold/70">
                  {testimonial.journey}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center"
        >
          <p className="max-w-lg text-sm leading-7 text-white/40">
            Every safari is different. That's what makes every Selvaggio story
            worth telling.
          </p>

          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
          >
            Start your story

            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}