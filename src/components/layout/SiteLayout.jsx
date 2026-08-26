import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

export default function SiteLayout({ children }) {

  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {!isAdminRoute && <Navbar />}
      <main>{children}</main>
      <Footer />
    </div>
  );
}