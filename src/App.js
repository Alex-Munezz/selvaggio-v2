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
import Floating from "./components/shared/FloatingActions";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminBookingDetail from "./pages/admin/AdminBookingDetail";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

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
          <Route
  path="/success"
  element={<Success />}
/>
          <Route
  path="/payment/:reference"
  element={<Payment />}
/>
<Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route element={<AdminProtectedRoute />}>
  <Route
    path="/admin/bookings"
    element={<AdminBookings />}
  />

  <Route
    path="/admin/bookings/:reference"
    element={<AdminBookingDetail />}
  />
</Route>
        </Routes>
    <Floating />
      </SiteLayout>
    </BrowserRouter>
  );
}

export default App;