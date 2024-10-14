import React from "react";
import AboutUs from "../client_components/AboutUs.js";
import BookNowSection from "../client_components/BookNowSection.js";
import BrandLogos from "../client_components/BrandLogos.js";
import FAQs from "../client_components/FAQs.js";
import FloatingIcon from "../client_components/FloatingIcon.js";
import Footer from "../client_components/Footer.js";
import HeroSection from "../client_components/HeroSection.js";
import HowItWorks from "../client_components/HowItWorks.js";
import Modal from "../client_components/Modal.js";
import Navbar from "../client_components/Navbar.js";

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