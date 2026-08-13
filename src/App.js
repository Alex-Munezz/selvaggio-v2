import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Experiences from "./components/Experiences";
import Why from "./components/WhySelvaggio";
import Fleet from "./components/Fleet";
import Testimonials from "./components/Testimonials";
import BookingCTA from "./components/BookingCTA";
import Footer from "./components/Footer";
function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Destinations />
      <Experiences />
      <Why />
      <Fleet />
      <Testimonials />
      <BookingCTA />
      <Footer />
    </main>
  );
}

export default App;