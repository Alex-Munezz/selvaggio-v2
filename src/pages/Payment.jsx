import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiDollarSign,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const inputStyles =
  "mt-2 w-full border border-[#111111]/10 bg-white px-4 py-4 text-sm text-[#111111] outline-none transition-all placeholder:text-[#111111]/30 focus:border-[#c4a454]";

export default function Payment() {
  const { reference } = useParams();
  const navigate = useNavigate();

  const accessToken =
    sessionStorage.getItem(
      `selvaggio_payment_access_${reference}`
    ) || "";

  const accessHeaders = accessToken
    ? {
        "X-Booking-Access-Token":
          accessToken,
      }
    : {};

  const [booking, setBooking] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [amount, setAmount] = useState("");
  const [creatingPayment, setCreatingPayment] =
    useState(false);

  const [pendingPayment, setPendingPayment] =
    useState(null);

  const [confirming, setConfirming] =
    useState(false);

  const [paymentError, setPaymentError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const fetchPaymentSummary = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://127.0.0.1:5000/api/payments/booking/${reference}`,
        {
          headers: accessHeaders,
        }
      );

      setBooking(response.data.booking);
      setPayments(response.data.payments || []);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Unable to load booking payment details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentSummary();
  }, [reference]);

  const currency = booking?.currency || "USD";

  const totalAmount = Number(
    booking?.total_amount || 0
  );

  const paidAmount = Number(
    booking?.paid_amount || 0
  );

  const balance = Number(
    booking?.balance || 0
  );

  const isPaid = balance <= 0;

  const formattedStatus = useMemo(() => {
    if (!booking) return "";

    if (booking.payment_status === "paid") {
      return "Paid in Full";
    }

    if (booking.payment_status === "partial") {
      return "Partially Paid";
    }

    return "Unpaid";
  }, [booking]);

  const formatMoney = (value) => {
    return `${currency} ${Number(
      value || 0
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const choosePercentage = (percentage) => {
    const value = balance * percentage;

    setAmount(value.toFixed(2));
    setPaymentError("");
  };

  const chooseFullBalance = () => {
    setAmount(balance.toFixed(2));
    setPaymentError("");
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setPaymentError(
        "Enter a valid payment amount."
      );
      return;
    }

    if (numericAmount > balance) {
      setPaymentError(
        `Payment cannot exceed the outstanding balance of ${formatMoney(
          balance
        )}.`
      );
      return;
    }

    try {
      setCreatingPayment(true);
      setPaymentError("");
      setSuccessMessage("");

      const response = await axios.post(
        "http://127.0.0.1:5000/api/payments",
        {
          booking_reference: reference,
          amount: numericAmount,
          provider: "manual",
          access_token: accessToken,
        },
        {
          headers: accessHeaders,
        }
      );

      setPendingPayment(
        response.data.payment
      );

      setSuccessMessage(
        "Payment initialized successfully."
      );

      await fetchPaymentSummary();
    } catch (error) {
      setPaymentError(
        error.response?.data?.error ||
          "Unable to initialize payment"
      );
    } finally {
      setCreatingPayment(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!pendingPayment?.id) return;

    try {
      setConfirming(true);
      setPaymentError("");
      setSuccessMessage("");

      const response = await axios.patch(
        `http://127.0.0.1:5000/api/payments/${pendingPayment.id}/confirm`,
        {
          access_token: accessToken,
        },
        {
          headers: accessHeaders,
        }
      );

      setSuccessMessage(
        response.data.message ||
          "Payment confirmed successfully."
      );

      setPendingPayment(null);
      setAmount("");

      await fetchPaymentSummary();
    } catch (error) {
      setPaymentError(
        error.response?.data?.error ||
          "Unable to confirm payment"
      );
    } finally {
      setConfirming(false);
    }
  };

  if (loading && !booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Selvaggio Safaris
          </span>

          <p className="mt-5 font-serif text-3xl text-[#111111]">
            Loading payment details...
          </p>
        </div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e6] px-6">
        <div className="max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a454]">
            Payment
          </span>

          <h1 className="mt-5 font-serif text-4xl text-[#111111]">
            We couldn't find this booking.
          </h1>

          <p className="mt-5 text-sm text-[#111111]/50">
            {error}
          </p>

          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="mt-8 inline-flex items-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-[#e6d69a]"
          >
            <FiArrowLeft />
            Back to Safaris
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f6f1e6]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(196,164,84,0.14),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8 lg:pb-28">
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
            <button
              type="button"
              onClick={() => navigate("/packages")}
              className="mb-8 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-[#c4a454]"
            >
              <FiArrowLeft />
              Safaris
            </button>

            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#c4a454]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
                Secure Your Journey
              </span>
            </div>

            <h1 className="mt-7 font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-8xl">
              Complete your
              <span className="block italic text-[#e6d69a]">
                safari payment.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/50">
              Pay all or part of your
              outstanding safari balance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary */}
      <section className="relative z-20 px-6 lg:px-8">
        <div className="mx-auto -mt-8 grid max-w-7xl overflow-hidden bg-[#111111] shadow-2xl sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-white/10 p-7 sm:border-r lg:border-b-0">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
              Booking Reference
            </span>

            <p className="mt-3 font-serif text-xl text-[#e6d69a]">
              {booking.reference}
            </p>
          </div>

          <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
              Safari Total
            </span>

            <p className="mt-3 font-serif text-xl text-white">
              {formatMoney(totalAmount)}
            </p>
          </div>

          <div className="border-b border-white/10 p-7 sm:border-r sm:border-b-0">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
              Already Paid
            </span>

            <p className="mt-3 font-serif text-xl text-white">
              {formatMoney(paidAmount)}
            </p>
          </div>

          <div className="p-7">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#c4a454]">
              Balance
            </span>

            <p className="mt-3 font-serif text-2xl text-[#e6d69a]">
              {formatMoney(balance)}
            </p>
          </div>
        </div>
      </section>

      {/* Payment Area */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
              Payment Status
            </span>

            <h2 className="mt-5 font-serif text-4xl text-[#111111] sm:text-5xl">
              {formattedStatus}
            </h2>

            <div className="mt-8 border-t border-[#111111]/10 pt-7">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                  <FiCreditCard />
                </span>

                <div>
                  <h3 className="font-serif text-xl text-[#111111]">
                    Flexible payments
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#111111]/50">
                    Choose how much you'd like
                    to pay today without
                    exceeding your outstanding
                    balance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white p-7 shadow-sm sm:p-10 lg:p-12">
            {isPaid ? (
              <div className="py-12 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c4a454]/40 text-[#c4a454]">
                  <FiCheck size={28} />
                </span>

                <span className="mt-7 block text-xs font-semibold uppercase tracking-[0.35em] text-[#9f8236]">
                  Payment Complete
                </span>

                <h2 className="mt-4 font-serif text-4xl text-[#111111]">
                  Paid in full.
                </h2>

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#111111]/50">
                  There is no outstanding
                  balance remaining on this
                  safari booking.
                </p>
              </div>
            ) : (
              <>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9f8236]">
                  Make a Payment
                </span>

                <h2 className="mt-3 font-serif text-3xl text-[#111111]">
                  How much would you like to
                  pay?
                </h2>

                <form
                  onSubmit={handleCreatePayment}
                  className="mt-8"
                >
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#111111]">
                    Payment Amount

                    <div className="relative">
                      <FiDollarSign
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111111]/30"
                      />

                      <input
                        type="number"
                        min="0.01"
                        max={balance}
                        step="0.01"
                        value={amount}
                        onChange={(e) => {
                          setAmount(
                            e.target.value
                          );
                          setPaymentError("");
                        }}
                        placeholder={`Maximum ${balance}`}
                        className={`${inputStyles} pl-11`}
                      />
                    </div>
                  </label>

                  {/* Quick Choices */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        choosePercentage(0.25)
                      }
                      className="border border-[#111111]/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:border-[#c4a454] hover:text-[#9f8236]"
                    >
                      25%
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        choosePercentage(0.5)
                      }
                      className="border border-[#111111]/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:border-[#c4a454] hover:text-[#9f8236]"
                    >
                      50%
                    </button>

                    <button
                      type="button"
                      onClick={chooseFullBalance}
                      className="border border-[#c4a454]/50 bg-[#f6f1e6] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9f8236]"
                    >
                      Full
                    </button>
                  </div>

                  {paymentError && (
                    <div className="mt-6 border border-red-200 bg-red-50 p-4">
                      <p className="text-sm text-red-600">
                        {paymentError}
                      </p>
                    </div>
                  )}

                  {successMessage && (
                    <div className="mt-6 border border-[#c4a454]/30 bg-[#f6f1e6] p-4">
                      <p className="text-sm text-[#111111]/65">
                        {successMessage}
                      </p>
                    </div>
                  )}

                  {!pendingPayment && (
                    <button
                      type="submit"
                      disabled={
                        creatingPayment ||
                        !amount
                      }
                      className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#c4a454] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e6d69a] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {creatingPayment
                        ? "Initializing..."
                        : "Continue Payment"}

                      {!creatingPayment && (
                        <FiArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      )}
                    </button>
                  )}
                </form>

                {/* DEVELOPMENT CONFIRM */}
                {pendingPayment && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-8 border border-[#c4a454]/30 bg-[#f6f1e6] p-6"
                  >
                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9f8236]">
                      Pending Payment
                    </span>

                    <p className="mt-3 font-serif text-2xl text-[#111111]">
                      {formatMoney(
                        pendingPayment.amount
                      )}
                    </p>

                    <p className="mt-3 text-xs leading-6 text-[#111111]/45">
                      Development mode:
                      confirm this payment to
                      simulate a successful
                      payment provider callback.
                    </p>

                    <button
                      type="button"
                      onClick={
                        handleConfirmPayment
                      }
                      disabled={confirming}
                      className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#111111] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#2b2b2b] disabled:opacity-50"
                    >
                      {confirming
                        ? "Confirming..."
                        : "Confirm Test Payment"}

                      {!confirming && (
                        <FiCheck />
                      )}
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-[#111111] px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c4a454]">
            Payment History
          </span>

          <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">
            Your payment
            <span className="italic text-[#e6d69a]">
              {" "}
              activity.
            </span>
          </h2>

          {payments.length === 0 ? (
            <div className="mt-12 border-t border-white/10 py-10">
              <FiClock className="text-[#c4a454]" />

              <p className="mt-4 text-sm text-white/40">
                No payments have been made
                yet.
              </p>
            </div>
          ) : (
            <div className="mt-12">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="grid gap-5 border-t border-white/10 py-7 sm:grid-cols-4 sm:items-center"
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Payment
                    </span>

                    <p className="mt-2 text-sm text-white">
                      #{payment.id}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Amount
                    </span>

                    <p className="mt-2 font-serif text-lg text-[#e6d69a]">
                      {payment.currency}{" "}
                      {Number(
                        payment.amount
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Status
                    </span>

                    <p
                      className={`mt-2 text-xs font-semibold uppercase tracking-[0.15em] ${
                        payment.status ===
                        "paid"
                          ? "text-[#c4a454]"
                          : "text-white/50"
                      }`}
                    >
                      {payment.status}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Date
                    </span>

                    <p className="mt-2 text-sm text-white/50">
                      {new Date(
                        payment.paid_at ||
                          payment.created_at
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}