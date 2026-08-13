import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const testimonials = [
  {
    quote:
      "The entire experience felt effortless. From the planning to the game drive itself, everything was handled with genuine care.",
    name: "Safari Guest",
    detail: "Nairobi National Park",
  },
  {
    quote:
      "We wanted something personal rather than a standard tour, and Selvaggio gave us exactly that. The experience was unforgettable.",
    name: "Safari Guest",
    detail: "Private Safari",
  },
  {
    quote:
      "Professional, friendly and incredibly knowledgeable. Kenya felt completely different through their eyes.",
    name: "Safari Guest",
    detail: "Kenya Safari",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="overflow-hidden bg-cream px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Guest Stories
              </span>
            </div>

            <h2 className="max-w-3xl text-5xl leading-[1.05] text-forest md:text-6xl lg:text-7xl">
              The best stories
              <span className="block italic text-gold">
                come from the people who lived them.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-charcoal/60 md:text-base">
            Every safari is different. What stays the same is the feeling of
            discovering Kenya with people who care about the experience.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="mt-20 grid border-t border-forest/15 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name + testimonial.detail}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className="border-b border-forest/15 py-10 md:min-h-[390px] md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              {/* Quote mark */}
              <div className="font-serif text-6xl leading-none text-gold">
                “
              </div>

              <blockquote className="mt-5 font-serif text-2xl leading-[1.3] text-forest">
                {testimonial.quote}
              </blockquote>

              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                  {testimonial.name}
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-charcoal/40">
                  {testimonial.detail}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Review CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-charcoal/50">
            Have you travelled with Selvaggio?
          </p>

          <a
            href="#contact"
            className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest"
          >
            Share your experience

            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}