import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiHome,
  FiMessageCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#111111]">
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 lg:px-8">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(196,164,84,0.14),transparent_40%)]" />

        <div className="relative mx-auto w-full max-w-4xl text-center">
          {/* Success Icon */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#c4a454]/40"
          >
            <motion.div
              initial={{
                scale: 0,
                rotate: -20,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.5,
                type: "spring",
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c4a454]"
            >
              <FiCheck
                size={30}
                className="text-black"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
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
              delay: 0.25,
              duration: 0.8,
            }}
          >
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                Message Received
              </span>

              <span className="h-px w-10 bg-[#c4a454]" />
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[1] text-white sm:text-6xl lg:text-7xl">
              Thank you for

              <span className="block italic text-[#e6d69a]">
                reaching out.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Your message has been successfully
              sent to Selvaggio Safaris. Our team
              will review your enquiry and get back
              to you as soon as possible.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/35">
              In the meantime, feel free to explore
              our safari journeys and destinations
              across Kenya.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.7,
            }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={() =>
                navigate("/packages")
              }
              className="group inline-flex w-full items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a] sm:w-auto"
            >
              Explore Safaris

              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="group inline-flex w-full items-center justify-center gap-3 border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#c4a454] hover:text-[#c4a454] sm:w-auto"
            >
              <FiHome size={16} />

              Back Home
            </button>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
              duration: 0.8,
            }}
            className="mx-auto mt-14 max-w-xl border-t border-white/10 pt-8"
          >
            <p className="text-xs leading-6 text-white/35">
              Need a faster response?
            </p>

            <a
              href="https://wa.me/254792464627?text=Hello%20Selvaggio%20Safaris%2C%20I%20have%20just%20submitted%20an%20enquiry%20through%20your%20website."
              target="_blank"
              rel="noreferrer"
              className="group mt-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#c4a454] transition-colors hover:text-[#e6d69a]"
            >
              <FiMessageCircle size={16} />

              Chat With Us On WhatsApp

              <FiArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Decorative corners */}
        <div className="absolute left-8 top-28 hidden h-24 w-24 border-l border-t border-[#c4a454]/15 lg:block" />

        <div className="absolute bottom-12 right-8 hidden h-24 w-24 border-b border-r border-[#c4a454]/15 lg:block" />
      </section>
    </main>
  );
}