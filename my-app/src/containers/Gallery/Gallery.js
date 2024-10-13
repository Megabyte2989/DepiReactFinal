import React, { useState } from "react";
import BookingFormBmodal from "../client_components/BookingFormModal";
import GallerySection from "../client_components/CarGallerySection";
import FloatingIcon from "../client_components/FloatingIcon";
import Footer from "../client_components/Footer";
import GalleryHero from "../client_components/GalleryHero";
import NavbarDark from "../client_components/NavbarDark";
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
