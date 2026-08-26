import { motion } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    quote:
      "My friend and I very VERY happy with our Selvaggio Safaris trips! We felt that our safari driver/guide Peter gave us many opportunities to see varied animals in Nairobi Park and he gave us interesting facts about those creatures. He was able to answer our questions, too. We were so happy with James that we used him as our driver/guide on ALL other excursions! He was knowledgeable, friendly, and extremely patient when we changed plans or when we took longer than expected. His English was good so we were able to engage in conversation with him a lot; and we gained interesting information about Kenya and Nairobi. We would recommend James as a guide in a heartbeat!!",
    guest: "Elizabeth Deane",
    journey: "Nairobi National Park",
  },
  {
    quote:
      "Wow 🤩 what a great last minute half day private tour through Nairobi National Park!! Booked last minute through the hotel as we only had limited time! Easy, great communication, great guide, value for money. Can highly recommend!",
    guest: "Wendy Porter",
    journey: "Nairobi National Park",
  },
  {
    quote:
      "The trip was super cool. Our group enjoyed their time very much and we had a unique safari in Amboseli park . the driver are so patient and welcoming. Segio is very friendly, helpful and has a good knowledge of history. Thank you for your hospitality.",
    guest: "Hadeer Yehia",
    journey: "Amboseli National Park",
  },
];

export default function Testimonials() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#111111] px-6 py-24 text-white sm:py-32 lg:px-8 lg:py-40">
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
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                Guest Stories
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              The memories
              <span className="block italic text-[#e6d69a]">
                speak for themselves.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45">
            The most meaningful measure of a journey is what stays with you
            long after you return home.
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
              className="group flex min-h-[360px] flex-col justify-between border border-[#c4a454]/15 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#c4a454]/45 hover:bg-white/[0.04] sm:p-9"
            >
              {/* Stars */}
              <div className="flex gap-1 text-[#c4a454]">
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
                <span className="font-serif text-5xl leading-none text-[#c4a454]/35">
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

                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#c4a454]/70">
                  {testimonial.journey}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center"
        >
          <div>
            <p className="max-w-lg font-serif text-xl italic text-white/75">
              Your own Kenya story could be next.
            </p>

            <p className="mt-2 max-w-lg text-sm leading-7 text-white/40">
              Tell us what you're imagining and we'll help shape a journey
              around the way you want to experience Kenya.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="group inline-flex w-fit items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#e6d69a]"
          >
            Start Your Story

            <FiArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}