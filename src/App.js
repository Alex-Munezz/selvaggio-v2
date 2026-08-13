import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Safaris from "./pages/Safaris";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackagesDetail";
import Contact from "./pages/Contact";
import Book from "./pages/Book";

function App() {
  return (
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/destinations" element={<Destinations />} />

          <Route
            path="/destinations/:id"
            element={<DestinationDetail />}
          />

          <Route path="/safaris" element={<Safaris />} />

          <Route path="/packages" element={<Packages />} />

                    <Route
            path="/packages/:id"
            element={<PackageDetail />}
          />

          <Route path="/contact" element={<Contact />} />

          <Route path="/book" element={<Book />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}

export default App;