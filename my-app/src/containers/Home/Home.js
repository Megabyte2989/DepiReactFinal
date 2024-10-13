import React from "react";
import AboutUs from "../client_components/AboutUs";
import BookNowSection from "../client_components/BookNowSection";
import BrandLogos from "../client_components/BrandLogos";
import FAQs from "../client_components/FAQs";
import FloatingIcon from "../client_components/FloatingIcon";
import Footer from "../client_components/Footer";
import HeroSection from "../client_components/HeroSection";
import HowItWorks from "../client_components/HowItWorks";
import Modal from "../client_components/Modal";
import Navbar from "../client_components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Modal />
      <HeroSection />
      <HowItWorks />
      <BrandLogos />
      <AboutUs />
      <BookNowSection />
      <FAQs />
      <Footer />
      <FloatingIcon />
    </>
  );
}

export default Home;