import { useEffect, useState } from "react";
import { FiArrowUp, FiMessageCircle } from "react-icons/fi";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappNumber = "254792464627";

  const whatsappMessage =
    "Hello Selvaggio Safaris, I'd like to enquire about a safari.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-[#c4a454]/40 bg-[#111111] text-[#c4a454] shadow-lg transition-all duration-300 hover:bg-[#c4a454] hover:text-black ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <FiArrowUp size={19} />
      </button>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Selvaggio Safaris on WhatsApp"
        className="group flex items-center gap-3 rounded-full bg-[#c4a454] px-4 py-3 text-black shadow-lg transition-all duration-300 hover:bg-[#e6d69a]"
      >
        <span className="hidden text-xs font-bold uppercase tracking-[0.18em] sm:block">
          WhatsApp
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
          <FiMessageCircle size={18} />
        </span>
      </a>
    </div>
  );
}