import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}