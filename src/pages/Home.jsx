import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import FeaturedDestinations from "../components/home/FeaturedDestinations";
import Experiences from "../components/home/Experiences";
import WhySelvaggio from "../components/home/WhySelvaggio";
import FeaturedPackages from "../components/home/FeaturedPackages";
import Testimonials from "../components/home/Testimonials";
import BookingCTA from "../components/home/BookingCTA";
import LastMinuteBookings from '../components/home/LastMinuteBookings';

export default function Home() {
  return (
    <>
      <Hero />
      <LastMinuteBookings />
      <Intro />
      <FeaturedDestinations />
      <Experiences />
      <FeaturedPackages />
        <WhySelvaggio />
        <Testimonials />
        <BookingCTA />
    </>
  );
}