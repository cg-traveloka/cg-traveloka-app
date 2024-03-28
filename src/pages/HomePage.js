import React from "react";
import Header from "../components/hompage/Header";

import Footer from "../components/hompage/Footer";
import Banner from "../components/hompage/Banner";
import HotelDiscovery from "../components/hompage/HotelDiscovery";
import FlightDiscovery from "../components/hompage/FlightDiscovery";
import ComboDiscovery from "../components/hompage/ComboDiscovery";

function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <HotelDiscovery />
      <ComboDiscovery />
      <FlightDiscovery />
      <Footer />
    </div>
  );
}

export default HomePage;
