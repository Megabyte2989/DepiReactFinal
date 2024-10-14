import React, { useState } from "react";
import BookingFormBmodal from "../client_components/BookingFormModal.js";
import GallerySection from "../client_components/CarGallerySection.js";
import FloatingIcon from "../client_components/FloatingIcon.js";
import Footer from "../client_components/Footer.js";
import GalleryHero from "../client_components/GalleryHero.js";
import NavbarDark from "../client_components/NavbarDark.js";
import "./gallery.css";

function Gallery() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <NavbarDark />
      <GalleryHero />
      <div className="gallery-page">
        <GallerySection onBookNowClick={handleOpenModal} />
        <Footer />
        <FloatingIcon />

        {/* Render BookingFormBmodal based on showModal state */}
        <BookingFormBmodal
          isOpen={showModal}
          handleCloseBmodal={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default Gallery;
