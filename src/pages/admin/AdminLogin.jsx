import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

import {
  useNavigate,
} from "react-router-dom";

import {
  API_URL,
  getAdminToken,
  setAdminSession,
} from "../../utils/adminAuth";

import SSS from "../../assets/SSS.png";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (getAdminToken()) {
      navigate(
        "/admin/bookings",
        {
          replace: true,
        }
      );
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to login"
        );
      }

      setAdminSession(
        data.access_token,
        data.user
      );

      navigate(
        "/admin/bookings",
        {
          replace: true,
        }
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-6 py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(196,164,84,0.14),transparent_40%)]" />

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
          duration: 0.7,
        }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-10 text-center">
          <img
            src={SSS}
            alt="Selvaggio Safaris"
            className="mx-auto h-20 w-20 object-contain"
          />

          <h1 className="mt-5 font-serif text-3xl text-white">
            Selvaggio
          </h1>

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
            Consultant Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-9">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Staff Access
          </span>

          <h2 className="mt-3 font-serif text-3xl text-white">
            Welcome back.
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Sign in to manage safari
            bookings and customer
            enquiries.
          </p>

          {error && (
            <div className="mt-6 border border-red-400/20 bg-red-400/10 px-4 py-3">
              <p className="text-sm text-red-300">
                {error}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            {/* Email */}
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Email Address

              <div className="relative mt-2">
                <FiMail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="admin@selvaggiosafaris.com"
                  required
                  className="w-full border border-white/10 bg-white/[0.04] px-11 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c4a454]"
                />
              </div>
            </label>

            {/* Password */}
            <label className="mt-6 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Password

              <div className="relative mt-2">
                <FiLock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  required
                  className="w-full border border-white/10 bg-white/[0.04] px-11 py-4 pr-12 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#c4a454]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-[#c4a454]"
                >
                  {showPassword ? (
                    <FiEyeOff
                      size={17}
                    />
                  ) : (
                    <FiEye
                      size={17}
                    />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="group mt-8 flex w-full items-center justify-center gap-3 bg-[#c4a454] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}

              {!loading && (
                <FiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
          className="mx-auto mt-7 block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 transition-colors hover:text-[#c4a454]"
        >
          Return to Website
        </button>
      </motion.div>
    </main>
  );
}